import { useState, useEffect } from 'react';
import { formatTime12Hour, getTimeRemaining } from '../utils/timeCalculator';
import './TimerCard.css';

function TimerCard({ title, time, type }) {
    const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateTimer = () => {
            const remaining = getTimeRemaining(time);
            setTimeRemaining(remaining);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const gradientClass = type === 'sehri' ? 'timer-sehri' : 'timer-iftar';

    return (
        <div className={`timer-card ${gradientClass} slide-in`}>
            <div className="timer-header">
                <div className="timer-icon">
                    {type === 'sehri' ? (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                        </svg>
                    ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="5" fill="currentColor" />
                            <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    )}
                </div>
                <h3 className="timer-title">{title}</h3>
            </div>

            <div className="timer-time">{formatTime12Hour(time)}</div>

            <div className="countdown">
                <div className="countdown-item">
                    <div className="countdown-value">{String(timeRemaining.hours).padStart(2, '0')}</div>
                    <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                    <div className="countdown-value">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                    <div className="countdown-label">Minutes</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                    <div className="countdown-value">{String(timeRemaining.seconds).padStart(2, '0')}</div>
                    <div className="countdown-label">Seconds</div>
                </div>
            </div>
        </div>
    );
}

export default TimerCard;
