import { useEffect, useState } from "react";
import { getData, getSavedUser, updateTodo } from "../../Utils/UserFunctions";
import Card from "../../Components/Card/Card";
import "./Dashboard.css";
function Dashboard() {
  const [isloggedin, setIsLoggedIn] = useState(false);
  const [Todos, setTodos] = useState<any>();
  const [changeTodos, setChangeTodos] = useState<any[]>([]);
  useEffect(() => {
    // console.log("Dashboard");
    getData("todos").then((res) => {
      setTodos(res);
      console.log(res);
    });
    if (getSavedUser().token) {
      setIsLoggedIn(true);
      // console.log("Logged In");
    } else {
      setIsLoggedIn(false);
      // console.log("Not Logged In");
    }
  }, []);
  const moveItems = () => {
    changeTodos.forEach((id: any) => {
      Todos.forEach((todo: any) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          updateTodo(todo);
        }
      });
    });
    setTodos(Todos);
    setChangeTodos([]);
  };
  // const moveItems = () => {
  //   changeTodos.forEach(async (id: any) => {
  //     Todos.forEach(async (todo: any) => {
  //       if (todo.id === id) {
  //         console.log("first",todo);
  //         console.log(await updateTodo(todo))
  //         todo=await updateTodo(todo);
  //         console.log("second",todo);
  //       }
  //     });
  //   });
  //   setTodos(Todos);
  //   setChangeTodos([]);
  // }
  return (
    <div className="Dashboard">
      <div className="Dashboard-Title">Dashboard</div>
      <div className="Todo-Wrapper">
        <Card className="Todos">
          <div className="Todos-Title">Not completed Todos</div>
          <Card className="Todos-List">
            {Todos?.filter((todo: any) => {
              return todo.completed === false;
            }).map((todo: any) => {
              return (
                <div
                  className="Todo-Item"
                  onClick={() =>
                    setChangeTodos((prev: any) => {
                      return [...prev, todo.id];
                    })
                  }
                  key={todo.id}
                >
                  {todo.todo}
                </div>
              );
            })}
          </Card>
        </Card>
        <div className="Todo-Buttons">
        <button className="Todo-Button" onClick={() => moveItems()}>
          Move
        </button>
        <button className="Todo-Button" onClick={() => console.log(changeTodos)}>
          Logger
        </button>
        </div>
        <Card className="Todos">
          <div className="Todos-Title">Completed Todos</div>
          <Card className="Todos-List">
            {Todos?.filter((todo: any) => {
              return todo.completed === true;
            }).map((todo: any) => {
              return (
                <div
                  className="Todo-Item"
                  key={todo.id}
                  onClick={() =>{
                    setChangeTodos((prev: any) => {
                      return [...prev, todo.id];
                    })}
                  }
                >
                  {todo.todo}
                </div>
              );
            })}
          </Card>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
