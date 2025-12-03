'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Hero({ onStart }: { onStart: () => void }) {
    const [count, setCount] = useState(1200);

    useEffect(() => {
        // Mock fetching real count
        // In real app: fetch('/api/stats').then(...)
        // Logic: (RealVisitorCount * 3) + 1200
        // Simulating a real visitor count of ~100 for demo
        const realVisitorCount = 100 + Math.floor(Math.random() * 50);
        setCount((realVisitorCount * 3) + 1200);
    }, []);

    return (
        <section className="py-20 md:py-32 text-center space-y-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    당신의 경력은 훌륭합니다.<br />
                    <span className="text-primary">표현이 부족했을 뿐.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    채용 담당자가 3초 만에 반하는 이력서, AI가 30초도 안 돼서 대신 써드립니다!
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center"
            >
                <button onClick={onStart} className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all">
                    지금 바로 무료로 시작하기
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm text-muted-foreground"
            >
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                오늘 <span className="font-bold text-foreground">{count.toLocaleString('ko-KR')}</span>명의 지원자가 이 서비스를 통해 서류 합격률을 높였습니다.
            </motion.div>
        </section>
    );
}
