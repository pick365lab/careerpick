'use client';

import { motion } from 'framer-motion';
import { Copy, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { useState } from 'react';

interface Step4Props {
    original: string;
    result: string;
    onRestart: () => void;
}

export function Step4Result({ original, result, onRestart }: Step4Props) {
    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFeedback = (type: 'like' | 'dislike') => {
        setFeedback(type);
        // TODO: Send feedback to API
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">최적화 완료!</h2>
                <p className="text-muted-foreground">
                    AI가 분석하여 재설계한 결과를 확인해보세요.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <div className="font-semibold text-muted-foreground">원본</div>
                    <div className="p-4 rounded-lg border border-border bg-muted/30 h-[400px] overflow-y-auto whitespace-pre-wrap text-sm">
                        {original}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold text-primary">AI 최적화 결과</div>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? '복사됨' : '복사하기'}
                        </button>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 h-[400px] overflow-y-auto whitespace-pre-wrap text-sm">
                        {result}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-4">
                <div className="text-sm text-muted-foreground">이 결과가 도움이 되었나요?</div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleFeedback('like')}
                        className={`p-2 rounded-full border transition-colors ${feedback === 'like'
                                ? 'bg-green-100 border-green-500 text-green-700'
                                : 'border-border hover:bg-muted'
                            }`}
                    >
                        <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleFeedback('dislike')}
                        className={`p-2 rounded-full border transition-colors ${feedback === 'dislike'
                                ? 'bg-red-100 border-red-500 text-red-700'
                                : 'border-border hover:bg-muted'
                            }`}
                    >
                        <ThumbsDown className="w-5 h-5" />
                    </button>
                </div>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="w-full max-w-md space-y-2"
                    >
                        <textarea
                            placeholder="어떤 점이 좋았나요? 혹은 아쉬웠나요?"
                            className="input text-sm"
                            rows={3}
                        />
                        <button className="btn btn-primary w-full text-sm py-2">의견 보내기</button>
                    </motion.div>
                )}
            </div>

            <div className="flex justify-center pt-8">
                <button onClick={onRestart} className="btn btn-outline">
                    처음부터 다시 하기
                </button>
            </div>
        </motion.div>
    );
}
