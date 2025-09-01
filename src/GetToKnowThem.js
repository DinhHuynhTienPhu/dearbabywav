import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';

const Step = ({ step, active, side, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        if (step.url) {
            window.open(step.url, '_blank', 'noopener,noreferrer');
        } else if (onClick) {
            onClick(step);
        }
    };

    const Content = (
        <div className="gk-content">
            {step.url ? (
                <a
                    className="gk-title gk-title-link"
                    href={step.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {step.title}
                </a>
            ) : (
                <button className="gk-title gk-title-btn" onClick={handleClick}>
                    {step.title}
                </button>
            )}
            {step.description && <div className="gk-desc">{step.description}</div>}
        </div>
    );

    return (
        <div className={`gk-step ${active ? 'active' : ''}`}>
            <div className="gk-side gk-left">{side === 'left' ? Content : null}</div>
            <div className="gk-center">
                <button className="gk-icon-btn" onClick={handleClick} aria-label={step.title}>
                    <img className="gk-icon" src={step.icon || './logo.png'} alt="" />
                </button>
            </div>
            <div className="gk-side gk-right">{side === 'right' ? Content : null}</div>
        </div>
    );
};

function GetToKnowThem() {
    const { t } = useTranslation();
    const stepsBase = [
        { icon: './thesis.webp', url: 'https://www.youtube.com/watch?v=TVrdkrqpBV4' },
        { icon: './gurashow.webp', url: 'https://www.youtube.com/watch?v=HaUXySGq2DY' },
        { icon: './weeklyidol.jpg', url: 'https://www.youtube.com/watch?v=7fJQAljAMJQ' },
        { icon: './benatmos.webp', url: 'https://youtu.be/3yCF8aXzgnI?si=IA9EISdm1eQ4pgWN' },
        { icon: './badgewar.webp', url: 'https://www.youtube.com/watch?v=H3Eidd3h4CE&list=PLuuVJzM7See49APBWO33WMLcal8qq8K6O' },
        { icon: './signal.png', url: 'https://www.youtube.com/watch?v=jn2hiI7rqTA&list=PLtfvnr3voKT2TA3uFFqrrzNdOrfGQKlEs' },
        { icon: './signalshort.webp', url: 'https://www.youtube.com/watch?v=rbbwTY7AV2Y&list=PLxfQOCAfcvMtiVEXtXrEQDjtwasdIU_kj' },
    ];
    const stepTexts = t('know.steps', { returnObjects: true }) || [];
    const steps = stepsBase.map((s, idx) => ({
        ...s,
        title: stepTexts[idx]?.title || '',
        description: stepTexts[idx]?.desc || ''
    }));

    return (
        <section className="section">
            <h1 className="section-header">{t('know.title')}</h1>
            <p className="section-text">{t('know.subtitle')}</p>

            <div className="gk-wrapper">
                <div className="gk-track" aria-hidden="true" />
                <div className="gk-progress" style={{ height: '100%' }} aria-hidden="true" />
                <div className="gk-steps">
                    {steps.map((s, idx) => (
                        <Step key={idx} step={s} active={true} side={idx % 2 === 0 ? 'left' : 'right'} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GetToKnowThem;
