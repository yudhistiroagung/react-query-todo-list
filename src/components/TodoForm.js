import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const FIELDS = {
  NAME: 'todoname'
};

export const TodoForm = ({ isLoading = false, submit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    submit(data, reset);
  }

  return (
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
  );
};