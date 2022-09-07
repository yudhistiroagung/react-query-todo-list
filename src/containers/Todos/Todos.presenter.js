import {
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';

import todoService from '../services/todoService';

const useTodosPresenter = () => {
  const qClient = useQueryClient();

  const { data: todos, isLoading, isFetching } = useQuery(['todos'], todoService.getTodos, {
    refetchInterval: 3000,
    staleTime: 3000
  });

  const mutation = useMutation(todoService.addTodo, {
    onSuccess: () => {
      qClient.invalidateQueries(['todos']);
    },
    onError: (err) => {
      console.log('ERROR', err);
    }
  });

  const submit = (data) => mutation.mutate(data);

  return {
    todos,
    isLoading,
    isFetching,
    submit,
  }
}

export default useTodosPresenter;
