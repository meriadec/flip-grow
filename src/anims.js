import Animated from "animated/lib/targets/react-dom";

export const FRICTION_MULT = 1;

export const SPEEDS = {
  scaleX: { tension: 100, friction: 10 * FRICTION_MULT },
  scaleY: { tension: 50, friction: 10 * FRICTION_MULT },
  enter: { tension: 200, friction: 20 * FRICTION_MULT }
};

export function spring(anim, toValue, config) {
  return Animated.spring(anim, { toValue, ...config });
}
