import styled from "styled-components";
import heroLanding from "../assets/heroLanding.jpg";
import { black2 } from "../variables/colors";

const OuterWrapper = styled.div`
  background-image: url(${heroLanding});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  max-height: 600px;
  width: 100%;
  border-bottom: 5px solid ${black2};
`;

export default OuterWrapper;
