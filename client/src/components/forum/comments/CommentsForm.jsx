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
          rows="5"
          placeholder="Écrire un commentaire"
          disabled={isSubmitting}
        ></textarea>
        <SubmitButton
          type="submit"
          name="intent"
          value="post"
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
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 0.5rem;

  textarea {
    padding: 0.25rem;
    border-radius: 4px;
    font-size: 1rem;
  }

  .title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const SubmitButton = styled.button`
  background-color: ${theme.colors.primary3};
  color: black;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export default CommentsForm;
