'use client';

import { motion } from 'framer-motion';

interface Step2Props {
    value: string;
    onChange: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export function Step2JD({ value, onChange, onNext, onBack }: Step2Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">목표 직무 (JD) 입력</h2>
                <p className="text-muted-foreground">
                    지원하시려는 채용 공고의 주요 업무(JD) 내용을 복사해서 붙여넣어 주세요.<br />
                    AI가 이 내용을 분석하여 가장 적합한 키워드를 추출합니다.
                </p>
            </div>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="예시:
[주요 업무]
- 서비스 기획 및 운영
- 데이터 분석을 통한 인사이트 도출
- 유관 부서와의 커뮤니케이션

[자격 요건]
- 3년 이상의 기획 경력
- SQL 사용 가능자
..."
                className="input min-h-[300px] resize-y font-mono text-sm leading-relaxed"
            />

            <div className="flex justify-between">
                <button onClick={onBack} className="btn btn-outline">
                    이전
                </button>
                <button
                    onClick={onNext}
                    disabled={!value.trim()}
                    className="btn btn-primary"
                >
                    다음 단계로
                </button>
            </div>
        </motion.div>
    );
}
