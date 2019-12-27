import React, { useContext } from 'react';
import {createContext, Dispatch, useReducer} from 'react'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

export type SemiTodo = {
    id : number;
    text : string;
}
export type Todo = {
    id :number;
    text : string;
    done : boolean;
    list : SemiTodo[];
};

type TodoState = Todo[];

const TodoStateContext = createContext<TodoState | undefined>(undefined);

type Action = 
    | {type : "CREATE"; text: string}
    | {type : "TOGGLE"; id : number}
    | {type : "REMOVE"; id : number}
    | {type : "SEMI_ADD"; id: number, text : string}

type TodosDispatch = Dispatch<Action>;
const TodoDispatchContext = createContext<TodosDispatch | undefined>(undefined);

function todoReducer(state : TodoState, action : Action) : TodoState{
    switch(action.type){
        case 'CREATE' :
            const nextId = Math.max(...state.map(todo => todo.id))+1;
            return state.concat({
                id : nextId,
                text : action.text,
                done : false,
                list : []
            })
        case "TOGGLE" :
            return state.map(todo=> todo.id === action.id? {...todo, done : !todo.done} : todo)
        case "REMOVE" :
            return state.filter(todo => todo.id !== action.id)
        case "SEMI_ADD" :
            const index = state.findIndex((el)=> el.id === action.id) 
            const size = state[index].list.length;
            const data = {id : size+1, text : action.text}
            state[index].list.concat(data)
            return [...state];
            
        default :
            return {...state}
    }
}

export function useTodoState(){
    const state = useContext(TodoStateContext);
    if(!state) throw new Error("todo provider not found");
    return state;
}

export function useTodosDispatch(){
    const dispatch = useContext(TodoDispatchContext);
    if(!dispatch) throw new Error('todos provider not found');
    return dispatch;
}

export function TodosContextProvider({children} : {children : React.ReactNode}){
    const [todos, dispatch] = useReducer(todoReducer, [
        {
            id: 1,
            text : 'context공부',
            done : false,
            list : []
        },
        {
            id: 2,
            text : '라라벨',
            done : true,
            list : []
        },
        {
            id: 3,
            text : 'rx',
            done : false,
            list : []
        }
    ])
    return (
        <TodoDispatchContext.Provider value = {dispatch}>
            <TodoStateContext.Provider value = {todos}>
                {children}
            </TodoStateContext.Provider>
        </TodoDispatchContext.Provider>
    )
}