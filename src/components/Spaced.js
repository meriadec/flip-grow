import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: ${p => p.horizontal ? 'row' : 'column'};
  align-items: center;
  > * + * {
    ${p => {
      if (p.horizontal) {
        return `
          margin-left: ${p.of}px;
        `
      }
      return `
        margin-top: ${p.of}px;
      `
    }}
  }
`
