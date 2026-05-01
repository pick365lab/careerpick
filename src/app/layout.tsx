import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';

const BASE_URL = 'https://careerpick-ten.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: '커리픽 - AI 무료 이력서/자소서 첨삭 & 최적화',
    description: '막막한 경력 기술서, AI가 3초 만에 정리해 드립니다. 채용 공고(JD) 맞춤형 이력서 최적화, 면접 질문 생성까지 무료로 이용하세요.',
    keywords: '무료 자소서 첨삭, AI 이력서, 경력직 이력서, JD 분석, 자기소개서 예시, 커리픽',
    authors: [{ name: 'pick365lab', url: BASE_URL }],
    robots: { index: true, follow: true },
    openGraph: {
        title: '커리픽 - AI 무료 이력서/자소서 첨삭 & 최적화',
        description: '채용 담당자가 3초 만에 반하는 이력서, AI가 대신 써드립니다.',
        type: 'website',
        url: BASE_URL,
        siteName: '커리픽 (CareerPick)',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: '커리픽 AI 이력서 서비스',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '커리픽 - AI 무료 이력서/자소서 첨삭 & 최적화',
        description: '채용 담당자가 3초 만에 반하는 이력서, AI가 대신 써드립니다.',
        images: ['/og-image.png'],
    },
};

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'pick365lab',
    url: BASE_URL,
    email: 'pick365lab@gmail.com',
    description: 'AI 기반 이력서·자기소개서 생성 서비스 커리픽을 운영합니다.',
    sameAs: ['https://github.com/pick365lab/careerpick'],
};

const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '커리픽 (CareerPick)',
    url: BASE_URL,
    description: '경력과 채용 공고를 입력하면 AI가 맞춤형 이력서·면접 Q&A·자기소개서를 생성해주는 무료 서비스',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
    },
    publisher: {
        '@type': 'Organization',
        name: 'pick365lab',
        email: 'pick365lab@gmail.com',
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
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4894381200517784" crossOrigin="anonymous" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
                />
            </head>
            <body>
                <Providers>{children}</Providers>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-1BKDMP0QGM" strategy="afterInteractive" />
                <Script id="ga4" strategy="afterInteractive">{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-1BKDMP0QGM');
                `}</Script>
            </body>
        </html>
    );
}
