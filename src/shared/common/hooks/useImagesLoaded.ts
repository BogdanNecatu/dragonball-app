import { useEffect, useState } from 'react';

export default function useImagesLoaded(urls: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (urls.length === 0) {
      setLoaded(true);
      return;
    }

    let count = 0;
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        count++;
        if (count === urls.length) setLoaded(true);
      };
    });
  }, [urls]);

  return loaded;
}
