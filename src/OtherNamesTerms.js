import React from 'react';
import classNames from 'classnames';
import './App.css';

function OtherNameTerms() {

    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    OTHER NAMES/TERMS
                </h1>
                <div className='text-and-image-same-row-reverse' style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                    alignSelf: 'center',
                    padding: '5%'
                }}>
                    <span style={{
                        textAlign: 'left',
                    }}>
                        <p className='section-text'>
                            SIGNAL: tripleS youtube playlist. The videos are filmed, edited and upload in
                            the same day. Everyday. (luv u content team)
                        </p>
                        <p className='section-text'>
                           small s and big S: Trainees are called "s," and after becoming official members, they are "S."
                        </p>
                        <p className='section-text'>
                            HAUS: tripleS' dorm.
                        </p>
                        <p className='section-text'>
                            MODHAUS: tripleS' management agency
                        </p>
                        <p className='section-text'>
                            Badge War: Their variety show series
                        </p>
                        <p className='section-text'>
                            Unnie: Older sister
                        </p>

                    </span>
                    <span style={{
                        marginRight: '20px',                        
                    }} >
                        <a href='https://www.youtube.com/watch?v=jn2hiI7rqTA&list=PLtfvnr3voKT2TA3uFFqrrzNdOrfGQKlEs&ab_channel=tripleSofficial'>
                        <img className='hover-scale-up' src='./signal.png' alt='xinyu' style={{
                            width: '25vw',
                                height: 'auto',
                            marginRight:'-10%'
                            }} />
                        </a>
                    </span>
                    
                </div>

            </div>
        </section>
    );
}

export default OtherNameTerms;
