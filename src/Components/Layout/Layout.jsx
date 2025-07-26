import { Moon, Sun } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../Context/Auth.Context';
import NavBar from '../NavBar/NavBar';

export default function Layout() {
    const { handleLogin, loginData, isAuthenticated, username } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    return (
        <main
            className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} italic selection:bg-white/0 transition-colors duration-300`}
        >

            <NavBar darkMode={darkMode} isAuthenticated={isAuthenticated} toggleDarkMode={toggleDarkMode}/>



            <Outlet />
            <Footer />
        </main>
    );
}