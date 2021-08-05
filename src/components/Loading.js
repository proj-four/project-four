import styled, { keyframes } from "styled-components";
import { cyan1 } from "../variables/colors";

const Loading = () => {
  return (
    <Container>
      <Spinner></Spinner>
    </Container>
  )
}

export default Loading;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
`;

const rotate = keyframes`
from {
  transform: rotate(0);
}
to {
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  animation: ${rotate} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid ${cyan1};
  border-right: 2px solid ${cyan1};
  border-bottom: 2px solid ${cyan1};
  border-left: 4px solid black;
  background: transparent;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;