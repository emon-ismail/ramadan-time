import './RamadanDuas.css';

function RamadanDuas() {
    return (
        <div className="duas-container slide-in">
            <h2 className="duas-title">Daily Ramadan Duas</h2>

            <div className="duas-grid">
                {/* Sehri Dua */}
                <div className="dua-card sehri-card">
                    <div className="dua-header">
                        <span className="dua-icon">🌙</span>
                        <h3>Sehri Dua (Intention)</h3>
                    </div>
                    <p className="dua-arabic">نَوَيْتُ اَنْ اَصُوْمَ غَدًا مِّنْ شَهْرِ رَمَضَانَ</p>
                    <p className="dua-transliteration">Nawaitu an asuma ghadan min shahri Ramadan</p>
                    <p className="dua-bangla">নাওয়াইতু আন আছুমা গাদাম মিন শাহরি রমজান</p>
                    <p className="dua-meaning">I intend to fast tomorrow in the month of Ramadan</p>
                </div>

                {/* Iftar Dua */}
                <div className="dua-card iftar-card">
                    <div className="dua-header">
                        <span className="dua-icon">🍎</span>
                        <h3>Iftar Dua (Breaking Fast)</h3>
                    </div>
                    <p className="dua-arabic">اَللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ اَفْطَرْتُ</p>
                    <p className="dua-transliteration">Allahumma laka sumtu wa ala rizqika aftartu</p>
                    <p className="dua-bangla">আল্লাহুম্মা লাকা ছুমতু ওয়া আলা রিযক্বিকা আফতার্তু</p>
                    <p className="dua-meaning">O Allah! I fasted for You and I break my fast with Your sustenance</p>
                </div>
            </div>
        </div>
    );
}

export default RamadanDuas;
