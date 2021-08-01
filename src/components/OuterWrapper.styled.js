import styled from "styled-components";
import heroLanding from "../assets/heroLanding.jpg";
import { black2, grey } from "../variables/colors";

const OuterWrapper = styled.div`
  background-image: url(${heroLanding});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  max-height: 600px;
  width: 100%;
  border-bottom: 5px solid ${black2};

  display: grid;
  grid-template-columns: auto minmax(1fr, 1200px) auto;
  grid-template-rows: minmax(100vh, 600px) auto auto;
  /* grid-template-areas: "buffer "; */
`;

export default OuterWrapper;
