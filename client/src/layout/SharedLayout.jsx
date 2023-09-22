import { Outlet, useLoaderData } from 'react-router-dom';
import MobileNavbar from '../components/navbar/MobileNavbar';
import DesktopNavbar from '../components/navbar/DesktopNavbar';
import { ThemeProvider, styled } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from '../theme/globalStyles';
import { theme } from '../theme';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import Loader from '../components/Loader';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const {
        data: { user },
      } = await axios('/api/v1/users/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { user };
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  }
  return { user: null };
};

const SharedLayout = () => {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { user } = useLoaderData();

  const isDarkTheme = theme === 'dark';
  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? 'light' : 'dark';
    setTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Body>
        <MobileNavbar
          isDarkTheme={isDarkTheme}
          user={user}
          toggleTheme={toggleTheme}
        />
        <DesktopNavbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        {isLoading ? <Loader /> : <Outlet context={{ user }} />}
      </Body>
    </ThemeProvider>
  );
};

const Body = styled.div`
  @media only screen and (min-width: ${theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 8rem 1fr;
  }
`;

export default SharedLayout;
