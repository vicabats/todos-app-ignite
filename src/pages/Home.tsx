import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const duplicatedTask = tasks.some(
      (task: Task) => task.title === newTaskTitle
    );

    duplicatedTask
      ? handleDuplicatedTaskAlert()
      : handleAddOriginalTask(newTaskTitle);
  }

  function handleDuplicatedTaskAlert() {
    Alert.alert(
      "Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome"
    );
  }

  function handleAddOriginalTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const doneTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            done: !task.done,
          }
        : task
    );

    setTasks(doneTask);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter((task: Task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function handleDeleteTaskAlert(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [{ text: "Não" }, { text: "Sim", onPress: () => handleRemoveTask(id) }]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const taskToBeEdited = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            title: taskNewTitle,
          }
        : task
    );
    setTasks(taskToBeEdited)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleDeleteTaskAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
