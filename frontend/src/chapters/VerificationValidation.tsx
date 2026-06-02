import { useState, type KeyboardEvent } from 'react';

interface FlipCardProps {
    title: string;
    definition: string;
}

const FlipCard = ({ title, definition }: FlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => setIsFlipped((prev) => !prev);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleFlip();
        }
    };

    return (
        /* group class allows child elements to react to parent hover/focus events */
        <div 
            className="group relative w-72 h-48 cursor-pointer [perspective:1000px] outline-none"
            onClick={toggleFlip}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-pressed={isFlipped}
            aria-label={`${title} flashcard.`}
        >
            {/* Tooltip Element */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 scale-95 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded shadow-md whitespace-nowrap">
                Click or press enter to reveal definition
                {/* Tooltip Arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900" />
            </div>

            {/* Card Body */}
            <div 
                className={`relative w-full h-full rounded-lg shadow-md duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
                }`}
            >
                {/* Front Side */}
                <div className="absolute inset-0 flex items-center justify-center p-5 rounded-lg bg-[#619afc] text-white text-2xl font-semibold [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                    <h2>{title}</h2>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 flex items-center justify-center p-5 rounded-lg bg-[#f0f2f5] text-[#333] text-base leading-relaxed [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                    <p>{definition}</p>
                </div>
            </div>
        </div>
    );
};

export default function VerificationValidation() {
    const CARDS = [
        {
            title: "Verification",
            definition: "Verification is the process of evaluating whether a product, service, or system complies with a regulation, requirement, specification, or imposed condition. It's often an internal process."
        },
        {
            title: "Validation",
            definition: "Validation is the process of evaluating whether a product, service, or system meets the needs of the end user or client. It's often an external process."
        }
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-5 bg-transparent text-center">
            <h1 className="mb-10 text-4xl font-bold text-white">Verification & Validation</h1>
            <div className="flex flex-wrap gap-10 justify-center">
                {CARDS.map((card) => (
                    <FlipCard key={card.title} title={card.title} definition={card.definition} />
                ))}
            </div>
        </main>
    );
}
