import { theme } from '../../theme';
import { styled } from 'styled-components';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Form, Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

import { BiEditAlt } from 'react-icons/bi';

const SingleUserArticle = ({ articles }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 15, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
  };

  return (
    <Article>
      {articles.map((article, index) => {
        const { title, image, message, category, article_id: id } = article;
        const newTitle = title.substr(0, 30);
        const shortMessage = `${message.substr(0, 100)}...`;
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Tilt options={defaultOptions}>
              <div className="card article-card">
                <div className="card-header">
                  <div className="image">
                    {image ? (
                      <img src={image} alt={newTitle} />
                    ) : (
                      <img src="https://placehold.co/320x240" alt={newTitle} />
                    )}
                  </div>
                  <p className="category">{category}</p>
                </div>
                <div className="card-content">
                  <h3>{newTitle}</h3>
                  <div className="article-message">
                    <p dangerouslySetInnerHTML={{ __html: shortMessage }}></p>
                  </div>
                </div>
                <div className="card-footer">
                  <p className="numero">
                    Post numéro : <b>{id}</b>
                  </p>
                  <div className="options">
                    <Link to={`/forum/edit/${id}`}>
                      <button className="edit">
                        <BiEditAlt />
                      </button>
                    </Link>
                    <Form method="DELETE" action={`/forum/delete/${id}`}>
                      <button className="delete" type="submit">
                        <FaTrashAlt />
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        );
      })}
    </Article>
  );
};

const Article = styled.article`
  display: grid;
  justify-items: center;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  .card {
    width: 20rem;
    border-radius: 0.5rem;
    height: 100%;
    box-shadow: rgba(123, 123, 123, 0.25) 0px 2px 8px 2px;

    .card-header {
      position: relative;
      .image {
        img {
          width: 100%;
          height: 10rem;
          border-top-right-radius: 0.5rem;
          border-top-left-radius: 0.5rem;
          object-fit: cover;
        }
      }
      .category {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        padding: 0.15rem 0.5rem;
        border-radius: 2rem;
        font-size: 0.7rem;
        letter-spacing: ${theme.letterSpacing.xs};
        text-transform: uppercase;
      }
    }

    .card-content {
      padding: 1rem;
      text-align: left;
      h3 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
      .article-message {
        p {
          font-size: 0.8rem;
        }
      }
    }
    .card-footer {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      border-top: 1px solid ${({ theme }) => theme.cardBorderSecondary};
      padding: 0.5rem;
      .options {
        display: flex;
        justify-content: space-around;

        .edit {
          color: ${theme.colors.primary7};
        }
        .delete {
          color: #ab4650;
        }

        .edit,
        .delete {
          font-size: 1.5rem;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          align-items: center;
          transition: all 0.5s ease-in-out;
        }

        .edit:hover {
          color: ${theme.colors.primary5};
          scale: 1.1;
        }

        .delete:hover {
          color: #dc3545;
          scale: 1.1;
        }
      }
    }
  }
`;
export default SingleUserArticle;
