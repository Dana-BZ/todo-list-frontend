import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { deleteFromApi, fetchFromAPI, postToApi, putToApi } from '../api';
import TodoItem from './TodoItem';
import { Button, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>('');

    useEffect(() => {
        // at mount we get todos from api
        setIsLoading(true);
        fetchFromAPI('todos').then(todosFromApi => {
            setIsLoading(false);
            setTodos(todosFromApi);
        });
    }, []);


    const onToggleComplete = (id: number) => {
        const newCompletedValue = !todos.find(todo => todo.id === id)!.completed;

        setIsLoading(true);
        putToApi('todos', id, { completed: newCompletedValue })
            .then(updatedTodo => {
                setIsLoading(false);
                // settings todos to new array and replacing old todo with updated todo
                setTodos(todos.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo));
            });
    };

    const onDelete = (id: number) => {
        setIsLoading(true);
        deleteFromApi('todos', id)
            .then(deletedTodo => {
                setIsLoading(false);
                // settings todos to new array and removing deleted todo
                setTodos(todos.filter(todo => todo.id !== deletedTodo.id));
            });
    };

    const addTodo = () => {
        setIsLoading(true);
        const todoToAdd = { text: todoText };
        postToApi('todos', todoToAdd)
            .then(newTodo => {
                setIsLoading(false);
                // settings todos to new array and removing deleted todo
                setTodos([...todos, newTodo]);
            });
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <List>
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} onDelete={onDelete} />)}
            </List>
            <TextField
                onChange={event => setTodoText(event.target.value)}
                value={todoText}
                placeholder={"Enter todo here"}
            />
            <Button onClick={addTodo}>
                Add
            </Button>
        </div>
    );
};

export default TodoList;
