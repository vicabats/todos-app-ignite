import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "./TasksList";
import trashIcon from "../assets/icons/trash/trash.png";
import Pen from "../assets/images/pen.png";

interface TaskItemProps {
  index: number;
  task: Task;
  editTask: (id: number, taskTitle: string) => void;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({
  index,
  task,
  editTask,
  toggleTaskDone,
  removeTask,
}: TaskItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (editMode) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editMode]);

  function handleStartEditing() {
    setEditMode(true);
  }

  function handleCancelEditing(task: Task) {
    setTaskTitle(task.title);
    setEditMode(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskTitle);
    setEditMode(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
          </View>
          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={editMode}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          ></TextInput>
        </TouchableOpacity>
      </View>
      <View style={styles.iconsWrapper}>
        {editMode ? (
          <TouchableOpacity onPress={() => handleCancelEditing(task)}>
            <Text style={{ fontSize: 18}}>X</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={Pen} />
          </TouchableOpacity>
        )}
        <View style={styles.iconsDivider}></View>
        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={editMode}
          style={{ opacity: editMode ? 0 : 1, paddingLeft: 10 }}
        >
          <Image source={trashIcon}></Image>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsDivider: {
    color: "#ff8c00",
    height: 24,
    width: 1,
  },
  iconsWrapper: {
    paddingRight: 10,
    flexDirection: 'row',
  },
});
