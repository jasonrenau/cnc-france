import { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';

// Atropos
import 'atropos/css';
// React slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const lightTheme = {
  body: theme.colors.grey1,
  label: theme.colors.grey12,
  text: theme.colors.grey12,
  nav: theme.colors.grey2,
  border: theme.colors.grey6,
  icon: theme.colors.grey12,
  background: theme.colors.grey1,
  primaryBackground: theme.colors.primary5,
  primaryBorder: theme.colors.primary6,
  primaryText: theme.colors.primary12,
  secondaryBackground: theme.colors.secondary6,
  secondaryBorder: theme.colors.secondary7,
  secondaryText: theme.colors.grey12,
  cardBackground: theme.colors.grey2,
  cardBorder: theme.colors.grey6,
  cardBorderSecondary: theme.colors.grey4,
  cardText: theme.colors.primary12,
};

export const darkTheme = {
  body: theme.colors.grey11,
  label: theme.colors.grey1,
  text: theme.colors.grey2,
  nav: theme.colors.grey12,
  border: theme.colors.grey10,
  icon: theme.colors.grey1,
  background: theme.colors.grey10,
  primaryBackground: theme.colors.primary11,
  primaryBorder: theme.colors.primary9,
  primaryText: theme.colors.primary1,
  secondaryBackground: theme.colors.secondary11,
  secondaryBorder: theme.colors.secondary9,
  secondaryText: theme.colors.secondary1,
  cardBackground: theme.colors.grey10,
  cardBorder: theme.colors.grey9,
  cardBorderSecondary: theme.colors.grey8,
  cardText: theme.colors.primary1,
};

export const GlobalStyles = createGlobalStyle`

body{
  background: ${({ theme }) => theme.body};
}

h1,h2,h3,h4,h5,h6,p{
  color: ${({ theme }) => theme.text};
}

.btn-primary{
  background: ${({ theme }) => theme.primaryBackground};
  border: 1px solid ${({ theme }) => theme.primaryBorder};
  color: ${({ theme }) => theme.primaryText};
  svg{
    color: ${({ theme }) => theme.primaryText};
  }
}

.btn-secondary{
  background: ${({ theme }) => theme.secondaryBackground};
  border: 1px solid ${({ theme }) => theme.secondaryBorder};
  color: ${({ theme }) => theme.secondaryText};
}

.filter{
  select{
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
  }
}

.search{
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  // gerer les input enfant 
  input{
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    &::placeholder{
      color: ${({ theme }) => theme.text};
    }
  }
  button{
    background: ${({ theme }) => theme.background};
    svg{
      color: ${({ theme }) => theme.text};
    }
  }
}


label{
  color: ${({ theme }) => theme.label};
}

input,select,option{
  padding: 0.5rem;
  border-radius: 0.3rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  &::placeholder{
      color: ${({ theme }) => theme.text};
    }
}

.jodit-wysiwyg, .jodit-toolbar__box,.jodit-status-bar{  background: ${({
  theme,
}) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
}

header{
  background: ${({ theme }) => theme.nav};
  color: ${({ theme }) => theme.text};
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


.article-card{
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.cardText};
  .category{
    background: ${({ theme }) => theme.primaryBackground};
    color: ${({ theme }) => theme.primaryText};
  }
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
