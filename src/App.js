import React, { useState } from "react";
import Constants from "./utilities/Constants";
import CreateTodoListForm from "./components/CreateTodoListForm";
import UpdateTodoListForm from "./components/UpdateTodoListForm"; 

function App() {
  const [todolist, setTodoList] = useState([]);
  const [showCreateTodoListForm, setShowCreateTodoListForm] = useState(false);
  const [updateTodoListForm, setupdateTodoListForm] = useState(null); 
  const [itemCurrentStatus, setItemCurrentStatus] = useState(null); 

  function getTodoList() {
    const url = Constants.API_URL_GET_ALL_TODO_LIST;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(todoListFromServer => {
        console.log(todoListFromServer);
        setTodoList(todoListFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert('Fetch is failed, please make sure TodoList API service is up and running');
      });
  }


  function deleteItem(itemId)
  {
    const url = `https://localhost:44347/api/TodoList/${itemId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onItemDeleted(itemId);
      })
      .catch((error) => {
        console.log(error);
        alert('Delete operation is failed!');
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div col d-flex flex-column justify-content-center align-items-center>
         
         {(showCreateTodoListForm === false && updateTodoListForm === null ) && (
             <div className="mt-5">             
             <button onClick={() => setShowCreateTodoListForm(true)} className="btn btn-secondary btn-lg w-25 " >Create New Task</button>
           </div>
         )}
       

          {(todolist.length > 0 && showCreateTodoListForm === false) && renderTodoList()}

          {showCreateTodoListForm == true && <CreateTodoListForm onTodoItemCreated={onTodoItemCreated} />}

          {updateTodoListForm !== null && <UpdateTodoListForm  updatedTodoItem = {updateTodoListForm} onTodoItemUpdated = {onTodoItemUpdated} />}

        </div>
      </div>


    </div>
  );

  function renderTodoList() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              todolist.map((todoItem) => (
                <tr key={todoItem.id}>
                  <td >{todoItem.id}</td>
                  <td>{todoItem.description}</td>
                  <td>{todoItem.isCompleted == false ? "Not Complete" : "Completed"}
                  <input type="checkbox" checked={todoItem.isCompleted}></input>
                  </td>
                  <td>
                    <button onClick={() => onTodoItemUpdated(todoItem) } className="btn btn-dark btn-mid mx-3 my-3">Update</button>
                    <button onClick={() => {if(window.confirm(`Are you sure, you want to delete todo item "${todoItem.description}"?`)) deleteItem(todoItem.id) }} className="btn btn-secondary btn-lg mx-3 my-3">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }

  function onTodoItemCreated(createdTodoItem) {
    setShowCreateTodoListForm(false);

    if (createdTodoItem === null) {
      return;
    }

    alert(`New task is created, after clicking OK, your new task "${createdTodoItem.description}" will displayed in table`);

    getTodoList();

  }

  function onTodoItemUpdated(updatedTodoItem)
  {
    setupdateTodoListForm(null);

    if (updatedTodoItem === null)
    {
      return;
    }

    let copyTodoItem = [...todolist];

    const index = copyTodoItem.findIndex((copyTodoItem, currentIndex) => {
      if (copyTodoItem.id === updatedTodoItem.id)
      {
        return true;
      }
    });

      if (index !== -1 )
      {
        copyTodoItem[index] = updatedTodoItem;
      }
      setTodoList(copyTodoItem);

      alert(`Task is updated sucessfully`);
    
  }

  function onItemDeleted(deletedItemId)
  {  
    let copyTodoItem = [...todolist];

    const index = copyTodoItem.findIndex((copyTodoItem, currentIndex) => {
      if (copyTodoItem.id === deletedItemId)
      {
        return true;
      }
    });

      if (index !== -1 )
      {
        copyTodoItem.splice(index, 1);
      }
      setTodoList(copyTodoItem);

      alert(`Task is deleted sucessfully`);
     
  }     

}

export default App;