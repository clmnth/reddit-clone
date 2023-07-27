import type { NextPage } from "next";
import PageContent from "../components/layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import usePosts from "../hooks/usePosts";
import { Post, postState } from "../atoms/postsAtom";
import PostLoader from "../components/Posts/PostForm/PostLoader";
import { Stack } from "@chakra-ui/react";
import PostItem from "../components/Posts/PostForm/PostItem";
import CreatePostLink from "../components/Community/CreatePostLink";
import { Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  const buildUserHomeFeed = () => {};

  const buildNonUserHomeFeed = async () => {
    setLoading(true);
    console.log("postStateValue.posts", postStateValue.posts);
    console.log("buildNonUserHomeFeed");
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      console.log("postQuery", postQuery);
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
      // setPostState
    } catch (error) {
      console.log("buildNonUseHomeFeed error", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  // useEffects
  useEffect(() => {
    if (!user && !loadingUser) buildNonUserHomeFeed();
  }, [user, loadingUser]);

  return (
    
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                onVote={onVote}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Text>Recommendations</Text>
    </PageContent>
   
  );
};

export default Home;
