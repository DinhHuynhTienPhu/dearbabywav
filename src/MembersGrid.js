import React, { useEffect, useRef, useState } from 'react';
 //import classNames from 'classnames';
import './App.css';
import MemberCard from './MemberCard.js';
import './Grid.css';
import { useTranslation } from 'react-i18next';
import { trackClick } from './analytics.js';

// Sub-units for the "group by unit" dropdown. Data from https://triples.fandom.com/wiki/Category:Sub-unit
// and each unit's member list template on the wiki (checked 2026-10-17).
// 1 option = 1 dropdown entry; its groups are shown in order, members in no group go to "Other members" at the bottom.
// leader = member number marked "Leader" on the wiki (co-leaders are not marked), null when the wiki lists none, 'all' = everyone (easter egg only).
// Unit names are proper nouns: not translated.
const UNIT_OPTIONS = [
    { key: 'aaa-kre', label: 'Acid Angel from Asia / +(KR)ystal Eyes', groups: [
        { name: 'Acid Angel from Asia', wiki: 'Acid_Angel_from_Asia', color: '#090909', leader: 5, members: [2, 5, 7, 8] },
        { name: '+(KR)ystal Eyes', wiki: '%2B(KR)ystal_Eyes', color: '#a7ceea', leader: 1, members: [1, 3, 4, 6] },
    ] },
    { key: 'love-evo', label: 'LOVElution / EVOLution', groups: [
        { name: 'LOVElution', wiki: 'LOVElution', color: '#0284ff', leader: 1, members: [1, 2, 8, 9, 10, 13, 14, 15] },
        { name: 'EVOLution', wiki: 'EVOLution', color: '#c53e33', leader: 5, members: [3, 4, 5, 6, 7, 11, 12, 16] },
    ] },
    { key: 'nxt', label: 'NXT', groups: [
        { name: 'NXT', wiki: 'NXT', color: '#90ebee', leader: 20, members: [17, 18, 19, 20] },
    ] },
    { key: 'aria', label: 'Aria', groups: [
        { name: 'Aria', wiki: 'Aria', color: '#dbc8e6', leader: 10, members: [3, 4, 9, 10, 13] },
    ] },
    { key: 'glow', label: 'Glow', groups: [
        { name: 'Glow', wiki: 'Glow', color: '#f5abcd', leader: 24, members: [21, 22, 23, 24] },
    ] },
    { key: 'vv', label: 'Visionary Vision', groups: [
        { name: 'Visionary Vision', wiki: 'Visionary_Vision', color: '#947cac', leader: 2, members: [2, 5, 7, 8, 9, 11, 12, 13, 14, 15, 17, 24] },
    ] },
    { key: 'hatchi', label: '∞! (Hatchi)', groups: [
        { name: '∞! (Hatchi)', wiki: 'Hatchi', color: '#f9f9f9', leader: 16, members: [3, 4, 5, 6, 11, 16, 20, 21] },
    ] },
    { key: 'alphie', label: 'Alphie', groups: [
        { name: 'Alphie', wiki: 'Alphie', color: '#a0b0d4', leader: 5, members: [5, 11, 13, 17, 19, 20, 21, 24] },
    ] },
    { key: 'msnz', label: 'moon / sun / neptune / zenith', groups: [
        { name: 'moon', wiki: 'Moon', color: '#e7cb82', leader: 22, members: [9, 14, 17, 20, 22, 24] },
        { name: 'sun', wiki: 'Sun', color: '#e3b4c8', leader: 15, members: [2, 4, 5, 15, 16, 21] },
        { name: 'neptune', wiki: 'Neptune', color: '#99accc', leader: 1, members: [1, 7, 10, 11, 13, 23] },
        { name: 'zenith', wiki: 'Zenith', color: '#a2bf99', leader: 19, members: [3, 6, 8, 12, 18, 19] },
    ] },
    { key: 'aura', label: 'Aura', groups: [
        { name: 'Aura', wiki: 'Aura', color: '#d52e57', leader: null, members: [1, 18, 20, 23] },
    ] },
    // Easter egg: not a real unit. fake = true -> the cards show FINAL_FORM_INFOS (joke / false info) instead of the real info
    { key: 'final', label: 'tripleS final form ultra instinct gear 5 super nova', fake: true, groups: [
        { name: 'tripleS final form ultra instinct gear 5 super nova', wiki: null, color: '#ff6ac1', leader: 'all', members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] },
    ] },
];

// Easter egg text for "tripleS final form ...", by member number. Fan memes, deliberately false: not translated.
const FINAL_FORM_INFOS = {
    1: ['YOOYEON\'S WIFE', 'HAMSTER', 'JI SUHYEON'],
    2: ['M3GAN', 'EMO KITTY', 'SEOAH'],
    3: ['JOOBIN', 'NMIXX MEMBER', 'A STONE'],
    4: ['CHAEWON', 'IZ*ONE MEMBER', 'BONI HANI'],
    5: ['THE MILKMAID', 'SEOYEON\'S HUSBAND', 'A WOMAN WHO WANTS TO ENJOY HER OREOS'],
    6: ['THE MOST QUIET S', 'A HAPPY CHILD OF UNDIVORCED PARENTS', 'YOOYEON'],
    7: ['BIBI\'S OLDER SISTER', 'THE SINGER OF BAM YANG GANG', 'AN AGILE CAT'],
    8: ['SOFT SPEAKING SONYO', 'JOOBIN\'S DAUGHTER', 'A GONG'],
    9: ['TORIPURESU', 'HAEWON FROM NMIXX', 'AN OTTER'],
    10: ['TSUKI FROM BILLIE', 'CHERRY COKE', 'SQUIDWARD'],
    11: ['AN EXPERT PENGUINOLOGIST', 'NOT AN ORBIT', 'A RED PANDA'],
    12: ['KWAK HAUM FROM KiiiKiii', 'VERY QUIET GIRL', 'A DUCK'],
    13: ['USAIN BOLT', 'BROCOLLI', 'THAI PRINCESS'],
    14: ['XINYU\'S MORTAL ENEMY', 'HANDSOME OPPA', 'JE NE SAIS QUOI'],
    15: ['LONG-LEGGED BIRD', 'QUEEN', '5 FEET TALL'],
    16: ['ACTUALLY HATES KISS', 'THE TALLEST', 'MAKNAE'],
    17: ['BIGGEST JIYEON HATER', 'KIKKU!', 'AUTHORATIVE SHARK'],
    18: ['S8 JIWOO', 'DRAGON SLAYER', 'HOST OF EUNCHAE\'S STAR DIARY'],
    19: ['HASEUL', 'NON KISSEY QUEEN', 'A HEXAGON THAT LOOKS LIKE JENNIE'],
    20: ['NO.1 BREAD HATER', 'DEEPEST VOICE IN KPOP', 'GOWON'],
    21: ['WITHOUT EARTH CREATURE', 'LE SSERAFIM MEMBER', 'A HUMAN FROM EARTH'],
    22: ['THE MOST SERIOUS S', 'PETER', 'JOHN, THE BUFF QUEEN'],
    23: ['THE SORSEOAH SUPREME', 'CHAEWON FROM IZ*ONE', 'THE OLDEST LEADER'],
    24: ['S1 SEOYEON, THE MEEP QUEEN', 'KAZUHA', 'PINGU'],
};

function MembersGrid() {
    const { t } = useTranslation();
    const [unitKey, setUnitKey] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const btnRef = useRef(null);
    const menuRef = useRef(null);

    // close the unit menu on outside click / Escape (same behavior as the language menu)
    useEffect(() => {
        if (!menuOpen) return;
        const onClick = (e) => {
            if (!btnRef.current.contains(e.target) && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [menuOpen]);
    const members = [
        { sourceImage: './members/1.webp', infos: t('members.cards.1', { returnObjects: true }), id: 1, link: 'https://triples.fandom.com/wiki/Yoon_SeoYeon' },
        { sourceImage: './members/2.webp', infos: t('members.cards.2', { returnObjects: true }), id: 2, link: 'https://triples.fandom.com/wiki/Jeong_HyeRin' },
        { sourceImage: './members/3.webp', infos: t('members.cards.3', { returnObjects: true }), id: 3, link: 'https://triples.fandom.com/wiki/Lee_JiWoo' },
        { sourceImage: './members/4.webp', infos: t('members.cards.4', { returnObjects: true }), id: 4, link: 'https://triples.fandom.com/wiki/Kim_ChaeYeon' },
        { sourceImage: './members/5.webp', infos: t('members.cards.5', { returnObjects: true }), id: 5, link: 'https://triples.fandom.com/wiki/Kim_YooYeon' },
        { sourceImage: './members/6.webp', infos: t('members.cards.6', { returnObjects: true }), id: 6, link: 'https://triples.fandom.com/wiki/Kim_SooMin' },
        { sourceImage: './members/7.webp', infos: t('members.cards.7', { returnObjects: true }), id: 7, link: 'https://triples.fandom.com/wiki/Kim_NaKyoung' },
        { sourceImage: './members/8.webp', infos: t('members.cards.8', { returnObjects: true }), id: 8, link: 'https://triples.fandom.com/wiki/Gong_YuBin' },
        { sourceImage: './members/9.webp', infos: t('members.cards.9', { returnObjects: true }), id: 9, link: 'https://triples.fandom.com/wiki/Kaede' },
        { sourceImage: './members/10.webp', infos: t('members.cards.10', { returnObjects: true }), id: 10, link: 'https://triples.fandom.com/wiki/Seo_DaHyun' },
        { sourceImage: './members/11.webp', infos: t('members.cards.11', { returnObjects: true }), id: 11, link: 'https://triples.fandom.com/wiki/Kotone' },
        { sourceImage: './members/12.webp', infos: t('members.cards.12', { returnObjects: true }), id: 12, link: 'https://triples.fandom.com/wiki/Kwak_YeonJi' },
        { sourceImage: './members/13.webp', infos: t('members.cards.13', { returnObjects: true }), id: 13, link: 'https://triples.fandom.com/wiki/Nien' },
        { sourceImage: './members/14.webp', infos: t('members.cards.14', { returnObjects: true }), id: 14, link: 'https://triples.fandom.com/wiki/Park_SoHyun' },
        { sourceImage: './members/15.webp', infos: t('members.cards.15', { returnObjects: true }), id: 15, link: 'https://triples.fandom.com/wiki/Xinyu' },
        { sourceImage: './members/16.webp', infos: t('members.cards.16', { returnObjects: true }), id: 16, link: 'https://triples.fandom.com/wiki/Mayu' },
        { sourceImage: './members/17.webp', infos: t('members.cards.17', { returnObjects: true }), id: 17, link: 'https://triples.fandom.com/wiki/Lynn' },
        { sourceImage: './members/18.webp', infos: t('members.cards.18', { returnObjects: true }), id: 18, link: 'https://triples.fandom.com/wiki/JooBin' },
        { sourceImage: './members/19.webp', infos: t('members.cards.19', { returnObjects: true }), id: 19, link: 'https://triples.fandom.com/wiki/Jeong_HaYeon' },
        { sourceImage: './members/20.webp', infos: t('members.cards.20', { returnObjects: true }), id: 20, link: 'https://triples.fandom.com/wiki/Park_ShiOn' },
        { sourceImage: './members/21.webp', infos: t('members.cards.21', { returnObjects: true }), id: 21, link: 'https://triples.fandom.com/wiki/Kim_ChaeWon' },
        { sourceImage: './members/22.webp', infos: t('members.cards.22', { returnObjects: true }), id: 22, link: 'https://triples.fandom.com/wiki/Sullin' },
        { sourceImage: './members/23.webp', infos: t('members.cards.23', { returnObjects: true }), id: 23, link: 'https://triples.fandom.com/wiki/SeoAh' },
        { sourceImage: './members/24.webp', infos: t('members.cards.24', { returnObjects: true }), id: 24, link: 'https://triples.fandom.com/wiki/JiYeon' },
    ];

    const option = UNIT_OPTIONS.find((o) => o.key === unitKey);
    const others = option ? members.filter((m) => !option.groups.some((g) => g.members.includes(m.id))) : [];

    const pickUnit = (key) => {
        setUnitKey(key);
        setMenuOpen(false);
        trackClick('unit: ' + (key || 'none'));
    };

    const renderGrid = (list, leader) => (
        <div className="member-grid-container">
            {list.map((item) => (
                <div key={item.id} className="member-grid-item">
                    <MemberCard sourceImage={item.sourceImage} infos={option && option.fake ? FINAL_FORM_INFOS[item.id] : item.infos} id={item.id} link={item.link}
                        leaderLabel={leader === 'all' || item.id === leader ? t('members.leader') : null} />
                </div>
            ))}
        </div>
    );

    return (
        <section className='section' id='members'>
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
                <div className="unit-picker">
                    <div className="unit-dropdown">
                        <button
                            ref={btnRef}
                            className={`unit-button ${option ? 'active' : ''}`}
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                        >
                            <span className="unit-button-label">{option ? option.label : t('members.groupBy')}</span>
                            <span className="unit-caret" aria-hidden="true">▾</span>
                        </button>

                        {menuOpen && (
                            <div ref={menuRef} className="unit-menu" role="menu">
                                <button className={`unit-item ${!option ? 'selected' : ''}`} role="menuitemradio" aria-checked={!option} onClick={() => pickUnit('')}>
                                    <span className="unit-item-dots" aria-hidden="true" />
                                    {t('members.groupNone')}
                                </button>
                                {UNIT_OPTIONS.map((o) => (
                                    <button key={o.key} className={`unit-item ${o.key === unitKey ? 'selected' : ''}`} role="menuitemradio" aria-checked={o.key === unitKey} onClick={() => pickUnit(o.key)}>
                                        <span className="unit-item-dots" aria-hidden="true">
                                            {o.groups.map((g) => <span key={g.name} className="unit-dot unit-dot-small" style={{ background: g.color }} />)}
                                        </span>
                                        {o.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {!option && renderGrid(members, null)}

                {option && option.groups.map((g) => (
                    <div key={g.name} className="unit-group">
                        <h3 className="unit-group-header">
                            <span className="unit-dot" style={{ background: g.color }} aria-hidden="true" />
                            {g.wiki
                                ? <a href={'https://triples.fandom.com/wiki/' + g.wiki} target="_blank" rel="noopener noreferrer">{g.name}</a>
                                : g.name}
                            <span className="unit-count">{g.members.length}</span>
                        </h3>
                        {renderGrid(members.filter((m) => g.members.includes(m.id)), g.leader)}
                    </div>
                ))}

                {option && others.length > 0 && (
                    <div className="unit-group">
                        <h3 className="unit-group-header unit-group-others">
                            {t('members.otherMembers')}
                            <span className="unit-count">{others.length}</span>
                        </h3>
                        {renderGrid(others, null)}
                    </div>
                )}
            </div>

        </section>
    );
}

export default MembersGrid;
