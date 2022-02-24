import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SingleTodo from './SingleTodo';

export default class VisibleTodoList extends React.Component {
  render() {
    const renderItem = ({item}) => (
      <SingleTodo
        todoId={item.id}
        text={item.descriptionText}
        isDone={item.isDone}
        completeTodo={this.props.completeTodo}
        removeTodo={this.props.removeTodo}
      />
    );

    return (
      <View style={styles.container}>
        {this.props.todoList.length > 0 ? (
          <FlatList
            data={this.props.todoList}
            renderItem={renderItem}
            keyExtractor={todo => todo.id}
          />
        ) : (
          <View>
            <Text>Nothing here 🙈🐘</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
});
