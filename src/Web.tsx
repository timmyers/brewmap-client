import * as React from 'react';
import MobileDetect from 'mobile-detect';
import { BrowserRouter as Router } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import BigScreen from 'Layouts/BigScreen';
import SmallScreen from 'Layouts/SmallScreen';

const md = new MobileDetect(window.navigator.userAgent);

const Web = () => (
  <Router>
    <div id="root">
      { process.env.NODE_ENV === 'local' && <DevTools /> }
      { md.phone() ? <SmallScreen /> : <BigScreen /> }
    </div>
  </Router>
);

export default Web;
