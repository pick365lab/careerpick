import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
    metadataBase: new URL('https://careerpick.vercel.app'),
    title: '커리픽 - AI 무료 이력서/자소서 첨삭 & 최적화',
    description: '막막한 경력 기술서, AI가 3초 만에 정리해 드립니다. 채용 공고(JD) 맞춤형 이력서 최적화, 면접 질문 생성까지 무료로 이용하세요.',
    keywords: '무료 자소서 첨삭, AI 이력서, 경력직 이력서, JD 분석, 자기소개서 예시, 커리픽',
    openGraph: {
        title: '커리픽 - AI 무료 이력서/자소서 첨삭 & 최적화',
        description: '채용 담당자가 3초 만에 반하는 이력서, AI가 대신 써드립니다.',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: '커리픽 AI 이력서 서비스',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
