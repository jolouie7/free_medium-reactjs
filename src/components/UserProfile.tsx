import React, { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { MdSettings } from "react-icons/md";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";

import { RootStore } from "../store";
import { ArticleType } from "../actions/articleActionTypes";
import GlobalArticle from "./GlobalArticle";
import { UserType } from "../actions/authActionTypes";

const Profile: React.FC = () => {
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const users: any = useSelector((state: RootStore) => state.users.users);
  const articles: any = useSelector((state: RootStore) => state.articles); // putting "any" solves, Property 'articles' does not exist on type 'never'.
  const allArticles = articles.articles;

  const placeHolder = "https://free-medium-profile-pictures.s3-us-west-1.amazonaws.com/defaultUserImage74a49f63-d.png"
  // const [key, setKey] = useState("home");

  const filteredUser = users.find((user: UserType) => user._id === currentUser?.id)
  const reversedAllArticles = [...allArticles].reverse();
  const filteredArticles = reversedAllArticles.filter((article: ArticleType) =>
    filteredUser?.likes?.includes(article._id)
  );

  return (
    <div>
      <Jumbotron className="text-center">
        <Col className="text-center">
          {filteredUser && currentUser && users.length !== 0 ? (
            <Image
              style={{
                width: "5rem",
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
        {currentUser && <p>{currentUser.username}</p>}
        <Button variant="outline-secondary" href="/user-settings">
          Edit Profile Settings
          <MdSettings />
        </Button>
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
              <div>
                {allArticles
                  .filter(
                    (article: ArticleType) => article.user === currentUser?.id
                  )
                  .map((article: ArticleType, index: number) => (
                    <GlobalArticle
                      article={article}
                      index={index}
                      key={index}
                    />
                  ))}
              </div>
            )}
            {allArticles.filter(
              (article: ArticleType) => article.user === currentUser?.id
            ).length === 0 && <div>No articles are here... yet.</div>}
          </Tab>
          <Tab eventKey="liked-articles" title="Liked Articles">
            {allArticles ? (
              <div>{filteredArticles.map((article: ArticleType, index: number) => <GlobalArticle article={article} index={index} key={index} />)}</div>
            ) : (
              <div>Loading...</div>
            )}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Profile;
