import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

export default function TodoList() {
  const { state, dispatch } = useContext(TodoContext);
  return (
    <View>
      <FlatList
        data={state.todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <CheckBox
              checked={item.compeleted}
              onPress={() =>
                dispatch({ type: "toggle_todo", payload: item.id })
              }
            />
            {state.editingId === item.id ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={state.editedText}
                  onChangeText={(text) =>
                    dispatch({ type: "update_editedtext", payload: text })
                  }
                  autoFocus
                />
                <TouchableOpacity
                  onPress={() =>
                    dispatch({
                      type: "saveEdit_todo",
                      payload: { id: item.id, text: state.editedText },
                    })
                  }
                >
                  <Ionicons name="save" size={24} color="blue" />
                </TouchableOpacity>
              </>
            ) : (
              <Text
                style={{
                  textDecorationLine: item.compeleted ? "line-through" : "none",
                }}
              >
                {item.text}
              </Text>
            )}
            <TouchableOpacity
              onPress={() =>
                dispatch({ type: "delete_todo", payload: item.id })
              }
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch({ type: "startEdit_todo", payload: item.id });
              }}
            >
              <Ionicons name="create" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        )}
      />
      
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
});
