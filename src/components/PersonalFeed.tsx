import React from 'react'
import { useSelector } from 'react-redux';
import { ArticleType } from '../actions/articleActionTypes';
import { UserType } from '../actions/authActionTypes';
import { RootStore } from '../store';
import GlobalArticle from './GlobalArticle';

const PersonalFeed: React.FC = () => {
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const users: any = useSelector((state: RootStore) => state.users.users);
  const articles: any = useSelector((state: RootStore) => state.articles); // putting "any" solves, Property 'articles' does not exist on type 'never'.
  const allArticles = articles.articles;

  const filteredUser = users.find((user: UserType) => user._id === currentUser?.id)
  const reversedAllArticles = [...allArticles].reverse();
  const filteredArticles = reversedAllArticles.filter((article: ArticleType) =>
    filteredUser?.following?.includes(article.user)
  );
  console.log(filteredUser)
  return (
    <div>
      {filteredArticles.length > 0 ? (
        <div>{filteredArticles.map((article: ArticleType, index: number) => <GlobalArticle article={article} index={index} key={index} />)}</div>
      ) : (
        <div>No articles are here... yet.</div>
      )}
    </div>
  );
}

export default PersonalFeed
