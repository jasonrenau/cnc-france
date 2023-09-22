import ForumNavigation from '../components/forum/ForumNavigation';
import ForumContent from '../components/forum/ForumContent.jsx';
import axios from 'axios';
import { redirect, useLoaderData } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await axios(`/api/v1/articles/all/`, { params });
    const {
      data: { categories },
    } = await axios(`/api/v1/articles/categories`);
    return { data, categories, params };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect('/');
  }
};

const Forum = () => {
  const { data, categories, params } = useLoaderData();
  const { currentPage, numberOfPages, articles } = data;

  return (
    <main>
      <ForumNavigation />
      <ForumContent
        params={params}
        categories={categories}
        articles={articles}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </main>
  );
};

export default Forum;
