import './LocationPrompt.css';

function LocationPrompt({ onEnableLocation, onSkip, isDetecting }) {
    return (
        <div className="location-prompt-overlay">
            <div className="location-prompt-card fade-in">
                <div className="location-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                    </svg>
                </div>
                <h2>Enable Location</h2>
                <p>Turn on location to automatically detect your district and show accurate prayer times.</p>
                <div className="prompt-buttons">
                    <button className="btn-primary" onClick={onEnableLocation} disabled={isDetecting}>
                        {isDetecting ? (
                            <span className="loading-spinner-small">Detecting...</span>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="currentColor" />
                                </svg>
                                Turn On Location
                            </>
                        )}
                    </button>
                    <button className="btn-secondary" onClick={onSkip} disabled={isDetecting}>
                        Select Manually
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationPrompt;
