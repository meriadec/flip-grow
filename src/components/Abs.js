import styled from "styled-components";

export default styled.div`
  position: absolute;
  top: ${p => p.top || 0}px;
  left: ${p => p.left || 0}px;
  right: ${p => p.right || 0}px;
  bottom: ${p => p.bottom || 0}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
