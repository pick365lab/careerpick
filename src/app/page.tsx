'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompletion } from 'ai/react';
import { Sparkles, BookOpen, Moon, Sun, Copy, Check, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Guide } from '@/components/Guide';

type OutputFormat = 'bullet' | 'interview' | 'cover_letter';
type Tone = 'professional' | 'friendly' | 'formal';

// ─── 애드센스 컴포넌트 (slot ID 발급 후 교체) ──────────────────
function AdSenseBanner({ className = '' }: { className?: string }) {
    return (
        <div className={`w-full flex items-center justify-center ${className}`}>
            {/* 애드센스 코드 삽입 위치 — publisher ID 설정 후 아래 주석 해제
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true" />
            */}
            <div className="w-full h-[90px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-400">애드센스 광고 (slot 준비 중)</span>
            </div>
        </div>
    );
}

export default function Home() {
    const [activeTab, setActiveTab] = useState<'create' | 'guide'>('create');
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [visitorCount, setVisitorCount] = useState(0);
    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    // 3-step wizard: 1=입력, 2=옵션, 3=결과
    const [step, setStep] = useState(1);
    const [resumeText, setResumeText] = useState('');
    const [jdText, setJdText] = useState('');
    const [format, setFormat] = useState<OutputFormat>('bullet');
    const [tone, setTone] = useState<Tone>('professional');

    const { complete, completion, isLoading } = useCompletion({
        api: '/api/generate',
        onError: () => alert('생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'),
    });

    useEffect(() => {
        setMounted(true);
        fetch('/api/stats')
            .then((r) => r.json())
            .then((d) => setVisitorCount(d.count))
            .catch(() => setVisitorCount(1611));

        const handleSwitchTab = (e: CustomEvent) => {
            if (e.detail === 'create') setActiveTab('create');
        };
        window.addEventListener('switchTab', handleSwitchTab as EventListener);
        return () => window.removeEventListener('switchTab', handleSwitchTab as EventListener);
    }, []);

    const handleGenerate = async () => {
        setStep(3);
        setFeedback(null);
        await complete('', { body: { resumeText, jdText, format, tone } });
    };

    const handleRestart = () => {
        setStep(1);
        setResumeText('');
        setJdText('');
        setCopied(false);
        setFeedback(null);
        setFeedbackText('');
        setFeedbackSubmitted(false);
    };

    const handleFeedbackSubmit = async () => {
        if (!feedback && !feedbackText.trim()) return;
        setFeedbackSubmitted(true);
        await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating: feedback, comment: feedbackText }),
        }).catch(() => {});
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(completion);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // ─── 테마 클래스 ───────────────────────────────────────────
    const bg = isDark ? 'bg-[#0b0f19] text-white' : 'bg-gray-50 text-gray-900';
    const border = isDark ? 'border-white/10' : 'border-gray-200';
    const card = isDark ? 'bg-white/5' : 'bg-white';
    const muted = isDark ? 'text-gray-400' : 'text-gray-500';
    const inputCls = `w-full p-4 rounded-xl border-2 ${border} ${isDark ? 'bg-black/20 text-white placeholder:text-gray-500' : 'bg-white text-gray-900 placeholder:text-gray-400'} resize-y text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`;

    if (!mounted) return null;

    const totalSteps = 3;
    const stepLabels = ['경력 + JD 입력', '출력 옵션', 'AI 결과'];

    return (
        <div className={`min-h-screen flex flex-col relative overflow-hidden ${bg} transition-colors duration-300`}>
            {/* 배경 그라디언트 */}
            <div className={`fixed inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`} />

            {/* ── 헤더 ──────────────────────────────────────────── */}
            <header className={`sticky top-0 z-50 w-full border-b ${border} ${isDark ? 'bg-[#0b0f19]/95' : 'bg-white/95'} backdrop-blur transition-colors`}>
                <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                            커리픽
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-gray-300' : 'bg-blue-50 text-blue-600'}`}>
                            AI 이력서
                        </span>
                    </div>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
                        aria-label="다크모드 전환"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center p-4 md:p-8 relative z-10">
                <div className="w-full max-w-5xl mx-auto space-y-6">

                    {/* ── 상단 광고 (HSAD Zine + 애드센스) ─────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AdPlaceholder
                            label="HSAD Zine - 마케팅 인사이트"
                            imageSrc="/hsad_main.png"
                            href="https://blog.hsad.co.kr/"
                            isDark={isDark}
                        />
                        <AdPlaceholder label="광고 문의" isDark={isDark} />
                    </div>

                    {/* ── 히어로 ────────────────────────────────────── */}
                    <div className="text-center space-y-4 py-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className={`text-3xl md:text-5xl font-bold tracking-tight mb-3 ${isDark ? 'bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent' : ''}`}>
                                당신의 경력은 훌륭합니다.
                            </h1>
                            <p className="text-xl md:text-2xl font-semibold text-blue-500 mb-3">
                                표현만 다듬으면 됩니다.
                            </p>
                            <p className={`text-base ${muted} max-w-xl mx-auto`}>
                                경력과 채용 공고를 붙여넣으면,<br />AI가 30초 안에 맞춤형 이력서·면접 준비·자소서를 만들어드립니다.
                            </p>
                        </motion.div>
                    </div>

                    {/* ── 탭 (Builder / 가이드) ─────────────────────── */}
                    <div className="flex justify-center">
                        <div className={`${card} border ${border} p-1 rounded-full inline-flex backdrop-blur-lg`}>
                            {[
                                { key: 'create', icon: <Sparkles className="w-4 h-4" />, label: '이력서 만들기' },
                                { key: 'guide',  icon: <BookOpen  className="w-4 h-4" />, label: '작성 가이드' },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as 'create' | 'guide')}
                                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                                        activeTab === tab.key
                                            ? isDark ? 'text-white' : 'text-blue-700'
                                            : muted
                                    }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                    {activeTab === tab.key && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className={`absolute inset-0 ${isDark ? 'bg-white/10' : 'bg-blue-100'} rounded-full border ${border} shadow-sm -z-10`}
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── 메인 콘텐츠 ──────────────────────────────── */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'create' ? (
                            <motion.div
                                key="create"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className={`${card} border ${border} rounded-2xl p-6 md:p-8 shadow-xl`}>

                                    {/* 단계 표시 */}
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {stepLabels.map((label, i) => {
                                                const s = i + 1;
                                                const active = s === step;
                                                const done = s < step;
                                                return (
                                                    <div key={s} className="flex items-center gap-1">
                                                        <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                                                            done   ? 'bg-blue-500 text-white' :
                                                            active ? 'bg-blue-500 text-white ring-4 ring-blue-500/20' :
                                                                     isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-500'
                                                        }`}>{done ? '✓' : s}</div>
                                                        <span className={`text-xs hidden sm:inline ${active ? (isDark ? 'text-white' : 'text-gray-800') : muted}`}>
                                                            {label}
                                                        </span>
                                                        {s < totalSteps && <div className={`w-6 h-px ${s < step ? 'bg-blue-500' : isDark ? 'bg-white/20' : 'bg-gray-200'}`} />}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <span className={`text-xs ${muted}`}>{step}/{totalSteps}</span>
                                    </div>

                                    <AnimatePresence mode="wait">

                                        {/* ═══ STEP 1: 경력 + JD 동시 입력 ═══ */}
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <h2 className="text-xl font-bold mb-1">경력 정보와 채용 공고 입력</h2>
                                                    <p className={`text-sm ${muted}`}>두 항목을 모두 입력하면 AI가 채용 공고에 딱 맞는 문서를 만들어 드립니다.</p>
                                                </div>

                                                {/* ─ 2-column 입력 ─ */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    {/* 왼쪽: 내 경력 */}
                                                    <div className="space-y-2">
                                                        <label className="font-semibold text-sm flex items-center gap-1">
                                                            <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                                                            내 경력 · 이력서
                                                        </label>
                                                        <textarea
                                                            value={resumeText}
                                                            onChange={(e) => setResumeText(e.target.value)}
                                                            placeholder={`현재 경력 또는 이력서 내용을 자유롭게 붙여넣으세요.\n\n예시)\n- 2021.03 ~ 2024.02 OO회사 마케팅팀 대리\n- SNS 채널 운영 및 콘텐츠 기획\n- 월간 활성 사용자(MAU) 30% 증가 달성`}
                                                            className={`${inputCls} min-h-[280px]`}
                                                        />
                                                        <p className={`text-xs ${muted}`}>줄글·개조식·복붙 모두 OK</p>
                                                    </div>

                                                    {/* 오른쪽: JD */}
                                                    <div className="space-y-2">
                                                        <label className="font-semibold text-sm flex items-center gap-1">
                                                            <span className="w-5 h-5 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                                                            지원할 채용 공고 (JD)
                                                        </label>
                                                        <textarea
                                                            value={jdText}
                                                            onChange={(e) => setJdText(e.target.value)}
                                                            placeholder={`지원하려는 채용 공고의 주요 업무·자격요건을 붙여넣으세요.\n\n예시)\n[주요 업무]\n- 디지털 마케팅 기획 및 운영\n- 데이터 기반 성과 분석\n\n[자격요건]\n- 3년 이상 마케팅 경력\n- SQL 사용 가능자 우대`}
                                                            className={`${inputCls} min-h-[280px]`}
                                                        />
                                                        <p className={`text-xs ${muted}`}>공고 URL보다 텍스트 복붙이 정확합니다</p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => setStep(2)}
                                                        disabled={!resumeText.trim() || !jdText.trim()}
                                                        className="px-7 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                                    >
                                                        다음 단계
                                                        <span>→</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* ═══ STEP 2: 출력 옵션 ═══ */}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-8"
                                            >
                                                <div>
                                                    <h2 className="text-xl font-bold mb-1">출력 형식과 톤 선택</h2>
                                                    <p className={`text-sm ${muted}`}>어떤 형태의 문서가 필요하신가요?</p>
                                                </div>

                                                {/* 출력 형식 */}
                                                <div className="space-y-3">
                                                    <p className="font-semibold text-sm">📄 결과물 형식</p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        {[
                                                            { v: 'bullet',       icon: '📝', label: '개조식 이력서',   desc: 'JD 맞춤 bullet point 경력 기술서' },
                                                            { v: 'interview',    icon: '🎤', label: '면접 Q&A',       desc: 'STAR 기법 예상 질문 5개 + 모범 답변' },
                                                            { v: 'cover_letter', icon: '✉️', label: '자기소개서',     desc: '서사형 자소서 — 바로 복붙 가능' },
                                                        ].map(({ v, icon, label, desc }) => (
                                                            <button
                                                                key={v}
                                                                onClick={() => setFormat(v as OutputFormat)}
                                                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                                                    format === v
                                                                        ? 'border-blue-500 bg-blue-500/10'
                                                                        : `${border} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`
                                                                }`}
                                                            >
                                                                <span className="text-xl">{icon}</span>
                                                                <p className="font-bold mt-2 text-sm">{label}</p>
                                                                <p className={`text-xs mt-1 ${muted}`}>{desc}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* 톤 선택 */}
                                                <div className="space-y-3">
                                                    <p className="font-semibold text-sm">🎨 톤 앤 매너</p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        {[
                                                            { v: 'professional', icon: '🎯', label: '전문적',   desc: '간결하고 성과 중심' },
                                                            { v: 'friendly',     icon: '😊', label: '친근한',   desc: '따뜻하고 인간적인 표현' },
                                                            { v: 'formal',       icon: '👔', label: '공식적',   desc: '격식 있고 정중한 표현' },
                                                        ].map(({ v, icon, label, desc }) => (
                                                            <button
                                                                key={v}
                                                                onClick={() => setTone(v as Tone)}
                                                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                                                    tone === v
                                                                        ? 'border-violet-500 bg-violet-500/10'
                                                                        : `${border} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`
                                                                }`}
                                                            >
                                                                <span className="text-xl">{icon}</span>
                                                                <p className="font-bold mt-2 text-sm">{label}</p>
                                                                <p className={`text-xs mt-1 ${muted}`}>{desc}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between gap-3">
                                                    <button
                                                        onClick={() => setStep(1)}
                                                        className={`px-5 py-2.5 border-2 ${border} rounded-xl font-medium transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
                                                    >
                                                        ← 이전
                                                    </button>
                                                    <button
                                                        onClick={handleGenerate}
                                                        disabled={isLoading}
                                                        className="px-7 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                생성 중...
                                                            </>
                                                        ) : (
                                                            <>✨ AI로 만들기</>
                                                        )}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* ═══ STEP 3: 결과 ═══ */}
                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h2 className="text-xl font-bold">
                                                            {isLoading ? '✨ AI가 작성 중입니다...' : '✅ 완성되었습니다!'}
                                                        </h2>
                                                        <p className={`text-sm ${muted} mt-0.5`}>
                                                            {isLoading ? '잠시만 기다려주세요 (약 10~30초)' : '결과를 복사하여 바로 사용하세요'}
                                                        </p>
                                                    </div>
                                                    {!isLoading && completion && (
                                                        <button
                                                            onClick={handleCopy}
                                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                                copied
                                                                    ? 'bg-green-500 text-white'
                                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                            }`}
                                                        >
                                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                            {copied ? '복사됨!' : '전체 복사'}
                                                        </button>
                                                    )}
                                                </div>

                                                {/* 결과 박스 */}
                                                <div className={`rounded-xl border-2 ${isLoading ? border : 'border-blue-500/30'} ${isDark ? 'bg-black/20' : 'bg-blue-50/30'} min-h-[320px] p-5 relative`}>
                                                    {isLoading && !completion ? (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                                            <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                                            <p className={`text-sm ${muted}`}>AI가 분석 중입니다...</p>
                                                        </div>
                                                    ) : (
                                                        <div className="whitespace-pre-wrap leading-relaxed text-sm">{completion}</div>
                                                    )}
                                                </div>

                                                {/* 생성 중 인피드 광고 */}
                                                {isLoading && (
                                                    <AdPlaceholder label="광고" isDark={isDark} className="h-[90px]" />
                                                )}

                                                {/* 피드백 */}
                                                {!isLoading && completion && (
                                                    <div className={`rounded-xl border ${border} ${isDark ? 'bg-white/3' : 'bg-gray-50'} p-5 space-y-4`}>
                                                        {feedbackSubmitted ? (
                                                            <p className={`text-sm text-center ${muted}`}>
                                                                의견 감사합니다! 더 좋은 서비스로 보답할게요.
                                                            </p>
                                                        ) : (
                                                            <>
                                                                <div>
                                                                    <p className="text-sm font-medium">개선할 점이 있다면 알려주세요</p>
                                                                    <p className={`text-xs ${muted} mt-0.5`}>짧은 한 마디도 커리픽을 만드는 데 큰 힘이 됩니다.</p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    {[
                                                                        { type: 'like' as const,    icon: <ThumbsUp className="w-4 h-4" />,   label: '도움됐어요', active: 'bg-green-500 text-white border-green-500' },
                                                                        { type: 'dislike' as const, icon: <ThumbsDown className="w-4 h-4" />, label: '아쉬워요',   active: 'bg-red-400 text-white border-red-400' },
                                                                    ].map(({ type, icon, label, active }) => (
                                                                        <button
                                                                            key={type}
                                                                            onClick={() => setFeedback(prev => prev === type ? null : type)}
                                                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-medium transition-all ${
                                                                                feedback === type
                                                                                    ? active
                                                                                    : `${border} ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`
                                                                            }`}
                                                                        >
                                                                            {icon}{label}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                                <textarea
                                                                    value={feedbackText}
                                                                    onChange={(e) => setFeedbackText(e.target.value)}
                                                                    placeholder="결과물 품질, 불편한 점, 추가됐으면 하는 기능 등 자유롭게 남겨주세요."
                                                                    rows={3}
                                                                    className={`w-full p-3 rounded-lg border ${border} ${isDark ? 'bg-black/20 text-white placeholder:text-gray-500' : 'bg-white text-gray-900 placeholder:text-gray-400'} text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                                                                />
                                                                <div className="flex justify-end">
                                                                    <button
                                                                        onClick={handleFeedbackSubmit}
                                                                        disabled={!feedback && !feedbackText.trim()}
                                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                                    >
                                                                        의견 남기기
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                )}

                                                {/* 하단 버튼 */}
                                                <div className="flex justify-between gap-3">
                                                    <button
                                                        onClick={handleRestart}
                                                        className={`flex items-center gap-2 px-5 py-2.5 border-2 ${border} rounded-xl font-medium transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
                                                    >
                                                        <RotateCcw className="w-4 h-4" />
                                                        처음부터 다시
                                                    </button>
                                                    {!isLoading && completion && (
                                                        <button
                                                            onClick={() => setStep(2)}
                                                            className={`px-5 py-2.5 border-2 ${border} rounded-xl font-medium transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
                                                        >
                                                            형식 바꿔서 재생성
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
                                transition={{ duration: 0.35 }}
                            >
                                <Guide count={visitorCount} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── 하단 광고 (BrandBrief + 애드센스) ────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <AdPlaceholder
                            label="BrandBrief"
                            imageSrc="/brandbrief.png"
                            href="https://www.brandbrief.co.kr/"
                            isDark={isDark}
                        />
                        <AdPlaceholder label="광고 문의" isDark={isDark} />
                    </div>

                    {/* ── 애드센스 배너 (하단) ─────────────────────── */}
                    <AdSenseBanner className="mt-2" />

                </div>
            </main>

            {/* ── 푸터 ──────────────────────────────────────────── */}
            <footer className={`border-t ${border} ${isDark ? 'bg-[#0b0f19]/50' : 'bg-white'} mt-4 transition-colors`}>
                <div className="max-w-5xl mx-auto py-10 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-base font-bold mb-2 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                                커리픽 (CareerPick)
                            </h3>
                            <p className={`text-sm ${muted} leading-relaxed`}>
                                경력과 채용 공고를 붙여넣으면<br />
                                AI가 맞춤형 이력서를 완성합니다.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold mb-2">이용 안내</p>
                            <ul className={`text-sm ${muted} space-y-1`}>
                                <li>• 완전 무료로 이용할 수 있습니다</li>
                                <li>• 입력 정보는 저장되지 않습니다</li>
                                <li>• AI 생성 결과는 참고용입니다</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-semibold mb-2">문의 · 광고</p>
                            <p className={`text-sm ${muted}`}>pick365lab@gmail.com</p>
                            <p className={`text-xs ${muted} mt-2 leading-relaxed`}>
                                광고 게재, 취업 컨설팅 연계,<br />
                                제휴 문의 환영합니다.
                            </p>
                        </div>
                    </div>
                    <div className={`pt-6 border-t ${border} flex flex-col sm:flex-row items-center justify-between gap-2 text-xs ${muted}`}>
                        <span>© {new Date().getFullYear()} 커리픽 (CareerPick) · pick365lab. All rights reserved.</span>
                        <div className="flex gap-4">
                            <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>
                            <Link href="/terms" className="hover:underline">이용약관</Link>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}
