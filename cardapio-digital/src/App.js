import React, { useState } from 'react';
import './App.css'; // Para estilos adicionais
import Login from './login'; // Importe o componente de login
import Register from './register'; // Importe o componente de registro

const menuItems = [
    { id: 1, name: 'Pizza Calabresa 🍕', price: 30.00, category: 'Ofertas', description: 'Deliciosa pizza com calabresa e queijo.', ingredients: 'Calabresa, Queijo, Molho de Tomate', image: 'https://www.receiteria.com.br/wp-content/uploads/pizza-de-calabresa-facil-capa.jpg', rating: 4.5 },
    { id: 2, name: 'Pizza Margherita 🍕', price: 32.00, category: 'Ofertas', description: 'Pizza clássica com molho de tomate e manjericão.', ingredients: 'Tomate, Queijo, Manjericão', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNwmEJNIEA6au57qmY_YBHD9jWZKD039pqg&s', rating: 4.7 },
    { id: 3, name: 'Coca-Cola Lata 🥤', price: 5.00, category: 'Bebidas', description: 'Refrigerante clássico.', ingredients: 'Água Carbonatada, Açúcar, Cafeína', image: 'https://images.tcdn.com.br/img/img_prod/858764/refrigerante_coca_cola_lata_350ml_c_12_359_1_20201021152315.jpg', rating: 4.0 },
    { id: 4, name: 'Suco Natural 🍊', price: 7.00, category: 'Bebidas', description: 'Suco fresco e saudável.', ingredients: 'Frutas Naturais, Água', image: 'https://hortainhome.com.br/wp-content/uploads/2020/05/orange-juice-5224192_1920-e1591040438643.jpg', rating: 4.8 },
];

const App = () => {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Ofertas');
    const [user, setUser] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (itemToRemove) => {
        setCart(cart.filter(item => item.id !== itemToRemove.id));
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const handleLogin = (username) => {
        setUser(username);
    };

    const handleRegister = (username) => {
        setUser(username);
        setIsRegistering(false);
    };

    const handlePayment = () => {
        if (cart.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        const orderSummary = cart.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('\n');
        alert(`Resumo do Pedido:\n${orderSummary}\n\nTotal: R$ ${total}`);
    };

    return (
        <div className="app">
            <header>
                <h1>Delícias do Sabor</h1>
                <h2>Taxa de entrega: R$ 5,00</h2>
            </header>
            {user ? (
                <div>
                    <h3>Bem-vindo, {user}!</h3>
                    <div className="categories">
                        <button onClick={() => setSelectedCategory('Ofertas')}>Ofertas</button>
                        <button onClick={() => setSelectedCategory('Bebidas')}>Bebidas</button>
                    </div>
                    <h3>{selectedCategory}</h3>
                    <ul className="menu">
                        {menuItems
                            .filter(item => item.category === selectedCategory)
                            .map(item => (
                                <li key={item.id} className="menu-item">
                                    <img src={item.image} alt={item.name} className="menu-image" />
                                    <div>
                                        <strong>{item.name}</strong> - R$ {item.price.toFixed(2)}
                                        <p>{item.description}</p>
                                        <p><em>Ingredientes: {item.ingredients}</em></p>
                                        <p>Avaliação: {item.rating} ⭐</p>
                                        <button onClick={() => addToCart(item)}>Adicionar ao Carrinho</button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                    <h3>Carrinho</h3>
                    <ul className="cart">
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - R$ {item.price.toFixed(2)}
                                <button onClick={() => removeFromCart(item)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                    <h4>Total: R$ {total}</h4>
                    <button onClick={handlePayment} className="payment-button">Pagar</button>
                </div>
            ) : (
                <div>
                    {isRegistering ? (
                        <Register onRegister={handleRegister} />
                    ) : (
                        <Login onLogin={handleLogin} />
                    )}
                    <button onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
