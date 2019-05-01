// @flow

import React, { useState, useEffect, useRef } from "react";
import Animated from "animated/lib/targets/react-dom";
import useLoad from "./useLoad";
import { spring, SPEEDS } from "../../anims";

import Measure from "../Measure";
import { Content, Loader, Fixed } from "./components";
import { useGlobalAnimations } from "../../hooks/globalAnimations";

const SIZE = 150;
const INITIAL_DIMENSIONS = { width: SIZE, height: SIZE };

export default ({
  resolve,
  contentOpacity,
  contentScale,
  pointerEvents,
  onClick,
  ...props
}: *) => {
  // data resolved
  const [data, setData] = useState(null);

  // fetch data on first mount
  useLoad(resolve(), setData);

  const globalAnimationsEnabled = useGlobalAnimations();

  // filled with content dimensions after first render
  const [dimensions, setDimensions] = useState(INITIAL_DIMENSIONS);

  const [anims] = useState({
    scaleX: new Animated.Value(0),
    scaleY: new Animated.Value(0),
    translateY: new Animated.Value(0),
    header: new Animated.Value(0),
    footer: new Animated.Value(0),
    opacity: new Animated.Value(0)
  });

  // to prevent unwanted callbacks
  const isUnmounted = useRef(false);
  useEffect(
    () => () => {
      isUnmounted.current = true;
    },
    []
  );

  // show spinner while !data
  useEffect(
    () => {
      if (!data) {
        if (globalAnimationsEnabled) {
          spring(anims.scaleX, 1, SPEEDS.enter).start();
          spring(anims.scaleY, 1, SPEEDS.enter).start();
        } else {
          anims.scaleX.setValue(1);
          anims.scaleY.setValue(1);
        }
      }
    },
    [data, globalAnimationsEnabled]
  );

  const onMeasure = dimensions => {
    const { width, height } = dimensions;
    const { innerHeight } = window;

    // eventually offset if modal overflow window height
    const offset =
      height > innerHeight - 160 ? (height - innerHeight) / 2 + 40 : 0;

    // instantly set width/height, and apply inverted transform (keep same size)
    setDimensions(dimensions);

    if (globalAnimationsEnabled) {
      anims.scaleX.setValue(SIZE / width);
      anims.scaleY.setValue(SIZE / height);
      anims.translateY.setValue((-offset * height) / SIZE);

      // launch anims
      Animated.stagger(250, [
        Animated.parallel([
          spring(anims.translateY, 0, SPEEDS.enter),
          spring(anims.scaleX, 1, SPEEDS.scaleX),
          spring(anims.scaleY, 1, SPEEDS.scaleY)
        ]),
        Animated.parallel([
          spring(anims.opacity, 1),
          Animated.stagger(300, [
            spring(anims.header, 1, SPEEDS.enter),
            spring(anims.footer, 1, SPEEDS.enter)
          ])
        ])
      ]).start();
    } else {
      anims.scaleX.setValue(1);
      anims.scaleY.setValue(1);
      anims.translateY.setValue(0);
      anims.opacity.setValue(1);
      anims.header.setValue(1);
      anims.footer.setValue(1);
    }
  };

  const isMeasured = dimensions !== INITIAL_DIMENSIONS;
  const { width, height } = dimensions;
  const loaderStyle = {
    width,
    height,
    opacity: contentOpacity,
    pointerEvents,
    transform: [{ scale: contentScale }]
  };

  return (
    <>
      {!isMeasured && (
        <Fixed center>
          <Loader
            pointerEvents={pointerEvents}
            style={loaderStyle}
            onClick={onClick}
          />
        </Fixed>
      )}

      {data && (
        <Measure onMeasure={onMeasure}>
          <Animated.div
            style={{
              opacity: isMeasured ? 1 : 0,
              transform: [{ scale: contentScale }]
            }}
          >
            <Content
              pointerEvents={pointerEvents}
              innerOpacity={anims.opacity}
              headerAnim={anims.header}
              footerAnim={anims.footer}
              onClick={onClick}
              style={{
                opacity: contentOpacity,
                pointerEvents,
                transform: [
                  { scaleX: anims.scaleX },
                  { scaleY: anims.scaleY },
                  { translateY: anims.translateY }
                ]
              }}
              data={data}
              {...props}
            />
          </Animated.div>
        </Measure>
      )}
    </>
  );
};
