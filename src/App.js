import AboutTheSystem from './AboutTheSystem.js';
import MembersGrid from './MembersGrid.js';
import OtherNamesTerms from './OtherNamesTerms.js';
import './WelcomeWav.js'
import WelcomeWav from './WelcomeWav.js';
import WhatIsThisPage from './WhatIsThisPage.js';
import WhatIsTripleS from './WhatIsTripleS.js';
import OtherLinks from './OtherLinks.js';
import GetToKnowThem from './GetToKnowThem.js';

function App() {
  return (
    <div className="App" style={{
      margin: '0',
    }}>
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

    </div>
  );
}

export default App;
