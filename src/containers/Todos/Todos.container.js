import {
  Container,
  HStack,
} from '@chakra-ui/react';

import { TodoForm, TodoList } from '../../components'
import useTodosPresenter from './Todos.presenter';

const Todos = () => {
  const {
    todos,
    isLoading,
    isFetching,
    submit
  } = useTodosPresenter();

  return (
    <Container p={4} minWidth="90%">
      <HStack alignItems={'start'} spacing={4}>
        {/* Form */}
        <TodoForm isLoading={isLoading} submit={submit} />
        {/* TodoList */}
        <TodoList todos={todos} isFetching={isFetching} />
      </HStack>
    </Container>
  );
};

export default Todos;