import { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';

// Atropos
import 'atropos/css';
// React slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const lightTheme = {
  body: theme.colors.grey1,
  label: theme.colors.grey10,
  text: theme.colors.grey10,
  nav: theme.colors.grey2,
  border: theme.colors.grey3,
  icon: theme.colors.grey9,
  background: theme.colors.grey1,
};

export const darkTheme = {
  body: '#38444c',
  label: theme.colors.grey1,
  text: theme.colors.grey1,
  nav: theme.colors.grey10,
  border: theme.colors.grey7,
  icon: theme.colors.grey1,
  background: theme.colors.grey8,
};

export const GlobalStyles = createGlobalStyle`
body{
  background: ${({ theme }) => theme.body};
}
h1,h2,h3,h4,h5,h6,p{
  color: ${({ theme }) => theme.text};
}

label{
  color: ${({ theme }) => theme.label};
}
header{
  background: ${({ theme }) => theme.header};
}
nav{
  background: ${({ theme }) => theme.nav};
  border-right: 1px solid ${({ theme }) => theme.border};
  .nav-icon  {
    color: ${({ theme }) => theme.icon};
  }
  a{
    color: ${({ theme }) => theme.text};
    &.active{
      background: ${({ theme }) => theme.background};
    }
  }
}
.comment-form{
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
}
.add-article-form,.edit-article-form{
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
}
.login-form,.register-form{
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  a{
    color: ${theme.colors.primary5};
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
  .img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  h1,h2,h3,h4,h5,h6{
    font-family: 'Montserrat', sans-serif;
  }
  p,span,cite,a,button,select,label,option,li{
    font-family: 'Hind', sans-serif;
  }
}
`;
