import React from 'react'

import {useTodoState} from '../contexts/TodosContext'
import TodoItem, { TodoItemProps } from './TodoItem'


const TodoList : React.FC= ()=>{
    const todos = useTodoState();
    return(
        <ul>
            {todos.map((el , i : number)=>{
                return <TodoItem todo = {el} key = {i} />
            })}
        </ul>
    )
}

export default TodoList