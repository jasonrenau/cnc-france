import axios from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

//action
// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ params }) => {
  const { commentId, articleId } = params;
  const token = localStorage.getItem('token');

  try {
    await axios.delete(`/api/v1/comments/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success('Commentaire supprimé');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect(`/forum/${articleId}`);
};
const DeleteComments = () => {
  return <div>DeleteComments</div>;
};
export default DeleteComments;
