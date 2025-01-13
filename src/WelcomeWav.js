import React from 'react';
import classNames from 'classnames';
import './App.css';
import  { useEffect, useState, useRef } from 'react';

function WelcomeWav({ isDarkMode }) {
    const [isVisible, setIsVisible] = useState(true);
    //constantly check if the component is visible, using its position in the viewport
    const componentRef = useRef();
    useEffect(() => {
        const checkIfVisible = () => {
            const { top, bottom } = componentRef.current.getBoundingClientRect();
            //log topm, bottom, and window.innerHeight
            console.log(top, bottom, window.innerHeight);
            
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
        }}>
                
                <img src='./0124-upscale.png' alt='triples concept background' style={
                    {
                        width: '100%', height: '100vh', objectFit: 'cover', opacity: '0.75',
                        position: 'fixed',
                        left: '0',
                        zIndex: '0',
                    }
                } />
                


            <div style={{
                top: '0',
                left: '0',
                width: 'auto',
                height: '100vh',
                backgroundColor:'rgba(0, 0, 0, 0.0)',
            }}></div>

            <div  style={{
                position: 'absolute', 
                top: '35%',
                //center
                left: '0',
                right: '0',
                marginInline: 'auto',
                width: '100%',
                color: 'white',
            }} ref={componentRef}
                className={`fade-component ${isVisible ? 'fade-in' : 'fade-out'}`}>
                <h1 classNames='response-smaller-font' style={{
                    fontSize: '3.2vh',
                    fontWeight: 'bold',

                }}>WELLCOME, BABY WAV</h1>
                <p className='welcome-small-text' style={{
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                }}>WISH YOU ALL THE BEST STANNING THE GROUP WITH ALL POSSIBILITIES</p>
            </div>
        </section>
    );
}

export default WelcomeWav;
