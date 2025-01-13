import React from 'react';
import classNames from 'classnames';
import './App.css';
import MemberCard from './MemberCard.js';
import './Grid.css';

function MembersGrid() {
    const members = [
        {
            sourceImage: './members/1.webp',
            infos: ['- First member', '- Has the ability to adapt and improve quickly', '- Best at games'],
        },
        {
            sourceImage: './members/2.webp',
            infos: ['- Reliable and caring',
                    '- Leader of VV unit']
        },
        {
            sourceImage: './members/3.webp',
            infos: ['- Tallz', '- Hockey player', '- Voice of the group']
        },
        {
            sourceImage: './members/4.webp',
            infos: ['-Ex BoniHani, Buster, CutieL (T.T my dear S4)', '- She is good at MC-ing']
        },
        {
            sourceImage: './members/5.webp',
            infos: ['- Oldest (born 2001)', '- Unofifcial face of the group']
        },
        {
            sourceImage: './members/6.webp',
            infos: ['- Rizzler', '- Yapper', '- Pure and wild']
        },
        {
            sourceImage: './members/7.webp',
            infos: ["- BIBI's younger sister  ", '- She has a cool appearance but actually she is really cute (and... dumb(?))']
        },
        {
            sourceImage: './members/8.webp',
            infos: ["- Badge War ss1 ep3 08:30", "- Jiwoo's best friend", "- Gong Yubammmmmm"]
        },
        {
            sourceImage: './members/9.webp',
            infos: ["- First Japanese member", "- Softy UwU", "- Main dancer"]
        },
        {
            sourceImage: './members/10.webp',
            infos: ["- Main vocal", "- Soda punch", "- Can imitate members and Squidward(?) "]
        },
        {
            sourceImage: './members/11.webp',
            infos: ["- Rapper", "- 2nd Japanese S and the first S to be revealed in Tokyo"]
        },
        {
            sourceImage: './members/12.webp',
            infos: ["- Yapper (Soomin's rival)", "- Her last name is Kwak, hence her representative animal is duck", "- Mature makane line	"]
        },//continue adding more members here to 24 members
        {
            sourceImage: './members/13.webp',
            infos: ["- Taiwanese-Vietnamese", "- Extremely Extrovert", "- Probably strongest member"]
        },
        {
            sourceImage: './members/14.webp',
            infos: ["- Producer/song writer", "- She has calm personality", "- Handsome!!!"]
        },
        {
            sourceImage: './members/15.webp',
            infos: ["- Goddess", "- In top visual members", "- SoXinz4life"]
        },
        {
            sourceImage: './members/16.webp',
            infos: ["- Second oldest but fake maknae", "- Soft, cute, funny, extra", "- Leader of ∞! unit"]
        },

        {
            sourceImage: './members/17.webp',
            infos: ["- Cutest shark in the world", "- Contrary to her strong appearance, she is soft"]
        },
        {
            sourceImage: './members/18.webp',
            infos: ["- Can speak English fluently", "- Has a youtube series JooManSa in which she interview members"]
        },

        {
            sourceImage: './members/19.webp',
            infos: ["- tripleS's kisser", "- All rounder", "- Lim Hyeongjun's nephew"]
        },
        {
            sourceImage: './members/20.webp',
            infos: ["- She likes breads, alot", "- Softest voice", "- She likes to workout"]
        },
        {
            sourceImage: './members/21.webp',
            infos: ["- Dream of being strawberry farmer", "- Practice martial arts", "- Can use Nunchaku"]
        },
        {
            sourceImage: './members/22.webp',
            infos: ["- Thai princess", "- She can speak Thai, English, Chinese, Korean (learning) "]
        },
        {
            sourceImage: './members/23.webp',
            infos: ["- Born 2010 (maknae)", "- Birth name Jeong Hae-rin (similar to S2)", "- If you want to harm her, must step on 23 bodies"]
        },
        {
            sourceImage: './members/24.webp',
            infos: ["- Birth name Suh-yeon (similar to S1)", "- Practice ballet", "- Black Swan"]
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
                <div className="member-grid-container">
                    {members.map((item, index) => (
                        <div key={index} className="member-grid-item">
                            <MemberCard sourceImage={item.sourceImage} infos={item.infos} />
                        </div>
                    ))}
                </div>
            </div>

           
            
            
            

        </section>
    );
}

export default MembersGrid;
