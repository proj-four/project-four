import styled from "styled-components";
import { cyan1 } from "../variables/colors";

const Logo = () => {
  return (
    <div>
      <TempLogo>SHOW MAK</TempLogo>
    </div>
  );
};

export default Logo;

const TempLogo = styled.p`
  color: ${cyan1};
  font-weight: 700;
  font-size: 1.5rem;
`;
