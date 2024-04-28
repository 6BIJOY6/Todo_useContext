import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-elements";
import { TodoContext } from "../context/TodoContext";
import { Link } from "expo-router";
import TodoList from "./TodoList";

export default function Todo() {
  const { state, dispatch } = useContext(TodoContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Todo App</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={state.newTodo}
        onChangeText={(text) =>
          dispatch({ type: "set_newtodo", payload: text })
        }
      />
      <Button
        title="Add"
        onPress={() => dispatch({ type: "add_todo", payload: state.newTodo })}
      />
      <TodoList/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  editInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  header: {
    backgroundColor: "#3498db",
    padding: 18,
    alignItems: "center",
    margin: 10,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  LinkContainer: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
});
