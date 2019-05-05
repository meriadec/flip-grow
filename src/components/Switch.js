// @flow

import React from "react";
import styled from "styled-components";

type Props = {
  value: boolean,
  label?: React$Node,
  onChange: boolean => void
};

export default function Switch(props: Props) {
  const { value, onChange, label, isFake } = props;
  return (
    <StyledSwitch onClick={() => onChange(!value)}>
      <StyledSwitchBar isChecked={value} />
      {label && <StyledLabel>{label}</StyledLabel>}
      {isFake && <Fake>Fake</Fake>}
    </StyledSwitch>
  );
}

const StyledSwitch = styled.div.attrs({ tabIndex: 0 })`
  display: flex;
  align-items: center;
  user-select: none;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 2px;
  background: hsl(0, 0%, 29%);
  transition: 100ms linear background;
  border: 1px solid hsl(0, 0%, 25%);
  box-shadow: hsla(0, 0%, 100%, 0.05) 0 1px 0 inset,
    hsla(0, 0%, 100%, 0.05) 0 -1px 0 inset, hsla(0, 0%, 0%, 0.05) 0 2px 2px;
  &:hover {
    background-color: hsl(0, 0%, 30%);
  }
  &:active {
    background-color: hsl(0, 0%, 28%);
  }
  &:focus {
    z-index: 1;
  }
`;

const StyledLabel = styled.div`
  margin-left: 16px;
`;

const StyledSwitchBar = styled.div`
  position: relative;
  background: hsl(0, 0%, 22%);
  width: 40px;
  height: 24px;
  border-radius: 40px;
  border: 2px solid ${p => (p.isChecked ? "hsl(146, 30%, 40%)" : "transparent")};

  &:after {
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 16px;
    background: hsl(146, ${p => (p.isChecked ? 30 : 0)}%, 35%);
    position: absolute;
    top: 2px;
    left: 2px;

    transition: 250ms ease;
    transition-property: transform background;
    transform: translate3d(${p => (p.isChecked ? 16 : 0)}px, 0, 0);
  }
`;

const Fake = styled.div`
  font-size: 13px;
  height: 18px;
  display: flex;
  align-items: center;
  background: hsl(0, 0%, 40%);
  color: hsl(400, 20%, 70%);
  text-transform: uppercase;
  border-radius: 4px;
  padding: 0 4px;
  font-weight: bold;

  // todo: not good
  margin-left: auto;
`;
