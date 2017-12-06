import * as React from 'react';
import MobileDetect from 'mobile-detect';
import { BrowserRouter as Router } from 'react-router-dom';
import BigScreen from 'Layouts/BigScreen';
import SmallScreen from 'Layouts/SmallScreen';

const md = new MobileDetect(window.navigator.userAgent);

const Web = () => (
  <Router>
    { md.phone() ? <SmallScreen /> : <BigScreen /> }
  </Router>
);

export default Web;
