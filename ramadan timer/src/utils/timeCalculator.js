/**
 * Adjusts time by adding/subtracting offset minutes
 * @param {string} time - Time in HH:MM format
 * @param {number} offset - Minutes to add (positive) or subtract (negative)
 * @returns {string} Adjusted time in HH:MM format
 */
export function adjustTime(time, offset) {
  const [hour, minute] = time.split(':').map(Number);
  let totalMinutes = hour * 60 + minute + offset;

  // Handle day overflow
  if (totalMinutes < 0) totalMinutes += 1440;
  if (totalMinutes >= 1440) totalMinutes -= 1440;

  const newHour = Math.floor(totalMinutes / 60);
  const newMinute = totalMinutes % 60;

  return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
}

/**
 * Converts 24-hour time to 12-hour format with AM/PM
 * @param {string} time - Time in HH:MM format
 * @returns {string} Time in 12-hour format
 */
export function formatTime12Hour(time) {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
}

/**
 * Gets the current Ramadan day based on the date
 * @param {string} ramadanStart - Ramadan start date in YYYY-MM-DD format
 * @returns {number|null} Current Ramadan day (1-30) or null if not in Ramadan
 */
export function getCurrentRamadanDay(ramadanStart) {
  const start = new Date(ramadanStart);
  const today = new Date();

  // Reset time to midnight for accurate day calculation
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0 || diffDays >= 30) {
    return null; // Not in Ramadan
  }

  return diffDays + 1;
}

/**
 * Calculates time remaining until a target time
 * @param {string} targetTime - Target time in HH:MM format
 * @returns {object} Object with hours, minutes, seconds remaining
 */
export function getTimeRemaining(targetTime) {
  const now = new Date();
  const [targetHour, targetMinute] = targetTime.split(':').map(Number);

  const target = new Date();
  target.setHours(targetHour, targetMinute, 0, 0);

  // If target time has passed today, set it for tomorrow
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

/**
 * Formats date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Gets day name from date string
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Day name
 */
export function getDayName(dateString) {
  const date = new Date(dateString);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}
