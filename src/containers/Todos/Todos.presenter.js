import {
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';

import todoService from '../../services/todoService';

const useTodosPresenter = () => {
  const qClient = useQueryClient();

  const { data: todos, isLoading, isFetching } = useQuery(['todos'], todoService.getTodos, {
    refetchInterval: 3000,
    staleTime: 3000
  });

  const mutation = useMutation(todoService.addTodo);

  const submit = (data, onSuccess) => mutation.mutate(data, {
    onSuccess: async () => {
      qClient.invalidateQueries('todos');
      if (onSuccess) onSuccess()
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
