import AboutTheSystem from './AboutTheSystem.js';
import MembersGrid from './MembersGrid.js';
import OtherNamesTerms from './OtherNamesTerms.js';
import './WelcomeWav.js'
import WelcomeWav from './WelcomeWav.js';
import WhatIsThisPage from './WhatIsThisPage.js';
import WhatIsTripleS from './WhatIsTripleS.js';
import OtherLinks from './OtherLinks.js';
import GetToKnowThem from './GetToKnowThem.js';
import Footer from './Footer.js';
import { useTranslation } from 'react-i18next';
import Header from './Header.js';

function App() {
  useTranslation();
  return (
    <div className="App" style={{
      margin: '0',
    }}>
      {/* header with language dropdown */}
      <Header />
      <WelcomeWav />
      <div style={{
        backgroundColor: 'black',
        zIndex: '2',
        position: 'relative',
        display: 'flow-root', // prevent margin-collapsing from last child
        paddingBottom: 'env(safe-area-inset-bottom, 24px)',
      }}>
      <WhatIsThisPage />
      <WhatIsTripleS />
      <AboutTheSystem />
      <OtherNamesTerms />
      <MembersGrid />
      <GetToKnowThem />
      <OtherLinks />
      </div>
      <Footer />

    </div>
  );
}

export default App;
