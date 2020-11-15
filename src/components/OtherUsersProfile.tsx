import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import {
  followUser,
  unfollowUser,
} from "../actions/usersActions";
import { UserType } from "../actions/authActionTypes";
import { ArticleType } from "../actions/articleActionTypes";
import GlobalArticle from "./GlobalArticle";

const OtherUsersProfile: React.FC = () => {
  const dispatch = useDispatch()
  const { username } = useParams();
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const articles: any = useSelector((state: RootStore) => state.articles); // putting "any" solves, Property 'articles' does not exist on type 'never'.
  const allUsers = useSelector((state: RootStore) => state.users.users);
  const allArticles = articles.articles;
  const user = allUsers.find((user) => user.username === username);
  const [isLoading, setIsLoading] = useState(true)
  const [followers, setFollowers] = useState([] as any); //keep type any to prevent an error in the useEffect

  useEffect(() => {
    setFollowers(user?.followers)
    setIsLoading(false)
    window.scrollTo(0, 0);
  }, [user]) //when user goes from undefined to being populated

  const handleClickFollow = (user: UserType) => {
    console.log(user._id);
    dispatch(followUser(user._id));
    setFollowers([...followers, currentUser?.id]);
  }
  const handleClickUnfollow = (user: UserType) => {
    console.log(user._id);
    dispatch(unfollowUser(user._id));
    setFollowers(followers.filter((user: string) => user !== currentUser?.id))
  }

  const displayFollowButton = () => {
    if (isLoading === false && followers && currentUser && user && !followers.includes(currentUser.id)) {
      return (
        <Button
          variant="outline-secondary"
          onClick={() => handleClickFollow(user)}
        >
          +Follow
        </Button>
      );
    } else if (isLoading === false && followers && currentUser && user && followers.includes(currentUser.id)) {
      return (
        <Button
          variant="outline-secondary"
          onClick={() => handleClickUnfollow(user)}
        >
          {" "}
          +Unfollow{" "}
        </Button>
      );
    }
  }

  return (
    <div>
      <Jumbotron className="text-center">
        <h1>Icon Here</h1>
        {username && <p>{username}</p>}
        {isLoading ? <div>Loading...</div> : displayFollowButton()}
      </Jumbotron>
      <Container>
        <Tabs
        // id="controlled-tab-example"
        // activeKey={key}
        // onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="my-articles" title="My Articles">
            {allArticles.length === 0 ? (
              <div>Loading...</div>
            ) : (
              // filter all the articles based on currentUser id. Map through them and as props into GlobalArticle component
              <div>{allArticles.filter((article: ArticleType) => article.user === user?._id).map((article: ArticleType, index: number) => <GlobalArticle article={article} index={index} key={index}/>)}</div>
            )}
          </Tab>
          <Tab eventKey="liked-articles" title="Liked Articles">
            <h1>Liked Articles</h1>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default OtherUsersProfile;
