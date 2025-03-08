import { Router } from 'express'

import { getUserProfile } from './user.controller'

const router = Router()

router.get('/profile', getUserProfile)

export default router
