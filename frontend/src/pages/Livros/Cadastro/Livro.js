import React, { useState } from 'react';
import { Link, useHistory  } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../../services/api';

import "./styles.css";

function Livro() {

    const [author, setAuthor] = useState('');
    const [nomeLivro, setNomeLivro] = useState('');
    const [numeroPaginas, setNumeroPaginas] = useState('');
    const [editora, setEditora] = useState('');
    const [isbn, setISBN] = useState('');
    const [image, setImage] = useState('');

    const history = useHistory();
  
    async function handleNovoLivro(e){
      e.preventDefault();


      const data = new FormData();
      
      data.append('author', author);
      data.append('nomeLivro', nomeLivro);
      data.append('numeroPaginas', numeroPaginas );
      data.append('editora',editora );
      data.append('isbn', isbn);
      data.append('image', image);
  

      try {
        await api.post('livros', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        history.push('/');
      } catch (err) {
        alert('Erro ao cadastrar caso, tente novamente.');
      }
    }

    return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <h1>Cadastrar novo livro</h1>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#55b0c1" />
            Voltar para listagem
          </Link>
        </section>
        <form onSubmit={handleNovoLivro} encType="multipart/form-data">
          <label htmlFor='selecao-arquivo'>Selecione uma imagem do livro &#187;</label>
          <input 
              id='selecao-arquivo'
              placeholder="Imagem do Livro"
              type="file"
              onChange={e => setImage(e.target.files[0])} 
           />
          {image.name ? <p className="imageName"> {image.name} </p> : <p></p> }
      
    
          <input 
              placeholder="Nome do Livro"
              value={nomeLivro}
              onChange={e => setNomeLivro(e.target.value)} 
          />
          
          <input 
              placeholder="Autor do Livro"
              value={author}
              onChange={e => setAuthor(e.target.value)} 
          />
            
          <input 
            placeholder="Número de Páginas do Livro"
            value={numeroPaginas}
            onChange={e => setNumeroPaginas(e.target.value)} 
          />

          <input 
            placeholder="Editora do Livro" 
            value={editora}
            onChange={e => setEditora(e.target.value)} 
          />

          <input 
            placeholder="ISBN do Livro" 
            value={isbn}
            onChange={e => setISBN(e.target.value)} 
          />
          
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
    )
}

export default Livro


