// ══════════════════════════════════════════════════════════
//  MMI Jammu Portal — Google Apps Script Backend
//  Handles: Drive Gallery (per class) + Google Sheets Attendance
//
//  HOW TO DEPLOY:
//  1. Go to https://script.google.com → New project
//  2. Paste this entire file
//  3. Fill in the folder IDs and ATTENDANCE_SHEET_ID below
//  4. Click Deploy → New deployment → Web app
//     - Execute as: Me
//     - Who has access: Anyone
//  5. Copy the deployment URL → paste into scripts.js as APPS_SCRIPT_URL
// ══════════════════════════════════════════════════════════

// ── CONFIG ───────────────────────────────────────────────
// One Drive folder per class — share each as "Anyone with link → Viewer"
const CLASS_FOLDERS = {
  'kindergarten': '1G0ypfTBSmqt9UcXc7EqLLn8jGrXZ9ew6',
  'nursery':      '1CrOUF4WDjUYOrRG9FY8rXUCLsbIwcz_x',
  'pre-nursery':  '17XWjwg1z98d5Nr_FTAhGtHT6-XCzomeu'
  // Playgroup and Toddlers are grouped under Pre-Nursery
};
const ATTENDANCE_SHEET_ID = '1_QJnpEm1x5AYdLO_btG5iXKmzZKTRG4fvSMICUX5tEw';
// ─────────────────────────────────────────────────────────

function doGet(e) {
  const type    = (e.parameter.type    || '').toLowerCase();
  const student = (e.parameter.student || '').toLowerCase().trim();
  const cls     = (e.parameter.class   || '').toLowerCase().trim();

  let result;
  if (type === 'gallery') {
    result = getGalleryImages(cls);
  } else if (type === 'attendance') {
    result = getAttendance(student);
  } else {
    result = { error: 'Unknown type. Use ?type=gallery or ?type=attendance&student=raya' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── GALLERY ─────────────────────────────────────────────
// Returns all image files from the class-specific Drive folder.
// Each folder must be shared: "Anyone with the link → Viewer"
function getGalleryImages(cls) {
  try {
    // Playgroup and Toddlers use the Pre-Nursery folder
    const normalised = (cls === 'playgroup' || cls === 'toddlers') ? 'pre-nursery' : cls;
    const folderId = CLASS_FOLDERS[normalised];
    if (!folderId || folderId.startsWith('PASTE_')) {
      return { images: [], error: 'No folder configured for class: ' + cls };
    }
    const folder = DriveApp.getFolderById(folderId);
    const files  = folder.getFiles();
    const images = [];

    while (files.hasNext()) {
      const file = files.next();
      if (file.getMimeType().startsWith('image/')) {
        const id = file.getId();
        images.push({
          id:   id,
          name: file.getName(),
          // Thumbnail URL — works for any publicly shared image in Drive
          url:  'https://drive.google.com/thumbnail?id=' + id + '&sz=w800'
        });
      }
    }

    // Sort by file name so upload order is predictable
    images.sort((a, b) => a.name.localeCompare(b.name));
    return { images: images };

  } catch (err) {
    return { error: err.message, images: [] };
  }
}

// ── ATTENDANCE ───────────────────────────────────────────
// Reads from ALL sheets whose names start with a month name
// (e.g. "May 2026", "June 2026", "July 2026").
// Skips the first row (headers) in each sheet.
// Required columns:
//   A: Date       (YYYY-MM-DD text  OR  a Date cell)
//   B: Student    (lowercase username)
//   C: Status     (P or A)
//
// Returns only the rows matching the requested student.
function getAttendance(student) {
  try {
    const ss      = SpreadsheetApp.openById(ATTENDANCE_SHEET_ID);
    const sheets  = ss.getSheets();
    const records = [];

    for (const sheet of sheets) {
      const data = sheet.getDataRange().getValues();
      // Row index 0 = headers, start from 1
      for (let i = 1; i < data.length; i++) {
        const row        = data[i];
        const rowStudent = (row[1] || '').toString().toLowerCase().trim();

        // Skip rows with no date or student
        if (!row[0] || !row[1]) continue;

        if (!student || rowStudent === student) {
          const rawDate = row[0];
          let dateStr;

          if (rawDate instanceof Date) {
            const y = rawDate.getFullYear();
            const m = String(rawDate.getMonth() + 1).padStart(2, '0');
            const d = String(rawDate.getDate()).padStart(2, '0');
            dateStr = y + '-' + m + '-' + d;
          } else {
            dateStr = rawDate.toString().trim();
          }

          records.push({
            date:    dateStr,
            student: row[1].toString(),
            status:  (row[2] || '').toString().toUpperCase().trim()
          });
        }
      }
    }

    return { records: records };

  } catch (err) {
    return { error: err.message, records: [] };
  }
}
