import type { NextPage } from "next";
import PageContent from "../components/layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { useEffect } from "react";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);

  const buildUserHomeFeed = () => {};
  const buildNonUserHomeFeed = () => {};
  const getUserPostVotes = () => {};

  // useEffects
  useEffect(() => {
    if (!user && !loadingUser) buildNonUserHomeFeed();

  }, [user, loadingUser]);

  return (
    <PageContent>
      <>{/* <PostFeed /> */}</>
      <>{/* Recommendations */}</>
    </PageContent>
  );
};

export default Home;
