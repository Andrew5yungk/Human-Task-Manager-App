import React, { useState } from 'react'
import Create from './Create'
import { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import axios from 'axios'

function Home() {
    const [task, setTask] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/get')
        .then(res => res.json())
        .then(data => setTask(data))
    }, [])
    
    
    const handleDelete = (id) => {
        axios.put(`http://localhost:3001/delete/${id}`)
        .then(result => {location.reload()})
        .catch(err => console.log(err))
    }


  return (
    <div className="App">
        <h1 id="title">Human Task Manager</h1>
        <Create />
        {
            task.length === 0
            ?
            <div><h2>No Tasks ATM</h2></div>
            :
            task.map(task => (
                <div className="task">
                    <div>
                        <input type="checkbox" id="checkbox"/>
                        <span>{task.task}</span>
                        <span className="material-delete" onClick={() => handleDelete(task._id)}><MdDelete /></span>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Home