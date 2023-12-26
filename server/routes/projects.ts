import { Router } from 'express'

import * as db from '../db/firebase.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const projectData = await db.getProjectData()

    res.json(projectData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
