import styled from "styled-components";
import {
    white,
    grey,
    } from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    } from "@fortawesome/free-brands-svg-icons";



const Footer = () => {
    return (
    <FooterWrapper>
        <div className="SocialTray">
        Created at 
        <a href="https://junocollege.com"> Juno College </a>
        by  <a href="https://www.linkedin.com/in/kaunainkarmali/"><Icon icon={faLinkedin}/></a>
            Kaunain Karmali
        <a href="https://www.linkedin.com/in/maokitamura/"><Icon icon={faLinkedin}/></a> Mao Kitamura
        and <a href="https://www.linkedin.com/in/abdulkadir-musse/"> <Icon icon={faLinkedin}/></a> 
        Abdulkadir Musse
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
    color:${white}

    a {
        &:hover,
        &:active,
        &:focus {
        cursor: pointer;
        color: ${white};
        background-color: ${grey};
        outline: none;
        }
    }
`;

const Icon = styled(FontAwesomeIcon)`
        &:hover,
        &:active,
        &:focus {
        cursor: pointer;
        color: ${white};
        background-color: ${grey};
        outline: none;
`;