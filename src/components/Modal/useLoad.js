import { useEffect, useRef } from "react";

export default (promise, setData) => {
  // to prevent unwanted callbacks
  const isUnmounted = useRef(false);
  useEffect(
    () => () => {
      isUnmounted.current = true;
    },
    []
  );

  useEffect(() => {
    promise.then(data => {
      if (isUnmounted.current) return;
      setData(data);
    });
    return () => (isUnmounted.current = true);
  }, []);
};
