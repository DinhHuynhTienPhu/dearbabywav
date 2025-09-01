import React from 'react';
 //import classNames from 'classnames';
import './App.css';
import { useTranslation } from 'react-i18next';

function OtherNameTerms() {
    const { t } = useTranslation();

    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    {t('terms.title')}
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
                            <a href='https://triples.fandom.com/wiki/TripleS#Name_Meaning'> tripleS</a>: {t('terms.triples')}
                        </p>
                        
                        <p className='section-text'>
                            <a href='https://triples.fandom.com/wiki/WAV'>WAV </a>: {t('terms.wav')}
                            </p>
                        <p className='section-text'>
                            <a href='https://www.youtube.com/watch?v=jn2hiI7rqTA&list=PLtfvnr3voKT2TA3uFFqrrzNdOrfGQKlEs&ab_channel=tripleSofficial'> SIGNAL</a>: {t('terms.signal')}
                        </p>
                        <p className='section-text'>
                           {t('terms.smallbig')}
                        </p>
                        <p className='section-text'>
                            {t('terms.haus')}
                        </p>
                        <p className='section-text'>
                            {t('terms.modhaus')}
                        </p>
                        <p className='section-text'>
                            {t('terms.badgewar')}
                        </p>
                        <p className='section-text'>
                            {t('terms.unnie')}
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
