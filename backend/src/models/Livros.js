const mongoose = require('mongoose')
const LivroSchema = new mongoose.Schema({
  author: String,
  nomeLivro: String,
  numeroPaginas: String,
  editora: String,
  isbn: String,
  image: String,
}, {
  timestamps: true
})

module.exports = mongoose.model('Livros', LivroSchema)
