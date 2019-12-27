import React, {useState} from 'react'
import {useTodosDispatch} from '../contexts/TodosContext'
import './TodoItem.css'

export type TodoItemProps = {
    todo :{
        id : number;
        text : string;
        done : boolean;
        list : {id : number, text : string}[]
    };
}

const TodoItem = ({todo}: TodoItemProps)=>{
    const [semi, setSemi] = useState(false)
    const [semiText, setSemiText] = useState("");
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
    const textOpen = (e:React.MouseEvent)=>{
        e.preventDefault()
        setSemi(!semi)
    }
    const semiAdd = ()=>{
        dispatch({
            type : "SEMI_ADD",
            id : todo.id,
            text: semiText
        })
    }
    return(
        <li onClick = {toggleClick} className ={`TodoItem ${todo.done? 'done' : ''}`}>
            <div>
                <span className = "text">{todo.text}</span>
                <span onClick = {removeItem} className ="remove">(x)</span>
                <span onClick = {textOpen} className ="remove">(+)</span>
            </div>
            <div style = {semi? {}:{display : "none"}}>
                {
                    todo.list.map((el)=>{
                        return <div>{el.text} </div>
                        
                    })
                }
                <input type = "text" value = {semiText} onChange= {(e)=>{setSemiText(e.target.value)}} />
                <button onClick = {semiAdd}>추가</button>
            </div>
        </li>
    )
}

export default TodoItem