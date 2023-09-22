import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { theme } from '../theme';

const Pagination = ({ currentPage, numberOfPages }) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <Paginate>
      {currentPage > 1 && (
        <button onClick={handlePreviousPage}>Précédent</button>
      )}

      <ul className="list">
        {Array.from({ length: numberOfPages }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>

      {currentPage < numberOfPages && (
        <button onClick={handleNextPage}>Suivant</button>
      )}
    </Paginate>
  );
};

const Paginate = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 5rem;

  ul {
    display: flex;
    list-style: none;
    gap: 1rem;
  }

  button {
    text-transform: capitalize;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    border: 1px solid ${theme.colors.grey3};
    background: ${theme.colors.grey2};
    transition: background 0.3s ease, color 0.2s ease;
    color: ${theme.colors.grey10};
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.primary6};
    }
  }
`;

export default Pagination;
