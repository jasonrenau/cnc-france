/* eslint-disable no-unused-vars */
import { FaSearch } from 'react-icons/fa';
import { styled } from 'styled-components';
import { theme } from '../../theme';
import { Form, useSubmit } from 'react-router-dom';

const SearchElements = ({ categories, params }) => {
  const submit = useSubmit();
  return (
    <Searchwrapper>
      <Form>
        <div className="search">
          <label htmlFor="title" className="searchbar">
            Recherche par titre :
          </label>
          <input
            type="text"
            name="title"
            defaultValue={params.title}
            onSubmit={(form) => {
              submit(form);
            }}
            placeholder="Rechercher par titre..."
          />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <div className="filter">
          <label htmlFor="category">Filtrer par categorie : </label>
          <select
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            name="category"
            defaultValue={params.category}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </Form>
    </Searchwrapper>
  );
};

const Searchwrapper = styled.article`
  width: 100%;
  text-align: center;

  .search {
    display: flex;
    justify-content: center;
    max-width: 350px;
    height: 40px;
    margin: 0 auto;
    border-radius: 40px;
    margin-bottom: 1rem;
    cursor: pointer;

    input {
      border: none;
      width: 100%;
      border-radius: 40px;
      padding-inline: 1rem;
      font-size: 1rem;
      outline: none;
      cursor: pointer;
    }

    label {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
    }

    button {
      display: grid;
      place-content: center;
      width: 20%;
      border: none;
      padding: 1rem;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
  }
  .filter {
    select {
      padding: 0.2rem;
      border-radius: 4px;
      outline: none;
      text-transform: capitalize;
      cursor: pointer;
    }
    option {
      text-transform: capitalize;
      cursor: pointer;
    }
  }
`;

export default SearchElements;
