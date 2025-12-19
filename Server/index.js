const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const HTMModel = require('./Models/HTM')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://andrew5yungk_db_user:tAcobeAst227@htmcluster.epsigpx.mongodb.net/HTMCluster')

app.get('/get', (req, res) => {
    HTMModel.find().then(result => res.json(result))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "An error occurred. Please try again later." });
    })
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    HTMModel.create({
        task: task}).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await HTMModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.done = !task.done;
        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

app.put('/delete/:id', (req, res) => {
    const {id} = req.params;
    HTMModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})  

