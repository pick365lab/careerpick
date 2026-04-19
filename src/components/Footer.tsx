export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background/50 backdrop-blur">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CareerFlow</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            복잡한 경력 기술을 AI가 직무에 딱 맞게,<br />
                            가장 매력적인 언어로 재설계합니다.
                        </p>
                        <p className="text-sm text-gray-400">
                            문의: pick365lab@gmail.com
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} CareerFlow. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
