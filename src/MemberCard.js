import React from 'react';
import classNames from 'classnames';
import './App.css';

function MemberCard( {sourceImage, infos} ) {

    return (
        <div className='member-card' >
            <img src={sourceImage} alt='member' className='member-image' />
            <div className='member-infos'>
                {infos.map((info, index) => (
                    <div className='section-text' key={index}>{info}</div>
                ))}
            </div>
        </div>
    );
}

export default MemberCard;
