import styled from 'styled-components';
import colors from '../../utils/style/colors';
import PropTypes from 'prop-types';

/************************************************/
//*  Composant Banner                           */
/************************************************/

//** Style du composant */

const BackgroundBanner = styled.section`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding-top: ${(props) => (props.$type ? 33.47 : 18)}%;
  border-radius: 25px;
  line-height: 0px;
  // luminosité de l'image de fond
  background: ${colors.lightBackground} url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  background-blend-mode: ${(props) => (props.$type ? 'normal' : 'darken')};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background: ${colors.darkBackground};
    opacity: 0.3;
  }
  // affichage tablette
  @media screen and (max-width: 1224px) {
    border-radius: 18px;
    padding-top: ${(props) => (props.$type ? 50 : props.$isTitle ? 25 : 35)}%;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    border-radius: 10px;
    padding-top: ${(props) => (props.$type ? 76.2 : props.$isTitle ? 33 : 66.57)}%;
    &::before {
      border-radius: 10px;
    }
  }
`;
// pour placer le slogan de Home ou les controles du slideshow
const ContentBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${colors.secondary};
  font-weight: 500;
  font-size: 48px;
  // affichage tablette
  @media screen and (max-width: 1224px) {
    left: ${(props) => (props.$type ? 0 : 12.5)}%;
    justify-content: flex-start;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    left: ${(props) => (props.$type ? 0 : 16)}px;
  }
`;

//** Composant */

const Banner = ({ children, image, slideshow }) => (
  <BackgroundBanner $image={image} $type={slideshow} $isTitle={children}>
    <ContentBanner $type={slideshow}>{children}</ContentBanner>
  </BackgroundBanner>
);
// déclaration de type des props
Banner.propTypes = {
  image: PropTypes.string,
  slideshow: PropTypes.bool,
  children: PropTypes.any,
};
export default Banner;
