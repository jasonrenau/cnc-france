import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme';
import DarkModeToggle from 'react-dark-mode-toggle';
// icons
import { TfiDashboard } from 'react-icons/tfi';
import { GoHome } from 'react-icons/go';
import { BsBook } from 'react-icons/bs';
//icons
const Navbar = ({ isDarkTheme, toggleTheme }) => {
  return (
    <Nav>
      <ul>
        <li>
          <NavLink to={'/'}>
            <GoHome className="nav-icon" />
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to={'/forum'}>
            <BsBook className="nav-icon" />
            Forum
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard'}>
            <TfiDashboard className="nav-icon" />
            Profil
          </NavLink>
        </li>
        <li className="darkmode">
          <DarkModeToggle
            checked={isDarkTheme}
            onChange={toggleTheme}
            size={70}
          />
        </li>
      </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 100%;

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0.5rem;
    list-style: none;
  }
  li {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  li a {
    text-decoration: none;
    padding: 0.2rem;
    font-size: 0.7rem;
    width: 100%;
    text-align: center;
    &.active {
      transition-property: background;
      transition-duration: 0.8s;

      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      border-radius: 1rem;
    }
  }
  .nav-icon {
    display: block;
    margin-inline: auto;
    margin-bottom: 0.1rem;
    font-size: 1.2rem;
  }
  @media only screen and (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export default Navbar;
