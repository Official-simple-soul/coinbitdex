import React from "react";
import UnAuthLayout from "../../../layouts/UnAuthLayout";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const Home: React.FC = () => {
  const clickIt = () => {
    console.log("house");
    notifications.show({
      title: "Default notification",
      message: "Do not forget to star Mantine on GitHub! 🌟",
      color: "red",
    });
  };

  return (
    <UnAuthLayout>
      <h1 className="bg-black">Home</h1>
      <p>Welcome to the home page.</p>
      <div className="flex justify-center w-full m-auto mx-auto">
        <Button
          className="bg-black"
          onClick={clickIt}
          color="red
        "
        >
          Titkle
        </Button>
      </div>
    </UnAuthLayout>
  );
};

export default Home;
