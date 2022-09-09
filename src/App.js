import {
  ChakraProvider,
} from '@chakra-ui/react';
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import todoWorker from './services/todoWorker';
import { TodosContainer } from './containers/Todos';

todoWorker.start();

const queryClient = new QueryClient();

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <TodosContainer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
