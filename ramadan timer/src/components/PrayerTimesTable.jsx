import { formatTime12Hour } from '../utils/timeCalculator';
import './PrayerTimesTable.css';

function PrayerTimesTable({ prayerTimes }) {
    const prayers = [
        { name: 'Fajr', start: prayerTimes.fajr_start, jamat: prayerTimes.fajr_jamat },
        { name: 'Dhuhr', start: prayerTimes.dhuhr_start, jamat: prayerTimes.dhuhr_jamat },
        { name: 'Asr', start: prayerTimes.asr_start, jamat: prayerTimes.asr_jamat },
        { name: 'Maghrib', start: prayerTimes.maghrib_start, jamat: prayerTimes.maghrib_jamat },
        { name: 'Isha', start: prayerTimes.isha_start, jamat: prayerTimes.isha_jamat }
    ];

    return (
        <div className="prayer-times-section slide-in">
            <h2 className="section-title">Today's Prayer Times</h2>
            <div className="prayer-times-table">
                <div className="table-header">
                    <div className="header-cell">Prayer</div>
                    <div className="header-cell">Start Time</div>
                    <div className="header-cell">Jama'ah Time</div>
                </div>
                {prayers.map((prayer, index) => (
                    <div
                        key={prayer.name}
                        className={`table-row ${index % 2 === 0 ? 'row-even' : 'row-odd'}`}
                    >
                        <div className="table-cell prayer-name">{prayer.name}</div>
                        <div className="table-cell">{prayer.start}</div>
                        <div className="table-cell jamat-time">{prayer.jamat}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrayerTimesTable;
