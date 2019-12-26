import React from 'react'
import {useTodosDispatch} from '../contexts/TodosContext'
import './TodoItem.css'

export type TodoItemProps = {
    todo :{
        id : number;
        text : string;
        done : boolean;
    };
}

const TodoItem = ({todo}: TodoItemProps)=>{
    const dispatch = useTodosDispatch();
    const toggleClick = ()=>{
        dispatch({
            type : 'TOGGLE',
            id : todo.id
        })
    }
    const removeItem = ()=>{
        dispatch({
            type : "REMOVE",
            id : todo.id
        })
    }
    return(
        <li onClick = {toggleClick} className ={`TodoItem ${todo.done? 'done' : ''}`}>
            <span className = "text">{todo.text}</span>
            <span onClick = {removeItem} className ="remove">(x)</span>
        </li>
    )
}

export default TodoItem