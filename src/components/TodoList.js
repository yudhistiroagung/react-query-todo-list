import {
  VStack,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Spinner
} from '@chakra-ui/react';

export const TodoList = ({ todos = [], isFetching = false }) => {
  return (
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
      </TableContainer>
      {isFetching && <Spinner color="red.500" alignSelf="center" mt={4} />}
    </VStack>
  );
};
