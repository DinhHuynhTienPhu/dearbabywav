import AboutTheSystem from './AboutTheSystem.js';
import logo from './logo.svg';
import MemberCard from './MemberCard.js';
import Members from './Members.js';
import MembersGrid from './MembersGrid.js';
import OtherNamesTerms from './OtherNamesTerms.js';
import './WelcomeWav.js'
import WelcomeWav from './WelcomeWav.js';
import WhatIsThisPage from './WhatIsThisPage.js';
import WhatIsTripleS from './WhatIsTripleS.js';

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
      }}>
      <WhatIsThisPage />
      <WhatIsTripleS />
      <AboutTheSystem />
      <OtherNamesTerms />
      {/* <MembersGrid /> */}
      </div>

    </div>
  );
}

export default App;
