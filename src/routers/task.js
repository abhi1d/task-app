const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) =>{

    try {
       const tasks = await Task.find({ }) 
       res.send(tasks)
    } catch (e) {
        res.status(500).send(e) 
    }
})

router.get('/tasks/:id', async (req, res) =>{
    const _id = req.params.id

    try {
        task = await Task.findById({_id})
        if( !task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error:"Invalid updates"})
    }

    try{

        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        // const _id = req.params.id
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new : true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.send()
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }

        res.status(200).send(task)

    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router