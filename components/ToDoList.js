import React from 'react';
import { FlatList } from 'react-native';
import TodoItem from './ToDoItem';

const TodoList = ({ todos, onDelete, onEdit }) => {
   return (
      <FlatList
         data={todos}
         renderItem={({ item }) => <TodoItem item={item} onDelete={onDelete} onEdit={onEdit} />}
         keyExtractor={(item) => item.id.toString()}
      />
   );
};
export default TodoList;