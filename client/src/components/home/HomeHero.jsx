/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';
import fond from '../../assets/images/fond-header.png';
import SubHeader from './SubHeader';

const HomeHero = () => {
  return (
    <HeroContainer>
      <article>
        <div className="hero-header">
          <div className="content">
            <h1>Le forum de la communauté</h1>
            <p>
              Le forum est un espace d'échange et de partage autour de
              l'usinage. Vous pouvez y partager vos expériences, vos problèmes
              et vos réalisations.
            </p>
            <Link to="/forum">
              <button>Découvrez le forum</button>
            </Link>
          </div>
          <div className="content-img">
            <img src={fond} alt="Machine d'usinage" />
          </div>
        </div>
      </article>
      <SubHeader />
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  width: 90%;
  max-width: ${theme.width.maxWidth};
  margin: 0 auto;
  padding-top: 2rem;

  article {
    padding-top: 5rem;
    .content-img {
      display: grid;
      place-content: center;

      img {
        width: 100%;
        z-index: 0;
        height: auto;
        transform: translateY(-15%);
      }
    }

    .hero-header {
      display: flex;
      flex-direction: column;
      align-items: center;

      .content {
        text-align: center;
        z-index: 1;
        width: 80%;

        h1 {
          letter-spacing: ${theme.letterSpacing.xs};
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        button {
          width: 100%;
          background: ${theme.colors.secondary7};
          border: none;
          padding: 0.5rem 1rem;
          font-size: 1.2rem;
          border-radius: 8px;
          color: ${theme.colors.grey1};
          transition: all 0.3s ease-in-out;
          &:hover {
            background: ${theme.colors.secondary3};
            color: ${theme.colors.grey10};
          }
        }
      }
    }
  }
`;

export default HomeHero;
