import React from 'react';
 //import classNames from 'classnames';
import './App.css';
import { trackClick } from './analytics.js';

// Info text in translation files supports 2 small markups:
//   <s>text</s>  -> strikethrough
//   [text](url)  -> link. Rendered as a clickable span because the whole card is already an <a> (nested <a> is invalid HTML)
function renderInfo(info) {
    const parts = info.split(/(<s>.+?<\/s>|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
        const strike = part.match(/^<s>(.+)<\/s>$/);
        if (strike) return <s key={i}>{strike[1]}</s>;

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
            const open = (e) => {
                // keep the card's own wiki link from firing
                e.preventDefault();
                e.stopPropagation();
                trackClick('member link: ' + link[2]);
                window.open(link[2], '_blank', 'noopener,noreferrer');
            };
            return (
                <span key={i} className='member-info-link' role='link' tabIndex={0}
                    onClick={open} onKeyDown={(e) => { if (e.key === 'Enter') open(e); }}>
                    {link[1]}
                </span>
            );
        }
        return part;
    });
}

function MemberCard( {sourceImage, infos, id, link} ) {
    // Use anchor as wrapper if link is provided
    const Wrapper = link ? 'a' : 'div';
    const wrapperProps = link
        ? { href: link, target: '_blank', rel: 'noopener noreferrer', onClick: () => trackClick('member: S' + id) }
        : {};

    return (
        <Wrapper className='member-card section-text member-card-link' {...wrapperProps}>
            <div className='member-id'>{id} </div>
            {/* width/height = real image size (600x927), only used to reserve the space before the lazy image loads */}
            <img src={sourceImage} alt='member' className='member-image' loading='lazy' decoding='async' width={600} height={927} />
            <div className='member-infos'>
                {infos.map((info, index) => (
                    <div className='section-text' key={index}>{renderInfo(info)}</div>
                ))}
            </div>
        </Wrapper>
    );
}

export default MemberCard;
