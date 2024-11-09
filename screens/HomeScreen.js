import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoList from '../components/ToDoList';

const STORAGE_KEY = '@todos';

const HomeScreen = () => {
   const [text, setText] = useState('');
   const [todos, setTodos] = useState([]);

   // Функция для загрузки задач из AsyncStorage
   const loadTodos = async () => {
      try {
         const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
         if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
         }
      } catch (error) {
         console.log("Ошибка загрузки задач:", error);
      }
   };

   // Функция для сохранения задач в AsyncStorage
   const saveTodos = async (newTodos) => {
      try {
         await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      } catch (error) {
         console.log("Ошибка сохранения задач:", error);
      }
   };

   // Загрузка задач при первом рендере
   useEffect(() => {
      loadTodos();
   }, []);

   // Сохранение задач при каждом изменении массива todos
   useEffect(() => {
      saveTodos(todos);
   }, [todos]);

   const addTodo = () => {
      if (text.trim()) {
         const newTodos = [...todos, { id: Date.now(), text }];
         setTodos(newTodos);
         setText('');
      }
   };

   const deleteTodo = (id) => {
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
   };

   const editTodo = (id, newText) => {
      const newTodos = todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo));
      setTodos(newTodos);
   };

   const toggleComplete = (id) => {
      const newTodos = todos.map(todo =>
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(newTodos);
   };

   return (
      <View style={styles.container}>
         <TextInput
            style={styles.input}
            placeholder="Введите задачу"
            value={text}
            onChangeText={setText}
         />
         <View style={styles.buttonContainer}>
            <Button title="Добавить" onPress={addTodo} />
         </View>

         <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} onToggleComplete={toggleComplete} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
   },
   input: {
      padding: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
   },
   buttonContainer: {
      marginBottom: 10,
   }
});

export default HomeScreen;
