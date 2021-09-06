import React, {Fragment, useState} from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";
function App() {
  const [users, setUsers] = useState([])

  const onAddUserHandler = (username, age) =>{
    setUsers((prevUsers) => {
      return [{name: username, age: age, id: Math.random().toString()}, ...prevUsers]
    })
  }

  return (
    <Fragment>
      <AddUser onAddUser={onAddUserHandler}/>
      <UsersList users={users}/>
    </Fragment>
  );
}

export default App;
