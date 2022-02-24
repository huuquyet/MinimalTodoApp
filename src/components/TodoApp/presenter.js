import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ThemeProvider} from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import {filterTitles, themeModes} from '../../common/constants';
import {lightTheme, darkTheme, GlobalStyles} from '../../common/themes';
import Todo from '../../lib/Todo';
import VisibleTodoList from '../VisibleTodoList';

const moonIcon = <Icon name="moon-o" size={36} color="#ccc" />;
const sunIcon = <Icon name="sun-o" size={36} color="#333" />;

export default class TodoApp extends React.Component {
  _addTodo = async () => {
    const todo = new Todo(this.task);
    this.props.addTodo(todo);
  };

  render() {
    const {
      todos,
      scheme,
      hideCompleted,
      removeTodo,
      completeTodo,
      toggleScheme,
      toggleCompleted,
    } = this.props;

    const pendingTodos = todos.filter(todo => !todo.isDone);

    const todoList = function (todos, hideCompleted) {
      return hideCompleted ? pendingTodos : todos;
    };

    const pendingTodosTitle = `${
      pendingTodos.length > 0 ? ` (${pendingTodos.length})` : ''
    }`;

    return (
      <ThemeProvider
        theme={scheme === themeModes.DARK ? darkTheme : lightTheme}>
        <>
          <GlobalStyles />
          <View style={styles.statusBarPad} />
          <View>
            <Pressable
              style={styles.toggleSchemeButton}
              onPress={() => toggleScheme(scheme)}>
              <Switch value={scheme === themeModes.DARK} />
              {scheme === themeModes.DARK ? moonIcon : sunIcon}
            </Pressable>
          </View>

          <Text style={styles.header}>📝️ To Do List {pendingTodosTitle}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus
              style={styles.todoInput}
              placeholder="What do you want to do?"
              onChangeText={text => (this.task = text)}
            />
            <Icon.Button
              style={styles.addButton}
              name="plus"
              onPress={this._addTodo}>
              ADD
            </Icon.Button>
          </View>

          <View style={styles.filterButton}>
            <Icon.Button
              name="filter"
              onPress={() => toggleCompleted(hideCompleted)}>
              {hideCompleted
                ? filterTitles.SHOW_ALL
                : filterTitles.HIDE_COMPLETED}
            </Icon.Button>
          </View>

          <VisibleTodoList
            todoList={todoList(todos, hideCompleted)}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        </>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  statusBarPad: {
    paddingTop: StatusBar.currentHeight,
  },
  toggleSchemeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  header: {
    fontSize: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
  },
  todoInput: {
    flex: 9,
    height: 40,
    padding: 10,
  },
  addButton: {
    flex: 1,
  },
  filterButton: {
    alignItems: 'center',
    margin: 12,
  },
});
