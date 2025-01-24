import React from 'react';
 //import classNames from 'classnames';
import './App.css';
import MemberCard from './MemberCard.js';
import './Grid.css';

function MembersGrid() {
    const members = [
        {
            sourceImage: './members/1.webp',
            infos: ['- 1st member', '- Has the ability to adapt and improve quickly', '- Best at games'],
            id:1
        },
        {
            sourceImage: './members/2.webp',
            infos: ['- Reliable and caring',
                '- Leader of VV unit'],
            id:2
        },
        {
            sourceImage: './members/3.webp',
            infos: ['- Tallz', '- Hockey player', '- Voice of the group'],
            id:3
        },
        {
            sourceImage: './members/4.webp',
            infos: ['-Ex BoniHani, Buster, CutieL (T.T my dear S4)', '- Good at MC-ing'],
            id:4
        },
        {
            sourceImage: './members/5.webp',
            infos: ['- Oldest (born 2001)', '- Unofficial face of the group'],
            id:5
        },
        {
            sourceImage: './members/6.webp',
            infos: ['- Rizzler', '- Yapper', '- Pure and wild'],
            id:6
        },
        {
            sourceImage: './members/7.webp',
            infos: ["- BIBI's younger sister  ", '- She has a cool appearance but actually she is really cute (and... dumb(?))'],
            id:7
        },
        {
            sourceImage: './members/8.webp',
            infos: ["- Badge War ss1 ep3 08:30", "-  ̷J̷i̷w̷o̷o̷'̷s̷  Everyone's best friend", "- Gong Yubammmmmm"],
            id:8
        },
        {
            sourceImage: './members/9.webp',
            infos: ["- First Japanese member", "- Softy UwU", "- Main dancer"],
            id:9
        },
        {
            sourceImage: './members/10.webp',
            infos: ["- Main vocal", "- Soda punch", "- Can imitate members and Squidward(?) "],
            id:10
        },
        {
            sourceImage: './members/11.webp',
            infos: ["- Rapper", "- Second Japanese S and the first S revealed in Tokyo"],
            id:11
        },
        {
            sourceImage: './members/12.webp',
            infos: ["- Yapper (Soomin's rival)", "- Her last name is Kwak, so her representative animal is a duck", "- Mature makane line	"],
            id:12
        },//continue adding more members here to 24 members
        {
            sourceImage: './members/13.webp',
            infos: ["- Taiwanese-Vietnamese", "- Extremely Extrovert", "- Probably strongest member"],
            id:13
        },
        {
            sourceImage: './members/14.webp',
            infos: ["- Producer/song writer", "- She has a calm personality", "- Handsome!!!"],
            id:14
        },
        {
            sourceImage: './members/15.webp',
            infos: ["- Goddess", "- One of the top visuals in the group", "- SoXinz4life"],
            id:15
        },
        {
            sourceImage: './members/16.webp',
            infos: ["- Second oldest but fake maknae", "- Soft, cute, funny, extra", "- Leader of ∞! unit"],
            id:16
        },

        {
            sourceImage: './members/17.webp',
            infos: ["- Cutest shark in the world", "- Contrary to her strong appearance, she is soft"],
            id:17
        },
        {
            sourceImage: './members/18.webp',
            infos: ["- Can speak English fluently", "- Has a youtube series JooManSa in which she interview members"],
            id:18
        },

        {
            sourceImage: './members/19.webp',
            infos: ["- tripleS's kisser", "- All rounder", "- Lim Hyeongjun's niece"],
            id:19
        },
        {
            sourceImage: './members/20.webp',
            infos: ["- She likes breads, alot", "- Softest voice", "- She likes to workout"],
            id:20
        },
        {
            sourceImage: './members/21.webp',
            infos: ["- Dream of being strawberry farmer", "- Practice martial arts", "- Can use Nunchaku"],
            id:21
        },
        {
            sourceImage: './members/22.webp',
            infos: ["- Thai princess", "- She can speak Thai, English, Chinese, Korean (learning) "],
            id:22
        },
        {
            sourceImage: './members/23.webp',
            infos: ["- Born 2010 (maknae)", "- Birth name Jeong Hae-rin (similar to S2)", "- If you want to harm her, you must step over 23 bodies"],
            id:23
        },
        {
            sourceImage: './members/24.webp',
            infos: ["- Birth name Suh-yeon (similar to S1)", "- Practices ballet", "- Black Swan"],
            id:24
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
                </p>
                <p className='section-text' style={{
                    color: 'red',
                    fontWeight: 'bold',
                }} >
                    ***** Disclaimer *****
                </p>
                <p className='section-text' style={{
                    color: 'red',
                    fontWeight: 'bold',
                }}>
                    Since members used to be revealed one by one in the SIGNAL series, for better experience and prevent spoilers, it is recommended to watch the series first before reading the infos.
                </p>
                <div className="member-grid-container">
                    {members.map((item, index) => (
                        <div key={index} className="member-grid-item">
                            <MemberCard sourceImage={item.sourceImage} infos={item.infos} id={item.id} />
                        </div>
                    ))}
                </div>
            </div>

           
            
            
            

        </section>
    );
}

export default MembersGrid;
