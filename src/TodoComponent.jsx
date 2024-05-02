import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./App.css";
import { Button, Input, List } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import todo from './assets/todolist.png'

export function TodoComponent() {
  const [readResults, setReadResults] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const createTodo = async function () {
    const newTodoTitleValue = newTodoTitle;
    let Todo = new Parse.Object("Todo");
    Todo.set("title", newTodoTitleValue);
    Todo.set("done", false);
    try {
      await Todo.save();
      alert("Success!", "Tarefa criada");
      readTodos();
      return true;
    } catch (error) {
      alert(`Erro! ${error.message}`);
      return false;
    }
  };

  const readTodos = async function () {
    const parseQuery = new Parse.Query("Todo");
    try {
      let todos = await parseQuery.find();
      setReadResults(todos);
      return true;
    } catch (error) {
      alert(`Erro! ${error.message}`);
      return false;
    }
  };

  useEffect(() => {
    readTodos();
  }, []);

  return (
    <div>
      <div className="header">
        <img
          className="header_logo"
          src={todo}          
          alt="logo"
        />
        <p className="header_text_bold">Lista de tarefas domésticas</p>        
      </div>
      <div className="container">
        <div className="flex_between">
          <span className="list_heading">Atualizar lista</span>
          <Button
            type="primary"
            shape="circle"
            style={{ backgroundColor: "green" }}
            size={"default"}
            onClick={readTodos}
            icon={<RedoOutlined />}
          ></Button>
        </div>
        <div className="new_todo_wrapper flex_between">
          <Input
            onChange={(event) => setNewTodoTitle(event.target.value)}
            placeholder="Nova tarefa"
            size="large"
          />
          <Button
            type="primary"
            className="create_todo_button"
            style={{
              backgroundColor: "green",
            }}
            size={"large"}
            onClick={createTodo}
            icon={<PlusOutlined />}
          >            
          </Button>
        </div>
        <div className="list_container">
          {readResults !== null &&
            readResults !== undefined &&
            readResults.length > 0 && (
              <List       
              className="list"         
                dataSource={readResults}
                renderItem={(item) => (
                  <List.Item className="todo_item">
                    <p
                      className={
                        item.get("done") === true
                          ? "todo_text_done"
                          : "todo_text"
                      }
                    >
                      {item.get("title")}
                    </p>
                    <div className="flex_row">
                      {item.get("done") !== true && (
                        <Button
                          type="primary"
                          shape="circle"
                          className="todo_button"
                          // onClick={() => updateTodo(item.id, true)}
                          icon={
                            <CheckOutlined className="todo_button_icon_done" />
                          }
                        ></Button>
                      )}
                      <Button
                        type="primary"
                        shape="circle"
                        className="todo_button"
                        // onClick={() => deleteTodo(item.id)}
                        icon={
                          <CloseOutlined className="todo_button_icon_remove" />
                        }
                      ></Button>
                    </div>
                  </List.Item>
                )}
              />
            )}
        </div>
      </div>
    </div>
  );
}
