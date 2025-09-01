import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';

function AboutTheSystem() {
    const { t } = useTranslation();

    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    {t('system.title')}
                </h1>
                <p className='section-text'>
                    {t('system.lead')}
                </p>
                <div className='section-text-container' style={{
                    //aglign the childs horizontally
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>

                
                <p className='section-text'>
                    {t('system.objekt')}
                </p>
                <p className='section-text'>
                    {t('system.como')}
                </p>
                <p className='section-text'>
                    {t('system.dimension')}
                </p>
                <p className='section-text'>
                    {t('system.gravity')}
                </p>
                </div>
                <div className='text-and-image-same-row' style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                    alignSelf: 'center',
                    padding:'5%'
                }}>
                    <span style={{
                        marginRight: '20px',
                    }} >
                        <a href='https://triples.fandom.com/wiki/Objekt'>
                            <img className='hover-scale-up'  src='./xinyu.webp' alt='xinyu' style={{
                            width: '20vw',
                            height: 'auto',
                            }} />
                            <div className='section-text'>{t('system.img.caption')}</div>
                        </a>
                    </span>
                    <span style={{
                        textAlign: 'left',
                    }}>
                        <p className='section-text'>
                            {t('system.body1')}
                        </p>
                        <p className='section-text'>
                            {t('system.body2')}
                        </p>
                        <p className='section-text'>
                            {t('system.body3')}
                        </p>
                    </span>
                </div>
            </div>
        </section>
    );
}

export default AboutTheSystem;
