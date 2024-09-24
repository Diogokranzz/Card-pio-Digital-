import React, { useState } from 'react';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar lógica para registrar o usuário
        onRegister(username);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar</h2>
            <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
