import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Livro from './pages/Livros/Cadastro/Livro'
import ListaLivro from './pages/Livros/Listagem/ListaLivro'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={ListaLivro} />
                <Route path='/novo' component={Livro} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
