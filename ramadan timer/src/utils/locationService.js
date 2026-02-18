/**
 * Detects user's location via GPS or IP fallback
 * @returns {Promise<{latitude: number, longitude: number, method: string}>}
 */
export async function detectUserLocation() {
    // 1. Try GPS First
    try {
        if (!navigator.geolocation) throw new Error('No GPS');

        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 4000, // Fail fast to IP fallback
                maximumAge: 0
            });
        });

        return {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            method: 'GPS'
        };
    } catch (gpsError) {
        console.warn('GPS failed, trying primary IP fallback:', gpsError);

        // 2. Try Primary IP Fallback (ipapi.co)
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            if (data.latitude && data.longitude) {
                return { latitude: data.latitude, longitude: data.longitude, method: 'IP' };
            }
        } catch (ip1Err) {
            console.warn('Primary IP fallback failed:', ip1Err);
        }

        // 3. Try Secondary IP Fallback (ip-api.com)
        try {
            const response = await fetch('http://ip-api.com/json');
            const data = await response.json();
            if (data.status === 'success') {
                return { latitude: data.lat, longitude: data.lon, method: 'IP' };
            }
        } catch (ip2Err) {
            console.warn('Secondary IP fallback failed:', ip2Err);
        }

        throw gpsError; // Final failed state
    }
}

/**
 * Reverse geocode to get district from coordinates
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<string>} District name
 */
export async function getDistrictFromCoordinates(latitude, longitude) {
    // Comprehensive district mapping for accurate location detection
    const districts = {
        'Dhaka': { lat: 23.8103, lng: 90.4125 },
        'Chattogram': { lat: 22.3569, lng: 91.7832 },
        'Sylhet': { lat: 24.8949, lng: 91.8687 },
        'Rajshahi': { lat: 24.3745, lng: 88.6042 },
        'Khulna': { lat: 22.8456, lng: 89.5403 },
        'Barishal': { lat: 22.7010, lng: 90.3535 },
        'Rangpur': { lat: 25.7439, lng: 89.2752 },
        'Mymensingh': { lat: 24.7471, lng: 90.4203 },
        'Faridpur': { lat: 23.6070, lng: 89.8429 },
        'Cox\'s Bazar': { lat: 21.4272, lng: 92.0058 },
        'Cumilla': { lat: 23.4607, lng: 91.1809 },
        'Noakhali': { lat: 22.8695, lng: 91.0994 },
        'Brahmanbaria': { lat: 23.9571, lng: 91.1119 },
        'Feni': { lat: 23.0159, lng: 91.3976 },
        'Lakshmipur': { lat: 22.9429, lng: 90.8415 },
        'Chandpur': { lat: 23.2332, lng: 90.6515 },
        'Bogura': { lat: 24.8481, lng: 89.3730 },
        'Pabna': { lat: 24.0061, lng: 89.2494 },
        'Dinajpur': { lat: 25.6217, lng: 88.6354 },
        'Tangail': { lat: 24.2513, lng: 89.9167 },
        'Narayanganj': { lat: 23.6238, lng: 90.5000 },
        'Gazipur': { lat: 23.9999, lng: 90.4203 },
        'Jashore': { lat: 23.1664, lng: 89.2081 },
        'Kushtia': { lat: 23.9010, lng: 88.9416 },
    };

    let closestDistrict = 'Dhaka'; // Default fallback
    let minDistance = Infinity;

    for (const [district, coords] of Object.entries(districts)) {
        // Use Haversine distance for more accurate proximity detection
        const R = 6371; // Earth's radius in km
        const dLat = (coords.lat - latitude) * Math.PI / 180;
        const dLon = (coords.lng - longitude) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(latitude * Math.PI / 180) * Math.cos(coords.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance < minDistance) {
            minDistance = distance;
            closestDistrict = district;
        }
    }

    return closestDistrict;
}

/**
 * Saves district to localStorage
 * @param {string} district
 */
export function saveDistrict(district) {
    localStorage.setItem('selectedDistrict', district);
}

/**
 * Gets saved district from localStorage
 * @returns {string|null}
 */
export function getSavedDistrict() {
    return localStorage.getItem('selectedDistrict');
}
