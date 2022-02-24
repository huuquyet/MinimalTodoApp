import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions';
import TodoApp from './presenter';

function mapStateToProps(state) {
  const {todos, scheme, hideCompleted} = state;
  return {
    todos,
    scheme,
    hideCompleted,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: bindActionCreators(actions.addTodo, dispatch),
    removeTodo: bindActionCreators(actions.removeTodo, dispatch),
    completeTodo: bindActionCreators(actions.completeTodo, dispatch),
    toggleScheme: bindActionCreators(actions.toggleScheme, dispatch),
    toggleCompleted: bindActionCreators(actions.toggleCompleted, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
