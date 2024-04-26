import dotenv from 'dotenv'
dotenv.config()

// If out of date version, kill this instance
if (process.env.BUILD != 'Initial_Deployment') {
  process.exit(0)
}

import server from './server.ts'

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT)
})
