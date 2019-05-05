// @flow

import React from "react";
import styled, { keyframes } from "styled-components";
import { FaCircleNotch, FaSpinner } from "react-icons/fa";

import Rotating from "./Rotating";
import Abs from "./Abs";

export const SpinnerBar = ({ width }: { width?: number }) => (
  <StyledSpinnerBar width={width}>
    <SpinnerThumb>
      <SpinnerThumbInner />
    </SpinnerThumb>
  </StyledSpinnerBar>
);

export const SpinnerCircle = () => (
  <StyledSpinnerCircle>
    <SpinnerBall />
    <SpinnerBall left />
  </StyledSpinnerCircle>
);

export default () => (
  <SpinnerIcons>
    <Abs sticky>
      <div
        style={{
          border: "3px solid hsl(0, 0%, 22%, 0.4)",
          width: 60,
          height: 60,
          borderRadius: "50%",
          boxShadow: "hsl(0, 0%, 10%, 0.3) 0 2px 2px"
        }}
      />
    </Abs>
    <Abs sticky>
      <Rotating speed={1}>
        <FaCircleNotch color="hsl(190, 0%, 35%)" size={50} />
      </Rotating>
    </Abs>
    <Abs sticky>
      <Rotating speed={7}>
        <FaSpinner color="hsl(0, 0%, 55%)" size={25} />
      </Rotating>
    </Abs>
  </SpinnerIcons>
);

const SpinnerIcons = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinnerCircle = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid hsl(0, 0%, 100%, 0.1);
  border-radius: 50%;
  position: relative;
`;

const SpinnerBall = styled.div`
  animation: ${rotate} ${p => (p.left ? 0.7 : 1)}s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &:after {
    content: "";
    position: absolute;
    width: ${p => (p.left ? 10 : 5)}px;
    height: ${p => (p.left ? 10 : 5)}px;
    background: hsl(0, 0%, 100%, 0.2);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: ${p => (p.left ? "3px" : "auto")};
    right: ${p => (p.left ? "auto" : "15px")};
    background: red;
  }
`;

const spinnerAnim = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const StyledSpinnerBar = styled.div`
  position: relative;
  width: ${p => p.width || 80}px;
  height: 10px;
  border-radius: 4px;
`;

const SpinnerThumb = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: calc(100% - 24px);
  animation: ${spinnerAnim} 500ms ease infinite;
`;

const SpinnerThumbInner = styled.div`
  background: hsl(0, 0%, 100%, 0.2);
  width: 20px;
  border-radius: 4px;
  height: 100%;
`;
