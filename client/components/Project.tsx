import { Router } from 'express'
import { useParams } from 'react-router-dom'

export default function Project() {
  const { project } = useParams()

  const router = Router()

  router.use('/', require('../projects/' + project))
}
