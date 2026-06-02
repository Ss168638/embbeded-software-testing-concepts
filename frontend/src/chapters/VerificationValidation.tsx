import { useState } from 'react';
import './VerificationValidation.css';

interface FlipCardProps {
    title: string;
    definition: string;
}

const FlipCard = ({ title, definition }: FlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flip-card-container" onClick={handleFlip}>
            <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                    <h2>{title}</h2>
                </div>
                <div className="flip-card-back">
                    <p>{definition}</p>
                </div>
            </div>
        </div>
    );
};

export default function VerificationValidation() {
    const verificationDefinition = "Verification is the process of evaluating whether a product, service, or system complies with a regulation, requirement, specification, or imposed condition. It's often an internal process.";
    const validationDefinition = "Validation is the process of evaluating whether a product, service, or system meets the needs of the end user or client. It's often an external process.";

    return (
        <div className="verification-validation-page">
            <h1>Verification & Validation</h1>
            <div className="card-grid">
                <FlipCard title="Verification" definition={verificationDefinition} />
                <FlipCard title="Validation" definition={validationDefinition} />
            </div>
        </div>
    );
}
