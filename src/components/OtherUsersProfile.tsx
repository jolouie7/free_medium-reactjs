import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import { updateUser } from "../actions/usersActions";

const OtherUsersProfile: React.FC = () => {
  const dispatch = useDispatch()
  const { username } = useParams();
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const allUsers = useSelector((state: RootStore) => state.users.users);
  const user = allUsers.find((user) => user.username === username);
  // const [follows, setFollows] = useState(user?.following);
  const [isLoading, setIsLoading] = useState(false)
  const [following, setFollowing] = useState<string[]>(user?.following!); // This might cause a problem

  // console.log(currentUser)
  // console.log(user)
  // console.log(user?.following[0])

  //option 1: use useEffect and set following based on if the user.id is in the following array
  //option 2: Can you set false/true based on a condition in useState?

  //The button text will display the corret text based on if the following state is true or false
  //When the user clicks the follow button we trigger a onClick handler to dispatch a action to update the user in the db.
  //after dispatching, set following to the opposite to what it was
  // useEffect(() => {
  //   const currentUserId: string | undefined = currentUser?.id;
  //   if (currentUser && user?.following?.includes(currentUserId)) {
  //     setFollowing(true);
  //   }
  // }, [])

  // if (
  //   (user?.following && user?.following.length === 0) ||
  //   user === null ||
  //   user === undefined
  // ) {
  //   setIsLoading(true);
  // } else if (user?.following && !user?.following.length > 0) {
  //   setIsLoading(false);
  // }

  const displayFollowButton = () => {
    if (currentUser && following?.includes(currentUser.id)) {
      return (
        <Button variant="outline-secondary" onClick={() => handleClick(user)}>
          +Unfollow
        </Button>
      );
    } else {
      return (
        <Button variant="outline-secondary" onClick={handleClick}>
          +Follow
        </Button>
      );
    }
  }

  const handleClick = (user: any) => {
    console.log("foo");
    if (isLoading) {
      console.log("loading true")
      return <div>Loading...</div>
    } else {}
    // If user is in the likes array and they click on the like button
    if (currentUser && user && following.includes(currentUser.id)) {
      // remove the user from the likes array
      const removeUserFromFollowingArray = user.following!.filter(
        (follow: string) => follow !== currentUser.id
      );
      dispatch(
        updateUser(
          user.name,
          user.email,
          user.username,
          user.password!,
          user.bio!,
          user.image!,
          user.likes!,
          removeUserFromFollowingArray,
          user.register_date!,
          user._id,
        )
      );
      setFollowing(
        following.filter((user: string) => user !== currentUser.id)
      );
    } else if (currentUser && user && !following.includes(currentUser.id)) {
      dispatch(
        updateUser(
          user.name,
          user.email,
          user.username,
          user.password!,
          user.bio!,
          user.image!,
          user.likes!,
          [...user.following!, currentUser.id],
          user.register_date!,
          user._id,
        )
      );
      setFollowing([...following, currentUser.id]);
      // setArticleLikes(articleLikes - 1);
    }
  }

  return (
    <div>
      <Jumbotron className="text-center">
        <h1>Icon Here</h1>
        {username && <p>{username}</p>}
        {currentUser && // ({
        //   following.includes(currentUser.id) ? (
        //     <Button variant="outline-secondary"> "+Unfollow" </Button>
        //   ) : (<Button variant="outline-secondary"> "+Follow" </Button>)
        // })
        displayFollowButton()}
      </Jumbotron>
      <Container>
        <Tabs
        // id="controlled-tab-example"
        // activeKey={key}
        // onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="my-articles" title="My Articles">
            <h1>My Articles</h1>
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
