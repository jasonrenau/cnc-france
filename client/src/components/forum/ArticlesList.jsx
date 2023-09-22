import SingleArticle from './SingleArticle';
import { styled } from 'styled-components';

const ArticlesList = ({ articles }) => {
  return (
    <Article className="cards">
      {articles.map((article, index) => (
        <SingleArticle key={index} article={article} />
      ))}
    </Article>
  );
};

const Article = styled.article`
  display: grid;
  justify-items: center;
  gap: 2rem;
  margin-block: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default ArticlesList;
