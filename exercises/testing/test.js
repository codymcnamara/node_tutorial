users = require ('./users')

// write some tests
describe('users', () => {

  test('findUser to work with valid id', () => {
    return users.findUser(1).then(data => {
      expect(data ).toHaveProperty('id', 1)
    })
  })
  test('findUser to fail with invalid id', () => {
    return users.findUser(30).catch(e => expect(e).toMatch("No user with id 30"))
  })

  test('deleteUser', () => {
    return users.deleteUser(3).then(data => {
      expect(data).toEqual({"id": 3})
    })
  })
  test('deleteUser to fail with invalid id', () => {
    return users.deleteUser(30).catch(e => expect(e).toMatch("No user with id 30"))
  })

})
