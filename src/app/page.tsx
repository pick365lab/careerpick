'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompletion } from 'ai/react';
import { Sparkles, BookOpen, Moon, Sun } from 'lucide-react';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Guide } from '@/components/Guide';

// Types
type OutputFormat = 'bullet' | 'interview' | 'cover_letter';
type Tone = 'professional' | 'friendly' | 'formal';

export default function Home() {
    const [activeTab, setActiveTab] = useState<'create' | 'guide'>('create');
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [visitorCount, setVisitorCount] = useState(0); // Initialize to 0 or null to prevent hydration mismatch

    useEffect(() => {
        setMounted(true);
        // Fetch visitor count from API
        const fetchCount = async () => {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                setVisitorCount(data.count);
            } catch (error) {
                console.error('Failed to fetch visitor count:', error);
                setVisitorCount(1611); // Fallback
            }
        };
        fetchCount();

        // Listen for switchTab event from Guide component
        const handleSwitchTab = (e: CustomEvent) => {
            if (e.detail === 'create') {
                setActiveTab('create');
            }
        };
        window.addEventListener('switchTab', handleSwitchTab as EventListener);
        return () => window.removeEventListener('switchTab', handleSwitchTab as EventListener);
    }, []);

    // Wizard states
    const [step, setStep] = useState(1);
    const [resumeText, setResumeText] = useState('');
    const [jdText, setJdText] = useState('');
    const [format, setFormat] = useState<OutputFormat>('bullet');
    const [tone, setTone] = useState<Tone>('professional');

    const { complete, completion, isLoading } = useCompletion({
        api: '/api/generate',
        onError: (error) => {
            console.error(error);
            alert('생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        },
    });

    const handleGenerate = async () => {
        setStep(4);
        await complete('', {
            body: {
                resumeText,
                jdText,
                format,
                tone,
            },
        });
    };

    const handleRestart = () => {
        setStep(1);
        setResumeText('');
        setJdText('');
    };

    const bgClass = isDark ? 'bg-[#0b0f19] text-white' : 'bg-white text-gray-900';
    const borderClass = isDark ? 'border-white/10' : 'border-gray-300';
    const cardBg = isDark ? 'bg-white/5' : 'bg-white';
    const textMuted = isDark ? 'text-gray-400' : 'text-gray-700';

    // Prevent hydration mismatch by rendering nothing on server or initial client render
    if (!mounted) {
        return null;
    }

    return (
        <div className={`min-h-screen flex flex-col relative overflow-hidden ${bgClass} transition-colors duration-300`}>
            {/* Background */}
            <div className={`fixed inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`} />

            {/* Header */}
            <header className={`sticky top-0 z-50 w-full border-b ${borderClass} ${isDark ? 'bg-[#0b0f19]/95' : 'bg-white/95'} backdrop-blur transition-colors`}>
                <div className="container mx-auto flex h-14 items-center justify-between px-4">
                    <div className="flex items-center space-x-2 font-bold text-xl">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CareerFlow</span>
                    </div>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
                <div className="w-full max-w-4xl mx-auto space-y-8">

                    {/* Top Ads Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AdPlaceholder label="HSAD Zine - 마케팅 인사이트" imageSrc="/hsad_main.png" href="https://blog.hsad.co.kr/" isDark={isDark} />
                        <AdPlaceholder label="프리미엄 채용 공고" isDark={isDark} />
                    </div>

                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="space-y-2"
                        >
                            <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? 'bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60' : ''}`}>
                                CareerFlow AI
                            </h1>
                            <p className={`${textMuted} text-lg max-w-xl mx-auto`}>
                                Professional resume optimization powered by advanced AI.
                            </p>
                        </motion.div>

                        {/* Tab Switcher */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex justify-center"
                        >
                            <div className={`${cardBg} backdrop-blur-lg border ${borderClass} p-1 rounded-full inline-flex`}>
                                <button
                                    onClick={() => setActiveTab('create')}
                                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 z-10 ${activeTab === 'create' ? (isDark ? 'text-white' : 'text-blue-700') : `${textMuted} hover:${isDark ? 'text-white' : 'text-gray-900'}`
                                        }`}
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Builder</span>
                                    {activeTab === 'create' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className={`absolute inset-0 ${isDark ? 'bg-white/10' : 'bg-blue-100'} rounded-full border ${borderClass} shadow-sm -z-10`}
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('guide')}
                                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 z-10 ${activeTab === 'guide' ? (isDark ? 'text-white' : 'text-blue-700') : `${textMuted} hover:${isDark ? 'text-white' : 'text-gray-900'}`
                                        }`}
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>Guide</span>
                                    {activeTab === 'guide' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className={`absolute inset-0 ${isDark ? 'bg-white/10' : 'bg-blue-100'} rounded-full border ${borderClass} shadow-sm -z-10`}
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Area */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'create' ? (
                            <motion.div
                                key="create"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="w-full"
                            >
                                <div className={`${cardBg} backdrop-blur-xl border ${borderClass} rounded-2xl p-6 md:p-8 shadow-2xl`}>
                                    {/* Step Indicator */}
                                    <div className="mb-8 flex justify-between items-center text-sm">
                                        <div className={textMuted}>Step {step} of 4</div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((s) => (
                                                <div
                                                    key={s}
                                                    className={`h-1 w-8 rounded-full transition-colors ${s <= step ? 'bg-blue-500' : (isDark ? 'bg-gray-700' : 'bg-gray-300')
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Wizard Steps */}
                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="space-y-2">
                                                    <h2 className="text-2xl font-bold">나의 경력 입력</h2>
                                                    <p className={textMuted}>
                                                        현재 가지고 있는 이력서 내용이나 경력 사항을 자유롭게 입력해주세요.<br />
                                                        줄글, 개조식 상관없이 입력하시면 됩니다.
                                                    </p>
                                                </div>
                                                <textarea
                                                    value={resumeText}
                                                    onChange={(e) => setResumeText(e.target.value)}
                                                    placeholder={`예시:
- 2020.03 ~ 2023.02 OO회사 마케팅팀 대리
- SNS 채널 운영 및 콘텐츠 기획
- 월간 활성 사용자(MAU) 30% 증대 달성
...`}
                                                    className={`w-full min-h-[300px] p-4 rounded-lg border-2 ${borderClass} ${isDark ? 'bg-black/20 text-white placeholder:text-gray-500' : 'bg-white/90 text-black placeholder:text-gray-600'} resize-y text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                                />
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => setStep(2)}
                                                        disabled={!resumeText.trim()}
                                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        다음 단계로
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="space-y-2">
                                                    <h2 className="text-2xl font-bold">목표 직무 설명(JD) 입력</h2>
                                                    <p className={textMuted}>
                                                        지원하려는 공고의 직무 설명을 붙여넣어주세요.
                                                    </p>
                                                </div>
                                                <textarea
                                                    value={jdText}
                                                    onChange={(e) => setJdText(e.target.value)}
                                                    placeholder={`예시:
[자격요건]
- 디지털 마케팅 3년 이상 경험자
- SNS 채널 운영 경험 필수
- 데이터 기반 의사결정 능력
...`}
                                                    className={`w-full min-h-[300px] p-4 rounded-lg border-2 ${borderClass} ${isDark ? 'bg-black/20 text-white placeholder:text-gray-500' : 'bg-white text-black placeholder:text-gray-600'} resize-y text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                                />
                                                <div className="flex justify-between">
                                                    <button
                                                        onClick={() => setStep(1)}
                                                        className={`px-6 py-2 border ${borderClass} rounded-lg hover:${isDark ? 'bg-white/5' : 'bg-gray-100'} transition-colors`}
                                                    >
                                                        이전
                                                    </button>
                                                    <button
                                                        onClick={() => setStep(3)}
                                                        disabled={!jdText.trim()}
                                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        다음 단계로
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="space-y-2">
                                                    <h2 className="text-2xl font-bold">출력 형식 선택</h2>
                                                    <p className={textMuted}>원하는 형식과 톤을 선택해주세요.</p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block mb-2 font-semibold">출력 형식</label>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                            {[
                                                                { value: 'bullet', label: '개조식 이력서', desc: '성과 중심 bullet point' },
                                                                { value: 'interview', label: '면접 Q&A', desc: '예상 질문 + 모범 답변' },
                                                                { value: 'cover_letter', label: '자기소개서', desc: '서사형 자기소개서' }
                                                            ].map((item) => (
                                                                <button
                                                                    key={item.value}
                                                                    onClick={() => setFormat(item.value as OutputFormat)}
                                                                    className={`p-4 rounded-lg border ${borderClass} text-left transition-all ${format === item.value
                                                                        ? 'border-blue-500 bg-blue-500/10'
                                                                        : isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                                                                        }`}
                                                                >
                                                                    <span className="font-semibold block">{item.label}</span>
                                                                    <span className={`text-sm ${textMuted} block`}>{item.desc}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block mb-2 font-semibold">톤 앤 매너</label>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                            {[
                                                                { value: 'professional', label: '🎯 전문적', desc: '간결하고 명확한 표현' },
                                                                { value: 'friendly', label: '😊 친근한', desc: '따뜻하고 인간적인 표현' },
                                                                { value: 'formal', label: '👔 공식적', desc: '격식있고 정중한 표현' }
                                                            ].map((item) => (
                                                                <button
                                                                    key={item.value}
                                                                    onClick={() => setTone(item.value as Tone)}
                                                                    className={`p-4 rounded-lg border ${borderClass} text-left transition-all ${tone === item.value
                                                                        ? 'border-blue-500 bg-blue-500/10'
                                                                        : isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                                                                        }`}
                                                                >
                                                                    <span className="font-semibold block">{item.label}</span>
                                                                    <span className={`text-sm ${textMuted} block`}>{item.desc}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between">
                                                    <button
                                                        onClick={() => setStep(2)}
                                                        className={`px-6 py-2 border ${borderClass} rounded-lg hover:${isDark ? 'bg-white/5' : 'bg-gray-100'} transition-colors`}
                                                    >
                                                        이전
                                                    </button>
                                                    <button
                                                        onClick={handleGenerate}
                                                        disabled={isLoading}
                                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                생성 중...
                                                            </>
                                                        ) : (
                                                            '✨ AI로 생성하기'
                                                        )}
                                                    </button>
                                                </div>
                                                {isLoading && <AdPlaceholder label="로딩 중 광고 (높은 주목도)" className="h-[200px]" isDark={isDark} />}
                                            </motion.div>
                                        )}

                                        {step === 4 && (
                                            <motion.div
                                                key="step4"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="space-y-2">
                                                    <h2 className="text-2xl font-bold">✨ 최적화 완료!</h2>
                                                    <p className={textMuted}>AI가 생성한 결과를 확인하세요.</p>
                                                </div>

                                                <div className={`p-6 rounded-lg border-2 ${borderClass} ${isDark ? 'bg-black/20 text-white' : 'bg-gray-50 text-black'}`}>
                                                    {isLoading ? (
                                                        <div className="flex items-center justify-center py-12">
                                                            <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                                        </div>
                                                    ) : completion ? (
                                                        <div className="whitespace-pre-wrap leading-relaxed">{completion}</div>
                                                    ) : (
                                                        <div className={`text-center py-12 ${textMuted}`}>결과를 기다리는 중...</div>
                                                    )}
                                                </div>

                                                <div className="flex justify-between gap-3">
                                                    <button
                                                        onClick={handleRestart}
                                                        className={`px-6 py-2 border ${borderClass} rounded-lg hover:${isDark ? 'bg-white/5' : 'bg-gray-100'} transition-colors`}
                                                    >
                                                        처음부터 다시
                                                    </button>
                                                    {completion && (
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(completion);
                                                                alert('클립보드에 복사되었습니다!');
                                                            }}
                                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                        >
                                                            📋 결과 복사하기
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="guide"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Guide count={visitorCount} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Ads Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <AdPlaceholder label="직무 교육 추천" isDark={isDark} />
                        <AdPlaceholder label="BrandBrief" imageSrc="/brandbrief.png" href="https://www.brandbrief.co.kr/" isDark={isDark} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className={`border-t ${borderClass} ${isDark ? 'bg-[#0b0f19]/50' : 'bg-gray-50'} backdrop-blur transition-colors`}>
                <div className="container mx-auto py-8 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CareerFlow</h3>
                            <p className={`text-sm ${textMuted} mb-4`}>
                                복잡한 경력 기술을 AI가 직무에 딱 맞게,<br />
                                가장 매력적인 언어로 재설계합니다.
                            </p>
                            <p className={`text-sm ${textMuted}`}>
                                취업컨설팅/강의/광고 문의: docblog@naver.com
                            </p>
                        </div>
                    </div>
                    <div className={`pt-8 border-t ${borderClass} text-center text-sm ${textMuted}`}>
                        © {new Date().getFullYear()} CareerFlow. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
