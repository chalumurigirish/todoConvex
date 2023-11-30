import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React from "react";

const IndividualTodo = ({ task, id }: { task: string; id: Id<"tasks"> }) => {
  console.log({ id });

  const updateTaskMutation = useMutation(api.tasks.update);
  const deleteTaskMutation = useMutation(api.tasks.deleteTask);
  const onEditTask = async (task: string, id: Id<"tasks">) => {
    const updateTask = await updateTaskMutation({
      _id: id,
      text: task,
      isCompleted: false,
    });
  };
  const onDeleteTask = async (id: Id<"tasks">) => {
    const deleteTask = await deleteTaskMutation({
      _id: id,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingBottom: "10px",
      }}
    >
      <div>{task}</div>
      <button onClick={() => onEditTask("edit test", id)}>Edit</button>
      <button onClick={() => onDeleteTask(id)}>Delete</button>
    </div>
  );
};

export default IndividualTodo;
