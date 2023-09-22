import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Home,
  ErrorPage,
  Forum,
  ArticlePage,
  Login,
  Register,
  Dashboard,
  AddArticles,
  EditArticles,
} from './pages/index';
import SharedLayout from './layout/SharedLayout';
import DeleteComments from './components/forum/comments/DeleteComments';

// Loader
import { loader as articlesLoader } from './pages/Forum';
import { loader as profilLoader } from './pages/Dashboard';
import { loader as userLoader } from './layout/SharedLayout';
import { loader as articlePageLoader } from './pages/ArticlePage';
import { loader as EditLoader } from './pages/EditArticles';

// Actions
import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';
import { action as addArticleAction } from './pages/AddArticles';
import { action as EditArticleAction } from './pages/EditArticles';
import DeleteArticles, { action as deleteAction } from './pages/DeleteArticles';
import { action as addComments } from './components/forum/comments/CommentsForm';
import { action as deleteComments } from './components/forum/comments/DeleteComments';
import ErrorInPages from './components/ErrorInPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    errorElement: <ErrorPage />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'forum',
        element: <Forum />,
        loader: articlesLoader,
      },

      {
        path: 'forum/:id',
        element: <ArticlePage />,
        loader: articlePageLoader,
        action: addComments,
      },
      {
        path: 'forum/post',
        element: <AddArticles />,
        action: addArticleAction,
      },
      {
        path: 'forum/edit/:id',
        element: <EditArticles />,
        loader: EditLoader,
        action: EditArticleAction,
        errorElement: (
          <ErrorInPages
            err={"Vous n'avez pas d'article"}
            link={'/forum'}
            linkMessage={'Retourner au forum'}
          />
        ),
      },
      {
        path: 'forum/delete/:id',
        element: <DeleteArticles />,
        action: deleteAction,
      },
      {
        path: 'forum/comments/delete/:commentId/:articleId',
        element: <DeleteComments />,
        action: deleteComments,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        loader: profilLoader,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
