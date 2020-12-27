import styled from "styled-components";

export const ResponsiveGrid = styled.div`
  display: grid;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  @media screen and (min-width: 600px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  grid-template-columns: 1fr 1fr 1fr;
`;
