import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { LangChainAdapter } from 'ai';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';


export async function POST(request: Request) {
    try {
        const { prompt: inputPrompt, resumeText, jdText, format, tone } = await request.json();
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'Gemini API Key is missing' }), { status: 500 });
        }

        const model = new ChatGoogleGenerativeAI({
            apiKey: apiKey,
            model: 'gemini-2.5-flash',
            streaming: true,
            temperature: 0.7,
        });

        let template = '';

        if (format === 'bullet') {
            template = `
        당신은 전문 커리어 컨설턴트입니다.
        아래의 [사용자 경력]을 [목표 직무 JD]에 맞춰서 최적화된 "개조식(Bullet Point)" 형태로 다시 작성해주세요.
        톤앤매너는 "{tone}"으로 설정해주세요.
        
        [목표 직무 JD]
        {jdText}
        
        [사용자 경력]
        {resumeText}
        
        요구사항:
        1. JD의 핵심 키워드를 자연스럽게 포함하세요.
        2. 성과 중심으로 수치화하여 표현하세요.
        3. 불필요한 수식어를 빼고 간결하게 작성하세요.
        4. 한국어로 작성하세요.
        5. **중요: 마크다운 문법(#, *, ** 등)을 절대 사용하지 마세요.**
        6. **모든 항목은 오직 하이픈(-)으로만 시작하세요.**
        7. 제목이나 소제목도 붙이지 말고 바로 내용만 작성하세요.
      `;
        } else if (format === 'interview') {
            template = `
        당신은 전문 면접관입니다.
        아래의 [사용자 경력]과 [목표 직무 JD]를 분석하여, 면접에서 나올 수 있는 예상 질문 5가지와 그에 대한 모범 답변을 작성해주세요.
        톤앤매너는 "{tone}"으로 설정해주세요.
        
        [목표 직무 JD]
        {jdText}
        
        [사용자 경력]
        {resumeText}
        
        요구사항:
        1. 질문은 직무 적합성과 인성 면접을 골고루 포함하세요.
        2. 답변은 STAR 기법을 활용하여 구체적으로 작성하세요.
        3. 한국어로 작성하세요.
        4. **중요: 마크다운 문법(#, *, ** 등)을 절대 사용하지 마세요.**
        5. 질문은 "Q. "로 시작하고, 답변은 "A. "로 시작하세요.
        6. 각 질문/답변 세트 사이에는 빈 줄을 하나 넣어주세요.
      `;
        } else if (format === 'cover_letter') {
            template = `
        당신은 전문 취업 컨설턴트입니다.
        아래의 [사용자 경력]을 바탕으로 [목표 직무 JD]에 지원하는 자기소개서를 작성해주세요.
        톤앤매너는 "{tone}"으로 설정해주세요.
        
        [목표 직무 JD]
        {jdText}
        
        [사용자 경력]
        {resumeText}
        
        요구사항:
        1. 지원 동기와 입사 후 포부를 포함하세요.
        2. 자신의 강점이 직무에 어떻게 기여할 수 있는지 구체적으로 서술하세요.
        3. 한국어로 작성하세요.
        4. **중요: 마크다운 문법(#, *, ** 등)을 절대 사용하지 마세요.**
        5. 소제목 없이 줄글 형태로 자연스럽게 이어지도록 작성하세요.
      `;
        }

        const promptTemplate = PromptTemplate.fromTemplate(template);
        const chain = promptTemplate.pipe(model).pipe(new StringOutputParser());

        const stream = await chain.stream({
            tone,
            jdText,
            resumeText,
        });

        // Buffer the stream to log output to Supabase
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || 'unknown');

        let outputBuffer = '';

        // Create a ReadableStream that captures the output
        const bufferedStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        outputBuffer += chunk;
                        controller.enqueue(chunk);
                    }

                    // After stream completes, log to Supabase
                    try {
                        const { supabase } = await import('@/lib/supabase');
                        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
                            await supabase.from('usage_logs').insert({
                                ip_address: ip,
                                input_data: {
                                    prompt: inputPrompt,
                                    format,
                                    tone,
                                    resume_text: resumeText,
                                    jd_text: jdText
                                },
                                output_text: outputBuffer,
                                status: 'success'
                            });
                        }
                    } catch (err) {
                        console.error('Failed to log to Supabase:', err);
                    }

                    controller.close();
                } catch (streamErr) {
                    console.error('Stream error:', streamErr);
                    controller.error(streamErr);
                }
            }
        });

        return LangChainAdapter.toDataStreamResponse(bufferedStream);
    } catch (error) {
        console.error(error);

        // Log failure
        try {
            const forwardedFor = request.headers.get('x-forwarded-for');
            const realIp = request.headers.get('x-real-ip');
            const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || 'unknown');

            const { supabase } = await import('@/lib/supabase');
            if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
                await supabase.from('usage_logs').insert({
                    ip_address: ip,
                    input_data: { error: 'Failed to generate' },
                    output_text: 'n/a',
                    status: 'failure'
                });
            }
        } catch (logErr) {
            console.error('Failed to log error to Supabase:', logErr);
        }

        return new Response(JSON.stringify({ error: 'Failed to generate content' }), { status: 500 });
    }
}
