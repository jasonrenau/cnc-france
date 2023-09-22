import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
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
      </ul>
      <div className="darkmode">
        <DarkModeToggle
          checked={isDarkTheme}
          onChange={toggleTheme}
          size={100}
        />
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  position: sticky;
  display: grid;
  align-content: space-between;
  padding-block: 2rem;
  left: 0%;
  top: 0%;
  height: 100vh;
  width: 8rem;

  ul {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: rem;
    align-items: center;
    width: 100%;
    list-style: none;
  }
  li {
    margin: 0 auto;
    height: 6rem;
    width: 6rem;
  }

  li a {
    display: grid;
    place-content: center;
    height: 6rem;
    width: 6rem;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 20%;
    &.active {
      transition-property: background;
      transition-duration: 0.8s;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }
  .nav-icon {
    display: block;
    margin-inline: auto;
    margin-bottom: 0.1rem;
    font-size: 1.8rem;
  }
  .darkmode {
    display: grid;
    place-content: center;
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export default Navbar;
