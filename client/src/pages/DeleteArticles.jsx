import axios from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ params }) => {
  const { id } = params;
  const token = localStorage.getItem('token');

  try {
    await axios.delete(`/api/v1/articles/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success('Article supprimé');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }

  return redirect('/dashboard');
};

const DeleteArticles = () => {
  return <div>DeleteArticles</div>;
};
export default DeleteArticles;
