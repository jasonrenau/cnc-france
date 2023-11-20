/* eslint-disable react/no-unescaped-entities */
import { Form, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { theme } from '../theme';

import Pagination from '../components/Pagination';
import SingleUserArticle from '../components/dasboard/SingleUserArticle';
// --- icons --- //
import { FaSearch } from 'react-icons/fa';
import { TfiDashboard } from 'react-icons/tfi';
import { LiaBusinessTimeSolid } from 'react-icons/lia';
import { BiUser } from 'react-icons/bi';
// --- icons --- //

import { RiDoorClosedLine } from 'react-icons/ri';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const token = localStorage.getItem('token');
  try {
    const {
      data: { user },
    } = await axios('/api/v1/users/current-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };

    const { data } = await axios('/api/v1/articles/user/', axiosConfig);

    return { user, data, params };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect('/login');
  }
};

const Dashboard = () => {
  const { user, data, params } = useLoaderData();
  const { numberOfPages, currentPage, articles } = data;

  const submit = useSubmit();

  const disconnect = () => {
    localStorage.removeItem('token');
    toast.success('Déconnecté');
    window.location.reload();
  };

  return (
    <Main>
      <Header>
        <div className="user">
          <div className="user-avatar">
            <TfiDashboard className="icon" />
            <p>Dashboard</p>
          </div>
          <div className="user-name">
            <BiUser className="icon" />
            <p>{user.pseudo}</p>
          </div>
          <div className="user-jobs">
            <LiaBusinessTimeSolid className="icon" />
            <p>{user.jobs}</p>
          </div>
          <div className="user-disconnection" onClick={disconnect}>
            <RiDoorClosedLine className="icon" />
            <p>déconnexion</p>
          </div>
        </div>
      </Header>
      <Section>
        <SearchWrapper>
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
          </Form>
        </SearchWrapper>

        {articles.length > 0 ? (
          <>
            <SingleUserArticle articles={articles} />
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
            />
          </>
        ) : (
          <>
            <h3
              style={{
                width: 'fit-content',
                margin: 'auto',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '1rem',
              }}
            >
              Vous n'avez pas d'article
            </h3>
          </>
        )}
      </Section>
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  margin-bottom: 5rem;
`;

const Header = styled.header`
  padding: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);

  .user {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    p {
      text-transform: capitalize;
      font-size: 1rem;
    }

    .user-avatar {
      text-align: center;
    }
    .user-name {
      text-align: center;
    }
    .user-jobs {
      text-align: center;
    }
    .user-disconnection {
      text-align: center;
      font-size: 2rem;
      cursor: pointer;
      .icon:hover {
        transition: transform 0.3s ease-in-out;
        transform: scale(1.2);
      }
    }
  }

  .icon {
    font-size: 2rem;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;
  }

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
`;
const Section = styled.section`
  width: 90%;
  max-width: ${theme.width.maxWidth};
  margin: 0 auto;

  .filter {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
`;

const SearchWrapper = styled.div`
  .search {
    display: flex;
    justify-content: center;
    max-width: 350px;
    height: 40px;
    margin-block: 2rem;
    margin-inline: auto;
    border-radius: 40px;
    cursor: pointer;

    label {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
    }

    input {
      border: none;
      outline: none;
      font-size: 1rem;
      width: 100%;
      border-radius: 40px;
      padding-inline: 1rem;
      cursor: pointer;
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
`;

export default Dashboard;
