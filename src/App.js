import "./App.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPeoples from "./AddPeoples";
import AddFriends from "./AddFriends";
import FriendRelationShip from "./FriendRelationShip";
import Nav from "./Nav";
const getPeopleByLocalStorage = () => {
  let peopleData = localStorage.getItem("connections");
  if (peopleData) {
    return JSON.parse(localStorage.getItem("connections"));
  } else {
    return [];
  }
};

function App() {
  const [connections, setConnections] = useState(getPeopleByLocalStorage());
  const [peopleName, setPeopleName] = useState("");

  useEffect(() => {
    localStorage.setItem("connections", JSON.stringify(connections));
  }, [connections]);
  return (
    <>
    <Nav/>
      <div className="container">
        <div className="row">
          <AddPeoples
            connections={connections}
            setConnections={setConnections}
            peopleName={peopleName}
            setPeopleName={setPeopleName}
            ToastContainer={ToastContainer} toast={toast}
          />
          <AddFriends
            connections={connections}
            setConnections={setConnections}
            ToastContainer={ToastContainer} toast={toast}
          />
          <FriendRelationShip connections={connections} ToastContainer={ToastContainer} toast={toast}/>
        </div>
      </div>
    </>
  );
}

export default App;
