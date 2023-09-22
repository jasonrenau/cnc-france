import { styled } from 'styled-components';
import { theme } from '../theme';
import { Link } from 'react-router-dom';

const ErrorInPages = ({ err, link, linkMessage }) => {
  return (
    <Section>
      <h1>{err}</h1>
      {link && linkMessage && <Link to={link}>{linkMessage}</Link>}
    </Section>
  );
};

const Section = styled.section`
  display: grid;
  place-content: center;
  height: fit-content;
  width: 80%;
  margin-top: 2rem;
  margin-inline: auto;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-align: center;
  letter-spacing: ${theme.letterSpacing.xs};
  margin-bottom: 0.5rem;
  h1 {
    font-size: 1rem;
  }

  a {
    display: block;
    text-align: center;
  }
`;

export default ErrorInPages;
