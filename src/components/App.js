import { hot } from "react-hot-loader";
import React, { useState, useCallback } from "react";
import { FaExchangeAlt, FaEye } from "react-icons/fa";

import { useGlobalAnimations, useSetGlobalAnimations } from "../hooks/globalAnimations";
import GlobalStyle from "./GlobalStyle";
import ModalsContainer from "./ModalsContainer";
import Card from "./Card";
import Spaced from "./Spaced";
import Button from "./Button";
import Switch from "./Switch";

const HeaderComponent = () => "Ledger Swag";

const App = () => {
  const [openedModal, setOpenedModal] = useState(null);
  const onClose = () => {
    setOpenedModal(null);
  };

  const ContentComponent = useCallback(
    () => (
      <Spaced horizontal of={20}>
        <Button
          hue={146}
          onClick={() => setOpenedModal("big")}
          Icon={FaExchangeAlt}
        >
          Connect device
        </Button>
        <Button
          hue={400}
          onClick={() => {
            setOpenedModal("small");
          }}
          Icon={FaEye}
        >
          Watch an address
        </Button>
      </Spaced>
    ),
    [setOpenedModal]
  );

  const globalAnimationsEnabled =  useGlobalAnimations();
  const setGlobalAnimations = useSetGlobalAnimations()

  return (
    <>
      <GlobalStyle />
      <ModalsContainer
        setOpenedModal={setOpenedModal}
        openedModal={openedModal}
        onClose={onClose}
      />
      <Spaced of={20}>
        <Card
          HeaderComponent={HeaderComponent}
          ContentComponent={ContentComponent}
        />
        <Switch value={globalAnimationsEnabled} onChange={setGlobalAnimations}>Enable animations</Switch>
      </Spaced>
    </>
  );
};

export default hot(module)(App); // eslint-disable-line
