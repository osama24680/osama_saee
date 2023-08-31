import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let isUnMounted = false;

    setDone(false);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
      .then(res => res.json())
      .then(data => {
        if (!isUnMounted) {
          setData(data.data);
          setMeta(data.meta);
          setDone(true);
        }
      })
      .catch(() => {});

    return () => {
      isUnMounted = true;
    };
  }, [url]);

  return {
    data,
    done,
    meta,
  };
}

export default useFetch;
