/* eslint-disable react/no-unescaped-entities */
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Atropos from 'atropos/react';
import styled from 'styled-components';
import { theme } from '../../theme';

const HomeCards = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = useCallback(async () => {
    try {
      const { data } = await axios(`/api/v1/articles/all/?limit=4`);
      setArticles(data.articles);
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (articles.length > 0) {
    return (
      <CardsContainer>
        <h1>Les derniers posts :</h1>
        <Cards>
          {articles.map((article, index) => {
            const { image, title, article_id } = article;
            const newTitle = `${title.slice(0, 35)}...`;

            return (
              <Atropos
                activeOffset={40}
                shadowScale={1.05}
                className="card"
                key={index}
              >
                <div className="image">
                  {image ? (
                    <img data-atropos-offset="0" src={image} alt={newTitle} />
                  ) : (
                    <img
                      data-atropos-offset="0"
                      src="https://placehold.co/600x500"
                      alt={newTitle}
                    />
                  )}
                  <div className="content">
                    <Link to={`/forum/${article_id}`}>
                      <h4 data-atropos-offset="5">{newTitle}</h4>
                    </Link>
                  </div>
                </div>
              </Atropos>
            );
          })}
        </Cards>
      </CardsContainer>
    );
  } else {
    return <CardsContainer></CardsContainer>;
  }
};

const CardsContainer = styled.section`
  width: 90%;
  max-width: ${theme.width.maxWidth};
  margin-inline: auto;
  padding-block: 5rem;
  text-align: center;

  h1 {
    font-size: 1.8rem;
    letter-spacing: ${theme.letterSpacing.sm};
    margin-bottom: 2rem;
  }
`;

const Cards = styled.article`
  display: grid;
  justify-items: center;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  .card {
    width: 20rem;
    height: 100%;
    .image {
      position: relative;
      img {
        width: 100%;
        height: 20rem;
        object-fit: cover;
        border-radius: 0.5rem;
      }
    }
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 80%;
      border-radius: 0.5rem;
      padding: 1rem;

      a {
        text-decoration: none;
      }

      h4 {
        font-size: 1.2rem;
        letter-spacing: ${theme.letterSpacing.sm};
        text-wrap: balance;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: background-color 0.3s ease;
        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
`;

export default HomeCards;
