const Livro = require('../models/Livros')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
  // Lista os Livros do mais atual para o mais antigo
  async index(req, res) {
    var mysort = { createdAt: -1 };
    const livro = await Livro.find().sort(mysort);
    return res.json(livro)
  },

  // gravar os livros
  async store(req, res) {
    const { filename: image} = req.file

    const [name, ext] = image.split('.')
    const fileName = `${name}-${Math.floor(Math.random() * 100)}.jpg`

    await sharp(req.file.path)
      .resize(180)
      .jpeg({ quality: 70})
      .toFile(
        path.resolve(req.file.destination, 
          'resizes', fileName)
      )

    fs.unlinkSync(req.file.path)
    req.body.image = fileName;

    const livro = await Livro.create(req.body)
    req.io.emit('livro', livro)
    
    return res.json(livro)
  },
  
  // Exclui o livro
  async destroy(req, res) {
    const { id } = req.params
    const livro = await Livro.findById(id);

    fs.unlink("uploads/resizes/" + livro.image,function(err){
      if(err) throw err;
    });

    livro.remove();
    return res.send()
  },

  // Altera o livro
  async update(req, res) {
    const { id } = req.params
    const livro = await Livro.findByIdAndUpdate(id, req.body, { new: true })
    return res.json(livro)
  },

}

