import React, { useEffect, useRef } from "react";

export function WebMap() {
  const elementRef = useRef();

  useEffect((_) => {
    let cleanup;
    // lazy load the module that loads the JSAPI
    // and initialize it
    import("../data/app").then((app) => (cleanup = app.initialize("myDiv")));
    console.log("3333333333333333333");

    return () => cleanup && cleanup();
  }, []);

  // assign elementRef to the ref of our component
  return <div className="viewDiv" id="myDiv" ref={elementRef}></div>;
}
