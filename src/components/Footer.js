import styled from "styled-components";
import { white, grey,black } from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
    <FooterWrapper>
        <div>
            Created at
            <a href="https://junocollege.com"> Juno College </a>
            by Kaunain Karmali{" "}
            <a href="https://www.linkedin.com/in/kaunainkarmali/">
            <Icon icon={faLinkedin} />
            </a>{" "}
            Mao Kitamura
            <a href="https://www.linkedin.com/in/maokitamura/">
            {" "}
            <Icon icon={faLinkedin} />
            </a>{" "}
            Abdulkadir Musse
            <a href="https://www.linkedin.com/in/abdulkadir-musse/">
            {" "}
            <Icon icon={faLinkedin} />
            </a>
        </div>
    </FooterWrapper>
    );
};

export default Footer;

const FooterWrapper = styled.footer`
    max-width: 100%;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${grey};
    color:${black};
    font-size: 17px;
    font-weight: 900;
    

    a {
        text-decoration: none !important;
        color: ${black};
        font-weight: 900;
    }

    & a:hover {
        color: ${white}
    }


`;

const Icon = styled(FontAwesomeIcon)`
        &:hover,
        &:active,
        &:focus {
        cursor: pointer;
        color: ${white};
        background-color: ${grey};
        text-decoration:none;
    
`;

