import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../../src/assets/logo.svg';

export default function Profile() {
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongID');

    const header =  {
        Authorization: ongID
    }

    useEffect(() => {
        api.get('profile', {
            headers: header
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongID, header]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: header
            });

            setIncidents(incidents.filter(i => i.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(item => (
                    <li key={item.id}>
                        <strong>CASO:</strong>
                        <p>{item.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{item.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{
                            style: 'currency',
                            currency: 'BRL'
                        }).format(item.value)}</p>

                        <button onClick={() => handleDeleteIncident(item.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}