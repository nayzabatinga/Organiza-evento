import express from 'express'
import multer from 'multer'
const { Router} = express
const upload = multer({dest: "src/uploads/"})
import EventoController from 'organiza-evento/EventoController'

const router = Router()
router.post('/organizandoEvento', upload.single('file'), EventoController.organizandoEvento)

export default router