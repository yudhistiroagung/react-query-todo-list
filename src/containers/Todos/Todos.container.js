import {
  Container,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
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
import { useForm } from 'react-hook-form';
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';

import todoService from '../../services/todoService';
import useTodosPresenter from './Todos.presenter';

const FIELDS = {
  NAME: 'todoname'
};

const Todos = () => {
  const {
    todos,
    isLoading,
    isFetching,
    submit
  } = useTodosPresenter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm();

  return (
    <>
      <Container p={4} minWidth="90%">
        <HStack alignItems={'start'}>
          {/* Form Area */}
          <VStack
            flex={1}
            borderWidth={1}
            p={4}
            borderRadius={4}
            spacing={4}
            boxShadow={2}
          >
            <FormControl isInvalid={!!errors[FIELDS.NAME]?.message}>
              <FormLabel>To Do Name</FormLabel>
              <Input {...register(FIELDS.NAME, { required: 'Wajib diisi!' })} />
              <FormErrorMessage>{errors[FIELDS.NAME]?.message}</FormErrorMessage>
            </FormControl>

            <Button
              width={'100%'}
              bgColor="red.500"
              color="white"
              onClick={handleSubmit(submit)}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </VStack>

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