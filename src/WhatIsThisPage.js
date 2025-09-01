import React from 'react';
 //import classNames from 'classnames';
import './App.css';
import { useTranslation } from 'react-i18next';

function OtherNamesTerms() {
    const { t } = useTranslation();

    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    {t('whatIsThis.title')}
                </h1>
                <p className='section-text'>
                    {t('whatIsThis.body1')}
                </p>
                
                <p className='section-text'>
                    {t('whatIsThis.body2')}
                </p>
                
            </div>
        </section>
    );
}

export default OtherNamesTerms;
