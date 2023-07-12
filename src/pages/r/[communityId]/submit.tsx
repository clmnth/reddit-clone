import NewPostForm from "@/src/components/Posts/NewPostForm";
import PageContent from "@/src/components/layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const SubmitPostPaige: React.FC = () => {
  return (
    <PageContent>
      <>
        <Box p='14px 0px' borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        <NewPostForm />
      </>
      <>{/* About */}</>
    </PageContent>
  );
};
export default SubmitPostPaige;
