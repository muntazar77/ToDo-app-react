import React from "react";
import { Form, Input, Button, Flex } from "antd";
import Todo from "./components/ToDo";

function App() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Flex align="center" justify="center">
      <h1 className="paddinBlock">Todo List</h1>
      </Flex>
      <Flex align="center" justify="center">
      <Todo>
      </Todo>
      </Flex>
    </div>
  );
}

export default App;
