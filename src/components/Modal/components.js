// @flow

import React from "react";
import Animated from "animated/lib/targets/react-dom";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

import Abs from "../Abs";
import Button from "../Button";
import Spinner from "../Spinner";

export const Content = ({
  data,
  onClose,
  ContentComponent,
  HeaderComponent,
  FooterComponent,
  innerOpacity,
  headerAnim,
  footerAnim,
  pointerEvents,
  size,
  ...props
}: {
  data: *,
  size: *,
  onClose: () => void,
  ContentComponent: React$ComponentType<*>,
  HeaderComponent?: React$ComponentType<*>,
  FooterComponent?: React$ComponentType<*>,
  innerOpacity: Animated.Value,
  headerAnim: Animated.Value,
  footerAnim: Animated.Value,
  pointerEvents: boolean
}) => {
  const subProps = {
    onClose,
    data
  };

  const headerTranslateY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0]
  });

  return (
    <StyledDialogBase pointerEvents={pointerEvents} {...props}>
      <StyledDialog size={size} style={{ opacity: innerOpacity }}>
        <ErrorBoundary onClose={onClose}>
          {HeaderComponent && (
            <StyledDialogHeader
              style={{
                opacity: headerAnim,
                transform: [{ translateY: headerTranslateY }]
              }}
            >
              <CloseButton onClick={onClose} />
              <HeaderComponent {...subProps} />
            </StyledDialogHeader>
          )}
          <StyledDialogContent>
            <ContentComponent {...subProps} />
          </StyledDialogContent>
          {FooterComponent && (
            <StyledDialogFooter
              style={{
                opacity: footerAnim,
                transform: [
                  {
                    translateY: footerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0]
                    })
                  }
                ]
              }}
            >
              <FooterComponent {...subProps} />
            </StyledDialogFooter>
          )}
        </ErrorBoundary>
      </StyledDialog>
    </StyledDialogBase>
  );
};

export const Loader = (p: *) => (
  <StyledLoader {...p}>
    <Spinner />
    <Abs bottom={20}>
      <LoaderText>Loading...</LoaderText>
    </Abs>
  </StyledLoader>
);

const LoaderText = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 11px;
  color: hsl(0, 0%, 40%);
  background: hsl(0, 0%, 25%);
  padding: 0 10px;
  border-radius: 4px;
`;

const CloseButton = ({ onClick }: *) => (
  <StyledClose onClick={onClick}>
    <FiX size={16} />
  </StyledClose>
);

export const Fixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  ${p => {
    if (p.center) {
      return `
        display: flex;
        align-items: center;
        justify-content: center;
      `;
    }
  }};
`;

class ErrorBoundary extends React.Component<
  {
    onClose: () => void,
    children: *,
  },
  {
    err: ?Error
  }
> {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  componentDidCatch(err) {
    this.setState({ err });
  }
  render() {
    const { onClose, children } = this.props;
    const { err } = this.state;
    if (err) {
      return (
        <>
          <StyledDialogHeader sat={10}>
            <CloseButton onClick={onClose} />
            {`ERROR: ${err.message}`}
          </StyledDialogHeader>
          <StyledDialogContent sat={10}>
            <pre
              style={{
                fontFamily: "monospace",
                overflow: "auto",
                border: "1px solid hsl(0, 14%, 31%)",
                padding: 10,
                fontSize: 13,
                lineHeight: "16px",
                color: "hsl(0, 100%, 70%)",
                borderRadius: 2
              }}
            >
              {err.stack}
            </pre>
          </StyledDialogContent>
          <StyledDialogFooter sat={10}>
            <Button onClick={onClose} hue={0}>
              Close
            </Button>
          </StyledDialogFooter>
        </>
      );
    }
    return children;
  }
}

export const Scroller = ({
  gutter,
  pointerEvents,
  children,
  onBackClick
}: *) => (
  <ScrollerLevel1 pointerEvents={pointerEvents} onClick={onBackClick}>
    <ScrollerLevel2>
      <ScrollerLevel3 gutter={gutter}>
        <div>{children}</div>
      </ScrollerLevel3>
    </ScrollerLevel2>
  </ScrollerLevel1>
);

const ScrollerLevel1 = styled(({ pointerEvents, ...p }) => <Fixed {...p} />)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // enable scroll
  overflow: auto;
  pointer-events: ${p => (p.pointerEvents ? "auto" : "none")};
`;

const ScrollerLevel2 = styled.div`
  pointer-events: none;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  min-height: 0;
`;

const ScrollerLevel3 = styled(Animated.div)`
  margin-top: ${p => p.gutter}px;
  margin-bottom: ${p => p.gutter}px;
  pointer-events: none;
`;

export const Backdrop = styled(p => <Fixed as={Animated.div} {...p} />)`
  background: rgba(0, 0, 0, 0.4);
  pointer-events: none;
`;

const StyledClose = styled.div.attrs({
  tabIndex: 0
})`
  position: absolute;
  border-radius: 2px;
  top: 4px;
  right: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  transition: 100ms linear;
  transition-property: background color;
  &:hover {
    color: #bbb;
    background-color: rgba(255, 255, 255, 0.05);
  }
  &:active {
    color: #777;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const StyledDialogBase = styled(({ pointerEvents, ...p }) => (
  <Animated.div {...p} />
))`
  border-radius: 2px;
  background: hsl(0, 0%, 27%);
  background: hsl(0, ${p => p.sat || 0}%, 26%);
  box-shadow: hsla(0, 0%, 0%, 0.2) 0 12px 30px;
  border: 2px solid hsl(0, 0%, 35%);
  overflow: hidden;
  pointer-events: ${p => (p.pointerEvents ? "auto" : "none")};
`;

const StyledLoader = styled(StyledDialogBase)`
  position: relative;
  user-select: none;
  display: flex;
  justify-content: center;
  font-size: 13px;
  color: hsl(0, 0%, 50%);
`;

const StyledDialog = styled(Animated.div)`
  display: flex;
  flex-direction: column;
  width: ${p =>
    p.size
      ? p.size === "small"
        ? 400
        : p.size === "medium"
          ? 500
          : 600
      : 500}px;
  min-height: 200px;
`;

const StyledDialogHeader = styled(Animated.div)`
  user-select: none;
  background: hsl(0, ${p => p.sat || 0}%, 30%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: hsla(0, 0%, 55%, 1);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
  padding: 0 16px;
  height: 48px;
  position: relative;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

const StyledDialogContent = styled.div`
  flex-grow: 1;
  padding: 32px;
  background: hsl(0, ${p => p.sat || 0}%, 26%);
`;

const StyledDialogFooter = styled(Animated.div)`
  min-height: 64px;
  background: hsl(0, ${p => p.sat || 0}%, 23%);
  color: hsl(0, 0%, 35%);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
`;
