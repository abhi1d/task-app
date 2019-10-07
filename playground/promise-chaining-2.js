require('../src/db/mongoos')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d84a34b154f0b586c070fe7').then((result) => {
//     console.log("deleted : ", result)
//     return Task.countDocuments({completed:false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const deleteAndCount = async (id) => {

    await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteAndCount('5d84bf8796e5b16f1c33a951').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})