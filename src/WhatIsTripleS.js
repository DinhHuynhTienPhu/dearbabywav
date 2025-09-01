import React from 'react';
 //import classNames from 'classnames';
import './App.css';
import { useTranslation } from 'react-i18next';

function WhatIsTripleS() {
    const { t } = useTranslation();

    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    {t('whatIs.title')}
                </h1>
                <img src='./logo.png' alt='tripleS' className='section-image' style={{
                    width: '200px',
                    height: '200px',
                }} />
                <p className='section-text'>
                    {t('whatIs.body')}

                </p>

            </div>
        </section>
    );
}

export default WhatIsTripleS;
