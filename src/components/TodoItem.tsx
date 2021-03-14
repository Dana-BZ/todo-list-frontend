import React, { FC } from 'react';
import { Checkbox, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface TodoItemProps {
    todo: Todo,
    onToggleComplete: (id: number) => void,
    onDelete: (id: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {

    const handleCompletedChange = () => {
        onToggleComplete(todo.id);
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };


    return (
        <ListItem button onClick={handleCompletedChange}>
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={handleCompletedChange}
                    checked={todo.completed}
                />
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem >
    );
};

export default TodoItem;
