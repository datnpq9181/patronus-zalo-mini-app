import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { ProductList } from "./product-list";
import { Divider } from "components/divider";
import { Icon } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Banner />
        <Suspense>
          <Categories />
          <Box className="bg-white grid grid-cols-4 gap-4 p-4">
            <Divider>
              <Icon icon="zi-add-member" size={50}></Icon>
            </Divider>
          </Box>
        </Suspense>
        <Divider />
        <Inquiry />
        <Recommend />
        <Divider />
        <ProductList />
        <Divider />
      </Box>
    </Page>
  );
};

export default HomePage;
