import React, { FC } from 'react';
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    completedStyle: {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }
}));

interface TodoItemProps {
    todo: Todo,
    onToggleComplete: (id: number) => void,
    onDelete: (id: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
    const classes = useStyles();

    const handleCompletedChange = () => {
        onToggleComplete(todo.id);
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };

    return (
        <ListItem
            button
            onClick={handleCompletedChange}
            className={todo.completed ? classes.completedStyle : ''} >
            <ListItemIcon>
                <Checkbox
                    edge="end"
                    onChange={handleCompletedChange}
                    checked={todo.completed}
                />
            </ListItemIcon>
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem >
    );
};

export default TodoItem;
