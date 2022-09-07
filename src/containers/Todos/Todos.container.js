import {
  Container,
  HStack,
  VStack,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Spinner
} from '@chakra-ui/react';

import { TodoForm } from '../../components'
import useTodosPresenter from './Todos.presenter';

const Todos = () => {
  const {
    todos,
    isLoading,
    isFetching,
    submit
  } = useTodosPresenter();

  return (
    <>
      <Container p={4} minWidth="90%">
        <HStack alignItems={'start'}>
          {/* Form Area */}
          <TodoForm isLoading={isLoading} submit={submit} />

          <Box width={2} />

          {/* TodoList Area */}
          <VStack flex={2}>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Todo</Th>
                    <Th>Created At</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {todos?.map(todo => (
                    <Tr key={todo.id}>
                      <Td>{todo.name}</Td>
                      <Td>{todo.createdAt}</Td>
                      <Td>{todo.status}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {isFetching && <Spinner color="red.500" />}
            </TableContainer>
          </VStack>
        </HStack>
      </Container>
    </>
  );
};

export default Todos;