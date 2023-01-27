import React from "react";
import debounce from "lodash/debounce";

const getIsMobile = () => window.innerWidth <= 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(getIsMobile());

  React.useLayoutEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", debounce(onResize, 100));

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
}
