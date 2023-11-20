import { Link, useOutletContext } from 'react-router-dom';
import { theme } from '../../theme/';
import { keyframes, styled } from 'styled-components';

const ForumNavigation = () => {
  const { user } = useOutletContext();

  return (
    <Header>
      <div>
        {user && (
          <Link to={'/forum/post'}>
            <button className="btn-primary">Poster un article</button>
          </Link>
        )}
      </div>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100%;
  margin: 0 auto;
  align-items: center;
  padding: 1rem;
  background: none;

  button {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      background: ${theme.colors.primary3};
      color: ${theme.colors.grey10};
    }
  }

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    width: 95%;
    max-width: ${theme.width.maxWidth};
  }
`;

export default ForumNavigation;
