import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react';
import { v4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TODO_STATUS } from '../constants';

const FIELDS = {
  NAME: 'todoname'
};

const defFormValues = {
  [FIELDS.NAME]: ''
};

const validationSchema = yup.object().shape({
  [FIELDS.NAME]: yup.string()
    .matches(/^[a-zA-Z0-9_]*$/, 'Tidak boleh ada karakter khusus')
    .min(3, 'Minimal 3 karakter')
    .max(20, 'Maksimal 20 karakter')
    .required('Wajib diisi!')
})

export const TodoForm = ({ isLoading = false, submit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defFormValues,
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = ({ todoname: name }) => {
    const todo = {
      id: v4(),
      name,
      status: TODO_STATUS.PENDING,
      createdAt: new Date().toISOString()
    };
    submit(todo,
      {
        onSuccess: () => reset(defFormValues)
      }
    );
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
      <FormControl isInvalid={!!errors[FIELDS.NAME]} isDisabled={isLoading}>
        <FormLabel>To Do Name</FormLabel>
        <Input {...register(FIELDS.NAME)} />
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