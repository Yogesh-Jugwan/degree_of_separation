import React, { useState } from 'react'

const AddFriends = ({ connections, setConnections, ToastContainer, toast }) => {
    const [people, setPeople] = useState('');
    const [friend, setFriend] = useState('');

    const addFriend = () => {
        const objIndex = connections.findIndex((obj => obj.name === people));
        let newConnection = [...connections];
        newConnection[objIndex].friends.push(friend);
        setConnections(newConnection);
        toast.success("Friend add successfully")
    }
    return (
        <div className='container mt-4 p-3 bg-info col ml-2'>
            <label htmlFor="exampleInputEmail1">Add Friend</label>
            <div className="input-group mb-3 ">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">select people</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setPeople(event.target.value)}>
                    <option>Select People</option>
                    {connections.map((item) => (
                        item.friends.length < 2 &&
                        <option value={item.name} key={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Add friend</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setFriend(event.target.value)}>
                    <option>Select Friend</option>
                    {connections.filter(item => item.name !== people).map((item) => {
                        const i = connections.findIndex((obj => obj.name === people));

                        // debugger;
                        return connections[i] && !connections[i].friends.includes(item.name) && <option value={item.name} key={item.id}>{item.name}</option>
                    })}
                </select>
            </div>
            <div>
                <button type="submit" className="btn btn-primary" onClick={addFriend}>Submit</button>
                <ToastContainer />
            </div>
        </div >
    )
}

export default AddFriends