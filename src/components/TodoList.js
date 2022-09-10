import { useRef, useEffect } from 'react';
import {
  VStack,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Spinner,
  Text
} from '@chakra-ui/react';
import autoAnimate from '@formkit/auto-animate';

import { TODO_STATUS } from '../constants';
import { toSimpleDate } from '../utils';

const StatusBadge = ({ status }) => {
  const color = status === TODO_STATUS.PENDING
    ? 'yellow.300'
    : 'green.500';
  return (
    <Text
      bgColor={color}
      color="whitesmoke"
      fontWeight="bold"
      px={2}
      py={1}
      borderRadius={4}
    >
      {status}
    </Text>
  );
}

export const TodoList = ({ todos = [], isFetching = false }) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

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
          <Tbody ref={parent}>
            {todos?.map(({ id, name, createdAt, status }) => (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>{toSimpleDate(createdAt)}</Td>
                <Td><StatusBadge status={status} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isFetching && <Spinner color="red.500" alignSelf="center" mt={4} />}
    </VStack>
  );
};
