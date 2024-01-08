import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  const handleAddOrEditTask = () => {
    if (task.length === 0) return;

    if (editingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex].text = task;
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } else {
      setTasks([...tasks, { text: task }]);
    }

    setTask('');
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setEditingTaskIndex(index);
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
      >
        <FlatList
            data={tasks}
            renderItem={({ item, index }) => (
                <View style={styles.taskContainer}>
                  <Text style={styles.task}>{item.text}</Text>
                  <View style={styles.buttons}>
                    <Button title="✏️" onPress={() => handleEdit(index)} color="#ffb100" />
                    <Button title="❌" onPress={() => handleDelete(index)} color="#ff0000" />
                  </View>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
              value={task}
              onChangeText={setTask}
              placeholder="Enter a task"
              style={styles.input}
          />
          <Button title={editingTaskIndex !== null ? "Update" : "Add"} onPress={handleAddOrEditTask} />
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#f4f4f4',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 32, // Margen modificado para subir la barra de tareas
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 8,
    padding: 16,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1,
  },
  task: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
});
