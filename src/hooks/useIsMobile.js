import React from "react";
import debounce from "lodash/debounce";

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    const getIsMobile = () => window.innerWidth <= 768;
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    onResize();
    window.addEventListener("resize", debounce(onResize, 100));

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
}
