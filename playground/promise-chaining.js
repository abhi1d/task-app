require('../src/db/mongoos')

const User = require('../src/models/user')

//5d84aceeb353426da0913f64
// User.findByIdAndUpdate('5d8b5ecf36a75a0504164c80', {age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age} )
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('5d8b5ecf36a75a0504164c80', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})