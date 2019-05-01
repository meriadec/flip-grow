// @flow

import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck, FaBug } from "react-icons/fa";

import Modal from "./Modal";
import Button from "./Button";
import Spaced from "./Spaced";
import StyledLink from "./StyledLink";
import mock from "../mock-data.json";

export default ({
  openedModal,
  onClose
}: {
  openedModal: boolean,
  onClose: () => void
}) => (
  <div>
    <Modal
      size="small"
      isOpened={openedModal === "small"}
      resolve={() => load(mock.small)}
      onClose={onClose}
      ContentComponent={({ data }) => <p>data is {data}</p>}
      HeaderComponent={() => 'Watch an adress'}
      FooterComponent={({ onClose }) => (
        <Button hue={130} onClick={onClose} Icon={FaCheck}>
          Got it
        </Button>
      )}
    />
    <Modal
      size="big"
      isOpened={openedModal === "big"}
      resolve={() => load(mock.big)}
      onClose={onClose}
      ContentComponent={({ data }) => {
        const [isOpened, setOpened] = useState(false);
        return (
          <>
            <Spaced of={40}>
              <div>
                <SubTitle>Requirements</SubTitle>
                <p>
                  {"Earn dollars with bitcoin, "}
                  <StyledLink onClick={() => setOpened(true)}>
                    learn how
                  </StyledLink>
                  {" and get rich."}
                </p>
                <p>{data}</p>
              </div>
              <div>
                <SubTitle>Bullshit</SubTitle>
                <p>{mock.small}</p>
              </div>
            </Spaced>
            <Modal
              size="medium"
              isOpened={isOpened}
              resolve={() => Promise.resolve(mock.medium)}
              onClose={() => setOpened(false)}
              ContentComponent={({ data }) => {
                const [hasCrashed, setHasCrashed] = useState(false);
                if (hasCrashed) {
                  throw new Error("cannot do stuff");
                }
                return (
                  <Spaced of={20}>
                    <p>data is {data}</p>
                    <Button
                      hue={70}
                      onClick={() => setHasCrashed(true)}
                      Icon={FaBug}
                    >
                      Make me crash
                    </Button>
                  </Spaced>
                );
              }}
              HeaderComponent={() => 'Learn how'}
              FooterComponent={() => (
                <span style={{ color: "hsl(400, 30%, 50%)" }}>
                  Please buy Nano X Premium to get access.
                </span>
              )}
            />
          </>
        );
      }}
      HeaderComponent={() => 'Connect device'}
      FooterComponent={ModalFooter}
    />
  </div>
);

const load = data => new Promise(r => setTimeout(() => r(data), 700));
const ModalFooter = ({ onClose }: { onClose: () => void }) => {
  return (
    <Spaced horizontal of={15}>
      <StyledLink hue={250} onClick={onClose}>
        Cancel
      </StyledLink>
      <span>or</span>
      <Button hue={130} onClick={onClose}>
        Take action
      </Button>
    </Spaced>
  );
};

const SubTitle = styled.div`
  text-transform: uppercase;
  font-size: 13px;
  text-align: right;
  margin-bottom: 20px;
  color: hsl(400, 20%, 50%);
  font-weight: bold;
  letter-spacing: 1px;
  border-bottom: 2px solid hsl(400, 10%, 30%);
  user-select: none;
`;
