import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TodoItem = ({ item, onDelete, onEdit }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [text, setText] = useState(item.text);

   const handleSave = () => {
      onEdit(item.id, text);
      setIsEditing(false);
   };

   return (
      <View style={styles.todoItem}>
         {isEditing ? (
            <TextInput
               style={styles.input}
               value={text}
               onChangeText={setText}
               onSubmitEditing={handleSave}
            />
         ) : (
            <Text style={[styles.todoText, item.completed && styles.completed]}>
               {item.text}
            </Text>
         )}

         <View style={styles.buttonGroup}>
            {isEditing ? (
               <Button title="Сохранить" onPress={handleSave} />
            ) : (
               <Button title="Редактировать" onPress={() => setIsEditing(true)} />
            )}
            <Button title="Удалить" onPress={() => onDelete(item.id)} />
         </View>

      </View>
   );
};

const styles = StyleSheet.create({
   todoItem: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#f8f9fa',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   todoText: {
      fontSize: 16,
   },

   completed: {
      textDecorationLine: 'line-through',
      color: 'grey',
   },

   input: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginRight: 10,
   },

   buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
   },
});

export default TodoItem;
