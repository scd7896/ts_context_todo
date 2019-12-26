import React from 'react';
import TodoForm from './components/TodoFrom'
import TodoList from './components/TodoList'
import {TodosContextProvider} from './contexts/TodosContext'
import './App.css';

const App: React.FC = () => {
  return (
    <TodosContextProvider>
      <TodoForm />
      <TodoList />
    </TodosContextProvider>
  );
}

export default App;
