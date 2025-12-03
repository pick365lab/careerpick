'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { Step1Input } from './steps/Step1Input';
import { Step2JD } from './steps/Step2JD';
import { Step3Options, OutputFormat, Tone } from './steps/Step3Options';
import { Step4Result } from './steps/Step4Result';
import { AnimatePresence } from 'framer-motion';

export function Wizard() {
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
        // Note: We can't easily clear 'completion' from useCompletion without a trigger, 
        // but navigating to step 1 hides it. 
        // When we generate again, it will be overwritten.
    };

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="mb-8 flex justify-between items-center text-sm text-muted-foreground">
                <div>Step {step} of 4</div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4].map((s) => (
                        <div
                            key={s}
                            className={`h-1 w-8 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-muted'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="card min-h-[500px]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <Step1Input
                            key="step1"
                            value={resumeText}
                            onChange={setResumeText}
                            onNext={() => setStep(2)}
                        />
                    )}
                    {step === 2 && (
                        <Step2JD
                            key="step2"
                            value={jdText}
                            onChange={setJdText}
                            onNext={() => setStep(3)}
                            onBack={() => setStep(1)}
                        />
                    )}
                    {step === 3 && (
                        <Step3Options
                            key="step3"
                            format={format}
                            setFormat={setFormat}
                            tone={tone}
                            setTone={setTone}
                            onNext={handleGenerate}
                            onBack={() => setStep(2)}
                            isGenerating={isLoading}
                        />
                    )}
                    {step === 4 && (
                        <Step4Result
                            key="step4"
                            original={resumeText}
                            result={completion}
                            onRestart={handleRestart}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
