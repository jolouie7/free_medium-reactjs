import React from 'react';
import { useSelector } from 'react-redux';
import { ArticleType } from '../actions/articleActionTypes';
import { RootStore } from '../store';
import GlobalArticle from './GlobalArticle';

const GlobalFeed: React.FC = () => {
  const articles: any = useSelector((state: RootStore) => state.articles);
  const allArticles = articles.articles
  const reversedArticles = [...allArticles].reverse()

  return (
    <div>
      {allArticles.length === 0 && <div>Loading...</div>}
      {allArticles.length !== 0 &&
        reversedArticles.map((article: ArticleType, index: number) => (
          <GlobalArticle article={article} index={index} key={index} />
        ))}
    </div>
  );
}

export default GlobalFeed