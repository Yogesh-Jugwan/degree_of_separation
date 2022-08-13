import React, { useState } from "react";

const FriendRelationShip = ({ connections, ToastContainer, toast }) => {
  const [people, setPeople] = useState("");
  const [friend, setFriend] = useState("");
  const [friendConnection, setFriendConnection] = useState([]);
  function connectionsListToGraph(connectionsData) {
    const Graph = {};
    for (let { name, friends } of connectionsData) {
      Graph[name] = friends;
    }
    return Graph;
  }

  function getConnections(source, target, connectionsData) {
    const Graph = connectionsListToGraph(connectionsData);
    const connectionPaths = [];

    function findConnectionsDFS(source, target, path = [source], visited = {}) {
      if (visited[source]) return;

      visited[source] = true;

      for (let friend of Graph[source]) {
        if (friend === target) {
          connectionPaths.push(path.concat("->" + target));
        } else {
          findConnectionsDFS(
            friend,
            target,
            path.concat("->" + friend),
            visited
          );
        }
      }
    }
    findConnectionsDFS(source, target);

    connectionPaths.length === 0 && toast.warn("People No Friend exists");
    connectionPaths.length !== 0 && toast.success(source + " see your frineds/Links");

    setFriendConnection(connectionPaths);
  }
  
  return (
    // return the list of connections between source and target
    <>
      <div className="container mt-4 bg-info p-3  ">
        <label className="font-weight-bold text-light">Degree of separation</label>
        <div className="row">
          <div className="col">
            <select
              className="form-control"
              onChange={(event) => {
                setPeople(event.target.value);
              }}
            >
              <option>Select People</option>
              {connections.map((item) => {
                return (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col">
            <select
              className="form-control"
              onChange={(event) => {
                setFriend(event.target.value);
              }}
            >
              <option>Select Friend </option>
              {connections.map((item) => {
                return (
                  item.name !== people && (
                    <option value={item.name} key={item.id}>
                      {item.name}
                    </option>
                  )
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-3 center">
          {people === "" || people === "Select People" || friend === "" || friend === "Select Friend" ? "" :
            <button
              type="submit"
              className={`btn btn-primary btn-lg btn-block `}

              onClick={() => getConnections(people, friend, connections)}
            >
              submit
            </button>}
          <ToastContainer />
        </div>
        {friendConnection.map(i => <p key={i+1} className="font-weight-bold text-light mt-3">{i}</p>)}
      </div>
    </>
  );
};

export default FriendRelationShip;
