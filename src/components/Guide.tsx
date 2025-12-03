interface GuideProps {
    count: number;
}

export function Guide({ count }: GuideProps) {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-12">
            {/* Hero */}
            <div className="text-center space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold">
                    당신의 경력은 훌륭합니다.<br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">표현이 부족했을 뿐.</span>
                </h1>
                <p className="text-xl text-gray-400">
                    채용 담당자가 3초 만에 반하는 이력서, AI가 대신 써드립니다.
                </p>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'create' }))}
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-lg"
                >
                    지금 바로 무료로 시작하기
                </button>
                <div className="text-sm text-gray-400">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    오늘 <span className="font-bold">{count.toLocaleString('ko-KR')}</span>명의 지원자가 이 서비스를 통해 서류 합격률을 높였습니다.
                </div>
            </div>

            {/* Guide Steps */}
            <div>
                <h2 className="text-3xl font-bold text-center mb-12">3단계로 끝내는 합격 비결</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                            1
                        </div>
                        <h3 className="text-xl font-semibold">나의 경력 입력</h3>
                        <p className="text-gray-400">
                            줄글이든 개조식이든 상관없습니다.<br />
                            현재 가지고 있는 이력 내용을 넣어주세요.
                        </p>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                            2
                        </div>
                        <h3 className="text-xl font-semibold">목표 직무(JD) 분석</h3>
                        <p className="text-gray-400">
                            지원하려는 공고를 복사해 넣으면<br />
                            AI가 핵심 키워드를 추출합니다.
                        </p>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-blue-500">
                            3
                        </div>
                        <h3 className="text-xl font-semibold">최적화 완료</h3>
                        <p className="text-gray-400">
                            가장 매력적인 언어로 재설계된<br />
                            이력서를 확인하고 복사하세요.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
