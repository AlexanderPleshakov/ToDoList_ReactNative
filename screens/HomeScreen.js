import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import TodoList from '../components/ToDoList';

const HomeScreen = () => {
   const [text, setText] = useState('');
   const [todos, setTodos] = useState([]);
   const addTodo = () => {
      if (text.trim()) {
         setTodos([...todos, { id: Date.now(), text }]);
         setText('');
      }
   };
   const deleteTodo = (id) => {
      setTodos(todos.filter(todo => todo.id !== id));
   };
   const editTodo = (id, newText) => {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
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

         <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
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