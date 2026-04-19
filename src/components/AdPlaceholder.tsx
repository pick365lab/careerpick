import React from 'react';

interface AdPlaceholderProps {
    label: string;
    className?: string;
    imageSrc?: string;
    href?: string;
    isDark?: boolean;
}

export const AdPlaceholder = ({ label, className, imageSrc, href, isDark = false }: AdPlaceholderProps) => {
    const textMuted = isDark ? 'text-gray-400' : 'text-gray-700';

    const content = (
        <div className={`w-full h-[100px] relative overflow-hidden flex flex-col items-center justify-center border-2 border-dashed ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-100'} rounded-lg ${className}`}>
            {imageSrc ? (
                <>
                    <img src={imageSrc} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-white font-bold text-lg drop-shadow-md">{label}</span>
                    </div>
                </>
            ) : (
                <>
                    <span className={`text-sm font-semibold ${textMuted}`}>광고 문의</span>
                    <span className="text-xs text-gray-500">pick365lab@gmail.com</span>
                </>
            )}
        </div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full transition-transform hover:scale-[1.02]">
                {content}
            </a>
        );
    }

    return content;
};
