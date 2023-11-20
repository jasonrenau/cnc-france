/* eslint-disable react/no-unescaped-entities */
import { Link, Form, redirect } from 'react-router-dom';
import { styled } from 'styled-components';
import { theme } from '../theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import { login } from '../assets';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const resp = await axios.post('/api/v1/auth/login', data);
    localStorage.setItem('token', resp.data.token);
    toast.success('Connexion réussie');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const Login = () => {
  return (
    <FormContainer>
      <div className="login-form">
        <h1>Connexion</h1>
        <Form method="POST">
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Votre email"
              name="email"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              minLength="5"
              placeholder="Mot de passe"
              name="password"
              required
            />
          </div>
          <SubmitButton type="submit" className="btn-primary">
            Se connecter
          </SubmitButton>
          <p>
            Vous n'êtes pas membre ? <Link to="/register">S'inscrire</Link>
          </p>
        </Form>
      </div>
    </FormContainer>
  );
};

const FormContainer = styled.main`
  background: url(${login}) no-repeat center/cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    display: grid;
    gap: 2rem;
    border-radius: 10px;
    padding: 2rem;
    width: 95%;
    max-width: ${theme.width.maxFormWidth};

    h1 {
      text-align: center;
      margin-bottom: 1rem;
      letter-spacing: ${theme.letterSpacing.xs};
      font-size: 1.8rem;
    }
    p,
    a {
      font-size: 1.1rem;
    }

    .form-row {
      margin-bottom: 1rem;

      label {
        display: block;
        font-size: 1.2rem;
        margin-bottom: 0.25rem;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.border};
      }
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${theme.colors.primary3};
    color: ${theme.colors.grey10};
  }
`;

export default Login;
