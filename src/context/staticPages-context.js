import { useState, useEffect, createContext } from 'react';
import useFetch from 'src/Helper/useFetch';

const StaticPagesContext = createContext();

export const StaticPagesContextProvider = props => {
  const [Data, setData] = useState();

  const staticPages = {};
  const { data } = useFetch('/pgcontentpages/1000');

  useEffect(() => {
    setData(data);
  }, [data]);

  if (Data) {
    for (let i = 0; i < Data.length; i++) {
      staticPages[Data[i].name] = Data[i];
    }
  }

  return (
    <StaticPagesContext.Provider value={staticPages}>
      {props.children}
    </StaticPagesContext.Provider>
  );
};

export default StaticPagesContext;
