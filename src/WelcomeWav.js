import React from 'react';
 //import classNames from 'classnames';
import './App.css';
import  { useEffect, useState, useRef } from 'react';

function WelcomeWav({ isDarkMode }) {
    const [isVisible, setIsVisible] = useState(true);
    const componentRef = useRef();
    useEffect(() => {
        const checkIfVisible = () => {
            if (!componentRef.current) return;
            const { top, bottom } = componentRef.current.getBoundingClientRect();
            if (top >= 60 && bottom <= window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
        window.addEventListener('scroll', checkIfVisible);
        return () => {
            window.removeEventListener('scroll', checkIfVisible);
        }
    }, []);

    return (
        <section style={{
            backgroundColor: 'black',
            margin: '0',
            position: 'relative',
            minHeight: '100svh', /* modern small viewport height */
            backgroundImage: "url('./0124-upscale.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
        }}>
            {/* Content overlay */}
            <div  style={{
                position: 'absolute', 
                top: '35%',
                left: '0',
                right: '0',
                marginInline: 'auto',
                width: '100%',
                color: 'white',
                zIndex: 1,
            }} ref={componentRef}
                className={`fade-component ${isVisible ? 'fade-in' : 'fade-out'}`}>
                <h1 classNames='response-smaller-font' style={{
                    fontSize: '3.2vh',
                    fontWeight: 'bold',
                }}>WELCOME, BABY WAV</h1>
                <p className='welcome-small-text' style={{
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                }}>WISH YOU ALL THE BEST STANNING THE GROUP WITH ALL POSSIBILITIES</p>
            </div>
        </section>
    );
}

export default WelcomeWav;
