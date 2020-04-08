import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../../src/assets/logo.svg';

export default function NewIncident() {
    const ongID = localStorage.getItem('ongID');
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            const res = await api.post('incidents', data, {
                headers: {
                    Authorization: ongID,
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return(
        <div className="incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>
                       Descreva o caso detalhadamente para encotrar um herói para resolver isso.
                    </p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                         value={title}
                         onChange={e => setTitle(e.target.value)}
                         placeholder="Título do caso"
                         />
                    <textarea 
                         value={description}
                         onChange={e => setDesc(e.target.value)}
                         placeholder="Descrição"
                         />
                    <input 
                         value={value}
                         onChange={e => setValue(e.target.value)}
                         placeholder="Valor em reais"
                         />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}