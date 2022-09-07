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

const defFormValues = {
  [FIELDS.NAME]: ''
}

export const TodoForm = ({ isLoading = false, submit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: defFormValues });

  const onSubmit = (data) => {
    submit(data, () => reset(defFormValues));
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
      <FormControl isInvalid={!!errors[FIELDS.NAME]}>
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
        Add Todo
      </Button>
    </VStack>
  );
};