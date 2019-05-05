// @flow

import React from "react";
import styled from "styled-components";

const StyledButton = styled.div.attrs({
  tabIndex: 0
})`
  display: inline-flex;
  user-select: none;
  height: 48px;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 2px;
  color: hsla(${p => p.hue}, 49%, 57%, 1);
  background: hsla(${p => p.hue}, 49%, 57%, 0.1);
  border: 2px solid hsla(${p => p.hue}, 49%, 57%, 0.5);
  transition: 100ms linear background;

  &:hover,
  &:focus {
    background: hsla(${p => p.hue}, 49%, 57%, 0.2);
  }

  &:active {
    background: hsla(${p => p.hue}, 49%, 30%, 0.3);
  }
`;

export default ({
  tabIndex,
  Icon,
  children,
  ...props
}: {
  tabIndex?: number,
  Icon?: React$ComponentType<*>,
  children: React$Node
}) => (
  <StyledButton tabIndex={typeof tabIndex === void 0 ? 1 : 0} {...props}>
    {Icon && (
      <IconWrapper>
        <Icon />
      </IconWrapper>
    )}
    {children}
  </StyledButton>
);

const IconWrapper = styled.div`
  margin-right: 10px;
`;
