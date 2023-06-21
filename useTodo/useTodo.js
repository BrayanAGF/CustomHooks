import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer";

export const useTodo = ( initialState = [] ) => {

    const init = () => {
        return JSON.parse( localStorage.getItem('todos') || []);
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos]);
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: 'Create',
            payload: todo
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch( {
            type: 'Delete',
            payload: id
        } );
    }

    const handleToggleTodo = (id) => {
        dispatch( {
            type: 'Toggle',
            payload: id
        } );
    } 

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }

}