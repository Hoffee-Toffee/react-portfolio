import { Router } from 'express'

import * as db from '../db/firebase.ts'

const router = Router()

router.get('/:guess', async (req, res) => {
  try {
    const result = await db.checkSecret(req.params.guess.toLowerCase())
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
