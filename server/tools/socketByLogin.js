export default class SocketByLogin {
  constructor() {
    this.matching = {}
  }

  list(userId) {
    return typeof userId !== 'undefined' ? this.matching[userId] : this.matching
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
