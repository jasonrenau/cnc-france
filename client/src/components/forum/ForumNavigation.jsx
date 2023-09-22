import { Link, useOutletContext } from 'react-router-dom';
import { theme } from '../../theme/';
import { keyframes, styled } from 'styled-components';
import { BiAddToQueue } from 'react-icons/bi';

const ForumNavigation = () => {
  const { user } = useOutletContext();

  return (
    <Header>
      <div className="post">
        {user && (
          <Link to={'/forum/post'}>
            <StyledLink>
              <BiAddToQueue />
            </StyledLink>
          </Link>
        )}
      </div>
    </Header>
  );
};

const bounce = keyframes`
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100%;
  margin: 0 auto;
  align-items: center;
  padding: 1rem;
  background: none;

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    width: 95%;
    max-width: ${theme.width.maxWidth};
  }
`;

const StyledLink = styled.div`
  display: grid;
  place-content: center;
  text-decoration: none;
  background: ${theme.colors.primary6};
  color: ${theme.colors.grey1};
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  animation: ${bounce} 2s linear infinite;
  svg {
    width: 3rem;
    height: 3rem;
  }
`;

export default ForumNavigation;
