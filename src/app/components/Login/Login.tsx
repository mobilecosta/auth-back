"use client";

import React, { useState } from 'react';
import './Login.css';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const mockLogin = (username: string, password: string): boolean => {
        const mockUser = 'testuser';
        const mockPassword = 'password123';
        return username === mockUser && password === mockPassword;
    };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        if (mockLogin(username, password)) {
            router.push('/home');
        } else {
            setError('Usuário ou senha inválidos.');
        }
    };

    return (
        <section className="login-container" aria-labelledby="login-title">
            <h2 id="login-title">Boas-vindas</h2>
            <form onSubmit={handleLogin} className="login-form">
                <fieldset className="form-group">
                    <legend>Login</legend>
                    <label htmlFor="username">Usuário:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </fieldset>
                {error && <p className="error-message" role="alert">{error}</p>}
                <button type="submit" className="submit-button">Login</button>
            </form>
        </section>
    );
};

export default Login;
