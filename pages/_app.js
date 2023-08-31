import { useEffect } from 'react';

import { StaticPagesContextProvider } from 'src/context/staticPages-context';

import 'public/globals.css';
import 'styles/sass/app.rtl.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    require('../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <StaticPagesContextProvider>
      <Component {...pageProps} />
    </StaticPagesContextProvider>
  );
};

export default App;
