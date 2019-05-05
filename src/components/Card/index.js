// @flow

import React from "react";
import styled from "styled-components";

type Props = {
  HeaderComponent: React$ComponentType<*>,
  ContentComponent: React$ComponentType<*>,
  FooterComponent: React$ComponentType<*>
};

export default function Card(props: Props) {
  const { HeaderComponent, ContentComponent, FooterComponent } = props;
  return (
    <StyledCard>
      {HeaderComponent && (
        <StyledCardHeader>
          <HeaderComponent />
        </StyledCardHeader>
      )}
      <StyledCardContent>
        <ContentComponent />
      </StyledCardContent>
      <FooterComponent />
    </StyledCard>
  );
}

const StyledCard = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border: 2px solid hsl(0, 0%, 24%);
`;

const StyledCardHeader = styled.div`
  background: hsl(0, 0%, 24%);
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: hsla(0, 0%, 55%, 1);
  user-select: none;

  position: relative;
  padding: 0 16px;
  height: 48px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledCardContent = styled.div`
  flex-grow: 1;
  padding: 32px;
`;

const StyledCardFooter = styled.div`
  min-height: 64px;
  background: hsl(0, 0%, 26%);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
`;
