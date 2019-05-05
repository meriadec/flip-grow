import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, *:after, *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: inherit;
    background: transparent;
    border: none;
    font: inherit;
  }

  body {
    background: hsl(0, 0%, 27%);
    font-family: sans-serif;
    padding: 0;
    margin: 0;
    color: #aeaeae;
    font-size: 16px;
    line-height: 24px;

    margin: 20px;
    margin-top: 80px;
  }

  svg {
    pointer-events: none;
  }
`;
