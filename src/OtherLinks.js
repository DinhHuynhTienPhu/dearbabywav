import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';

const LinkCard = ({ image, title, description, url, icon }) => {
    let favicon = undefined;
    try {
        const hostname = new URL(url).hostname;
        favicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (e) {
        // ignore invalid URL
    }
    const iconSrc = icon || favicon;

    const handleImgError = (e) => {
        if (e.currentTarget.dataset.fallbackApplied) return;
        e.currentTarget.dataset.fallbackApplied = 'true';
        e.currentTarget.src = './logo.png';
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card hover-scale-up"
            aria-label={`${title} - external link`}
        >
            <img src={image} alt={title} className="link-image" onError={handleImgError} />
            <div className="link-content">
                <div className="link-title-row">
                    {iconSrc && (
                        <img src={iconSrc} alt={`${title} icon`} className="link-icon" loading="lazy" />
                    )}
                    <div className="link-title" title={title}>{title}</div>
                </div>
                <div className="section-text link-description">{description}</div>
            </div>
        </a>
    );
};

function OtherLinks() {
    const { t } = useTranslation();
    const officialDesc = t('links.officialLinks', { returnObjects: true }) || [];
    const fanmadeDesc = t('links.fanmadeLinks', { returnObjects: true }) || [];

    const officialLinks = [
        {
            image: './linklogos/assemble25.webp',
            title: 'Official Website',
            description: officialDesc[0] || 'tripleS official site with news, schedules, and announcements.',
            url: 'https://www.triplescosmos.com',
        },
        {
            image: './linklogos/youtube.webp',
            title: 'Official YouTube',
            description: officialDesc[1] || 'Music videos, livestreams, and highlights.',
            url: 'https://www.youtube.com/channel/UCJnL-TBcsYrF2SLs7tmiC8Q',
        },
        {
            image: './linklogos/x.webp',
            title: 'Official X/Twitter',
            description: officialDesc[2] || 'Quickest updates and announcements from the official account.',
            url: 'https://x.com/triplescosmos',
        },
        {
            image: './linklogos/ins.webp',
            title: 'Official Instagram',
            description: officialDesc[3] || 'Visual updates, reels, member posts, and more.',
            url: 'https://x.com/triplescosmos',
        },
        {
            image: './linklogos/discord.webp',
            title: 'Official Discord',
            description: officialDesc[4] || 'Join the official community chat server.',
            url: 'https://discord.gg/triplescosmos',
        },
        {
            image: './linklogos/tiktok.webp',
            title: 'Official TikTok',
            description: officialDesc[5] || 'Short videos and fun content from the official account.',
            url: 'https://www.tiktok.com/@triplescosmos',
        },
    ];

    const fanmadeLinks = [
        {
            image: './linklogos/wiki.webp',
            title: 'Fan Wiki',
            description: fanmadeDesc[0] || 'Community-maintained profiles and trivia about members and group.',
            url: 'https://triples.fandom.com/wiki/TripleS',
        },
        {
            image: './linklogos/reddit.webp',
            title: 'Subreddit',
            description: fanmadeDesc[1] || 'Discussions, updates, and memes from fans.',
            url: 'https://www.reddit.com/r/triples',
        },
        {
            image: './linklogos/mangonim.webp',
            title: 'Mangonim Youtube',
            description: fanmadeDesc[2] || 'Translated videos of tripleS, including interviews, variety shows, livestreams.',
            url: 'https://www.youtube.com/@MangoNim./featured',
        },
        {
            image: './linklogos/subsearch.webp',
            title: 'Subsearch',
            description: fanmadeDesc[3] || 'Have you ever wanted to find a specific moment in a video? Now you can!',
            url: 'https://subsearch.pages.dev',
            icon: './logo.png'
        },
        {
            image: './linklogos/database2.webp',
            title: 'Video database',
            description: fanmadeDesc[4] || 'Comprehensive resource for browsing and tracking all video content of tripleS',
            url: 'https://wavsteph.notion.site/tripleS-video-database-080d0d30618040159bd9a01919516d94',
            icon: './logo.png'
        },
        {
            image: './linklogos/guideToTriples.webp',
            title: 'Guide to tripleS',
            description: fanmadeDesc[5] || 'A very detailed google slide guide to tripleS, updated weekly.',
            url: 'https://docs.google.com/presentation/d/1rjc9o6Wm2NLOPuPdMVt0oCXIDIYobVMdVIUmNmcU2rc/edit?slide=id.p#slide=id.p',
            icon: 'https://www.gstatic.com/marketing-cms/assets/images/66/c5/8716b9e44f4d80560a493456e672/google-slides.webp=s96-fcrop64=1,00000000ffffffff-rw'
        },
        {
            image: './linklogos/wavflow.webp',
            title: 'WAVFLOW',
            description: fanmadeDesc[6] || 'Modern, sleek, and user-friendly interface for exploring tripleS content.',
            url: 'https://wavflow.vercel.app/site/wav',
            icon: './logo.png'
        },
        {
            image: './linklogos/doc.webp',
            title: 'TripleS Ultimate Lore',
            description: fanmadeDesc[7] || 'A comprehensive guide to the lore and story of tripleS.',
            url: 'https://docs.google.com/document/d/1GZzprQ51zviXlq5GKWuws5xq9ndmSvS0RhA1sddwwEM/',
            icon: 'https://www.gstatic.com/marketing-cms/assets/images/43/09/e8c725b745a6a588b1f27e51a4a1/google-docs.webp=s96-fcrop64=1,00000000ffffffff-rw',
        },
        {
            image: './linklogos/0105.webp',
            title: 'tripleS 0105',
            description: fanmadeDesc[8] || 'Ever wondered when was their last interaction? Me too',
            url: 'https://triples0105.netlify.app',
            icon: './linklogos/0105logo.webp',
        },
    ];

    return (
        <section className="section">
            <h1 className="section-header">{t('links.title')}</h1>
            <p className="section-text">
                {t('links.subtitle')}
            </p>

            <h2 className="section-header" style={{ fontSize: '2vw' }}>{t('links.official')}</h2>
            <div className="links-grid-container">
                {officialLinks.map((l, idx) => (
                    <div className="links-grid-item" key={`official-${idx}`}>
                        <LinkCard {...l} />
                    </div>
                ))}
            </div>
            <div className='links-grid-divider'>

            </div>

            <h2 className="section-header" style={{ fontSize: '2vw' }}>{t('links.community')}</h2>
            <div className="links-grid-container">
                {fanmadeLinks.map((l, idx) => (
                    <div className="links-grid-item" key={`fan-${idx}`}>
                        <LinkCard {...l} />
                    </div>
                ))}
            </div>
            {/* spacer to ensure content is not hidden behind footer on small viewports */}
            <div aria-hidden="true" className="mobile-spacer" />
        </section>
        
    );
}

export default OtherLinks;
