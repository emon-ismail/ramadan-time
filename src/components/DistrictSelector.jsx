import './DistrictSelector.css';

function DistrictSelector({ selectedDistrict, onDistrictChange, districts }) {
    return (
        <div className="district-selector slide-in">
            <label htmlFor="district-select" className="selector-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                </svg>
                District: <span className="district-name">{selectedDistrict}</span>
            </label>
            <select
                id="district-select"
                value={selectedDistrict}
                onChange={(e) => onDistrictChange(e.target.value)}
                className="district-dropdown"
            >
                {districts.map((district) => (
                    <option key={district} value={district}>
                        {district}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DistrictSelector;
