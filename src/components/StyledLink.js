// @flow

import styled from "styled-components";

const DEFAULT_HUE = 300;

export default styled.a.attrs({
  tabIndex: 0,
})`
  color: hsl(${p => p.hue || DEFAULT_HUE}, 40%, 70%);
  text-decoration: none;
  background: hsl(${p => p.hue || DEFAULT_HUE}, 40%, 70%, 0.08);
  padding: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: hsl(${p => p.hue || DEFAULT_HUE}, 40%, 80%, 0.1);
  }
  &:active {
    background: hsl(${p => p.hue || DEFAULT_HUE}, 40%, 60%, 0.1);
  }
`;
