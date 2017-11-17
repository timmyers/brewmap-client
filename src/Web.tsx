import * as React from 'react';
import MobileDetect from 'mobile-detect';
import BigScreen from 'Layouts/BigScreen';
import SmallScreen from 'Layouts/SmallScreen';

const md = new MobileDetect(window.navigator.userAgent);

const Web = () => (
  md.phone() ? <SmallScreen /> : <BigScreen />
);

export default Web;
