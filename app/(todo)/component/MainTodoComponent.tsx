"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import IndividualTodo from "./IndividualTodo";

const MainTodoComponent = () => {
  const [todo, setTodo] = useState("");
  const tasks = useQuery(api.tasks.get);
  const createNewTodo = (e: any) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  const addTodoMutation = useMutation(api.tasks.send);
  const onAddTodo = async () => {
    const returnData = await addTodoMutation({
      text: todo,
      isCompleted: false,
    });
    if (returnData) setTodo("");
    // console.log({ returnData });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input value={todo} onChange={(e) => createNewTodo(e)} />
        <button style={{ marginLeft: "10px" }} onClick={() => onAddTodo()}>
          add
        </button>
      </div>
      {tasks?.map(({ _id, text }) => (
        <IndividualTodo task={text} key={_id} id={_id} />
      ))}
    </div>
  );
};

export default MainTodoComponent;
