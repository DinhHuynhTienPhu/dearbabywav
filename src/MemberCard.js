import React from 'react';
 //import classNames from 'classnames';
import './App.css';

function MemberCard( {sourceImage, infos, id, link} ) {
    // Use anchor as wrapper if link is provided
    const Wrapper = link ? 'a' : 'div';
    const wrapperProps = link
        ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <Wrapper className='member-card section-text member-card-link' {...wrapperProps}>
            <div className='member-id'>{id} </div>
            <img src={sourceImage} alt='member' className='member-image' />
            <div className='member-infos'>
                {infos.map((info, index) => (
                    <div className='section-text' key={index}>{info}</div>
                ))}
            </div>
        </Wrapper>
    );
}

export default MemberCard;
