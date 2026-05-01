import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '이용약관 | 커리픽',
    description: '커리픽(CareerPick) 서비스의 이용약관입니다.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        ← 커리픽으로 돌아가기
                    </Link>
                </div>
                <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">이용약관</h1>
                        <p className="text-sm text-gray-500">최종 업데이트: 2026년 5월 1일</p>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        커리픽(CareerPick) 서비스(이하 "서비스")를 이용하기 전에 아래 약관을 읽어 주세요.
                        서비스를 이용하시면 본 약관에 동의한 것으로 간주합니다.
                    </p>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">1. 서비스 소개</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            커리픽은 pick365lab이 운영하는 무료 AI 이력서·자기소개서·면접 Q&A 생성 서비스입니다.
                            이용자가 입력한 경력 정보와 채용 공고를 바탕으로 AI가 맞춤형 문서를 생성합니다.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">2. 이용 조건</h2>
                        <ul className="text-sm text-gray-600 space-y-2 leading-relaxed list-disc list-inside">
                            <li>본 서비스는 개인적, 비상업적 취업 준비 목적으로만 사용할 수 있습니다.</li>
                            <li>타인의 개인정보를 무단으로 입력하는 행위를 금지합니다.</li>
                            <li>서비스를 통해 생성된 결과물을 허위·사기 목적으로 사용하는 행위를 금지합니다.</li>
                            <li>서비스의 자동화된 대량 요청(봇 등)을 금지합니다.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">3. AI 생성 결과물</h2>
                        <ul className="text-sm text-gray-600 space-y-2 leading-relaxed list-disc list-inside">
                            <li>AI가 생성하는 결과물은 참고용이며, 정확성을 보장하지 않습니다.</li>
                            <li>최종 제출 전 반드시 내용을 검토하고 수정하시기 바랍니다.</li>
                            <li>생성된 결과물의 저작권은 이용자에게 귀속됩니다.</li>
                            <li>회사는 AI 결과물 사용으로 인한 불이익에 대해 책임을 지지 않습니다.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">4. 서비스 제공 및 변경</h2>
                        <ul className="text-sm text-gray-600 space-y-2 leading-relaxed list-disc list-inside">
                            <li>서비스는 무료로 제공되며, 사전 예고 없이 기능이 변경되거나 중단될 수 있습니다.</li>
                            <li>서버 점검, AI 모델 교체 등으로 일시적으로 서비스가 중단될 수 있습니다.</li>
                            <li>서비스 중단으로 인한 손해에 대해 회사는 책임을 지지 않습니다.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">5. 광고</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            서비스는 무료 운영을 위해 Google AdSense 및 직접 광고를 게재합니다.
                            광고 콘텐츠는 회사가 통제하지 않으며, 광고를 통해 이동하는 외부 사이트에 대해
                            회사는 책임을 지지 않습니다.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">6. 면책 조항</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            커리픽은 "있는 그대로(as-is)" 제공됩니다. 회사는 서비스의 중단, 오류,
                            생성 결과물의 품질, 취업 결과 등에 대해 명시적·묵시적 보증을 하지 않습니다.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">7. 준거법</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            본 약관은 대한민국 법률에 따라 해석되며, 분쟁 발생 시 관할 법원은 서울중앙지방법원으로 합니다.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">8. 문의</h2>
                        <div className="text-sm text-gray-600 leading-relaxed">
                            <p className="font-medium text-gray-800">pick365lab</p>
                            <p>
                                이메일:{' '}
                                <a href="mailto:pick365lab@gmail.com" className="text-blue-600 hover:underline">
                                    pick365lab@gmail.com
                                </a>
                            </p>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
}
