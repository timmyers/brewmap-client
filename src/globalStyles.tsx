import { injectGlobal } from 'styled-components';

injectGlobal`
  body, html {
    margin: 0px;
    width: 100%;
    height: 100%;
  }

  #root {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  @import url('https://fonts.googleapis.com/css?family=Oswald:600');
`;
