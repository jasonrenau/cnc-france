/* eslint-disable react/no-unescaped-entities */
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../theme';
import Comments from '../components/forum/comments/Comments';
import ErrorInPages from '../components/ErrorInPages';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request, params: { id } }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await axios(`/api/v1/articles/article/${id}`);
    const { data: comments } = await axios(`/api/v1/comments/${id}`, {
      params,
    });

    return { data, comments };
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
};

const ArticlePage = () => {
  const { data, comments: usersComments } = useLoaderData();
  const [article] = useState(data.article);
  const { currentPage, numberOfPages, comments } = usersComments;

  if (article !== null) {
    const { title, pseudo, created_at, message, image } = article;
    const timeServer = new Date(created_at);
    const date = new Intl.DateTimeFormat().format(timeServer);

    return (
      <ArticleWrapper>
        <section className="section">
          <article className="article">
            <div className="title">
              <h1>{title}</h1>
              <p>
                Createur : <b>{pseudo}</b>
              </p>
              <p>Créé le : {date}</p>
            </div>
            <div className="article-body">
              {image && <img src={image} alt={title} />}
              <div className="article-message">
                <p dangerouslySetInnerHTML={{ __html: message }}></p>
              </div>
            </div>
            <div className="comments">
              <Comments
                comments={comments}
                numberOfPages={numberOfPages}
                currentPage={currentPage}
              />
            </div>
          </article>
        </section>
      </ArticleWrapper>
    );
  } else {
    return (
      <ArticleWrapper>
        <ErrorInPages
          err={"L'article a pu être supprimé"}
          link={'/forum'}
          linkMessage={'Retourner au forum !'}
        />
      </ArticleWrapper>
    );
  }
};

const ArticleWrapper = styled.main`
  .section {
    .article {
      margin: 0 auto;
      width: 95%;
      max-width: ${theme.width.maxWidth};
      margin-top: 1rem;
      margin-bottom: 5rem;
      .title {
        text-align: center;
        h1 {
          font-size: 2rem;
          text-transform: capitalize;
          letter-spacing: ${theme.letterSpacing.xs};
        }
        p {
          font-size: 1rem;
          b {
            text-transform: uppercase;
          }
        }
      }

      .article-body {
        text-align: center;
        margin-block: 1rem;

        .article-message {
          font-size: 1rem;
          border: 1px solid ${theme.colors.grey3};
          padding: 1rem;
          margin-block: 1rem;
          border-radius: 0.5rem;
          text-align: left;
        }

        img {
          width: 100%;
          max-width: 600px;
          aspect-ratio: 16/9;
          object-fit: cover;
          border-radius: 0.5rem;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          transition: transform 0.3s ease-in-out;
        }
      }
      .comments {
        max-width: ${theme.width.maxFormWidth};
        margin: 0 auto;
      }
    }
  }
`;

export default ArticlePage;
