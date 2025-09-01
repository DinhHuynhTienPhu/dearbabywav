import React from 'react';
 //import classNames from 'classnames';
import './App.css';
import MemberCard from './MemberCard.js';
import './Grid.css';
import { useTranslation } from 'react-i18next';

function MembersGrid() {
    const { t } = useTranslation();
    const members = [
        { sourceImage: './members/1.webp', infos: t('members.cards.1', { returnObjects: true }), id: 1 },
        { sourceImage: './members/2.webp', infos: t('members.cards.2', { returnObjects: true }), id: 2 },
        { sourceImage: './members/3.webp', infos: t('members.cards.3', { returnObjects: true }), id: 3 },
        { sourceImage: './members/4.webp', infos: t('members.cards.4', { returnObjects: true }), id: 4 },
        { sourceImage: './members/5.webp', infos: t('members.cards.5', { returnObjects: true }), id: 5 },
        { sourceImage: './members/6.webp', infos: t('members.cards.6', { returnObjects: true }), id: 6 },
        { sourceImage: './members/7.webp', infos: t('members.cards.7', { returnObjects: true }), id: 7 },
        { sourceImage: './members/8.webp', infos: t('members.cards.8', { returnObjects: true }), id: 8 },
        { sourceImage: './members/9.webp', infos: t('members.cards.9', { returnObjects: true }), id: 9 },
        { sourceImage: './members/10.webp', infos: t('members.cards.10', { returnObjects: true }), id: 10 },
        { sourceImage: './members/11.webp', infos: t('members.cards.11', { returnObjects: true }), id: 11 },
        { sourceImage: './members/12.webp', infos: t('members.cards.12', { returnObjects: true }), id: 12 },
        { sourceImage: './members/13.webp', infos: t('members.cards.13', { returnObjects: true }), id: 13 },
        { sourceImage: './members/14.webp', infos: t('members.cards.14', { returnObjects: true }), id: 14 },
        { sourceImage: './members/15.webp', infos: t('members.cards.15', { returnObjects: true }), id: 15 },
        { sourceImage: './members/16.webp', infos: t('members.cards.16', { returnObjects: true }), id: 16 },
        { sourceImage: './members/17.webp', infos: t('members.cards.17', { returnObjects: true }), id: 17 },
        { sourceImage: './members/18.webp', infos: t('members.cards.18', { returnObjects: true }), id: 18 },
        { sourceImage: './members/19.webp', infos: t('members.cards.19', { returnObjects: true }), id: 19 },
        { sourceImage: './members/20.webp', infos: t('members.cards.20', { returnObjects: true }), id: 20 },
        { sourceImage: './members/21.webp', infos: t('members.cards.21', { returnObjects: true }), id: 21 },
        { sourceImage: './members/22.webp', infos: t('members.cards.22', { returnObjects: true }), id: 22 },
        { sourceImage: './members/23.webp', infos: t('members.cards.23', { returnObjects: true }), id: 23 },
        { sourceImage: './members/24.webp', infos: t('members.cards.24', { returnObjects: true }), id: 24 },
    ];
        
    return (
        <section className='section'>
            <div className='section'>
                <h1 className='section-header'>
                    {t('members.title')}
                </h1>
                <p className='section-text'>
                    {t('members.intro')}
                </p>
                <p className='section-text' style={{
                    color: 'red',
                    fontWeight: 'bold',
                }} >
                    {t('members.disclaimerTitle')}
                </p>
                <p className='section-text' style={{
                    color: 'red',
                    fontWeight: 'bold',
                }}>
                    {t('members.disclaimer')}
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
