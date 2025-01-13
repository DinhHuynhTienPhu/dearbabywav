import React from 'react';
import classNames from 'classnames';
import './App.css';

function AboutTheSystem() {

    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    ABOUT THE SYSTEM
                </h1>
                <p className='section-text'>
                    tripleS has a unique photocards and voting system, but to simplify:
                </p>
                <div className='section-text-container' style={{
                    //aglign the childs horizontally
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>

                
                <p className='section-text'>
                    Photocard = Objekt 
                </p>
                <p className='section-text'>
                    COMO = Vote Point
                </p>
                <p className='section-text'>
                    Dimension = Sub-unit
                </p>
                <p className='section-text'>
                    Gravity = Vote Event
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
                        </a>
                    </span>
                    <span style={{
                        textAlign: 'left',
                    }}>
                        <p className='section-text'>
                            When you obtain an Objekt (digital or physical) you will get a COMO point (some special
                            Objekts can give you 2 or 3).
                        </p>
                        <p className='section-text'>
                            Then when there is a Dimension you can use your COMO to vote.
                        </p>
                        <p className='section-text'>
                            The subject of a Dimension can vary,from choosing members for a unit to songs, concepts, etc.'
                        </p>
                    </span>
                </div>
            </div>
        </section>
    );
}

export default AboutTheSystem;
