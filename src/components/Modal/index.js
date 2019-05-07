import React, { useState, useEffect, useCallback, useRef } from "react";
import Animated from "animated/lib/targets/react-dom";
import { createPortal } from "react-dom";

import { Backdrop, Scroller } from "./components";
import { spring, SPEEDS } from "../../anims";
import { useGlobalAnimations } from "../../hooks/globalAnimations";
import Dialog from "./Dialog";

const root = document.getElementById("modals");

export default props => {
  const { isOpened, onClose, ...p } = props;

  const globalAnimationsEnabled = useGlobalAnimations();
  const lastFocused = useRef();
  const [isInDOM, setIsInDOM] = useState(isOpened);
  const [anims] = useState({
    backdropOpacity: new Animated.Value(0),
    contentOpacity: new Animated.Value(1),
    contentScale: new Animated.Value(1)
  });

  useEffect(
    () => {
      let listener;

      document.body.style.overflow = isOpened ? 'hidden' : 'initial'

      // animate enter
      if (isOpened && !isInDOM) {
        lastFocused.current = document.activeElement;
        setIsInDOM(true);
      }

      if (globalAnimationsEnabled) {
        spring(anims.backdropOpacity, isOpened ? 1 : 0, SPEEDS.enter).start();
        spring(anims.contentOpacity, isOpened ? 1 : 0, SPEEDS.enter).start();
        spring(anims.contentScale, isOpened ? 1 : 0.85, SPEEDS.enter).start();

        // animate leave
        if (isInDOM && !isOpened) {
          listener = anims.backdropOpacity.addListener(({ value }) => {
            if (isInDOM && !isOpened && value === 0) {
              setIsInDOM(false);
              anims.backdropOpacity.removeListener(listener);
            }
          });
        }
      } else {
        anims.backdropOpacity.setValue(isOpened ? 1 : 0);
        anims.contentOpacity.setValue(isOpened ? 1 : 0);
        anims.contentScale.setValue(isOpened ? 1 : 0);
        if (!isOpened) {
          setIsInDOM(false);
        }
      }
    },
    [isOpened, anims, globalAnimationsEnabled]
  );

  const close = useCallback(
    () => {
      onClose();
      if (lastFocused.current) {
        lastFocused.current.focus();
      }
    },
    [onClose]
  );

  const preventClose = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  });

  if (!isInDOM) return null;

  const backdropStyle = { opacity: anims.backdropOpacity };

  return createPortal(
    <>
      <Backdrop style={backdropStyle} />
      <Scroller pointerEvents={isOpened} gutter={60} onBackClick={close}>
        <Dialog
          pointerEvents={isOpened}
          contentOpacity={anims.contentOpacity}
          contentScale={anims.contentScale}
          onClick={preventClose}
          onClose={close}
          {...p}
        />
      </Scroller>
    </>,
    root
  );
};
