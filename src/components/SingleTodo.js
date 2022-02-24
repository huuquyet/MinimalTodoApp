import React from 'react';
import {StyleSheet, Pressable, Switch, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SingleTodo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.pressable}
          onPress={() => this.props.completeTodo(this.props.todoId)}>
          <Switch style={styles.switcher} value={this.props.isDone} />
          <Text
            style={[
              styles.description,
              {textDecoration: this.props.isDone ? 'line-through' : 'none'},
            ]}>
            {this.props.text}
          </Text>
        </Pressable>
        <Icon.Button
          name="trash-o"
          style={styles.deleteButton}
          onPress={() => this.props.removeTodo(this.props.todoId)}>
          DEL
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  pressable: {
    flex: 9,
    flexDirection: 'row',
  },
  switcher: {
    flex: 0.6,
  },
  description: {
    flex: 8,
    marginLeft: 12,
  },
  deleteButton: {
    flex: 1,
  },
});
