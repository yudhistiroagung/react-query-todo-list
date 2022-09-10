import {
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';

import todoService from '../../services/todoService';

const useTodosPresenter = () => {
  const client = useQueryClient();

  const { data: todos, isLoading, isFetching } = useQuery(['todos'], todoService.getTodos, {
    staleTime: 15000,
    refetchInterval: 6000
  });

  const mutation = useMutation(todoService.addTodo, {
    onMutate: async (newTodo) => {
      // clear any outgoing so they dont overwrite our optimistic update
      await client.cancelQueries(['todos']);

      // get snapshot of previous value
      const previousTodos = await client.getQueryData(['todos']);

      // optimistically add the item to the list by adding new todo to preview todos
      client.setQueryData(['todos'], prevTodos => [...prevTodos, newTodo]);

      // return context with prevTodos and newTodo
      return { previousTodos, newTodo };
    }
  });

  const submit = (data, options) => {
    if (options.onMutate) options.onMutate();

    mutation.mutate(data, {
      onError: (e, newTodo, context) => {
        console.log('ERROR', e);
        // fallback to previous todo since the update to server is failed
        client.setQueriesData(
          ['todos'],
          context.previousTodos
        );
        if (options?.onError) options.onError(newTodo);
      },
      onSettled: async () => {
        // always refetch after success or failed
        await client.invalidateQueries(['todos']);
        if (options?.onSuccess) options.onSuccess();
      }
    });
  };

  return {
    todos,
    isLoading,
    isFetching,
    submit,
  }
}

export default useTodosPresenter;
