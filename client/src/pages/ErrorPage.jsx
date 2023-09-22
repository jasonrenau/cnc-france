/* eslint-disable react/no-unescaped-entities */
import { errorImage, errorPageOther } from '../assets/index';
import { Link, useRouteError } from 'react-router-dom';
import { styled } from 'styled-components';
import { theme } from '../theme';

const ErrorPage = () => {
  const error = useRouteError();

  // check de lerreur status si 404 sinon affiche l'erreur correspondante
  if (error?.status === 404) {
    return (
      <Main>
        <div className="flow">
          <img src={errorImage} alt="Probleme interne" />
          <h1>Oups ! erreur {error.status}</h1>
          <p>
            Une erreur est survenue, la page demandée n'existe pas ou plus !
          </p>
          <Link to="/">
            <button>Retourner à l&apos;accueil</button>
          </Link>
        </div>
      </Main>
    );
  } else {
    return (
      <Main>
        <div className="flow">
          <img src={errorPageOther} alt="Probleme interne" />
          <h1>Oups ! erreur {error.status}</h1>
          <p>Une erreur est survenue, veuillez réessayer plus tard !</p>
          <Link to="/">
            <button>Retourner à l&apos;accueil</button>
          </Link>
        </div>
      </Main>
    );
  }
};

const Main = styled.main`
  text-align: center;
  display: grid;
  place-content: center;
  min-height: 100vh;

  .flow {
    margin-bottom: 5rem;
    img {
      display: block;
      height: auto;
      width: 100%;
      margin-bottom: 2rem;
    }
    button {
      background-color: ${theme.colors.secondary7};
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border-radius: 6px;
      border: none;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: ${theme.colors.secondary8};
        scale: 1.05;
      }
    }
  }
`;

export default ErrorPage;
