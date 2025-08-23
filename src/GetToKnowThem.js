import React from 'react';
import './App.css';

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
    const steps = [
        {
            title: 'tripleS: thesis ',
            description: 'The first ever video on tripleS youtube channel.',
            icon: './thesis.webp',
            url: 'https://www.youtube.com/watch?v=TVrdkrqpBV4',
        },
        {
            title: 'tripleS on Gura Show',
            description: 'Gura Show EP 12, each member introduces themselves.',
            icon: './gurashow.webp',
            url: 'https://www.youtube.com/watch?v=HaUXySGq2DY',
        },
        {
            title: 'tripleS on weekly idol',
            description: 'Weekly Idol EP 662 tripleS ASSEMBLE24, featuring all members.',
            icon: './weeklyidol.jpg',
            url: 'https://www.youtube.com/watch?v=7fJQAljAMJQ',
        },
        {
            title: 'Explaining ALL 24 tripleS Members Like Its A Sorority',
            description: 'Youtuber Ben Atmos explains each member in detail.',
            icon: './benatmos.webp',
            url: 'https://youtu.be/3yCF8aXzgnI?si=IA9EISdm1eQ4pgWN',
        },
        {
            title: 'Badge War (3 seasons)',
            description: 'A fun competition between members to earn badges.',
            icon: './badgewar.webp',
            url: 'https://www.youtube.com/watch?v=H3Eidd3h4CE&list=PLuuVJzM7See49APBWO33WMLcal8qq8K6O',
        },
        {
            title: 'tripleS Signal',
            description: 'The full journey of tripleS, with 900+ episodes. Or you can skip this and watch the abridged version below.',
            icon: './signal.png',
            url: 'https://www.youtube.com/watch?v=jn2hiI7rqTA&list=PLtfvnr3voKT2TA3uFFqrrzNdOrfGQKlEs',
        },
        {
            title: 'tripleS Signal Abridged',
            description: 'Abridged version of tripleS Signal, focusing on key moments and highlights edited by KIKKU.',
            icon: './signalshort.webp',
            url: 'https://www.youtube.com/watch?v=rbbwTY7AV2Y&list=PLxfQOCAfcvMtiVEXtXrEQDjtwasdIU_kj',
        },
    ];

    return (
        <section className="section">
            <h1 className="section-header">GET TO KNOW THEM</h1>
            <p className="section-text">Scroll the timeline and tap the icons or titles to explore.</p>

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
