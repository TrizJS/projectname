import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Button, View, Text, Platform } from 'react-native';
import { CheckBox } from '@rneui/themed';

export default function App() {
  // State for tasks
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Learn React Native', completed: false },
    { id: '2', description: 'Build a To-Do App', completed: false },
  ]);
  const [inputText, setInputText] = useState('');

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Add new task
  const addTask = () => {
    if (inputText.trim() === '') return; // Prevent empty tasks
    setTasks([...tasks, { id: Date.now().toString(), description: inputText, completed: false }]);
    setInputText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
});
