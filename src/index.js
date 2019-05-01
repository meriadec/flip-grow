import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";

import GlobalAnimationsProvider from "./hooks/globalAnimations";
import App from "./components/App";

const node = document.getElementById("app");

render(
  <GlobalAnimationsProvider>
    <App />
  </GlobalAnimationsProvider>,
  node
);
