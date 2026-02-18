import { adjustTime, formatTime12Hour } from '../utils/timeCalculator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import { vectorBase64, lampBase64, pdfBgBase64 } from '../utils/pdfAssets';
import './ScheduleDownload.css';

function ScheduleDownload({ district, schedule, offset }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const ramadanStart = new Date('2026-02-19');

      // Create temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '794px'; // A4 width in pixels at 96 DPI
      container.style.background = 'white';
      document.body.appendChild(container);

      // Generate table rows for two columns (1-15 and 16-30)
      const generateRow = (day, index) => {
        const date = new Date(ramadanStart);
        date.setDate(date.getDate() + index);

        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = date.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short'
        });

        const sehri = formatTime12Hour(adjustTime(day.sehri, offset));
        const iftar = formatTime12Hour(adjustTime(day.iftar, offset));

        const isFriday = dayName === 'Friday';
        // Make rows semi-transparent to show background
        const rowBg = isFriday ? 'rgba(254, 243, 199, 0.7)' : (index % 2 === 0 ? 'rgba(240, 253, 250, 0.6)' : 'rgba(255, 255, 255, 0.4)');
        const borderColor = 'rgba(204, 251, 241, 0.8)';

        return `
          <tr style="background: ${rowBg};">
            <td style="font-weight: 700; color: #0f766e; padding: 8px 4px; text-align: center; border-bottom: 1px solid ${borderColor}; font-size: 11px;">${String(index + 1).padStart(2, '0')}</td>
            <td style="padding: 8px 4px; text-align: center; border-bottom: 1px solid ${borderColor}; font-size: 11px; color: #374151;">${dateStr}</td>
            <td style="padding: 8px 4px; text-align: center; border-bottom: 1px solid ${borderColor}; font-size: 11px; color: #374151; font-weight: ${isFriday ? '700' : 'normal'}">${dayName}</td>
            <td style="font-weight: 700; color: #0d9488; padding: 8px 4px; text-align: center; border-bottom: 1px solid ${borderColor}; font-size: 12px;">${sehri}</td>
            <td style="font-weight: 700; color: #0d9488; padding: 8px 4px; text-align: center; border-bottom: 1px solid ${borderColor}; font-size: 12px;">${iftar}</td>
          </tr>
        `;
      };

      const midPoint = Math.ceil(schedule.length / 2);
      const firstHalf = schedule.slice(0, midPoint).map((day, i) => generateRow(day, i)).join('');
      const secondHalf = schedule.slice(midPoint).map((day, i) => generateRow(day, i + midPoint)).join('');

      container.id = 'pdf-export-container';
      container.innerHTML = `
        <div id="pdf-content-wrapper" style="width: 794px; height: 1123px; font-family: sans-serif; position: relative; background: #ffffff;">
          <!-- Full Page Background -->
          <img src="${pdfBgBase64}" style="position: absolute; top: 0; left: 0; width: 794px; height: 1123px; z-index: 0;" />
          
          <!-- Content Container -->
          <div style="position: relative; z-index: 1; width: 794px; height: 1123px; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="position: absolute; top: 40px; left: 40px; opacity: 1.0;">
                   <img src="${lampBase64}" width="80" />
              </div>
              <div style="position: absolute; top: 40px; right: 40px; transform: scaleX(-1); opacity: 1.0;">
                   <img src="${lampBase64}" width="80" />
              </div>
              
              <h1 style="color: #0f766e; font-size: 42px; margin: 0; font-weight: bold;">Ramadan Kareem</h1>
              <h2 style="color: #0d9488; font-size: 24px; margin: 5px 0 0 0; font-weight: bold;">Sehri & Iftar Schedule 2026</h2>
              <div style="display: inline-block; background: #ccfbf1; padding: 5px 20px; border-radius: 50px; margin-top: 10px; border: 1px solid #0d9488;">
                <span style="color: #0f766e; font-weight: bold; font-size: 16px;">District: ${district}</span>
              </div>
            </div>

            <!-- Duas Area -->
            <div style="margin-bottom: 25px; display: flex; gap: 20px;">
              <div style="flex: 1; background: #f0fdfa; border: 1.5px solid #0d9488; border-radius: 12px; padding: 15px; text-align: center;">
                 <div style="color: #0f766e; font-weight: bold; font-size: 14px; margin-bottom: 5px; text-transform: uppercase;">Sehri Dua (Intention)</div>
                 <div style="font-size: 18px; color: #000000; margin-bottom: 4px; direction: rtl;">نَوَيْتُ اَنْ اَصُوْمَ غَدًا مِّنْ شَهْرِ رَمَضَانَ</div>
                 <div style="font-size: 11px; color: #334155; font-style: italic;">Nawaitu an asuma ghadan min shahri Ramadan</div>
                 <div style="font-weight: bold; font-size: 12px; color: #000000; margin-top: 2px;">নাওয়াইতু আন আছুমা গাদাম মিন শাহরি রমজান</div>
              </div>
              <div style="flex: 1; background: #fff1f2; border: 1.5px solid #be123c; border-radius: 12px; padding: 15px; text-align: center;">
                 <div style="color: #be123c; font-weight: bold; font-size: 14px; margin-bottom: 5px; text-transform: uppercase;">Iftar Dua (Breaking Fast)</div>
                 <div style="font-size: 18px; color: #000000; margin-bottom: 4px; direction: rtl;">اَللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ اَفْطَرْتُ</div>
                 <div style="font-size: 11px; color: #334155; font-style: italic;">Allahumma laka sumtu wa ala rizqika aftartu</div>
                 <div style="font-weight: bold; font-size: 12px; color: #000000; margin-top: 2px;">আল্লাহুম্মা লাকা ছুমতু ওয়া আলা রিযক্বিকা আফতার্তু</div>
              </div>
            </div>

            <!-- Main Schedule Table Area -->
            <div style="display: flex; gap:30px; justify-content: space-between; flex: 1;">
              <div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; table-layout: fixed;">
                  <thead>
                    <tr style="border-bottom: 2px solid #0d9488;">
                      <th style="padding: 10px 2px; color: #0f766e; font-size: 9px; text-transform: uppercase;">Ramadan</th>
                      <th style="padding: 10px 2px; color: #0f766e; font-size: 9px; text-transform: uppercase;">Date</th>
                      <th style="padding: 10px 2px; color: #0f766e; font-size: 9px; text-transform: uppercase;">Day</th>
                      <th style="padding: 10px 2px; color: #0d9488; font-size: 9px; text-transform: uppercase;">Sehri End</th>
                      <th style="padding: 10px 2px; color: #0d9488; font-size: 9px; text-transform: uppercase;">Iftar</th>
                    </tr>
                  </thead>
                  <tbody>${firstHalf}</tbody>
                </table>
              </div>
              <div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; table-layout: fixed;">
                  <thead>
                    <tr style="border-bottom: 2px solid #0d9488;">
                      <th style="padding: 10px 2px; color: #0f766e; font-size: 9px; text-transform: uppercase;">Ramadan</th>
                      <th style="padding: 10px 2px; color: #0f766e; font-size: 9px; text-transform: uppercase;">Date</th>
                      <th style="padding: 10px 2px; color: #0f766e; font-size: 9px; text-transform: uppercase;">Day</th>
                      <th style="padding: 10px 2px; color: #0d9488; font-size: 9px; text-transform: uppercase;">Sehri End</th>
                      <th style="padding: 10px 2px; color: #0d9488; font-size: 9px; text-transform: uppercase;">Iftar</th>
                    </tr>
                  </thead>
                  <tbody>${secondHalf}</tbody>
                </table>
              </div>
            </div>

            <!-- Footer Section: Solid Plate Design -->
            <div style="margin-top: auto; padding: 20px; text-align: center; background: #ffffff; border-top: 3px solid #0d9488; border-radius: 20px 20px 0 0; box-shadow: 0 -5px 15px rgba(0,0,0,0.05);">
              <div style="color: #0f766e; font-size: 18px; font-weight: 800; margin: 0; line-height: 1.4; display: block;">Powered by Dreams On</div>
              <div style="color: #0d9488; font-size: 13px; font-weight: 700; margin: 4px 0; line-height: 1.4; display: block;">Note: Islamic dates are subject to moon sighting.</div>
              <div style="color: #64748b; font-size: 10px; font-weight: 600; margin: 0; line-height: 1.2; display: block;">© 2026 Dreams On. All rights reserved. | Ramadan Times</div>
            </div>
          </div>
        </div>
      `;

      // Wait for settling
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: false,
        allowTaint: true,
        logging: true,
        backgroundColor: '#ffffff',
        height: 1123,
        width: 794,
        windowWidth: 794,
        windowHeight: 1123,
        onclone: (clonedDoc) => {
          const wrapper = clonedDoc.getElementById('pdf-content-wrapper');
          if (wrapper) {
            wrapper.style.fontFamily = "Arial, Helvetica, sans-serif";
          }
        }
      });

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4', true); // Use compression
      const imgData = canvas.toDataURL('image/jpeg', 0.85); // Moderate compression for iOS
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      pdf.save(`Ramadan-Schedule-2026-${district}.pdf`);

      // Clean up
      document.body.removeChild(container);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF Error: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="schedule-download slide-in">
      <button
        className="download-btn"
        onClick={handleDownload}
        title="Download complete 30-day Ramadan schedule"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="btn-text-desktop">Full Schedule</span>
        <span className="btn-text-mobile">30 Days</span>
      </button>
      <span className="download-hint">Download full month schedule</span>
    </div>
  );
}

export default ScheduleDownload;
