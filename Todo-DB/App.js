import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Keyboard,
} from 'react-native';
import axios from 'axios'; // Import Axios

function Banner() {
  return (
      <View style={styles.banner}>
        <Text style={styles.bannerText}>ToDo-DB</Text>
      </View>
  );
}

function ToDoList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  // Function to load ToDo items from the server
  const loadToDoItems = () => {
    axios.get('http://localhost:2023/todos') // Replace with your server's URL
        .then(response => {
          setItems(response.data);
        })
        .catch(error => console.error("Error fetching data:", error));
  };

  // Load ToDo items when the component mounts
  useEffect(() => {
    loadToDoItems();
  }, []);

  const addToDoItem = () => {
    if (itemText.trim() !== '') {
      axios.post('http://localhost:2023/todos', { text: itemText.trim() }) // Replace with your server's URL
          .then(response => {
            setItems([...items, response.data]); // Add new item to the local state
            setItemText('');
          })
          .catch(error => console.error("Error adding item:", error));
      Keyboard.dismiss();
    }
  };

  const removeItem = (id) => {
    axios.delete(`http://localhost:2023/todos/${id}`) // Replace with your server's URL
        .then(() => {
          setItems(items.filter(item => item._id !== id)); // Remove item from local state
        })
        .catch(error => console.error("Error deleting item:", error));
  };

  return (
      <View style={styles.toDoListContainer}>
        <ScrollView style={styles.list}>
          {items.map((item) => (
              <View key={item._id} style={styles.listItem}>
                <Text style={styles.listItemText}>{item.text}</Text>
                <TouchableOpacity onPress={() => removeItem(item._id)}>
                  <Text style={styles.listItemDelete}>X</Text>
                </TouchableOpacity>
              </View>
          ))}
        </ScrollView>
        <View style={styles.addToDo}>
          <TextInput
              style={styles.addToDoTextInput}
              value={itemText}
              onChangeText={setItemText}
              placeholder="Write something here..."
              placeholderTextColor="#a9a9a9"
          />
          <TouchableOpacity style={styles.addTodoButton} onPress={addToDoItem}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

export default function App() {
  return (
      <View style={styles.container}>
        <Banner />
        <ToDoList />
        <StatusBar style="auto" />
      </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: '#d14848',
    borderRadius: 5,
  },
  bannerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  toDoListContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  addToDo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addToDoTextInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addTodoButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d14848',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  list: {
    flex: 1,
  },
  listItem: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  listItemText: {
    fontSize: 16,
  },
  listItemDelete: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
