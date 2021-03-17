import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { deleteFromApi, fetchFromAPI, postToApi, putToApi } from '../api';
import { Box, Button, Container, Grid, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import SendIcon from '@material-ui/icons/Send';
import TodoItem from './TodoItem';

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
        <>
            <List>
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} onDelete={onDelete} />)}
            </List>
            <Box justifyContent='center' display='flex'>
                <TextField
                    onChange={event => setTodoText(event.target.value)}
                    value={todoText}
                    placeholder={"Enter todo here"}
                    style={{ margin: '10px' }}
                />
                <Button startIcon={<SendIcon />} style={{ margin: '10px' }} onClick={addTodo}>
                    Add
            </Button>
            </Box>
        </>
    );
};

export default TodoList;
