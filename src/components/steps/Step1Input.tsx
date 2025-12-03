'use client';

import { motion } from 'framer-motion';

interface Step1Props {
    value: string;
    onChange: (value: string) => void;
    onNext: () => void;
}

export function Step1Input({ value, onChange, onNext }: Step1Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">나의 경력 입력</h2>
                <p className="text-muted-foreground">
                    현재 가지고 있는 이력서 내용이나 경력 사항을 자유롭게 입력해주세요.<br />
                    줄글, 개조식 상관없이 입력하시면 됩니다.
                </p>
            </div>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="예시: 
- 2020.03 ~ 2023.02 OO회사 마케팅팀 대리
- SNS 채널 운영 및 콘텐츠 기획
- 월간 활성 사용자(MAU) 30% 증대 달성
..."
                className="input min-h-[300px] resize-y font-mono text-sm leading-relaxed"
            />

            <div className="flex justify-end">
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
