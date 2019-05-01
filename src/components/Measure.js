// @flow

import React, { useRef, useEffect } from "react";

type Dimensions = {
  width: number,
  height: number
};

export default function Measure({
  children,
  onMeasure
}: {
  children: React$Node,
  onMeasure: Dimensions => void
}) {
  const node = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!node.current) return;
      onMeasure(node.current.getBoundingClientRect());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={node} style={style}>
      {children}
    </div>
  );
}

const style = {
  pointerEvents: "none"
};
