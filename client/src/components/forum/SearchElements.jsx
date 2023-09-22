/* eslint-disable no-unused-vars */
import { useState } from 'react';
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
    background: ${theme.colors.grey2};
    transition: all 0.3s ease;
    margin-bottom: 1rem;

    input {
      border: none;
      width: 100%;
      border-radius: 40px;
      padding-inline: 1rem;
      font-size: 1rem;
      outline: none;
      background: ${theme.colors.grey2};
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
      background: ${theme.colors.grey2};
      cursor: pointer;
      svg {
        font-size: 1rem;
        color: ${theme.colors.grey5};
      }
    }
  }
  .filter {
    label {
    }

    select {
      background: ${theme.colors.grey2};
      border: none;
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
