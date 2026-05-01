import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '개인정보처리방침 | 커리픽',
    description: '커리픽(CareerPick) 서비스의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
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
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">개인정보처리방침</h1>
                        <p className="text-sm text-gray-500">최종 업데이트: 2026년 5월 1일</p>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        pick365lab(이하 "회사")은 커리픽(CareerPick) 서비스(이하 "서비스") 운영과 관련하여
                        이용자의 개인정보를 소중히 보호합니다. 본 방침은 어떤 정보를 수집하고 어떻게 사용하는지
                        설명합니다.
                    </p>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">1. 수집하는 정보</h2>
                        <ul className="text-sm text-gray-600 space-y-2 leading-relaxed list-disc list-inside">
                            <li>
                                <strong>입력 데이터:</strong> 이력서 텍스트, 채용 공고(JD) 텍스트 — AI 결과 생성 후
                                서버에 저장되지 않습니다.
                            </li>
                            <li>
                                <strong>이용 통계:</strong> 방문 횟수, 생성 횟수(익명 집계, 개인 식별 불가)
                            </li>
                            <li>
                                <strong>피드백:</strong> 이용자가 직접 제출한 텍스트 의견 및 좋아요/아쉬워요 평가
                            </li>
                            <li>
                                <strong>자동 수집 정보:</strong> Google Analytics 4를 통한 페이지 방문 기록, 브라우저
                                정보, 접속 국가(IP 기반, 익명화)
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">2. 정보 이용 목적</h2>
                        <ul className="text-sm text-gray-600 space-y-2 leading-relaxed list-disc list-inside">
                            <li>AI 맞춤형 이력서·자기소개서·면접 Q&A 생성 (처리 후 즉시 폐기)</li>
                            <li>서비스 품질 개선 및 통계 분석</li>
                            <li>광고 게재 (Google AdSense 등 제3자 광고 서비스)</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">3. 제3자 서비스</h2>
                        <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                            <p>서비스는 다음 제3자 도구를 사용합니다:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>Google Analytics 4:</strong> 방문 통계 수집</li>
                                <li><strong>Google AdSense:</strong> 광고 게재 (쿠키 사용 가능)</li>
                                <li><strong>Google Gemini API:</strong> AI 텍스트 생성 (입력값 전달, Google 정책 적용)</li>
                                <li><strong>Supabase:</strong> 익명 통계 및 피드백 저장</li>
                                <li><strong>Vercel:</strong> 서버 호스팅</li>
                            </ul>
                            <p className="mt-2">
                                각 서비스의 개인정보 처리는 해당 서비스의 정책을 따릅니다.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">4. 쿠키</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            서비스는 자체 쿠키를 사용하지 않습니다. 단, Google Analytics 및 Google AdSense가
                            광고 효율 측정 및 개인화 목적으로 쿠키를 사용할 수 있습니다. 브라우저 설정에서
                            쿠키를 비활성화할 수 있습니다.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">5. 데이터 보유 기간</h2>
                        <ul className="text-sm text-gray-600 space-y-1 leading-relaxed list-disc list-inside">
                            <li>이력서·JD 입력 데이터: AI 생성 처리 즉시 삭제 (서버 저장 없음)</li>
                            <li>익명 통계 데이터: 서비스 운영 기간 동안 보관</li>
                            <li>피드백 데이터: 개선 목적으로 보관, 요청 시 삭제</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">6. 이용자 권리</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            이용자는 언제든지 개인정보 열람·수정·삭제를 요청할 수 있습니다.
                            단, 서비스 특성상 입력 데이터는 서버에 저장되지 않아 별도 삭제 요청이 불필요합니다.
                            피드백 데이터 삭제를 원하시면 아래 이메일로 문의해 주세요.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">7. 문의</h2>
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

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-900">8. 방침 변경</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            방침이 변경될 경우 이 페이지에 업데이트 날짜와 함께 공지합니다.
                            중요한 변경 사항은 서비스 화면에 별도 안내합니다.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
