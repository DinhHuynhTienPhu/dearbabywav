import React from 'react';
import classNames from 'classnames';
import './App.css';
import MemberCard from './MemberCard.js';
import './Grid.css';

function MembersGrid() {
    const members = [
        {
            sourceImage: './members/1.jpg',
            infos: ['- First member', '- Has the ability to adapt and improve quickly', '- Best at games ']
        },
        {
            sourceImage: './members/2.jpg',
            infos: ['- Second member', '- Has the ability to adapt and improve quickly', '- Best at games ']
        }
    ];
        
    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    MEMBERS
                </h1>
                <p className='section-text'>
                    This section wil provide image of each members and their unique traits for you to remember their names and faces.
                    Watching the SIGNAL series is recommended for a better understanding
                </p>
                <div className="grid-container">
                    {members.map((item, index) => (
                        <div key={index} className="grid-item">
                            <MemberCard sourceImage={item.sourceImage} infos={item.infos} />
                        </div>
                    ))}
                </div>
            </div>

           
            
            
            

        </section>
    );
}

export default MembersGrid;
