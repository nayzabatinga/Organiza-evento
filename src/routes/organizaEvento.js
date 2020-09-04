import express from 'express'
const { Router} = express
import EventoController from 'organiza-evento/EventoController'

const router = Router()
router.post('/organizandoEvento', EventoController.organizandoEvento)

export default router