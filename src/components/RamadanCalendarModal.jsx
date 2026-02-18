import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RamadanCalendarModal.css';

function RamadanCalendarModal({ isOpen, onClose }) {
    const [value, setValue] = useState(new Date(2026, 1, 19)); // Start date: Feb 19, 2026

    if (!isOpen) return null;

    // Ramadan 2026 Dates
    const ramadanStart = new Date(2026, 1, 19); // Feb 19, 2026 (Month is 0-indexed: 1 = Feb)
    const ramadanEnd = new Date(2026, 2, 20); // March 20, 2026 (Month is 0-indexed: 2 = March)
    const eidUlFitr = new Date(2026, 2, 21); // March 21, 2026
    const laylatulQadrStart = new Date(2026, 2, 11); // Last 10 nights start (approx)

    const isRamadanDate = (date) => {
        return date >= ramadanStart && date <= ramadanEnd;
    };

    const isEidDate = (date) => {
        return date.toDateString() === eidUlFitr.toDateString();
    };

    const isOddNight = (date) => {
        // Check if date is within last 10 nights and is odd
        // Simplified logic for demo purposes - ideally calculated precisely
        if (date >= laylatulQadrStart && date <= ramadanEnd) {
            const diffTime = Math.abs(date - ramadanStart);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays % 2 !== 0; // Highlighting odd nights
        }
        return false;
    }

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (isEidDate(date)) {
                return 'eid-day';
            }
            if (isRamadanDate(date)) {
                return 'ramadan-day';
            }
        }
        return null;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-content">
                        <h2>Ramadan Calendar 2026</h2>
                        <p className="hijri-year">1447 Hijri</p>
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="calendar-wrapper wide-view">
                    <Calendar
                        onChange={setValue}
                        value={value}
                        tileClassName={tileClassName}
                        minDate={new Date(2026, 1, 1)}
                        maxDate={new Date(2026, 3, 30)}
                        defaultActiveStartDate={new Date(2026, 1, 1)}
                        showDoubleView={true} // Show two months side by side
                        showFixedNumberOfWeeks={false}
                        next2Label={null}
                        prev2Label={null}
                    />
                </div>

                <div className="ramadan-events">
                    <h3>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                            <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Key Dates
                    </h3>
                    <ul>
                        <li>
                            <span className="event-date">February 19</span>
                            <span className="event-name">First Day of Ramadan</span>
                        </li>
                        <li>
                            <span className="event-date">Last 10 Nights</span>
                            <span className="event-name">Laylat al-Qadr (Odd Nights)</span>
                        </li>
                        <li>
                            <span className="event-date">March 21</span>
                            <span className="event-name">Eid al-Fitr (Expected)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RamadanCalendarModal;
