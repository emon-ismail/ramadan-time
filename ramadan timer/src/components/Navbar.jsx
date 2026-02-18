import { useState } from 'react';
import './Navbar.css';
import RamadanCalendarModal from './RamadanCalendarModal';

function Navbar() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-brand">
                        <div className="brand-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                                <path d="M16 8L18.5 10.5L16 13" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 7V13H15" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="brand-text">Ramadan Times</span>
                    </div>
                    <div className="navbar-links">
                        <button className="nav-link calendar-btn" onClick={() => setIsCalendarOpen(true)}>
                            <span className="calendar-icon">📅</span>
                            <span className="calendar-text">Calendar 2026</span>
                        </button>
                    </div>
                </div>
            </nav>
            <RamadanCalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
        </>
    );
}

export default Navbar;
