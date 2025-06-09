import { useState,useLayoutEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(()=>{
      const handleResize=()=>{
        setWindowSize({
            width:window.innerWidth,
            height:window,innerHeight
        })
      }

      window.addEventListener("resize",handleResize)

      handleResize();
      return ()=>window.removeEventListener("resize",handleResize)
  },[])
  return  windowSize;
}

export default useWindowSize;
