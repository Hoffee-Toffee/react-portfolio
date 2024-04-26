import { Router } from 'express'

import * as db from '../db/firebase.ts'
import * as Path from 'path'
import fs from 'fs'

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

router.get('/:repo', async (req, res) => {
  try {
    // Get repo name from request
    const repo = req.params.repo
    res.json(fs.existsSync(Path.resolve('projects', repo)))
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
