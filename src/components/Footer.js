import styled from "styled-components";
import { grey, black, cyan2 } from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <SubContainer>
          <span>Created at</span>
          <a href="https://junocollege.com"> Juno College </a>
          <span>by </span>
        </SubContainer>

        <FlexContainer>
          <FlexChild>
            <a href="https://www.linkedin.com/in/kaunainkarmali/">
              Kaunain Karmali <Icon icon={faLinkedin} />
            </a>
          </FlexChild>
          <FlexChild>
            <a href="https://www.linkedin.com/in/maokitamura/">
              Mao Kitamura <Icon icon={faLinkedin} />
            </a>
          </FlexChild>
          <FlexChild>
            <a href="https://www.linkedin.com/in/abdulkadir-musse/">
              Abdulkadir Musse <Icon icon={faLinkedin} />
            </a>
          </FlexChild>
        </FlexContainer>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  max-width: 100%;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${grey};
  color: ${black};
  font-size: 1rem;
  font-weight: 900;

  a {
    text-decoration: none !important;
    color: ${black};
    font-weight: 900;
  }

  & a:hover {
    color: ${cyan2};
  }

  @media (max-width: 565px) {
    font-size: 0.8rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.div`
  text-align: center;
  margin-bottom: 5px;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 565px) {
    width: 350px;
  }

  @media (max-width: 470px) {
    flex-direction: column;
    width: auto;
  }
`;

const FlexChild = styled.div`
  @media (max-width: 470px) {
    margin: 5px 0px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    color: ${cyan2};

    background-color: ${grey};
    text-decoration: none;
  }
`;
