const users = new Array(20).fill(0)
.map((_, i) => {
  return {
    id: i,
    createdAt: Date.now() + i,
    email: `readycoder${i}@gmail.com`
  }
})

// simulate async db call with promise
const findUser = (id) => new Promise((resolve, reject) => {
  // console.log(users)
  const user = users.find(user => user.id === id)
  if (user) {
    return resolve(user)
  }
  reject(new Error(`No user with id "${id}"`))
}).catch(
  (error) => {
    // console.log(error)
  }
)

// simulate async db call with promise
const deleteUser = (id) => new Promise((resolve, reject) => {
  // const id = fixId(id)
  const i = users.findIndex(user => user.id === id)

  if (i < 0) {
    return reject(new Error(`No user with id "${id}"`))
  }

  users.splice(i, 1)
  resolve({id})
}).catch(
  (error) => {
    // console.log(error)
  }
)

module.exports = {
  findUser,
  deleteUser
}
