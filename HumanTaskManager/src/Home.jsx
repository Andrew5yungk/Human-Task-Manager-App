import React, { useState } from 'react'
import Create from './Create'
import { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import './App.css'

function Home() {
    const [task, setTask] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/get')
        .then(res => res.json())
        .then(data => setTask(data))
    }, [])
    
    const [fadeIn, setFadeIn] = useState(false)

    useEffect(() => {
        if (task.length > 0) {
            setFadeIn(true)
            setTimeout(() => setFadeIn(false), 500)
        }
    }, [task])

    const handleDelete = (id) => {
        axios.put(`http://localhost:3001/delete/${id}`)
        .then(() => setTask(task => task.filter(t => t._id !== id)))
        .catch(err => console.log(err))
    }
// toggles the completion of a task
    const handleToggle = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
        .then(() => setTask(task => task.map(t => t._id === id ? {...t, done: !t.done} : t)))
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
                <div className="task" style={{border: task.done ? '1px solid red' : '', boxShadow: task.done ? '0 4px 8px 0 red, 0 6px 20px 0 red' : '', borderRadius: task.done ? '5px' : '', taskHover: task.done ? 'box-shadow: 0 8px 16px 0 red, 0 12px 40px 0 red' : ''}}> 
                    <div>
                        <input type="checkbox" id="checkbox" checked={task.done} onChange={() => handleToggle(task._id)}/> 
                        <span className={task.done ? "strikethrough" : ""}>{task.task}</span>
                        <span className="material-delete" onClick={() => handleDelete(task._id)}><MdDelete /></span> 
                    </div>
                </div>
            ))
        }
    </div>
  )
}



export default Home