export default class SocketByLogin {
  constructor() {
    this.matching = {}
  }

  list(userId) {
    let output = null
    if (typeof userId !== 'undefined') {
      if (!!this.matching[userId] && this.matching[userId].length > 0)
        output = this.matching[userId]
    } else if (Object.keys(this.matching).length > 0) output = this.matching
    return output
  }

  add(login, connectionId) {
    if (typeof this.matching[login] === 'undefined') {
      this.matching[login] = []
    }
    if (!this.matching[login].includes(connectionId)) {
      this.matching[login] = [...this.matching[login], connectionId]
    }
  }

  remove(id) {
    let login = null
    Object.keys(this.matching).forEach((key) => {
      if (this.matching[key].includes(id)) {
        login = key
        this.matching[key] = this.matching[key].filter((connectionId) => connectionId !== id)
        if (this.matching[key].length === 0) {
          delete this.matching[key]
        }
      }
    })
    console.log(`Removed record ${id} for login ${login}`, this.list())
  }
}
