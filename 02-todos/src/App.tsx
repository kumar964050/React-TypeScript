import React, {
  FC,
  ChangeEvent,
  ReactEventHandler,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}
interface TodoItemProps {
  todo: Todo;
  handleDelete: (id: number) => void;
  handleUpdateTodo: (id: number) => void;
}
interface ButtonProps {
  children: ReactNode;
  handleClick?: ReactEventHandler;
  type?: "button" | "submit" | "reset";
}

function saveLocalStorage(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const TodoItem: FC<TodoItemProps> = ({
  todo,
  handleUpdateTodo,
  handleDelete,
}) => {
  const onDelete: ReactEventHandler = () => {
    handleDelete(todo.id);
  };
  const onUpdate: ReactEventHandler = () => {
    handleUpdateTodo(todo.id);
  };
  return (
    <li className="todo-item-container d-flex flex-row">
      <input
        checked={todo.isCompleted}
        onChange={onUpdate}
        type="checkbox"
        id={`checkbox-${todo.id}`}
        className="checkbox-input"
      />
      <div className="label-container d-flex flex-row">
        <label className="checkbox-label" htmlFor={`checkbox-${todo.id}`}>
          {todo.text}
        </label>
        <div className="delete-icon-container">
          <i onClick={onDelete} className="far fa-trash-alt delete-icon"></i>
        </div>
      </div>
    </li>
  );
};

const Button: FC<ButtonProps> = ({
  children,
  handleClick,
  type = "button",
}) => {
  return (
    <button className="button" type={type} onClick={handleClick}>
      {children}
    </button>
  );
};

const App: FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // onchange
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  // onsubmit (add new)
  const handleSubmitted: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let lastId = 1;
    if (todoList.length > 0) lastId = todoList[todoList.length - 1].id + 1;

    const exist = todoList.find(
      (todo: Todo) => todo.text.toLowerCase() === newTodoText
    );
    if (exist) {
      setErrorMsg("this is already in the list");
      return;
    }
    setErrorMsg("");

    const newTodoObj = {
      id: lastId,
      text: newTodoText,
      isCompleted: false,
    };
    const newTodoList = [...todoList, newTodoObj];
    saveLocalStorage(newTodoList);
    setTodoList(newTodoList);
    setNewTodoText("");
  };

  // update
  const handleUpdateTodo = (id: number) => {
    const updateTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    saveLocalStorage(updateTodoList);
    setTodoList(updateTodoList);
  };

  // delete
  const handleDelete = (id: number) => {
    const res = confirm("Are you sure you want to delete");
    if (!res) return;
    const filteredTodoList = todoList.filter((todo) => todo.id !== id);
    saveLocalStorage(filteredTodoList);
    setTodoList(filteredTodoList);
  };

  const handleSave: ReactEventHandler = () => {
    saveLocalStorage(todoList);
  };

  useEffect(() => {
    const getItems = localStorage.getItem("todos");
    if (getItems) {
      setTodoList(JSON.parse(getItems));
    }
  }, []);

  return (
    <div className="todos-bg-container a">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="todos-heading">Todos </h1>
            <h1 className="create-task-heading">
              Create<span className="create-task-heading-subpart">Task</span>
            </h1>
            <form onSubmit={handleSubmitted}>
              <input
                type="text"
                value={newTodoText}
                onChange={handleChange}
                className="todo-user-input"
                placeholder="What needs to be done?"
              />
              <p className="text-danger">{errorMsg.length > 0 && errorMsg}</p>
              <Button type="submit">Add</Button>
            </form>

            <h1 className="todo-items-heading">
              My <span className="todo-items-heading-subpart">Tasks</span>
            </h1>
            <ul className="todo-items-container ">
              {todoList.map((todo, index) => (
                <TodoItem
                  key={index}
                  todo={todo}
                  handleUpdateTodo={handleUpdateTodo}
                  handleDelete={handleDelete}
                />
              ))}
            </ul>
            <Button handleClick={handleSave} type="submit">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
