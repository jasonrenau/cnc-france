import { useState } from 'react';
import CommentsForm from './CommentsForm';
import { styled } from 'styled-components';
import { Form, useOutletContext } from 'react-router-dom';
import { theme } from '../../../theme';
import { BiSolidUserCircle } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import Pagination from '../../Pagination';

const Comments = ({ numberOfPages, currentPage, comments }) => {
  const { user } = useOutletContext();
  // eslint-disable-next-line no-unused-vars
  const [isPosted, setIsPosted] = useState(false);

  if (comments && comments.length > 0) {
    return (
      <CommentWrapper>
        {comments.map((comment, index) => {
          const timeServer = new Date(comment.created_at);
          const date = new Intl.DateTimeFormat('fr-FR', {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
          }).format(timeServer);
          const isUserComment = comment.user_id === user?.user_id;
          return (
            <div key={index} className="comment">
              <div className="comment-photo">
                <BiSolidUserCircle />
              </div>
              <div className="comment-info">
                <p className="pseudo">{comment.pseudo}</p>
                <p className="date">{date}</p>
                <p className="message">{comment.message}</p>
              </div>
              <div className="delete">
                {isUserComment && (
                  <Form
                    method="DELETE"
                    action={`/forum/comments/delete/${comment.comment_id}/${comment.article_id}`}
                  >
                    <button type="submit">
                      <FcCancel />
                    </button>
                  </Form>
                )}
              </div>
            </div>
          );
        })}
        <Pagination numberOfPages={numberOfPages} currentPage={currentPage} />
        {user && (
          <div className="add-comment">
            <CommentsForm setIsPosted={setIsPosted} />
          </div>
        )}
      </CommentWrapper>
    );
  } else {
    return (
      <CommentWrapper>
        <p>Pas de commentaire pour le moment.</p>
        {user && (
          <div className="add-comment">
            <CommentsForm setIsPosted={setIsPosted} />
          </div>
        )}
      </CommentWrapper>
    );
  }
};

const CommentWrapper = styled.div`
  .comment {
    display: grid;
    border: 1px solid ${theme.colors.grey5};
    grid-template-columns: auto 1fr auto;
    margin-block: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    gap: 1rem;

    .comment-photo {
      svg {
        font-size: 2rem;
        color: ${theme.colors.grey5};
      }
    }

    .comment-info {
      display: flex;
      flex-direction: column;
      text-align: left;
      overflow-wrap: anywhere;
      .pseudo {
        text-transform: capitalize;
        font-weight: bold;
      }
      .date {
        font-style: italic;
        font-size: 0.8rem;
        font-weight: 200;
        margin-bottom: 0.2rem;
      }
      .message {
        font-size: 1rem;
      }
    }
  }

  .delete {
    button {
      background: none;
      border: none;
      svg {
        color: red;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          transform: rotate(90deg);
        }
      }
    }
  }
`;

export default Comments;
