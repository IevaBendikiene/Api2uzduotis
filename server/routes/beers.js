import express from 'express'
import * as controller from'../controllers/controller.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()


router.get('/', controller.getBeers)

router.get('/:id', controller.getBeer)

router.patch('/:id', controller.updateBeer)

router.use(requireAuth)

router.post('/', controller.createBeer)

router.delete('/:id', controller.removeBeer)

export default router