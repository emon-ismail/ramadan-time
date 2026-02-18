import { useState, useEffect } from 'react';
import './TasbeehCounter.css';

function TasbeehCounter() {
    const [count, setCount] = useState(0);
    const [selectedZikr, setSelectedZikr] = useState("SubhanAllah");
    const [animate, setAnimate] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const zikirOptions = [
        { name: "SubhanAllah", arabic: "سُبْحَانَ ٱللَّٰهِ", meaning: "Glory be to Allah" },
        { name: "Alhamdulillah", arabic: "ٱلْحَمْدُ لِلَّٰهِ", meaning: "Praise be to Allah" },
        { name: "Allahu Akbar", arabic: "ٱللَّٰهُ أَكْبَرُ", meaning: "Allah is the Greatest" },
        { name: "Astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", meaning: "I seek forgiveness from Allah" },
        { name: "La ilaha illallah", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", meaning: "There is no god but Allah" }
    ];

    const handleCount = () => {
        setCount(prev => prev + 1);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 200);

        // Optional: Add vibration if supported on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    const handleResetClick = (e) => {
        e.stopPropagation();
        setShowResetModal(true);
    };

    const confirmReset = () => {
        setCount(0);
        setShowResetModal(false);
    };

    const cancelReset = (e) => {
        e?.stopPropagation();
        setShowResetModal(false);
    };

    const handleZikrChange = (e) => {
        setSelectedZikr(e.target.value);
        setCount(0); // Optional: reset count on change
    };

    const currentZikr = zikirOptions.find(z => z.name === selectedZikr);

    // Load saved count from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`tasbeeh-${selectedZikr}`);
        if (saved) setCount(parseInt(saved, 10));
    }, [selectedZikr]);

    // Save count to local storage on change
    useEffect(() => {
        localStorage.setItem(`tasbeeh-${selectedZikr}`, count);
    }, [count, selectedZikr]);

    return (
        <>
            <div className="tasbeeh-container slide-in">
                <div className="tasbeeh-header">
                    <h2 className="section-title">Digital Tasbeeh</h2>
                    <select
                        className="zikr-select"
                        value={selectedZikr}
                        onChange={handleZikrChange}
                    >
                        {zikirOptions.map(z => (
                            <option key={z.name} value={z.name}>{z.name}</option>
                        ))}
                    </select>
                </div>

                <div className="tasbeeh-card" onClick={handleCount}>
                    <div className="zikr-display">
                        <h3 className="zikr-arabic">{currentZikr.arabic}</h3>
                        <p className="zikr-meaning">{currentZikr.meaning}</p>
                    </div>

                    <div className={`counter-display ${animate ? 'pulse' : ''}`}>
                        {count}
                    </div>

                    <p className="tap-hint">Tap anywhere to count</p>

                    <button className="reset-btn" onClick={handleResetClick} title="Reset Counter">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Custom Reset Modal */}
            {showResetModal && (
                <div className="reset-modal-overlay" onClick={cancelReset}>
                    <div className="reset-modal" onClick={(e) => e.stopPropagation()}>
                        <h3 className="reset-title">Reset Counter?</h3>
                        <p className="reset-message">Are you sure you want to reset your Zikr count to 0?</p>
                        <div className="reset-actions">
                            <button className="btn-cancel" onClick={cancelReset}>Cancel</button>
                            <button className="btn-confirm" onClick={confirmReset}>Yes, Reset</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TasbeehCounter;
