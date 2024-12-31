import TodoAdd from "./components/todo/TodoAdd";
import TodoList from "./components/todo/TodoList";
import { TodoProvider } from "./contexts/todoProvider";

// 아래 Provide 에 의해서 state, dispatch 에 접근가능
function App() {
  return (
    <TodoProvider>
      <TodoAdd />
      <TodoList />
    </TodoProvider>
  );
}
export default App;
