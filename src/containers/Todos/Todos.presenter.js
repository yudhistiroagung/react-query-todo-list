import {
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';

import todoService from '../../services/todoService';

const useTodosPresenter = () => {
  const client = useQueryClient();

  const { data: todos, isLoading, isFetching } = useQuery(['todos'], todoService.getTodos, {
    refetchInterval: 15000,
    staleTime: 15000
  });

  const mutation = useMutation(todoService.addTodo);

  const submit = (data, onSuccess) => mutation.mutate(data, {
    onSuccess: async () => {
      await client.invalidateQueries(['todos']);
      if (onSuccess) onSuccess();
    },
    onError: () => { }
  });

  return {
    todos,
    isLoading,
    isFetching,
    submit,
  }
}

export default useTodosPresenter;
