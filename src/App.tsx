import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TodoList from './components/TodoList';

const App = () => {
  const appBar = () => (
    <AppBar position="static" style={{ alignItems: 'center' }}>
      <Toolbar>
        <Typography variant="h4">
          Todo List
        </Typography>
      </Toolbar>
    </AppBar>
  );

  return (
    <>
      {appBar()}
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Paper elevation={3}>
          <TodoList />
        </Paper>
      </Container>
    </>
  );
};

export default App;
