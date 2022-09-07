import {
  ChakraProvider,
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
  QueryClientProvider,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { v4 } from 'uuid';

import { todoStorage } from './storage/TodoStorage';

const queryClient = new QueryClient();

const FIELDS = {
  NAME: 'todoname'
}

const TODO_STATUS = {
  PENDING: 'PENDING',
  FINISHED: 'FINISHED',
}

const addTodo = async ({ todoname }) => {
  return todoStorage.add({
    id: v4(),
    name: todoname,
    createdAt: new Date().toISOString(),
    status: TODO_STATUS.PENDING
  });
};

const getTodos = async () => {
  return todoStorage.getAll()
}

const Todos = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm();

  const qClient = useQueryClient();
  const { data: todos, isLoading, isFetching } = useQuery(['todos'], getTodos, {
    refetchInterval: 3000,
    staleTime: 3000
  });
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      qClient.invalidateQueries(['todos']);
      reset();
    },
    onError: (err) => {
      console.log('ERROR', err);
    }
  });

  const onSubmit = async (formValues) => {
    mutation.mutate(formValues);
  };

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
              onClick={handleSubmit(onSubmit)}
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

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Todos />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
