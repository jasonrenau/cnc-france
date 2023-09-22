import { styled } from 'styled-components';
import { theme } from '../../theme';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { BiSolidUserCircle } from 'react-icons/bi';
import { AiOutlineArrowRight } from 'react-icons/ai';

const SingleArticle = ({ article }) => {
  const { article_id, pseudo, title, category, message, image, created_at } =
    article;

  const timeServer = new Date(created_at);
  const date = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'numeric',
  }).format(timeServer);

  const newTitle = `${title.substr(0, 30)}...`;
  const shortMessage = `${message.substr(0, 100)}...`;

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

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      transition={{ delay: 0.2, duration: 0.3 }}
      initial="hidden"
      animate="visible"
    >
      <Tilt options={defaultOptions}>
        <Card className="card">
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
            <div className="user">
              <div className="pseudo">
                <BiSolidUserCircle />
                <div className="post">
                  <p> {pseudo}</p>
                  <cite className="post-date">Posté le : {date}</cite>
                </div>
              </div>
            </div>
            <div className="read-more">
              <Link to={`/forum/${article_id}`}>
                Lire plus
                <AiOutlineArrowRight />
              </Link>
            </div>
          </div>
        </Card>
      </Tilt>
    </motion.div>
  );
};

const Card = styled.div`
  width: 20rem;
  border-radius: 0.5rem;
  height: 100%;
  background: ${theme.colors.grey8};
  border: 1px solid ${theme.colors.grey6};
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
      color: ${theme.colors.primary10};
      font-size: 0.7rem;
      letter-spacing: ${theme.letterSpacing.xs};
      text-transform: uppercase;
      background: ${theme.colors.primary2};
    }
  }
  .card-content {
    padding: 1rem;
    text-align: left;
    h3 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: #e0e6eb;
    }
    .article-message {
      p {
        font-size: 0.8rem;
        color: #e0e6eb;
      }
    }
  }
  .card-footer {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    border-top: 1px solid ${theme.colors.grey6};

    .user {
      .pseudo {
        display: flex;
        gap: 1rem;
        padding: 0.5rem;
        align-items: center;
        border-right: 1px solid ${theme.colors.grey6};
        svg {
          color: #e0e6eb;
          font-size: 2rem;
        }
      }

      .post {
        display: flex;
        gap: 1rem;
        align-items: center;
        p {
          font-size: 1rem;
          text-transform: capitalize;
          color: #e0e6eb;
        }

        cite {
          font-size: 0.8rem;
          color: #e0e6eb;
        }
      }
    }
    .read-more {
      padding: 0.5rem;
      a {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        color: #e0e6eb;
        gap: 0.2rem;
        text-decoration: none;
        &:hover {
          color: ${theme.colors.primary5};
        }
      }
    }
  }
`;

export default SingleArticle;
