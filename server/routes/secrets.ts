import { Router } from 'express'

import * as db from '../db/firebase.ts'

const router = Router()

router.get('/:guess', async (req, res) => {
  try {
    const location = await db.checkSecret(req.params.guess.toLowerCase())
    res.send(location)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
