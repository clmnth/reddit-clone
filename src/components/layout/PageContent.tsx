import React from "react";
import { Flex } from "@chakra-ui/react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log("here's children", children);

  return (
    <Flex justify="center" p="16px 0px" border="1px solid red">
      <Flex
        width="95%"
        justify="center"
        maxWidth="860px"
        border="1px solid green"
      >
        {/* Left Hand Side */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          border="1px solid blue"
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>

        {/* Right Hand Side */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          border="1px solid orange"
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
