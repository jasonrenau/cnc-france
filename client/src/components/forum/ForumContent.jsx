import { styled } from 'styled-components';
import { theme } from '../../theme';
import Pagination from '../Pagination';

import ArticlesList from './ArticlesList';
import SearchElements from './SearchElements';
import ErrorInPages from '../ErrorInPages';

const ForumContent = ({
  categories,
  articles,
  currentPage,
  numberOfPages,
  params,
}) => {
  // eslint-disable-next-line no-unused-vars

  if (articles.length === 0) {
    return <ErrorInPages err={"Pas d'article trouvé"} />;
  }

  return (
    <Section>
      <SearchElements categories={categories} params={params} />
      <ArticlesList articles={articles} />
      <div className="pagination">
        <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
      </div>
    </Section>
  );
};

const Section = styled.section`
  width: 90%;
  max-width: ${theme.width.maxWidth};
  margin: 0 auto;
  margin-top: 1rem;
  margin-inline: auto;
  height: fit-content;
`;

export default ForumContent;
