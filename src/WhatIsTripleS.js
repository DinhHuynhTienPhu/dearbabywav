import React from 'react';
import classNames from 'classnames';
import './App.css';

function WhatIsTripleS() {

    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    WHAT IS TRIPLES
                </h1>
                <img src='./logo.png' alt='tripleS' className='section-image' style={{
                    width: '200px',
                    height: '200px',
                }} />
                <p className='section-text'>
                    tripleS is a 24-member K-pop girl group.
                    Each member is numbered from S1 to S24, in order of their reveal date.
                    Aiming to be the first decentralized idol group, tripleS has a voting system where their fans
                    (WAV) can participate in the group’s units, concepts, and songs.

                </p>

            </div>
        </section>
    );
}

export default WhatIsTripleS;
