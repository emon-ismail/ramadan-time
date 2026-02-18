import { useState, useEffect } from 'react';
import './App.css';
import RamadanCalendar from './components/RamadanCalendar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app">
            <Navbar />
            <RamadanCalendar />
            <Footer />
        </div>
    );
}

export default App;
