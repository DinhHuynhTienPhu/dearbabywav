import React from 'react';
import classNames from 'classnames';
import './App.css';

function MemberCard( {sourceImage, infos} ) {

    return (
        <div className='member-card' style={{
            width: '300px',
            height: '400px',
        }}>
            <img src={sourceImage} alt='member' className='member-image' />
            <ul className='member-infos'>
                {infos.map((info, index) => (
                    <li key={index}>{info}</li>
                ))}
            </ul>
        </div>
    );
}

export default MemberCard;
