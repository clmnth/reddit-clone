import { Community } from "@/src/atoms/communitiesAtom";
import React, { useEffect, useState } from "react";
import { firestore } from "@/src/firebase/clientApp";
import {
  query,
  collection,
  where,
  orderBy,
  getDoc,
  getDocs,
} from "firebase/firestore";
import usePosts from "@/src/hooks/usePosts";
import { Post } from "@/src/atoms/postsAtom";

type PostsProps = {
  communityData: Community;
  userId?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  // useAuthState
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue} = usePosts();

  const getPosts = async () => {
    try {
      // get posts for this community
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);

      // Store in post state
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue(prev =>({
        ...prev,
        posts: posts as Post[],
      }));

      console.log("posts", posts);
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div>Posts</div>;
};
export default Posts;
