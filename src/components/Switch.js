// @flow

import React from "react";
import styled from "styled-components";

type Props = {
  value: boolean,
  onChange: () => void,
};

export default function Switch(props: Props) {
  const { value, onChange } = props;
  return (
    <StyledSwitch onClick={() => onChange(!value)}>
      <StyledSwitchBar isChecked={value} />
    </StyledSwitch>
  );
}

const StyledSwitch = styled.div.attrs({ tabIndex: 0 })`
  display: flex;
  align-items: center;
  user-select: none;
  padding: 10px 20px;
  border-radius: 2px;
  background: hsl(0, 0%, 27%);
  &:hover {
    background-color: hsl(0, 0%, 30%);
  }
`;

const StyledSwitchBar = styled.div`
  position: relative;
  background: hsl(0, 0%, 22%);
  width: 40px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid ${p => (p.isChecked ? "hsl(146, 30%, 40%)" : "transparent")};

  &:after {
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: hsl(146, ${p => (p.isChecked ? 30 : 0)}%, 35%);
    position: absolute;
    top: 2px;
    left: 2px;

    transition: 250ms ease;
    transition-property: transform background;
    transform: translate3d(${p => (p.isChecked ? 20 : 0)}px, 0, 0);
  }
`;
