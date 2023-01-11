import styled from 'styled-components';
import SlideShow from '../../components/SlideShow';
import colors from '../../utils/style/colors';
import flats from '../../data/logements.json';
import { Navigate, useParams } from 'react-router-dom';
import marked from '../../assets/STAR_PRIMARY.svg';
import unmarked from '../../assets/STAR_LIGHT.svg';
import Collapse from '../../components/Collapse';

/************************************************/
//*  Page Flat                                  */
/************************************************/

//** Style de la page */

// conteneur principal
const Wrapper = styled.div`
  margin-top: 20px;
  // affichage smartphone
  @media screen and (max-width: 768px) {
    margin-top: 27px;
  }
`;
// définition de la grille de placement
const GridWrapper = styled.article`
  margin: 30px 0 14px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-auto-rows: minmax(25px, 77px);
  grid-gap: 20px 10px;
  // affichage tablette
  @media screen and (max-width: 1224px) {
    grid-row-gap: 10px;
    grid-template-rows: repeat(4, auto);
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    margin: 15px 0 64.5px;
    grid-template-rows: repeat(5, auto);
    grid-auto-rows: minmax(18px, 73px);
    grid-gap: 10px 10px;
  }
`;
// titre de la page
const TitleWrapper = styled.div`
  grid-area: 1 / 1 / 2 / 9;
  // affichage smartphone
  @media screen and (max-width: 768px) {
    grid-area: 1 / 1 / 2 / 11;
  }
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
  // affichage smartphone
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;
const Location = styled.h2`
  font-size: 18px;
  // affichage smartphone
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
// nom et photo du propriétaire
const Name = styled.p`
  position: relative;
  grid-column: 9 / 10;
  grid-row: 1 / 2;
  right: -33%;
  text-align: right;
  font-weight: 500;
  align-self: flex-start;
  // affichage tablette
  @media screen and (max-width: 1224px) {
    right: -20px;
    align-self: center;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    position: static;
    grid-row: 3 / 4;
  }
`;
const Photo = styled.img`
  position: relative;
  grid-column: 10 / 11;
  grid-row: 1 / 2;
  width: 64px;
  height: auto;
  margin-right: 3px;
  top: -7.79%;
  border-radius: 100%;
  justify-self: self-end;
  // affichage tablette
  @media screen and (max-width: 1224px) {
    margin-right: 0px;
    top: 0px;
    width: 48px;
    align-self: center;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    position: static;
    grid-row: 3 / 4;
    width: 32px;
    margin: 0;
  }
`;
// zone des tags
const TagWrapper = styled.div`
  grid-area: 2 / 1 / 3 / 9;
  display: flex;
  column-gap: 10px;
  // affichage tablette
  @media screen and (max-width: 1224px) {
    grid-area: 3 / 1 / 4 / 11;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    grid-area: 2 / 1 / 3 / 11;
    margin-bottom: 6px;
    flex-wrap: wrap;
    row-gap: 6px;
  }
`;
const Tag = styled.span`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 115px;
  height: 25px;
  padding: 0 20px;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  // affichage smartphone
  @media screen and (max-width: 768px) {
    min-width: 84px;
    height: 18px;
    padding: 0 14px;
    font-size: 10px;
  }
`;
// notation en nombre d'étoiles
const RatingWrapper = styled.div`
  position: relative;
  grid-area: 2 / 9 / 3 / 11;
  justify-self: self-end;
  top: -50%;
  line-height: 0;
  // affichage tablette
  @media screen and (max-width: 1224px) {
    top: 0;
    grid-area: 2 / 1 / 3 / 11;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    position: static;
    grid-area: 3 / 1 / 4 / 9;
    justify-self: flex-start;
  }
`;
const Star = styled.img`
  // affichage tablette
  @media screen and (max-width: 1224px) {
    width: 32px;
    height: 100%;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    width: 18px;
    height: 100%;
  }
`;
// container du collapse description
const WrapperCollapseDescription = styled.div`
  grid-area: 3 / 1 / 4 / 6;
  width: 94.63%;
  min-height: 281px;
  // affichage tablette
  @media screen and (max-width: 1224px) {
    margin-top: 5px;
    grid-area: 4 / 1 / 5 / 6;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    grid-area: 4 / 1 / 5 / 11;
    width: 100%;
    min-height: auto;
  }
`;
// container du collapse équipement
const WrapperCollapseEquipment = styled.div`
  grid-area: 3 / 6 / 4 / 11;
  width: 94.63%;
  min-height: 281px;
  // affichage tablette
  @media screen and (max-width: 1224px) {
    margin-top: 5px;
    grid-area: 4 / 6 / 5 / 11;
  }
  // affichage smartphone
  @media screen and (max-width: 768px) {
    grid-area: 5 / 1 / 6 / 11;
    width: 100%;
    min-height: auto;
  }
`;

//** composant page */

const Flat = () => {
  const { flatId } = useParams();
  const flat = flats.find((flat) => flat.id === flatId);

  if (!flat) return <Navigate to='/error' replace={true} />;

  const [surname, name] = flat.host.name.split(' ');
  const scoringScale = [1, 2, 3, 4, 5];

  return (
    <Wrapper>
      <SlideShow images={flat.pictures} />
      <GridWrapper>
        <TitleWrapper>
          <Title>{flat.title}</Title>
          <Location>{flat.location}</Location>
        </TitleWrapper>
        <Name>
          {surname}
          <br />
          {name}
        </Name>
        <Photo src={flat.host.picture} alt='' />
        <TagWrapper>
          {flat.tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`}>{tag}</Tag>
          ))}
        </TagWrapper>
        <RatingWrapper>
          {scoringScale.map((score, index) =>
            flat.rating >= score ? (
              <Star key={`${marked}-${index}`} src={marked} alt='' />
            ) : (
              <Star key={`${unmarked}-${index}`} src={unmarked} alt='' />
            ),
          )}
        </RatingWrapper>
        <WrapperCollapseDescription>
          <Collapse size={'half'} title={'Description'} content={flat.description} />
        </WrapperCollapseDescription>
        <WrapperCollapseEquipment>
          <Collapse size={'half'} title={'Équipements'} content={flat.equipments} />
        </WrapperCollapseEquipment>
      </GridWrapper>
    </Wrapper>
  );
};

export default Flat;
