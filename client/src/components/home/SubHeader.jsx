import styled from 'styled-components';
import Slider from 'react-slick';
import { theme } from '../../theme';
import {
  amada,
  dmgmori,
  doosan,
  fanuc,
  heidenhain,
  komatsu,
  mazak,
  optiups,
} from '../../assets/index';

const SubHeader = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 1000,
    autoplay: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const cardImages = [
    amada,
    dmgmori,
    doosan,
    fanuc,
    heidenhain,
    komatsu,
    mazak,
    optiups,
  ];

  return (
    <Container>
      <Slider {...settings}>
        {cardImages.map((image, index) => (
          <div className="card" key={index}>
            <img className="image" src={image} alt={image} />
          </div>
        ))}
      </Slider>
    </Container>
  );
};

const Container = styled.article`
  width: 70vw;
  max-width: ${theme.width.maxWidth};
  margin: 0 auto;
  padding: 2rem 0;

  .slick-slide {
    padding: 10px;
  }
  .slick-prev:before,
  .slick-next:before {
    color: ${theme.colors.primary5};
  }
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    padding-inline: 1rem;
  }

  .image {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

export default SubHeader;
