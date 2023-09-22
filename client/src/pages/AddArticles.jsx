import { styled } from 'styled-components';
import { theme } from '../theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, redirect, useNavigation } from 'react-router-dom';
import { useState } from 'react';
import JoditEditor from 'jodit-react';

let imageValue;

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const token = localStorage.getItem('token');
  const data = Object.fromEntries(formData);
  data.image = imageValue;

  try {
    await axios.post(`/api/v1/articles/user`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success('Article ajouté');
    return redirect('/forum');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddArticles = () => {
  const [isUpload, setIsUpload] = useState(false);
  const navigate = useNavigation();
  const isSubmitting = navigate.state === 'submitting';

  const config = {
    readonly: false,
    placeholder: 'Commencez à écrire ici...',
    height: 400,
  };

  const handleChange = async (e) => {
    const token = localStorage.getItem('token');
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    setIsUpload(true);
    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post(`/api/v1/articles/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => setIsUpload(false), 5000);
      imageValue = src;
      toast.success('Image ajoutée');
    } catch (error) {
      imageValue = null;
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <FormContainer>
      <StyledForm method="POST" className="add-article-form">
        <h2>Ajouter un article</h2>
        <div className="form-row">
          <label htmlFor="title"></label>
          <input
            type="text"
            placeholder="Titre de l'article"
            name="title"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="category"></label>
          <select placeholder="" required name="category">
            <option value="">Choisir une catégorie</option>
            <option value="programmes">Programmes</option>
            <option value="outillages">Outillages</option>
            <option value="realisation">Réalisation</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="message"></label>
          <JoditEditor name="message" required config={config} />
        </div>
        <div className="form-row-image">
          <label htmlFor="image" className="form-label">
            <h2>Ajouter une image</h2>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <SubmitButton type="submit" disabled={isSubmitting || isUpload}>
          Poster
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

const FormContainer = styled.main`
  width: 100%;
  margin-inline: auto;
  margin-bottom: 5rem;
`;

const StyledForm = styled(Form)`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  margin-inline: auto;
  max-width: ${theme.width.maxWidth};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
  }
  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    p {
      color: black;
    }
  }
  .form-row-image {
    text-align: center;
    display: grid;
    place-content: center;
    gap: 1rem;
    input {
      font-size: 1rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default AddArticles;
