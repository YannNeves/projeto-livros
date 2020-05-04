import React, { useState, useEffect }  from "react";
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'

import api from '../../../services/api';

import "./styles.css";

function ListaLivro() {

    const [livros, setLivros] = useState([]);

    useEffect(() => {
        api.get('livros').then(response =>{
            setLivros(response.data);
        })
    });

    async function handleDeleteLivro(id) {
        try{
            await api.delete(`livros/${id}`);

            setLivros(livros.filter(livros => livros.id !== id));
        } catch (err) {
            alert('Erro ao deletar livro, tente novamente.')
        }
    }

    return (
        <div className="profile-container">
        <header>
            <Link className="button" to="/novo">Cadastrar novo livro</Link>
        </header>

        <h1>Livros cadastrados</h1>
        <ul>
            {livros.map(livros => (
            <li key={livros._id}>
                <img src={`http://localhost:3333/files/${livros.image}`} alt='' /> 
                <strong className="tituloLivro">{livros.nomeLivro}</strong>
                <span>{livros.author}</span>

                <strong>Número de Páginas: <p>{livros.numeroPaginas}</p></strong>
                <strong>Editora: <p>{livros.editora}</p></strong>
                <strong>ISBN: <p>{livros.isbn}</p></strong>

                <button onClick={() => handleDeleteLivro(livros._id)} type="button">
                            <FiTrash2 size={20} color="red" />
                </button>

                {/* <button className="alterar" type="button">
                    <Link to={ '/novo/'+livros._id}> <FiEdit size={20} color="black" /></Link>
                </button> */}
            </li> 
            ))}
        </ul>
    </div>
    );  
}


export default ListaLivro