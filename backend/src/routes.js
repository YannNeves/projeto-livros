const { Router } = require('express')
const multer = require('multer')
const LivroController = require('./controllers/LivroController')
const uploadConfig = require('./config/upload')
const routes = new Router();

const upload = multer(uploadConfig)

routes.get('/livros', LivroController.index);
routes.post('/livros', upload.single('image'), LivroController.store)
routes.delete('/livros/:id', LivroController.destroy)

module.exports = routes