import React from 'react'

const AddFriend = ({ peopleName, setConnections, setPeopleName, connections,ToastContainer, toast }) => {
  
    const addPeople = (event) => {
        event.preventDefault();
        const i = connections.findIndex(item => item.name === peopleName);
        if (!peopleName) {
            toast.error("Plzz Enter a Name")
        } else if (i > -1) {
            return toast.warn('People Name is already exists')
        }
        else {
            const inputData = {
                id: new Date().getTime().toString(),
                name: peopleName,
                friends: [],
            };
            setConnections([...connections, inputData]);
            setPeopleName("");
            toast.success("People add successfully")
        }
    };
    return (
        <>
            <div className='container mt-4 bg-info p-3 col'>
                <form onSubmit={addPeople}>
                    <div className="form-group">
                        <label className="font-weight-bold text-light">Add People</label>

                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name"
                            value={peopleName}
                            onChange={(e) => setPeopleName(e.target.value)} />

                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <ToastContainer />
                </form>
            </div>
        </>
    )
}

export default AddFriend