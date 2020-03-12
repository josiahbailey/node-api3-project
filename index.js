const server = require('./server.js')

const PORT = 4000
server.listen(PORT, () => {
  console.log('\n** Server Listening on PORT 4000')
})