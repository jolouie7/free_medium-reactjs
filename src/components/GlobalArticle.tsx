import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { ArticleType } from '../actions/articleActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Link } from 'react-router-dom';
import moment from "moment";
import { likeArticle, unlikeArticle } from '../actions/articleActions';

interface Props {
  article: ArticleType;
  index: number;
}

const GlobalArticle: React.FC<Props> = ({article, index}) => {
  const dispatch = useDispatch();
  const auth: any = useSelector((state: RootStore) => state.auth);
  const allUsers: any = useSelector((state: RootStore) => state.users.users);
  const [articleLikes, setArticleLikes] = useState(article.likes);

  const placeHolder =
    "https://free-medium-profile-pictures.s3-us-west-1.amazonaws.com/defaultUserImage74a49f63-d.png";

    const filteredUser = allUsers.find((users: any) => users._id === article.user)

  // This function finds and displays the username of the person who wrote the article
  const displayUsername = (article: ArticleType) => {
    const articleUserWrote = allUsers.find(
      (user: any) => user._id === article.user
    );
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
  
  const handleLikeClick = (article: ArticleType) => {
    // If user is in the likes array and they click on the like button
    if (auth.user && articleLikes.includes(auth.user.id)) {
      dispatch(unlikeArticle(article._id));
      setArticleLikes(
        articleLikes.filter((user: string) => user !== auth.user.id)
      );
    } else if (auth.user && !articleLikes.includes(auth.user.id)) {
      dispatch(likeArticle(article._id));
      setArticleLikes([...articleLikes, auth.user.id]);
    }
  };

  const showLikeButton = () => {
    if (auth.isAuthenticated === false) {
      return (
        <Button
          variant="outline-success"
        >
          Likes: {articleLikes.length}
        </Button>
      );
    } else if (auth.user && articleLikes.includes(auth.user.id)) {
      return (
        <Button variant="success" onClick={() => handleLikeClick(article)}>
          Likes: {articleLikes.length}
        </Button>
      );
    } else if (auth.user && !articleLikes.includes(auth.user.id)) {
      return (
        <Button
          variant="outline-success"
          onClick={() => handleLikeClick(article)}
        >
          Likes: {articleLikes.length}
        </Button>
      );
    }
  }
  
  return (
    <div key={index}>
      <Container>
        <Row className="mt-5 mb-3">
          <Col className="col-auto">
            {allUsers.length !== 0 ? (
              <Image
                style={{
                  width: "3rem",
                  height: "auto",
                  border: "1px black solid",
                }}
                src={filteredUser.image || placeHolder}
                roundedCircle
              />
            ) : (
              <div>Loading...</div>
            )}
          </Col>
          <Col>
            {allUsers.length !== 0 && displayUsername(article)}
            <div className="text-muted">
              {moment(article.registerDate).format("dddd, MMMM Do YYYY")}
            </div>
          </Col>
          <Col className="col-auto ml-auto">
            {showLikeButton()}
          </Col>
        </Row>
        <Row>
          <Col>{article.title}</Col>
        </Row>
        <Row>
          <Col className="text-muted">{article.subTitle}</Col>
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
