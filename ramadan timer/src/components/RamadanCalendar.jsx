import { useState, useEffect } from 'react';
import dhakaData from '../data/dhaka2026.json';
import districtOffsets from '../data/districtOffset.json';
import prayerTimesData from '../data/prayerTimes.json';
import { adjustTime, formatTime12Hour, getCurrentRamadanDay, getTimeRemaining, formatDate, getDayName } from '../utils/timeCalculator';
import { detectUserLocation, getDistrictFromCoordinates, saveDistrict, getSavedDistrict } from '../utils/locationService';
import LocationPrompt from './LocationPrompt';
import DistrictSelector from './DistrictSelector';
import TimerCard from './TimerCard';
import PrayerTimesTable from './PrayerTimesTable';
import ScheduleDownload from './ScheduleDownload';
import RamadanDuas from './RamadanDuas';
import TasbeehCounter from './TasbeehCounter';
import './RamadanCalendar.css';

function RamadanCalendar() {
    const [selectedDistrict, setSelectedDistrict] = useState('Dhaka');
    const [showLocationPrompt, setShowLocationPrompt] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [ramadanDay, setRamadanDay] = useState(1);
    const [todaySchedule, setTodaySchedule] = useState(null);
    const [adjustedPrayerTimes, setAdjustedPrayerTimes] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);

    // Check for saved district on mount
    useEffect(() => {
        const saved = getSavedDistrict();
        if (saved) {
            setSelectedDistrict(saved);
        } else {
            setShowLocationPrompt(true);
        }
    }, []);

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Calculate current Ramadan day and schedule
    useEffect(() => {
        const day = getCurrentRamadanDay(dhakaData.ramadan_start);
        if (day) {
            setRamadanDay(day);
            const schedule = dhakaData.dhaka_timings[day - 1];
            if (schedule) {
                const offset = districtOffsets[selectedDistrict] || 0;
                setTodaySchedule({
                    ...schedule,
                    sehri: adjustTime(schedule.sehri, offset),
                    iftar: adjustTime(schedule.iftar, offset),
                });
            }
        } else {
            // Show first day if Ramadan hasn't started
            setRamadanDay(1);
            const schedule = dhakaData.dhaka_timings[0];
            const offset = districtOffsets[selectedDistrict] || 0;
            setTodaySchedule({
                ...schedule,
                sehri: adjustTime(schedule.sehri, offset),
                iftar: adjustTime(schedule.iftar, offset),
            });
        }
    }, [selectedDistrict]);

    // Calculate adjusted prayer times
    useEffect(() => {
        const offset = districtOffsets[selectedDistrict] || 0;
        const adjusted = {
            fajr_start: formatTime12Hour(adjustTime(prayerTimesData.Fajr, offset)),
            fajr_jamat: formatTime12Hour(adjustTime(prayerTimesData.Fajr_Jamat, offset)),
            dhuhr_start: formatTime12Hour(adjustTime(prayerTimesData.Dhuhr, offset)),
            dhuhr_jamat: formatTime12Hour(adjustTime(prayerTimesData.Dhuhr_Jamat, offset)),
            asr_start: formatTime12Hour(adjustTime(prayerTimesData.Asr, offset)),
            asr_jamat: formatTime12Hour(adjustTime(prayerTimesData.Asr_Jamat, offset)),
            maghrib_start: todaySchedule ? formatTime12Hour(todaySchedule.iftar) : formatTime12Hour(adjustTime(prayerTimesData.Maghrib, offset)),
            maghrib_jamat: formatTime12Hour(adjustTime(prayerTimesData.Maghrib_Jamat, offset)),
            isha_start: formatTime12Hour(adjustTime(prayerTimesData.Isha, offset)),
            isha_jamat: formatTime12Hour(adjustTime(prayerTimesData.Isha_Jamat, offset)),
        };
        setAdjustedPrayerTimes(adjusted);
    }, [selectedDistrict, todaySchedule]);

    const handleLocationRequest = async () => {
        setIsDetecting(true);
        try {
            const result = await detectUserLocation();
            const district = await getDistrictFromCoordinates(result.latitude, result.longitude);
            setSelectedDistrict(district);
            saveDistrict(district);
            setShowLocationPrompt(false);

            const methodMsg = result.method === 'GPS' ? 'Exact GPS location' : 'Approximate IP location';
            alert(`Detected District: ${district}\nSource: ${methodMsg}`);
        } catch (error) {
            console.error('Location error:', error);
            let msg = 'Could not detect location automatically. ';
            if (error.code === 1) msg += 'Secure context (HTTPS) may be required for GPS. ';
            msg += 'Please select your district manually.';

            alert(msg);
            setShowLocationPrompt(false);
        } finally {
            setIsDetecting(false);
        }
    };

    const handleDistrictChange = (district) => {
        setSelectedDistrict(district);
        saveDistrict(district);
    };

    const isRamadanStarted = getCurrentRamadanDay(dhakaData.ramadan_start) !== null;

    return (
        <div className="ramadan-calendar">
            <div className="islamic-pattern"></div>

            {showLocationPrompt && (
                <LocationPrompt
                    onEnableLocation={handleLocationRequest}
                    onSkip={() => setShowLocationPrompt(false)}
                    isDetecting={isDetecting}
                />
            )}

            <div className="calendar-container fade-in">
                {/* Compact Header */}
                <div className="calendar-header">
                    <div className="header-arch">
                        <h1 className="title">Ramadan Schedule 2026</h1>
                    </div>
                    <div className="current-info">
                        <div className="current-time">{currentTime.toLocaleTimeString('en-US')}</div>
                        <div className="current-date">{formatDate(currentTime)}</div>
                        {!isRamadanStarted && (
                            <div className="ramadan-notice">
                                Ramadan starts on {new Date(dhakaData.ramadan_start).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}. Showing Day 1 schedule.
                            </div>
                        )}
                    </div>
                </div>

                {/* Compact Top Bar: Ramadan Day + District Selector + Download */}
                <div className="top-info-bar">
                    <div className="ramadan-day-card">
                        <div className="day-label">Day</div>
                        <div className="day-number">{ramadanDay}</div>
                    </div>
                    <DistrictSelector
                        selectedDistrict={selectedDistrict}
                        onDistrictChange={handleDistrictChange}
                        districts={Object.keys(districtOffsets).sort()}
                    />
                    <ScheduleDownload
                        district={selectedDistrict}
                        schedule={dhakaData.dhaka_timings}
                        offset={districtOffsets[selectedDistrict] || 0}
                    />
                </div>

                {/* Sehri & Iftar Timers - Most Prominent */}
                {todaySchedule && (
                    <div className="timers-grid">
                        <TimerCard
                            title="Sehri Ends"
                            time={todaySchedule.sehri}
                            type="sehri"
                        />
                        <TimerCard
                            title="Iftar Time"
                            time={todaySchedule.iftar}
                            type="iftar"
                        />
                    </div>
                )}

                {/* Prayer Times Table */}
                {adjustedPrayerTimes && (
                    <>
                        <RamadanDuas />

                        <h2 className="table-title">Daily Prayer Times</h2>
                        <PrayerTimesTable prayerTimes={adjustedPrayerTimes} />

                        <TasbeehCounter />
                    </>
                )}
            </div>
        </div>
    );
}

export default RamadanCalendar;
