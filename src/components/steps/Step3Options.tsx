'use client';

import { motion } from 'framer-motion';

export type OutputFormat = 'bullet' | 'interview' | 'cover_letter';
export type Tone = 'professional' | 'creative' | 'direct';

interface Step3Props {
    format: OutputFormat;
    setFormat: (format: OutputFormat) => void;
    tone: Tone;
    setTone: (tone: Tone) => void;
    onNext: () => void;
    onBack: () => void;
    isGenerating: boolean;
}

export function Step3Options({ format, setFormat, tone, setTone, onNext, onBack, isGenerating }: Step3Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">옵션 선택</h2>
                <p className="text-muted-foreground">
                    원하는 결과물의 형태와 톤앤매너를 선택해주세요.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">결과물 형태</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => setFormat('bullet')}
                        className={`p-4 rounded-lg border text-left transition-all ${format === 'bullet'
                                ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <div className="font-bold mb-1">개조식 정리</div>
                        <div className="text-sm text-muted-foreground">깔끔하게 핵심만 요약하여 이력서에 바로 쓸 수 있는 형태</div>
                    </button>
                    <button
                        onClick={() => setFormat('interview')}
                        className={`p-4 rounded-lg border text-left transition-all ${format === 'interview'
                                ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <div className="font-bold mb-1">면접 예상 질문 & 답변</div>
                        <div className="text-sm text-muted-foreground">내 경력을 바탕으로 나올 수 있는 질문과 모범 답안</div>
                    </button>
                    <button
                        onClick={() => setFormat('cover_letter')}
                        className={`p-4 rounded-lg border text-left transition-all ${format === 'cover_letter'
                                ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <div className="font-bold mb-1">줄글 자소서</div>
                        <div className="text-sm text-muted-foreground">자기소개서 문항에 바로 복사해 넣을 수 있는 완성된 글</div>
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">톤앤매너</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => setTone('professional')}
                        className={`p-4 rounded-lg border text-left transition-all ${tone === 'professional'
                                ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <div className="font-bold mb-1">신뢰감 있는</div>
                        <div className="text-sm text-muted-foreground">가장 일반적이고 정중한 비즈니스 톤</div>
                    </button>
                    <button
                        onClick={() => setTone('creative')}
                        className={`p-4 rounded-lg border text-left transition-all ${tone === 'creative'
                                ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <div className="font-bold mb-1">창의적인</div>
                        <div className="text-sm text-muted-foreground">스타트업이나 마케팅 직군에 어울리는 통통 튀는 톤</div>
                    </button>
                    <button
                        onClick={() => setTone('direct')}
                        className={`p-4 rounded-lg border text-left transition-all ${tone === 'direct'
                                ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <div className="font-bold mb-1">직설적인</div>
                        <div className="text-sm text-muted-foreground">성과 중심으로 명확하고 간결하게 표현하는 톤</div>
                    </button>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <button onClick={onBack} className="btn btn-outline" disabled={isGenerating}>
                    이전
                </button>
                <button
                    onClick={onNext}
                    disabled={isGenerating}
                    className="btn btn-primary min-w-[120px]"
                >
                    {isGenerating ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                            생성 중...
                        </span>
                    ) : (
                        'AI 생성하기'
                    )}
                </button>
            </div>
        </motion.div>
    );
}
