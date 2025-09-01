import React from 'react';
//import classNames from 'classnames';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function WelcomeWav({ isDarkMode }) {
    const { t } = useTranslation();
    // Use a continuous opacity value (0..1) computed from scroll position for smoother fade
    const [opacity, setOpacity] = useState(1);
    // Ref on the whole section; compute opacity from window scroll progress across this section
    const sectionRef = useRef();
    const rafRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const update = () => {
            const viewH = window.innerHeight || 1;
            const sectionTop = sectionRef.current.offsetTop || 0;
            const scrollY = window.scrollY || window.pageYOffset || 0;

            // progress: 0 at top of section, 1 after scrolling ~80% viewport past its top
            let progress = (scrollY - sectionTop) / (viewH * 0.4);
            progress = Math.max(0, Math.min(1, progress));
            const newOpacity = 1 - progress;

            setOpacity(newOpacity);
            rafRef.current = null;
        };

        const onScroll = () => {
            if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
        };

        // initial compute
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section ref={sectionRef} style={{
            backgroundColor: 'black',
            margin: '0',
            position: 'relative',
            minHeight: '100vh',
        }}>

            <img src='./0124-upscale.webp' alt='triples concept background' style={
                {
                    width: '100%', height: '100vh', objectFit: 'cover', opacity: '0.75',
                    position: 'fixed',
                    top: '0', /* ensure it covers under the header */
                    left: '0',
                    zIndex: '0',
                }
            } />


            <div style={{
                position: 'absolute',
                top: '35%',
                //center
                left: '0',
                right: '0',
                marginInline: 'auto',
                width: '100%',
                color: 'white',
                // bind opacity directly to scroll position for smooth fade
                opacity: opacity,
                // small transition helps avoid visible stepping when frame rate is low
                transition: 'opacity 120ms linear',
                zIndex: 1,
            }}
                className={`fade-component`}>
                <h1 className='response-smaller-font' style={{
                    fontSize: '3.2vh',
                    fontWeight: 'bold',

                }}>{t('welcome.title')}</h1>
                <p className='welcome-small-text' style={{
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                }}>{t('welcome.subtitle')}</p>
            </div>
        </section>
    );
}

export default WelcomeWav;
