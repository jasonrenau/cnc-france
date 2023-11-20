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
    const resp = await axios.post('/api/v1/auth/register', data);
    localStorage.setItem('token', resp.data.token);
    toast.success('Inscription réussie');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <FormContainer>
      <div className="register-form">
        <Form className="form" method="POST">
          <h1>Créer un compte</h1>
          <div className="form-row">
            <label htmlFor="pseudo">Pseudo</label>
            <input
              type="text"
              placeholder="Votre pseudo"
              name="pseudo"
              required
            />
          </div>
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
              placeholder="Mot de passe"
              name="password"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="jobs">Métier</label>
            <input
              type="text"
              placeholder="Votre métier"
              name="jobs"
              required
            />
          </div>
          <SubmitButton type="submit" className="btn-primary">
            S'inscrire
          </SubmitButton>
          <p>
            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
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

  .register-form {
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
        font-size: 1rem;
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

export default Register;
