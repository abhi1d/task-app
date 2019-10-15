const express = require('express')
require('./db/mongoos') // it connects the database
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use( (req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled.')
//     } else {
//         next()
//     }
// })

// app.use( (req, res, next) => {
//    res.status(503).send('Site is currenlty down. Check back soon!')
// })



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("Server is up on port " + port)
})



// const main = async () => {
//     try {
//         // const task = await Task.findById('5da40a026f6d4e311cec8712')
//         // await task.populate('owner').execPopulate()
//         // console.log(task.owner)

//         const user = await User.findById('5da380ac7fef072a703087cd')
//         await user.populate('tasks').execPopulate()
//         console.log(user.tasks)


//     } catch (error) {
//         console.log(error)
//     }

// }

// main()