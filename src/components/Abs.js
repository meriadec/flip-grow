import styled from "styled-components";

const compute = k => p => (k in p ? `${p[k]}px` : p.sticky ? 0 : "auto");

export default styled.div`
  position: absolute;
  top: ${compute("top")};
  left: ${compute("left")};
  right: ${compute("right")};
  bottom: ${compute("bottom")};

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: ${p => 'z' in p ? p.z : 'unset'};
`;
