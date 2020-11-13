import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { ArticleType } from '../actions/articleActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Link } from 'react-router-dom';
import moment from "moment";
import { getArticles, likeArticle, unlikeArticle } from '../actions/articleActions';

interface Props {
  article: ArticleType;
  index: number;
}

const GlobalArticle: React.FC<Props> = ({article, index}) => {
  const dispatch = useDispatch();
  const auth: any = useSelector((state: RootStore) => state.auth);
  const allUsers: any = useSelector((state: RootStore) => state.users.users);
  const [articleLikes, setArticleLikes] = useState(article.likes);

  // This function finds and displays the username of the person who wrote the article
  const displayUsername = (article: ArticleType) => {
    const articleUserWrote = allUsers.find(
      (user: any) => user._id === article.user
    );
    // console.log(articleUserWrote)
    return (
      <Link
        style={{ color: "inherit" }}
        to={`/profile/${articleUserWrote.username}`}
      >
        {articleUserWrote.username}
      </Link>
    );
  };

  const handleClick: any = (article: ArticleType) => {
    localStorage.setItem("articleInfo", JSON.stringify(article));
  };

  // * HANDLE CLICK I MADE
  // const handleLikeClick = (article: ArticleType) => {
  //   console.log("handleLikeClick")
  //   // If user is in the likes array and they click on the like button
  //   if (auth.user && articleLikes.includes(auth.user.id)) {
  //     // remove the user from the likes array
  //     const removeUserFromLikesArray = article.likes.filter(
  //       (like: string) => like !== auth.user.id
  //     );
  //     dispatch(
  //       updateArticle(
  //         article.title,
  //         article.subTitle,
  //         article.content,
  //         article.tags,
  //         removeUserFromLikesArray,
  //         article._id,
  //         article.slug
  //       )
  //     );
  //     setArticleLikes(articleLikes.filter((user: string) => user !== auth.user.id));
  //   } else if (auth.user && !articleLikes.includes(auth.user.id)) {
  //     dispatch(
  //       updateArticle(
  //         article.title,
  //         article.subTitle,
  //         article.content,
  //         article.tags,
  //         [...article.likes, auth.user.id],
  //         article._id,
  //         article.slug
  //       )
  //     );
  //     setArticleLikes([...articleLikes, auth.user.id]);
  //     // setArticleLikes(articleLikes - 1);
  //   }
  // };
  
  const handleLikeClick = (article: ArticleType) => {
    // If user is in the likes array and they click on the like button
    if (auth.user && articleLikes.includes(auth.user.id)) {
      console.log("already in likes")
      dispatch(unlikeArticle(article._id));
      setArticleLikes(
        articleLikes.filter((user: string) => user !== auth.user.id)
      );
    } else if (auth.user && !articleLikes.includes(auth.user.id)) {
      console.log("not in likes");
      dispatch(likeArticle(article._id));
      setArticleLikes([...articleLikes, auth.user.id]);
    }
  };
  
  return (
    <div key={index}>
      <Container>
        <Row className="mt-5 mb-3">
          <Col className="col-auto">Profile Pic</Col>
          <Col>
            {allUsers.length !== 0 && displayUsername(article)}
            <div>
              {moment(article.registerDate).format("dddd, MMMM Do YYYY")}
            </div>
          </Col>
          <Col className="col-auto ml-auto">
            {auth.user ? (
              <Button
                variant="primary"
                onClick={() => handleLikeClick(article)}
              >
                Likes: {articleLikes.length}
              </Button>
            ) : (
              <Button variant="primary">Likes: {articleLikes.length}</Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>{article.title}</Col>
        </Row>
        <Row>
          <Col>{article.subTitle}</Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Link
              to={`/articles/${article.slug}`}
              onClick={() => handleClick(article)}
            >
              Read more...
            </Link>
          </Col>
        </Row>
      </Container>
      <hr />
    </div>
  );
};

export default GlobalArticle
