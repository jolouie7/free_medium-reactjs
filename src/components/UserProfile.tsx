import React, {useState} from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';
import { MdSettings } from "react-icons/md";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

import { RootStore } from '../store';
import { ArticleType } from '../actions/articleActionTypes';
import GlobalArticle from './GlobalArticle';

const Profile: React.FC = () => {
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const articles: any = useSelector((state: RootStore) => state.articles); // putting "any" solves, Property 'articles' does not exist on type 'never'.
  const allArticles = articles.articles;
  const [key, setKey] = useState("home");

  return (
    <div>
      <Jumbotron className="text-center">
        <h1>Icon Here</h1>
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
              <div>{allArticles.filter((article: ArticleType) => article.user === currentUser?.id).map((article: ArticleType, index: number) => <GlobalArticle article={article} index={index} key={index}/>)}</div>
            )}
          </Tab>
          <Tab eventKey="liked-articles" title="Liked Articles">
            <h1>Liked Articles</h1>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default Profile
