import axios from 'axios';
import { useEffect } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { theme } from '../../../theme';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request, params }) => {
  const { id } = params;
  const token = localStorage.getItem('token');
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.intent === 'post') {
    try {
      await axios.post(`/api/v1/comments/comment/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return toast.success('Commentaire ajouté');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  }
};

const CommentsForm = ({ setIsPosted }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Rafraîchit le composant si un message est posté
  useEffect(() => {
    document.querySelector("[name='message']").value = '';
    isSubmitting && setIsPosted(true);
  }, [isSubmitting, navigation.state, setIsPosted]);

  return (
    <FormContainer method="POST" className="comment-form">
      <h2 className="title">Ajouter un commentaire :</h2>
      <FormControl>
        <InputLabel htmlFor="message"></InputLabel>
        <textarea
          name="message"
          id="message"
          placeholder="Écrire un commentaire"
          disabled={isSubmitting}
          required
        ></textarea>
        <SubmitButton
          type="submit"
          name="intent"
          value="post"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ajout...' : 'Ajouter'}
        </SubmitButton>
      </FormControl>
    </FormContainer>
  );
};

const FormContainer = styled(Form)`
  margin-top: 3rem;
  max-width: 400px;
  margin-inline: auto;
  padding: 0.5rem;

  textarea {
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    padding-inline: 1rem;
    min-width: 100%;
    padding-block: 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    &::placeholder {
      color: ${({ theme }) => theme.text};
    }
  }

  .title {
    text-align: left !important;
    font-size: 0.8rem;
  }
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  padding: 0.25rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${theme.colors.primary3};
    color: ${theme.colors.grey10};
  }
`;

export default CommentsForm;
