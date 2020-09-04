import express from 'express'
const { Router} = express
import evento from 'organiza-evento/organizaEvento'

const router = Router();
const routes = [evento]

router.use(routes)

export default router