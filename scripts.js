/* ═══════════════════════════════════════════════════
   MMI JAMMU – SCRIPTS
═══════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   GOOGLE SHEETS CONFIG  (no login needed)
   Uses published-to-web CSV — no OAuth.

   HOW TO GET EACH URL:
   Google Sheet → File → Share → Publish to web
   → choose the tab → CSV format → Publish → Copy link

   ATTENDANCE_CSV_URL : publish the "Attendance" tab
   GALLERY_CSV_URL    : publish the "Gallery" tab
                        (see setup instructions below)
───────────────────────────────────────── */
// ── ATTENDANCE CONFIG ────────────────────────────────────
// One published CSV URL per month tab.
// In Google Sheet: create one tab per month named exactly as below,
// e.g. "June 2026", "July 2026", … "June 2027"
// Import the corresponding CSV → File → Share → Publish to web
// → select the tab → CSV → Publish → copy the URL into the url field.
const _SID     = '1_QJnpEm1x5AYdLO_btG5iXKmzZKTRG4fvSMICUX5tEw'; // Notifications sheet
const _SID_KG  = '1BKuvYCIWO0xyzuBI9hBNGlAr5JriDa6VLVjyfww2rmI'; // Kindergarten attendance
const _SID_N   = '1YOglB9jn9KikFuODpHhXZVYTQyCPsz4gWfmxwRmrslI'; // Nursery attendance
const _SID_PN  = '16SN8wDhv412Q52hIMJbVXxE2RKjYNh2opOKeUAH6l3U'; // Pre-Nursery/Playgroup/Toddlers attendance

function _attUrl(sid, sheet) {
  return `https://docs.google.com/spreadsheets/d/${sid}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheet)}&_=${Date.now()}`;
}

const ATTENDANCE_MONTHS = [
  { label: 'May 2026',       year: 2026, month:  4, urlKG: _attUrl(_SID_KG,'May 2026'),       urlN: _attUrl(_SID_N,'May 2026'),       urlPN: _attUrl(_SID_PN,'May 2026')       },
  { label: 'June 2026',      year: 2026, month:  5, urlKG: _attUrl(_SID_KG,'June 2026'),      urlN: _attUrl(_SID_N,'June 2026'),      urlPN: _attUrl(_SID_PN,'June 2026')      },
  { label: 'July 2026',      year: 2026, month:  6, urlKG: _attUrl(_SID_KG,'July 2026'),      urlN: _attUrl(_SID_N,'July 2026'),      urlPN: _attUrl(_SID_PN,'July 2026')      },
  { label: 'August 2026',    year: 2026, month:  7, urlKG: _attUrl(_SID_KG,'August 2026'),    urlN: _attUrl(_SID_N,'August 2026'),    urlPN: _attUrl(_SID_PN,'August 2026')    },
  { label: 'September 2026', year: 2026, month:  8, urlKG: _attUrl(_SID_KG,'September 2026'), urlN: _attUrl(_SID_N,'September 2026'), urlPN: _attUrl(_SID_PN,'September 2026') },
  { label: 'October 2026',   year: 2026, month:  9, urlKG: _attUrl(_SID_KG,'October 2026'),   urlN: _attUrl(_SID_N,'October 2026'),   urlPN: _attUrl(_SID_PN,'October 2026')   },
  { label: 'November 2026',  year: 2026, month: 10, urlKG: _attUrl(_SID_KG,'November 2026'),  urlN: _attUrl(_SID_N,'November 2026'),  urlPN: _attUrl(_SID_PN,'November 2026')  },
  { label: 'December 2026',  year: 2026, month: 11, urlKG: _attUrl(_SID_KG,'December 2026'),  urlN: _attUrl(_SID_N,'December 2026'),  urlPN: _attUrl(_SID_PN,'December 2026')  },
  { label: 'January 2027',   year: 2027, month:  0, urlKG: _attUrl(_SID_KG,'January 2027'),   urlN: _attUrl(_SID_N,'January 2027'),   urlPN: _attUrl(_SID_PN,'January 2027')   },
  { label: 'February 2027',  year: 2027, month:  1, urlKG: _attUrl(_SID_KG,'February 2027'),  urlN: _attUrl(_SID_N,'February 2027'),  urlPN: _attUrl(_SID_PN,'February 2027')  },
  { label: 'March 2027',     year: 2027, month:  2, urlKG: _attUrl(_SID_KG,'March 2027'),     urlN: _attUrl(_SID_N,'March 2027'),     urlPN: _attUrl(_SID_PN,'March 2027')     },
  { label: 'April 2027',     year: 2027, month:  3, urlKG: _attUrl(_SID_KG,'April 2027'),     urlN: _attUrl(_SID_N,'April 2027'),     urlPN: _attUrl(_SID_PN,'April 2027')     },
  { label: 'May 2027',       year: 2027, month:  4, urlKG: _attUrl(_SID_KG,'May 2027'),       urlN: _attUrl(_SID_N,'May 2027'),       urlPN: _attUrl(_SID_PN,'May 2027')       },
  { label: 'June 2027',      year: 2027, month:  5, urlKG: _attUrl(_SID_KG,'June 2027'),      urlN: _attUrl(_SID_N,'June 2027'),      urlPN: _attUrl(_SID_PN,'June 2027')      },
];
// ────────────────────────────────────────────────────────

// ── NOTIFICATIONS CONFIG ─────────────────────────────────
// In the same Google Sheet, create a tab called "Notifications".
// Columns (row 1 headers, exact spelling):
//   date     | type               | class          | message
//   29/5/2026| urgent             | all            | School closed tomorrow…
//   27/5/2026| general            | lkg            | LKG PTM on Saturday…
//   25/5/2026| holiday            | all            | Eid holiday 6–8 June…
//
// class values: all  /  lkg  /  kg  /  ukg   (case-insensitive)
// type  values: urgent  /  general  /  holiday
//
// Publish: File → Share → Publish to web → Notifications tab → CSV → Publish
const NOTIFICATIONS_CSV_URL = `https://docs.google.com/spreadsheets/d/${_SID}/gviz/tq?tqx=out:csv&sheet=Notifications`;
// ────────────────────────────────────────────────────────

// ── GALLERY CONFIG ──────────────────────────────────────
// Apps Script Web App — auto-loads all images from the Drive folder.
// Upload a photo to the Drive folder → appears on next page load.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxO-RRHvilWHXjcMZjqV1OjujBLh5Ty6gRY0YZC7QylWsbwy17G7zTU-ReLFUKLBag/exec';

/* ─────────────────────────────────────────
   STUDENT ACCOUNTS  (auto-generated from MMI-Data.xlsx)
   Username : Full name, spaces removed  (e.g. AgastyaAnand)
   Password : MMI + RegNo + First3LettersOfName  (e.g. MMI307AGA)
   Lookup   : case-insensitive
───────────────────────────────────────── */
const STUDENT_DB = {
  'agastyaanand': {
    username: 'AgastyaAnand',
    pass: 'MMI307AGA',
    name: 'Agastya  Anand',
    role: 'student',
    roll: '307',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Arjun Anand',
    fatherMob: '9797467777',
    mother: 'Poonam Tyagi',
    motherMob: '962288777',
    email: 'arjun@nindiya.com',
  },
  'rigveditalanger': {
    username: 'RigveditaLanger',
    pass: 'MMI298RIG',
    name: 'Rigvedita Langer',
    role: 'student',
    roll: '298',
    class: 'Nursery',
    gender: 'Female',
    father: 'Mrinal Langer',
    fatherMob: '9906197777',
    mother: 'Sonia Langer',
    motherMob: '7006057972',
    email: 'mrinallanger@gmail.com',
  },
  'ayaanchopra': {
    username: 'AyaanChopra',
    pass: 'MMI311AYA',
    name: 'Ayaan Chopra',
    role: 'student',
    roll: '311',
    class: 'Nursery',
    gender: 'Male',
    father: 'Annsh Chopra',
    fatherMob: '9622229922',
    mother: 'Mahima Chopra',
    motherMob: '962192999',
    email: '',
  },
  'naitikmantoo': {
    username: 'NaitikMantoo',
    pass: 'MMI331NAI',
    name: 'Naitik Mantoo',
    role: 'student',
    roll: '331',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Sagar Mantoo',
    fatherMob: '9906367354',
    mother: 'Neha Mantoo',
    motherMob: '9622239550',
    email: 'sagar.mantoo3@gmail.com',
  },
  'anaizaagaarwal': {
    username: 'AnaizaAgaarwal',
    pass: 'MMI326ANA',
    name: 'Anaiza Agaarwal',
    role: 'student',
    roll: '326',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Kshitiz Aggarwal',
    fatherMob: '9590139999',
    mother: 'Akanksh Kapahi',
    motherMob: '9596139999',
    email: 'aggarwalkshitiz@gmail.com',
  },
  'shivyamattoo': {
    username: 'ShivyaMattoo',
    pass: 'MMI275SHI',
    name: 'Shivya Mattoo',
    role: 'student',
    roll: '275',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Nakul Mantoo',
    fatherMob: '9906000047',
    mother: 'Mannat Kapoor Mantoo',
    motherMob: '8825069077',
    email: 'nakkulmattoo@gmail.com',
  },
  'vedikamahajan': {
    username: 'VedikaMahajan',
    pass: 'MMI259VED',
    name: 'Vedika Mahajan',
    role: 'student',
    roll: '259',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Prinkle Mahajan',
    fatherMob: '9419301212',
    mother: 'Surbhi Mahajan',
    motherMob: '9797424400',
    email: 'prinkle1212@gmail.com',
  },
  'shanvisharma': {
    username: 'ShanviSharma',
    pass: 'MMI292SHA',
    name: 'Shanvi Sharma',
    role: 'student',
    roll: '292',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Suraj Sharma',
    fatherMob: '8082200010',
    mother: 'Reema Mahajan',
    motherMob: '9682309955',
    email: 'surajkumarsharma6052@gmail.com',
  },
  'sachiarsinghanand': {
    username: 'SachiarSinghAnand',
    pass: 'MMI305SAC',
    name: 'Sachiar Singh Anand',
    role: 'student',
    roll: '305',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Deepjot Singh Anand',
    fatherMob: '9906086644',
    mother: 'Guneet Kaur',
    motherMob: '9906086644',
    email: 'deepjotanand@gmail.com',
  },
  'nirbhaysharma': {
    username: 'NirbhaySharma',
    pass: 'MMI294NIR',
    name: 'Nirbhay Sharma',
    role: 'student',
    roll: '294',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Vishal Sharma',
    fatherMob: '9873327564',
    mother: 'Sheena Sahni',
    motherMob: '9419218495',
    email: 'cmdtvishalsharma@gmail.com',
  },
  'pehrmanhas': {
    username: 'PehrManhas',
    pass: 'MMI539PEH',
    name: 'Pehr  Manhas',
    role: 'student',
    roll: '539',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Bhawani Singh Manhas',
    fatherMob: '8899118111',
    mother: 'Malvika Thakur',
    motherMob: '9882643286',
    email: '',
  },
  'zakariyanainsheikh': {
    username: 'ZakariyaNainsheikh',
    pass: 'MMI341ZAK',
    name: 'Zakariya Nainsheikh',
    role: 'student',
    roll: '341',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Zulker Nain Sheikh',
    fatherMob: '7298516502',
    mother: 'Aiesha Tabassum Sheikh',
    motherMob: '7006133694',
    email: 'zulkernain.sheikh@gmail.com',
  },
  'shreenidhidubey': {
    username: 'ShreenidhiDubey',
    pass: 'MMI342SHR',
    name: 'Shreenidhi Dubey',
    role: 'student',
    roll: '342',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Tapan Dubey',
    fatherMob: '9810020062',
    mother: 'Nagma Dubey',
    motherMob: '9858508969',
    email: 'nagmadubey@gmail.com',
  },
  'yaashvithakur': {
    username: 'YaashviThakur',
    pass: 'MMI348YAA',
    name: 'Yaashvi Thakur',
    role: 'student',
    roll: '348',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Ajay Thakur',
    fatherMob: '9176040407',
    mother: 'Dr. Arjni Singh',
    motherMob: '7780915147',
    email: 'ajthakur89@yahoo.com',
  },
  'adhiraajpratapsinghmanhas': {
    username: 'AdhiraajPratapSinghManhas',
    pass: 'MMI349ADH',
    name: 'Adhiraaj Pratap Singh Manhas',
    role: 'student',
    roll: '349',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Dr Aditya P S Manhas',
    fatherMob: '7006992994',
    mother: 'Shipalli Thakur Manhas',
    motherMob: '9682586120',
    email: 'adiron.9@gmail.com',
  },
  'veehabamba': {
    username: 'VeehaBamba',
    pass: 'MMI351VEE',
    name: 'Veeha Bamba',
    role: 'student',
    roll: '351',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Amit Bamba',
    fatherMob: '9906905476',
    mother: 'Esha Baluja Bamba',
    motherMob: '7006238116',
    email: 'amitbamba86@gmail.com',
  },
  'anahitakapahi': {
    username: 'AnahitaKapahi',
    pass: 'MMI352ANA',
    name: 'Anahita Kapahi',
    role: 'student',
    roll: '352',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Ashwani Kapahi',
    fatherMob: '9419139243',
    mother: 'Mehak Kapahi',
    motherMob: '9070107003',
    email: 'ashwanikapahi@gmail.com',
  },
  'shivohamgupta': {
    username: 'ShivohamGupta',
    pass: 'MMI353SHI',
    name: 'Shivoham Gupta',
    role: 'student',
    roll: '353',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Shivang Gupta',
    fatherMob: '8715800003',
    mother: 'Dr. Chandni Gupta',
    motherMob: '9086082545',
    email: 'guptashivang21@gmail.com',
  },
  'tarzkaur': {
    username: 'TarzKaur',
    pass: 'MMI354TAR',
    name: 'Tarz Kaur',
    role: 'student',
    roll: '354',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Harjot  Singh',
    fatherMob: '9419141890',
    mother: 'Shally Kour',
    motherMob: '8082911234',
    email: 's.harjot1313@gmail.com',
  },
  'nairakauroberoi': {
    username: 'NairaKaurOberoi',
    pass: 'MMI355NAI',
    name: 'Naira Kaur Oberoi',
    role: 'student',
    roll: '355',
    class: 'Nursery',
    gender: 'Female',
    father: 'Gagandeep Singh Oberoi',
    fatherMob: '8803844444',
    mother: 'Sanha Oberoi',
    motherMob: '9070594444',
    email: 'gags399@gmail.com',
  },
  'mihanmahajan': {
    username: 'MihanMahajan',
    pass: 'MMI360MIH',
    name: 'Mihan Mahajan',
    role: 'student',
    roll: '360',
    class: 'Nursery',
    gender: 'Male',
    father: 'Ankit Mahajan',
    fatherMob: '9796645804',
    mother: 'Himani Mahajan',
    motherMob: '7889415321',
    email: 'ankit.mahajan024@gmail.com',
  },
  'dhananjaymahajan': {
    username: 'DhananjayMahajan',
    pass: 'MMI364DHA',
    name: 'Dhananjay Mahajan',
    role: 'student',
    roll: '364',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Abhimanyu Mahajan',
    fatherMob: '7051892709',
    mother: 'Rupanshi Gupta',
    motherMob: '9086600999',
    email: 'abhimanyuind90@gmail.com',
  },
  'mishkamahajan': {
    username: 'MishkaMahajan',
    pass: 'MMI365MIS',
    name: 'Mishka Mahajan',
    role: 'student',
    roll: '365',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Dr. Nikhil Mahajan',
    fatherMob: '9711209165',
    mother: 'Dr. Manisha Kakkar',
    motherMob: '9419258843',
    email: 'nikhilmahajan0802@gmail.com',
  },
  'ayaanamalhotra': {
    username: 'AyaanaMalhotra',
    pass: 'MMI361AYA',
    name: 'Ayaana Malhotra',
    role: 'student',
    roll: '361',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Pranav Malhotra',
    fatherMob: '9419173970',
    mother: 'Sonia Dhiman',
    motherMob: '9419224607',
    email: 'pranav2024@gmail.com',
  },
  'aarvikasawhney': {
    username: 'AarvikaSawhney',
    pass: 'MMI363AAR',
    name: 'Aarvika Sawhney',
    role: 'student',
    roll: '363',
    class: 'Nursery',
    gender: 'Female',
    father: 'Amit Sawhney',
    fatherMob: '9419185070',
    mother: 'Sonam Sawhney',
    motherMob: '9419249470',
    email: 'amitsawh@gmail.com',
  },
  'dravinachandan': {
    username: 'DravinaChandan',
    pass: 'MMI375DRA',
    name: 'Dravina  Chandan',
    role: 'student',
    roll: '375',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Chandan Gupta',
    fatherMob: '9906023111',
    mother: 'Divya Sharma',
    motherMob: '9906022111',
    email: 'chandanmba@gmail.com',
  },
  'kanishkagupta': {
    username: 'KanishkaGupta',
    pass: 'MMI374KAN',
    name: 'Kanishka Gupta',
    role: 'student',
    roll: '374',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Kanav Gupta',
    fatherMob: '9103282828',
    mother: 'Akshika Gupta',
    motherMob: '9018262626',
    email: 'kanav500@gmail.com',
  },
  'abhirajsinghdua': {
    username: 'AbhirajSinghDua',
    pass: 'MMI401ABH',
    name: 'Abhiraj  Singh Dua',
    role: 'student',
    roll: '401',
    class: 'Nursery',
    gender: 'Male',
    father: 'Jai Kunwar Singh Dua',
    fatherMob: '9622334455',
    mother: 'Ishmeet Dua',
    motherMob: '9419233741',
    email: 'jaidua2004@gmail.com',
  },
  'sahirakaur': {
    username: 'SahiraKaur',
    pass: 'MMI402SAH',
    name: 'Sahira Kaur',
    role: 'student',
    roll: '402',
    class: 'Nursery',
    gender: 'Female',
    father: 'Mankirat Singh',
    fatherMob: '8717000000',
    mother: 'Disha Behl',
    motherMob: '9419202209',
    email: 'mankirataval@gmail.com',
  },
  'shivanshikakotwal': {
    username: 'ShivanshikaKotwal',
    pass: 'MMI388SHI',
    name: 'Shivanshika Kotwal',
    role: 'student',
    roll: '388',
    class: 'Nursery',
    gender: 'Female',
    father: 'Shart Chander Kotwal',
    fatherMob: '8826984440',
    mother: 'Chaman Deep Kaur',
    motherMob: '7889699943',
    email: 'chamandeep78@gmail.com',
  },
  'shlokgupta': {
    username: 'ShlokGupta',
    pass: 'MMI400SHL',
    name: 'Shlok Gupta',
    role: 'student',
    roll: '400',
    class: 'Nursery',
    gender: 'Male',
    father: 'Sandeep Gupta',
    fatherMob: '9419142824',
    mother: 'Ritika Gupta',
    motherMob: '9622368648',
    email: 'jandyaltrading@gmail.com',
  },
  'kanvikmahajan': {
    username: 'KanvikMahajan',
    pass: 'MMI395KAN',
    name: 'Kanvik Mahajan',
    role: 'student',
    roll: '395',
    class: 'Nursery',
    gender: 'Male',
    father: 'Kanav Mahajan',
    fatherMob: '9596950121',
    mother: 'Kanika Gupta',
    motherMob: '9596624460',
    email: 'kanavmahajan1901@gamil.com',
  },
  'aaryasharma': {
    username: 'AaryaSharma',
    pass: 'MMI389AAR',
    name: 'Aarya Sharma',
    role: 'student',
    roll: '389',
    class: 'Nursery',
    gender: 'Female',
    father: 'Dr. Sarthak Sharma',
    fatherMob: '9914208964',
    mother: 'Dr.Neha Sharma',
    motherMob: '9419103177',
    email: 'sarthaksharma10@gmail.com',
  },
  'hitakshimantoo': {
    username: 'HitakshiMantoo',
    pass: 'MMI403HIT',
    name: 'Hitakshi Mantoo',
    role: 'student',
    roll: '403',
    class: 'Nursery',
    gender: 'Female',
    father: 'Sagar Mantoo',
    fatherMob: '9906397354',
    mother: 'Neha Mantoo',
    motherMob: '9622239550',
    email: 'sagar.mantoo3@gmail.com',
  },
  'pavithsingh': {
    username: 'PavithSingh',
    pass: 'MMI382PAV',
    name: 'Pavith Singh',
    role: 'student',
    roll: '382',
    class: 'Nursery',
    gender: 'Male',
    father: 'Preetpal Singh',
    fatherMob: '9906084823',
    mother: 'Jasleen Kaur',
    motherMob: '9906780888',
    email: 'singhpreetrai@gmail.com',
  },
  'kiarajain': {
    username: 'KiaraJain',
    pass: 'MMI381KIA',
    name: 'Kiara Jain',
    role: 'student',
    roll: '381',
    class: 'Nursery',
    gender: 'Female',
    father: 'Vikrant Jain',
    fatherMob: '7006626572',
    mother: 'Mini Jain',
    motherMob: '9906091887',
    email: 'vikrant_jkb@yahoo.com',
  },
  'shubhkarmansinghsoin': {
    username: 'ShubhkarmanSinghSoin',
    pass: 'MMI378SHU',
    name: 'Shubhkarman Singh Soin',
    role: 'student',
    roll: '378',
    class: 'Nursery',
    gender: 'Male',
    father: 'Abhineet Singh Soin',
    fatherMob: '9796769696',
    mother: 'Jableen Kour',
    motherMob: '9596731270',
    email: 'abhineet.soin@gmail.com',
  },
  'riddhiverma': {
    username: 'RiddhiVerma',
    pass: 'MMI404RID',
    name: 'Riddhi Verma',
    role: 'student',
    roll: '404',
    class: 'Nursery',
    gender: 'Female',
    father: 'Sumeet Verma',
    fatherMob: '7889858112',
    mother: 'Anku Verma',
    motherMob: '7889858112',
    email: 'vsumit40@gmail.com',
  },
  'radhyaverma': {
    username: 'RadhyaVerma',
    pass: 'MMI405RAD',
    name: 'Radhya Verma',
    role: 'student',
    roll: '405',
    class: 'Nursery',
    gender: 'Female',
    father: 'Sumeet Verma',
    fatherMob: '7889858112',
    mother: 'Anku Verma',
    motherMob: '7889858112',
    email: 'vsumit40@gmail.com',
  },
  'abhirajsingh': {
    username: 'AbhirajSingh',
    pass: 'MMI393ABH',
    name: 'Abhiraj  Singh',
    role: 'student',
    roll: '393',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Gaurav Singh',
    fatherMob: '9796400088',
    mother: 'Shafali Bhalwal',
    motherMob: '',
    email: 'gouravgas@yahoo.co.in',
  },
  'krishivgupta': {
    username: 'KrishivGupta',
    pass: 'MMI371KRI',
    name: 'Krishiv Gupta',
    role: 'student',
    roll: '371',
    class: 'Nursery',
    gender: 'Male',
    father: 'Manav Gupta',
    fatherMob: '9858094702',
    mother: 'Anam Gupta',
    motherMob: '7889729477',
    email: 'manav9858094702@gmail.com',
  },
  'enairatukra': {
    username: 'EnairaTukra',
    pass: 'MMI390ENA',
    name: 'Enaira Tukra',
    role: 'student',
    roll: '390',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Prayas Tukra',
    fatherMob: '9517865666',
    mother: 'Deeksha Arora',
    motherMob: '6005355384',
    email: 'info@assianassociates.in',
  },
  'yashikadogra': {
    username: 'YashikaDogra',
    pass: 'MMI372YAS',
    name: 'Yashika Dogra',
    role: 'student',
    roll: '372',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Gourav Dogra',
    fatherMob: '9622006621',
    mother: 'Sumrati Badhan',
    motherMob: '7006432520',
    email: 'kiranelectricalworks@gmail.com',
  },
  'sharylchopra': {
    username: 'SharylChopra',
    pass: 'MMI413SHA',
    name: 'Sharyl Chopra',
    role: 'student',
    roll: '413',
    class: 'Nursery',
    gender: 'Female',
    father: 'Sunny Chopra',
    fatherMob: '8795947000',
    mother: 'Malvika Chopra',
    motherMob: '8492817349',
    email: 'sunnydaksh2506@gmail.com',
  },
  'mehatabsingh': {
    username: 'MehatabSingh',
    pass: 'MMI407MEH',
    name: 'Mehatab Singh',
    role: 'student',
    roll: '407',
    class: 'Kindergarten',
    gender: 'Male',
    father: '',
    fatherMob: '',
    mother: 'Dr. Sunjam Kour Khajuria',
    motherMob: '7006616494',
    email: '',
  },
  'tamannachabra': {
    username: 'TamannaChabra',
    pass: 'MMI392TAM',
    name: 'Tamanna Chabra',
    role: 'student',
    roll: '392',
    class: 'Nursery',
    gender: 'Female',
    father: 'Kanwar Chhabra',
    fatherMob: '889977777',
    mother: 'Shifau Khanna',
    motherMob: '9796615950',
    email: 'kanwar-chhabra@yahooco.in',
  },
  'gursheenchopra': {
    username: 'GursheenChopra',
    pass: 'MMI406GUR',
    name: 'Gursheen Chopra',
    role: 'student',
    roll: '406',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Rajiv Kumar',
    fatherMob: '9815131601',
    mother: 'AmanPreet Kaur',
    motherMob: '',
    email: 'r.kc@powergrid.in',
  },
  'tejasgupta': {
    username: 'TejasGupta',
    pass: 'MMI409TEJ',
    name: 'Tejas Gupta',
    role: 'student',
    roll: '409',
    class: 'Nursery',
    gender: 'Male',
    father: 'Ankit Gupta',
    fatherMob: '9622222232',
    mother: 'Shivani Gupta',
    motherMob: '8717003888',
    email: 'ankitfeb18@gmail.com',
  },
  'arnazkaur': {
    username: 'ArnazKaur',
    pass: 'MMI411ARN',
    name: 'Arnaz Kaur',
    role: 'student',
    roll: '411',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Satinder Pal Singh',
    fatherMob: '9920796005',
    mother: 'Pardeep Kour',
    motherMob: '7889855140',
    email: 'balisatinder1909@gmail.com',
  },
  'dikshitasingh': {
    username: 'DikshitaSingh',
    pass: 'MMI414DIK',
    name: 'Dikshita Singh',
    role: 'student',
    roll: '414',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Amit kumar Singh',
    fatherMob: '9988660264',
    mother: 'Poonam Singh',
    motherMob: '96409980011',
    email: 'aksj@live.in',
  },
  'anhaslahu': {
    username: 'AnhaSlahu',
    pass: 'MMI415ANH',
    name: 'Anha Slahu',
    role: 'student',
    roll: '415',
    class: 'Nursery',
    gender: 'Female',
    father: 'Slahuddin Ahmed',
    fatherMob: '9622933197',
    mother: 'Dr. Lubna Aslam',
    motherMob: '9797550123',
    email: 'slahu.ahmed@gmail.com',
  },
  'nuriyahmahajan': {
    username: 'NuriyahMahajan',
    pass: 'MMI420NUR',
    name: 'Nuriyah Mahajan',
    role: 'student',
    roll: '420',
    class: 'Nursery',
    gender: 'Female',
    father: 'Varun Mahajan',
    fatherMob: '9419184575',
    mother: 'Nikita Mahajan',
    motherMob: '9419900999',
    email: 'varunmahajan08@gmail.com',
  },
  'kairahans': {
    username: 'KairaHans',
    pass: 'MMI416KAI',
    name: 'Kaira Hans',
    role: 'student',
    roll: '416',
    class: 'Nursery',
    gender: 'Female',
    father: 'Abhishek Hans',
    fatherMob: '7006430892',
    mother: 'Ridhima Gupta',
    motherMob: '9419393861',
    email: 'comewithabhi308@gmail.com',
  },
  'ashvikagandotra': {
    username: 'AshvikaGandotra',
    pass: 'MMI419ASH',
    name: 'Ashvika Gandotra',
    role: 'student',
    roll: '419',
    class: 'Nursery',
    gender: 'Female',
    father: 'Mr. Tarun Gandotra',
    fatherMob: '9796209885',
    mother: 'Radhika Gandotra',
    motherMob: '7006798707',
    email: '',
  },
  'avyuktmahajan': {
    username: 'AvyuktMahajan',
    pass: 'MMI418AVY',
    name: 'Avyukt Mahajan',
    role: 'student',
    roll: '418',
    class: 'Nursery',
    gender: 'Male',
    father: 'Amrit Rametra',
    fatherMob: '9419100611',
    mother: 'Mridu Gupta',
    motherMob: '8825097053',
    email: 'amrit2mahajan@gmail.com',
  },
  'samarth': {
    username: 'Samarth',
    pass: 'MMI421SAM',
    name: 'Samarth',
    role: 'student',
    roll: '421',
    class: 'Nursery',
    gender: 'Male',
    father: '',
    fatherMob: '',
    mother: 'Mehak Gupta',
    motherMob: '9419786061',
    email: 'abhirolgupta@gmail.com',
  },
  'sehrajsinghpuri': {
    username: 'SehrajSinghpuri',
    pass: 'MMI423SEH',
    name: 'Sehraj Singh puri',
    role: 'student',
    roll: '423',
    class: 'Nursery',
    gender: 'Male',
    father: 'Simranjeet Singh Puri',
    fatherMob: '8713994444',
    mother: 'Dr. Eshmeet Kour',
    motherMob: '8899989000',
    email: 'simran390@gmail.com',
  },
  'pavikasharma': {
    username: 'PavikaSharma',
    pass: 'MMI422PAV',
    name: 'Pavika Sharma',
    role: 'student',
    roll: '422',
    class: 'Nursery',
    gender: 'Female',
    father: 'Narinder Sharma',
    fatherMob: '9086333333',
    mother: 'Priyanka Kalia',
    motherMob: '9555072113',
    email: 'narindersharma327@gmail.com',
  },
  'tanayshakapoor': {
    username: 'TanayshaKapoor',
    pass: 'MMI425TAN',
    name: 'Tanaysha Kapoor',
    role: 'student',
    roll: '425',
    class: 'Nursery',
    gender: 'Female',
    father: 'Varun Kapoor',
    fatherMob: '9910301228',
    mother: 'Latasha Choudhary Kapoor',
    motherMob: '9796659282',
    email: '',
  },
  'arnajthakur': {
    username: 'ArnajThakur',
    pass: 'MMI427ARN',
    name: 'Arnaj Thakur',
    role: 'student',
    roll: '427',
    class: 'Nursery',
    gender: 'Male',
    father: 'Ajay Thakur',
    fatherMob: '9176040407',
    mother: 'Dr. Arjni Singh',
    motherMob: '7780915147',
    email: 'ajaythakur89@yahoo.com',
  },
  'rajvanshkapahi': {
    username: 'RajvanshKapahi',
    pass: 'MMI332RAJ',
    name: 'Rajvansh Kapahi',
    role: 'student',
    roll: '332',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Akhil Kapahi',
    fatherMob: '7006507007',
    mother: '',
    motherMob: '',
    email: '',
  },
  'sahaayasharma': {
    username: 'SahaayaSharma',
    pass: 'MMI428SAH',
    name: 'Sahaaya Sharma',
    role: 'student',
    roll: '428',
    class: 'Nursery',
    gender: 'Male',
    father: 'Anubhav Sharma',
    fatherMob: '9086778999',
    mother: 'Sukriti Sharma',
    motherMob: '9086684999',
    email: 'anubhav_2687@yahoo.co.in',
  },
  'hardeetsingh': {
    username: 'HardeetSingh',
    pass: 'MMI429HAR',
    name: 'Hardeet Singh',
    role: 'student',
    roll: '429',
    class: 'Nursery',
    gender: 'Male',
    father: 'Dr. Amardeep Singh',
    fatherMob: '7022630313',
    mother: 'Dr. GaganDeep Kour',
    motherMob: '9419384373',
    email: 'thesingh7@gmail.com',
  },
  'vikramadityabatra': {
    username: 'VikramadityaBatra',
    pass: 'MMI434VIK',
    name: 'Vikramaditya Batra',
    role: 'student',
    roll: '434',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Manik Batra',
    fatherMob: '9018877777',
    mother: 'Himani Batra',
    motherMob: '',
    email: '',
  },
  'daniyalbasitkeng': {
    username: 'DaniyalBasitKeng',
    pass: 'MMI430DAN',
    name: 'Daniyal Basit Keng',
    role: 'student',
    roll: '430',
    class: 'Nursery',
    gender: 'Male',
    father: 'Basit Manzoor keng',
    fatherMob: '9622684746',
    mother: 'Fiza Arshad',
    motherMob: '6005181318',
    email: 'basitm.keng@gmail.com',
  },
  'cymahgupta': {
    username: 'CymahGupta',
    pass: 'MMI433CYM',
    name: 'Cymah Gupta',
    role: 'student',
    roll: '433',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Rahil Gupta',
    fatherMob: '9419125225',
    mother: 'Tania Mahajan',
    motherMob: '9419102006',
    email: 'rahilgupta7007@gmail.com',
  },
  'ameyaachowdhary': {
    username: 'AmeyaaChowdhary',
    pass: 'MMI432AME',
    name: 'Ameyaa Chowdhary',
    role: 'student',
    roll: '432',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Arjun Chowdhary',
    fatherMob: '9469100000',
    mother: 'Richa Chowdhary',
    motherMob: '8899967788',
    email: 'arjunchowdhary1985@gmail.com',
  },
  'aadyasharma': {
    username: 'AadyaSharma',
    pass: 'MMI435AAD',
    name: 'Aadya Sharma',
    role: 'student',
    roll: '435',
    class: 'Nursery',
    gender: 'Female',
    father: 'Arjun Sharma',
    fatherMob: '9650110984',
    mother: 'Rashi Sharma',
    motherMob: '9650110984',
    email: '22rashisharma@gmail.com',
  },
  'nooraggrawal': {
    username: 'NoorAggrawal',
    pass: 'MMI436NOO',
    name: 'Noor Aggrawal',
    role: 'student',
    roll: '436',
    class: 'Nursery',
    gender: 'Female',
    father: 'Kanav Aggarwal',
    fatherMob: '9796388203',
    mother: 'Mishty Aggarwal',
    motherMob: '9356333334',
    email: 'kanav1144@gmail.com',
  },
  'adhirajchoudhary': {
    username: 'AdhirajChoudhary',
    pass: 'MMI438ADH',
    name: 'Adhiraj Choudhary',
    role: 'student',
    roll: '438',
    class: 'Nursery',
    gender: 'Male',
    father: 'Sahlesh Choudhary',
    fatherMob: '9906113333',
    mother: 'Himani Choudhary',
    motherMob: '8716013333',
    email: 'choudharysahlesh003@gmail.com',
  },
  'advikamahajan': {
    username: 'AdvikaMahajan',
    pass: 'MMI450ADV',
    name: 'Advika Mahajan',
    role: 'student',
    roll: '450',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'ArunGupta',
    fatherMob: '9419797684',
    mother: 'Ayushi Mahajan',
    motherMob: '9622409966',
    email: 'asga.jmu@gmail.com',
  },
  'agastyamahajan': {
    username: 'AgastyaMahajan',
    pass: 'MMI451AGA',
    name: 'Agastya Mahajan',
    role: 'student',
    roll: '451',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'ArunGupta',
    fatherMob: '9419797684',
    mother: 'Ayushi Mahajan',
    motherMob: '9622409966',
    email: 'asga.jmu@gmail.com',
  },
  'arsalanqasim': {
    username: 'ARSALAnqasim',
    pass: 'MMI481ARS',
    name: 'ARSALAn    qasim',
    role: 'student',
    roll: '481',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Sohail Qasim',
    fatherMob: '7860000097',
    mother: 'Ameera Kohli',
    motherMob: '7006605314',
    email: '',
  },
  'saanchgupta': {
    username: 'SaanchGupta',
    pass: 'MMI439SAA',
    name: 'Saanch Gupta',
    role: 'student',
    roll: '439',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Ratik Gupta',
    fatherMob: '7006897283',
    mother: 'Diksha Gupta',
    motherMob: '9796663322',
    email: 'ratikgupta@gmail.com',
  },
  'dhitigupta': {
    username: 'DhitiGupta',
    pass: 'MMI440DHI',
    name: 'Dhiti Gupta',
    role: 'student',
    roll: '440',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Anmol Gupta',
    fatherMob: '',
    mother: 'Sunnia Gupta',
    motherMob: '9596831440',
    email: 'contactanmolgupta@gmail.com',
  },
  'kimayabatra': {
    username: 'KimayaBatra',
    pass: 'MMI482KIM',
    name: 'Kimaya Batra',
    role: 'student',
    roll: '482',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Bhisham Batra',
    fatherMob: '9070355555',
    mother: 'Sona Batra',
    motherMob: '9070377777',
    email: 'bhishambatra@yahoo.co.in',
  },
  'saurishsinghdadwal': {
    username: 'SaurishSinghDadwal',
    pass: 'MMI489SAU',
    name: 'Saurish Singh Dadwal',
    role: 'student',
    roll: '489',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Vishav Dev Singh Dadwal',
    fatherMob: '9419276660',
    mother: 'Nidhi Thakur',
    motherMob: '7889623936',
    email: 'vishavdadwal@gmail.com',
  },
  'gurnaazkaur': {
    username: 'GurnaazKaur',
    pass: 'MMI441GUR',
    name: 'Gurnaaz Kaur',
    role: 'student',
    roll: '441',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Simranjit Singh Sodhi',
    fatherMob: '9906587051',
    mother: 'Jasbir Kour',
    motherMob: '9906672006',
    email: 'simransodhi007@gmail.com',
  },
  'gauriaryanpratap': {
    username: 'GauriAryanPratap',
    pass: 'MMI442GAU',
    name: 'Gauri Aryan Pratap',
    role: 'student',
    roll: '442',
    class: 'Pre-Nursery',
    gender: 'female',
    father: 'Aryan Gupta',
    fatherMob: '9906027777',
    mother: 'Vidushi Singh',
    motherMob: '9899954766',
    email: 'aryanpartap1312@gmail.com',
  },
  'gurniwazsingh': {
    username: 'GurniwazSingh',
    pass: 'MMI446GUR',
    name: 'Gurniwaz Singh',
    role: 'student',
    roll: '446',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Darshpreet singh',
    fatherMob: '8717012356',
    mother: 'Tarundeep Kour',
    motherMob: '7298116494',
    email: 'darshpreetsandhu@gmail.com',
  },
  'gursaanjkour': {
    username: 'GursaanjKour',
    pass: 'MMI449GUR',
    name: 'Gursaanj Kour',
    role: 'student',
    roll: '449',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Mandeep Singh',
    fatherMob: '9796076880',
    mother: 'Navneet Kour',
    motherMob: '9596814898',
    email: 'mandeep2586@gmail.com',
  },
  'abhyudayagupta': {
    username: 'AbhyudayaGupta',
    pass: 'MMI454ABH',
    name: 'Abhyudaya Gupta',
    role: 'student',
    roll: '454',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Angad Gupta',
    fatherMob: '9055511022',
    mother: 'Urvashi Mahajan',
    motherMob: '8717060024',
    email: '',
  },
  'kabirgupta': {
    username: 'KabirGupta',
    pass: 'MMI447KAB',
    name: 'Kabir Gupta',
    role: 'student',
    roll: '447',
    class: 'Nursery',
    gender: 'Male',
    father: 'Karan Gupta',
    fatherMob: '7838041979',
    mother: 'Aparna Manhas',
    motherMob: '8800170018',
    email: 'guptakaran2189@gmail.com',
  },
  'sanchimahajan': {
    username: 'SanchiMahajan',
    pass: 'MMI483SAN',
    name: 'Sanchi Mahajan',
    role: 'student',
    roll: '483',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Prinkle Mahajan',
    fatherMob: '9419301212',
    mother: 'Surbhi Mahajan',
    motherMob: '9797424400',
    email: 'prinkle1212@gmail.com',
  },
  'viromgupta': {
    username: 'ViromGupta',
    pass: 'MMI445VIR',
    name: 'Virom Gupta',
    role: 'student',
    roll: '445',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Mohit Gupta',
    fatherMob: '9906087001',
    mother: 'Garima Gupta',
    motherMob: '7006980044',
    email: 'mohit_gkin@yahoo.co.in',
  },
  'ariketsharma': {
    username: 'AriketSharma',
    pass: 'MMI444ARI',
    name: 'Ariket Sharma',
    role: 'student',
    roll: '444',
    class: 'Nursery',
    gender: 'Male',
    father: 'Akhil Sharma',
    fatherMob: '9769272171',
    mother: 'Richa Sharma',
    motherMob: '',
    email: 'caakhil16@gmail.com',
  },
  'sifatgupta': {
    username: 'SifatGupta',
    pass: 'MMI458SIF',
    name: 'Sifat Gupta',
    role: 'student',
    roll: '458',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Abhishek Gupta',
    fatherMob: '9419183575',
    mother: 'Neha Gandotra',
    motherMob: '9419183575',
    email: 'abhishekvgupta@gmail.com',
  },
  'mayahgupta': {
    username: 'MayahGupta',
    pass: 'MMI459MAY',
    name: 'Mayah Gupta',
    role: 'student',
    roll: '459',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Abhishek Gupta',
    fatherMob: '9419183575',
    mother: 'Neha Gandotra',
    motherMob: '9419183575',
    email: 'abhishekvgupta@gmail.com',
  },
  'zuhaannaseerkhanday': {
    username: 'ZuhaanNaseerKhanday',
    pass: 'MMI461ZUH',
    name: 'Zuhaan Naseer Khanday',
    role: 'student',
    roll: '461',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Dr.Naseer Bashir Khanday',
    fatherMob: '7889885434',
    mother: 'Dr.Anam Khurshid',
    motherMob: '7006656099',
    email: 'irfankhanday56@gmail.com',
  },
  'ayramahajan': {
    username: 'AyraMahajan',
    pass: 'MMI477AYR',
    name: 'Ayra Mahajan',
    role: 'student',
    roll: '477',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Roopav Rometra',
    fatherMob: '9419145317',
    mother: 'Aditi Gupta',
    motherMob: '9796291011',
    email: 'careersuccessjammu@gmail.com',
  },
  'aahirmahajan': {
    username: 'AahirMahajan',
    pass: 'MMI460AAH',
    name: 'Aahir Mahajan',
    role: 'student',
    roll: '460',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Akshay Mahajan',
    fatherMob: '7006886659',
    mother: 'Priyanka Mahajan',
    motherMob: '7006886659',
    email: '',
  },
  'harshitvipulgulati': {
    username: 'HarshitVipulGulati',
    pass: 'MMI456HAR',
    name: 'Harshit Vipul Gulati',
    role: 'student',
    roll: '456',
    class: 'Nursery',
    gender: 'Male',
    father: 'Vipul Gulati',
    fatherMob: '9419779999',
    mother: 'Dr.Smridhi Gulati',
    motherMob: '9419399999',
    email: '',
  },
  'aadritigupta': {
    username: 'AadritiGupta',
    pass: 'MMI455AAD',
    name: 'Aadriti Gupta',
    role: 'student',
    roll: '455',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Ankush Gupta',
    fatherMob: '7006055007',
    mother: 'Nidhi Anand',
    motherMob: '9906060897',
    email: 'ankushgupta135@gmail.com',
  },
  'viaanshrampal': {
    username: 'ViaanshRampal',
    pass: 'MMI467VIA',
    name: 'Viaansh Rampal',
    role: 'student',
    roll: '467',
    class: 'Nursery',
    gender: 'Male',
    father: 'Rahul Rampal',
    fatherMob: '9541389457',
    mother: 'Karishma Mani',
    motherMob: '9419144928',
    email: 'rahulrampal.unisa@gmail.com',
  },
  'dharvikkesarwani': {
    username: 'DharvikKesarwani',
    pass: 'MMI480DHA',
    name: 'Dharvik Kesarwani',
    role: 'student',
    roll: '480',
    class: 'Nursery',
    gender: 'male',
    father: 'Amit Arya',
    fatherMob: '8816087110',
    mother: 'Avantika Kesarwani',
    motherMob: '8950600777',
    email: 'amitarya1986@gmail.com',
  },
  'shahnoorfatima': {
    username: 'Shahnoorfatima',
    pass: 'MMI327SHA',
    name: 'Shahnoor fatima',
    role: 'student',
    roll: '327',
    class: 'Kindergarten',
    gender: 'Female',
    father: 'Usman Choudhary',
    fatherMob: '7006222041',
    mother: 'Dr. Ishrat Fatima',
    motherMob: '7889453528',
    email: 'usman2266@gmail.com',
  },
  'viraajhans': {
    username: 'ViraajHans',
    pass: 'MMI399VIR',
    name: 'Viraaj Hans',
    role: 'student',
    roll: '399',
    class: 'Nursery',
    gender: 'Male',
    father: 'Shashi Kumar',
    fatherMob: '8899168340',
    mother: 'Nisha Bharti',
    motherMob: '8899168340',
    email: 'shashi444kumar@gmail.com',
  },
  'hirvijaysingh': {
    username: 'HirvijaySingh',
    pass: 'MMI462HIR',
    name: 'Hirvijay Singh',
    role: 'student',
    roll: '462',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Yushant Singh',
    fatherMob: '',
    mother: 'Dr.Pallvi Thakur',
    motherMob: '8899100567',
    email: '',
  },
  'aviramahajan': {
    username: 'AviraMahajan',
    pass: 'MMI463AVI',
    name: 'Avira Mahajan',
    role: 'student',
    roll: '463',
    class: 'Pre-Nursery',
    gender: 'female',
    father: 'Aviral Mahajan',
    fatherMob: '9205000095',
    mother: 'Hemani Badyal',
    motherMob: '8769602044',
    email: 'adstudiojammu@gmail.com',
  },
  'miraqabrarsheikh': {
    username: 'MiraqAbrarSheikh',
    pass: 'MMI464MIR',
    name: 'Miraq Abrar Sheikh',
    role: 'student',
    roll: '464',
    class: 'Nursery',
    gender: 'male',
    father: 'Abrar Salim',
    fatherMob: '7006082991',
    mother: 'Rakshanda Waheed',
    motherMob: '7889744643',
    email: 'abrar.sheikh2121@gmail.com',
  },
  'deerghajamwal': {
    username: 'DeerghaJamwal',
    pass: 'MMI468DEE',
    name: 'Deergha Jamwal',
    role: 'student',
    roll: '468',
    class: 'Nursery',
    gender: 'Female',
    father: 'Rahul Jamwal',
    fatherMob: '7889624767',
    mother: 'Deeksha Sharma',
    motherMob: '7006783291',
    email: '',
  },
  'siyaangupta': {
    username: 'SiyaanGupta',
    pass: 'MMI471SIY',
    name: 'Siyaan Gupta',
    role: 'student',
    roll: '471',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Madhur Gupta',
    fatherMob: '9796430333',
    mother: 'Saania Gupta',
    motherMob: '9858503033',
    email: 'madhurgupta1919@gmail.com',
  },
  'gianagupta': {
    username: 'GianaGupta',
    pass: 'MMI478GIA',
    name: 'Giana Gupta',
    role: 'student',
    roll: '478',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Shivam Gupta',
    fatherMob: '9596624092',
    mother: 'Shreya Mahajan',
    motherMob: '705159997',
    email: 'shreyshivam0824@gmail.com',
  },
  'maheemmengi': {
    username: 'MaheemMengi',
    pass: 'MMI472MAH',
    name: 'Maheem Mengi',
    role: 'student',
    roll: '472',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Akshat Mengi',
    fatherMob: '9419231724',
    mother: 'Richa Bakshi',
    motherMob: '9419278309',
    email: 'akshatmengi@gmail.com',
  },
  'rudragupta': {
    username: 'RudraGupta',
    pass: 'MMI473RUD',
    name: 'Rudra Gupta',
    role: 'student',
    roll: '473',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Abhay Gupta',
    fatherMob: '9596927723',
    mother: 'Akriti Saini',
    motherMob: '7889972738',
    email: 'abhaynite5@gmail.com',
  },
  'avyannakai': {
    username: 'AvyannaKai',
    pass: 'MMI475AVY',
    name: 'Avyanna Kai',
    role: 'student',
    roll: '475',
    class: 'Nursery',
    gender: 'Female',
    father: 'Rahull deep raj',
    fatherMob: '7006127379',
    mother: 'Reema Thapa',
    motherMob: '7006127256',
    email: 'rahulrai5556@gmail.com',
  },
  'virenpartap': {
    username: 'VirenPartap',
    pass: 'MMI486VIR',
    name: 'Viren Partap',
    role: 'student',
    roll: '486',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Sourabh Gupta',
    fatherMob: '9797513131',
    mother: 'Pooja Vij',
    motherMob: '8825026334',
    email: 'guptasourabh2016@gmail.com',
  },
  'kiaan': {
    username: 'Kiaan',
    pass: 'MMI484KIA',
    name: 'Kiaan',
    role: 'student',
    roll: '484',
    class: 'Kindergarten',
    gender: 'Male',
    father: 'Vikas Kundal',
    fatherMob: '8716000041',
    mother: 'Jayshree Kundal',
    motherMob: '',
    email: 'vikaskun123@gmail.com',
  },
  'abhinnrajvanshchauhan': {
    username: 'AbhinnRajvanshChauhan',
    pass: 'MMI485ABH',
    name: 'Abhinn Rajvansh Chauhan',
    role: 'student',
    roll: '485',
    class: 'Nursery',
    gender: 'male',
    father: 'Attash Chauhan',
    fatherMob: '9419148821',
    mother: 'Avika chauhan',
    motherMob: '8171143322',
    email: 'aatashraj.chauhan@gmail.com',
  },
  'trishaanmahajan': {
    username: 'TrishaanMahajan',
    pass: 'MMI487TRI',
    name: 'Trishaan Mahajan',
    role: 'student',
    roll: '487',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Abhimanyu Mahajan',
    fatherMob: '9419155000',
    mother: 'Ayushi Mahajan',
    motherMob: '9797205500',
    email: 'abhimahajan5555@gmail.com',
  },
  'viaanmahajan': {
    username: 'ViaanMahajan',
    pass: 'MMI488VIA',
    name: 'Viaan Mahajan',
    role: 'student',
    roll: '488',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Ankit Mahajan',
    fatherMob: '9560073579',
    mother: 'Pallavi Mahajan',
    motherMob: '8716025456',
    email: 'ankitmahajan11292@gmail.com',
  },
  'anaishamagotra': {
    username: 'AnaishaMagotra',
    pass: 'MMI490ANA',
    name: 'Anaisha Magotra',
    role: 'student',
    roll: '490',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Ankur Magotra',
    fatherMob: '9419147562',
    mother: 'Prachi Magotra',
    motherMob: '7889945981',
    email: 'magotra.ankur@gmail.com',
  },
  'shanayapuri': {
    username: 'ShanayaPuri',
    pass: 'MMI492SHA',
    name: 'Shanaya Puri',
    role: 'student',
    roll: '492',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Gourav Puri',
    fatherMob: '7006171300',
    mother: 'Shifali Gupta',
    motherMob: '6006068133',
    email: '',
  },
  'aviyaansharma': {
    username: 'AviyaanSharma',
    pass: 'MMI491AVI',
    name: 'Aviyaan Sharma',
    role: 'student',
    roll: '491',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Sachit Sharma',
    fatherMob: '9419106378',
    mother: 'Anupama Sharma',
    motherMob: '9419106378',
    email: 'anupamasharma.vph@gmail.com',
  },
  'muhmmadshehriyarkichloo': {
    username: 'MuhmmadShehriyarKichloo',
    pass: 'MMI493MUH',
    name: 'Muhmmad Shehriyar Kichloo',
    role: 'student',
    roll: '493',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Shehriyar Naseer Kichloo',
    fatherMob: '8082031234',
    mother: 'Afshan Hamal',
    motherMob: '8492937360',
    email: 'shehriyar.n,k@gmail.com',
  },
  'maahikasharma': {
    username: 'MaahikaSharma',
    pass: 'MMI495MAA',
    name: 'Maahika Sharma',
    role: 'student',
    roll: '495',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Sourav Sharma',
    fatherMob: '8717000025',
    mother: 'Megha Khajuria',
    motherMob: '9858778089',
    email: 'charliesharma74758@gmail.com',
  },
  'shaaravkhajuria': {
    username: 'ShaaravKhajuria',
    pass: 'MMI498SHA',
    name: 'Shaarav Khajuria',
    role: 'student',
    roll: '498',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Mannu Khajuria',
    fatherMob: '9419210008',
    mother: 'Asheema Khajuria',
    motherMob: '8825097540',
    email: 'mannukhajuriaa@gmail.com',
  },
  'arayamahajan': {
    username: 'ArayaMahajan',
    pass: 'MMI496ARA',
    name: 'Araya Mahajan',
    role: 'student',
    roll: '496',
    class: 'Playgroup',
    gender: 'female',
    father: 'Arjun Mahajan',
    fatherMob: '9419245264',
    mother: 'Tania Mahajan',
    motherMob: '9419284546',
    email: 'arjun4dic@gmail.com',
  },
  'lakshkhajuria': {
    username: 'LakshKhajuria',
    pass: 'MMI494LAK',
    name: 'Laksh Khajuria',
    role: 'student',
    roll: '494',
    class: 'Playgroup',
    gender: 'male',
    father: 'Dr. Amit Khajuria',
    fatherMob: '8713080808',
    mother: 'Dr. Surbhi Kudyar',
    motherMob: '9419209022',
    email: 'amitkhajuria71@gmail.com',
  },
  'kianshslathia': {
    username: 'KianshSlathia',
    pass: 'MMI497KIA',
    name: 'Kiansh Slathia',
    role: 'student',
    roll: '497',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Hitesh Slathia',
    fatherMob: '9541638748',
    mother: 'Ambika Sambyal',
    motherMob: '7780865533',
    email: 'hiteshslathia23@gmail.com',
  },
  'sahaanamahajan': {
    username: 'SahaanaMahajan',
    pass: 'MMI504SAH',
    name: 'Sahaana Mahajan',
    role: 'student',
    roll: '504',
    class: 'Playgroup',
    gender: 'Female',
    father: 'Ankit Mahajan',
    fatherMob: '9796645804',
    mother: 'Himani Mahajan',
    motherMob: '7889415321',
    email: 'ankitmahajan024@gmail.com',
  },
  'vaayupuri': {
    username: 'VaayuPuri',
    pass: 'MMI507VAA',
    name: 'Vaayu Puri',
    role: 'student',
    roll: '507',
    class: 'Playgroup',
    gender: 'male',
    father: 'Aditya Puri',
    fatherMob: '8825042625',
    mother: 'Himika Puri',
    motherMob: '9797514777',
    email: 'adityapuri007@gmail.com',
  },
  'avirajgupta': {
    username: 'AvirajGupta',
    pass: 'MMI502AVI',
    name: 'Aviraj Gupta',
    role: 'student',
    roll: '502',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Ankush Gupta',
    fatherMob: '9906143229',
    mother: 'Bhavna Gupta',
    motherMob: '7006736563',
    email: 'guptamahajan@gmail.com',
  },
  'inaayagupta': {
    username: 'InaayaGupta',
    pass: 'MMI499INA',
    name: 'Inaaya Gupta',
    role: 'student',
    roll: '499',
    class: 'Pre-Nursery',
    gender: 'female',
    father: 'Vineet Gupta',
    fatherMob: '9205000000',
    mother: 'Shruti Gupta',
    motherMob: '7889667293',
    email: 'spaceera@gmail.com',
  },
  'kaashvigupta': {
    username: 'KaashviGupta',
    pass: 'MMI503KAA',
    name: 'Kaashvi Gupta',
    role: 'student',
    roll: '503',
    class: 'Playgroup',
    gender: 'female',
    father: 'Rahul Gupta',
    fatherMob: '9796085940',
    mother: 'Sunidhi Mahajan',
    motherMob: '7780995676',
    email: 'rahul7724@gmail.com',
  },
  'adhirajsinghmanhas': {
    username: 'AdhirajSinghManhas',
    pass: 'MMI500ADH',
    name: 'Adhiraj Singh Manhas',
    role: 'student',
    roll: '500',
    class: 'Playgroup',
    gender: 'male',
    father: 'Raghvendra Pratap Singh',
    fatherMob: '8899995471',
    mother: 'Manmeen Kaur',
    motherMob: '9711349755',
    email: 'raghvendra3333@gmail.com',
  },
  'ayraamahajan': {
    username: 'AyraaMahajan',
    pass: 'MMI501AYR',
    name: 'Ayraa Mahajan',
    role: 'student',
    roll: '501',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Sourabh Mahajan',
    fatherMob: '9419213737',
    mother: 'Bhawna Sharma',
    motherMob: '9419240383',
    email: 'sourabhj89@gmail.com',
  },
  'shreyanshrajput': {
    username: 'ShreyanshRajput',
    pass: 'MMI506SHR',
    name: 'Shreyansh Rajput',
    role: 'student',
    roll: '506',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Swarn Singh',
    fatherMob: '9797536121',
    mother: 'Manju Bala',
    motherMob: '7006718805',
    email: 'swarnsingh8646@gmail.com',
  },
  'kaveermallick': {
    username: 'KaveerMallick',
    pass: 'MMI510KAV',
    name: 'Kaveer Mallick',
    role: 'student',
    roll: '510',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Gaurav Mallick',
    fatherMob: '9810196580',
    mother: 'Nishca Mallick',
    motherMob: '9899766011',
    email: 'gauravmallick84@gmail.com',
  },
  'ashveenkaur': {
    username: 'AshveenKaur',
    pass: 'MMI505ASH',
    name: 'Ashveen Kaur',
    role: 'student',
    roll: '505',
    class: 'Nursery',
    gender: 'Female',
    father: 'Jatan Jeet Singh Reen',
    fatherMob: '7889881995',
    mother: 'Ramanpreet Kour Raina',
    motherMob: '6005713016',
    email: 'jatan.reen@gmail.com',
  },
  'nitarakapahi': {
    username: 'NitaraKapahi',
    pass: 'MMI508NIT',
    name: 'Nitara Kapahi',
    role: 'student',
    roll: '508',
    class: 'Playgroup',
    gender: 'Female',
    father: 'Nikhil Kapahi',
    fatherMob: '979719999',
    mother: 'Nitika Mehta',
    motherMob: '',
    email: 'nitikamehta22@gmail.com',
  },
  'aahiraguptabatta': {
    username: 'AahiraGuptaBatta',
    pass: 'MMI509AAH',
    name: 'Aahira Gupta Batta',
    role: 'student',
    roll: '509',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Sahil Batta',
    fatherMob: '',
    mother: 'Surbhi Gupta',
    motherMob: '9103037514',
    email: 'batta.sahil@gmail.com',
  },
  'khyatichoudhary': {
    username: 'KhyatiChoudhary',
    pass: 'MMIKHY',
    name: 'Khyati Choudhary',
    role: 'student',
    roll: '',
    class: 'Pre-Nursery',
    gender: 'female',
    father: 'Nikhil Choudhary',
    fatherMob: '8803233858',
    mother: 'Smiley Gupta',
    motherMob: '7780929070',
    email: 'advocatenikhilchoudhary@gmail.com',
  },
  'ajoonikaur': {
    username: 'AjooniKaur',
    pass: 'MMI511AJO',
    name: 'Ajooni Kaur',
    role: 'student',
    roll: '511',
    class: 'Playgroup',
    gender: 'female',
    father: 'Dr.Paramvir singh',
    fatherMob: '9872150677',
    mother: 'Dr Gurleen Kaur',
    motherMob: '9796444683',
    email: 'dr.paramvir18.ps@gmail.com',
  },
  'aadyasinghchib': {
    username: 'AadyaSinghChib',
    pass: 'MMI525AAD',
    name: 'Aadya Singh Chib',
    role: 'student',
    roll: '525',
    class: 'Playgroup',
    gender: 'female',
    father: 'Kunal Chib',
    fatherMob: '7006323727',
    mother: 'Kaife Slathia Chib',
    motherMob: '9906072020',
    email: 'chibkaife@gmail.com',
  },
  'shahzaenqurashi': {
    username: 'ShahzaenQurashi',
    pass: 'MMI512SHA',
    name: 'Shahzaen Qurashi',
    role: 'student',
    roll: '512',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Mayir Abdullah Qurashi',
    fatherMob: '9116939143',
    mother: 'Farha Nishal',
    motherMob: '9672515585',
    email: '',
  },
  'zuhaibmushtaqmahir': {
    username: 'ZuhaibMushtaqMahir',
    pass: 'MMI513ZUH',
    name: 'Zuhaib Mushtaq Mahir',
    role: 'student',
    roll: '513',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Mushtaq Ahmed',
    fatherMob: '9599143158',
    mother: 'Mubeen Rashid',
    motherMob: '7006286345',
    email: 'ahmedmahir1398@gmail.com',
  },
  'savreenkhorana': {
    username: 'SavreenKhorana',
    pass: 'MMI514SAV',
    name: 'Savreen Khorana',
    role: 'student',
    roll: '514',
    class: 'Toddlers',
    gender: 'Female',
    father: 'Jyotveer Singh Khorana',
    fatherMob: '9596771111',
    mother: 'Karishma Khorana',
    motherMob: '9873957363',
    email: 'jyotveerkhorana@gmail.com',
  },
  'rubaniyatkour': {
    username: 'RubaniyatKour',
    pass: 'MMI521RUB',
    name: 'Rubaniyat Kour',
    role: 'student',
    roll: '521',
    class: 'Playgroup',
    gender: 'Female',
    father: '',
    fatherMob: '',
    mother: 'Dr. Gurpreet Kour',
    motherMob: '7006287502',
    email: '',
  },
  'rudranshisingh': {
    username: 'RudranshiSingh',
    pass: 'MMI519RUD',
    name: 'Rudranshi Singh',
    role: 'student',
    roll: '519',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Nitin Kumar',
    fatherMob: '9018051010',
    mother: 'Chhoti Kumari',
    motherMob: '6006332344',
    email: 'nitin.kumar493@gmail.com',
  },
  'avirajgupta526': {
    username: 'AvirajGupta526',
    pass: 'MMI526AVI',
    name: 'Aviraj Gupta',
    role: 'student',
    roll: '526',
    class: 'Playgroup',
    gender: 'male',
    father: 'Anubhav Ghupta',
    fatherMob: '9205011111',
    mother: 'Shagun Gupta',
    motherMob: '8082951360',
    email: '',
  },
  'nairagupta': {
    username: 'NairaGupta',
    pass: 'MMI523NAI',
    name: 'Naira Gupta',
    role: 'student',
    roll: '523',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Naman Gupta',
    fatherMob: '9149730189',
    mother: 'Akashika Aggarwal',
    motherMob: '7780806497',
    email: 'namangupta19916@gmail.com',
  },
  'adhyayadhav': {
    username: 'AdhyaYadhav',
    pass: 'MMI515ADH',
    name: 'Adhya Yadhav',
    role: 'student',
    roll: '515',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Devansh Yadav',
    fatherMob: '9650924327',
    mother: 'Sunaina Sharma',
    motherMob: '9086296322',
    email: 'devanshyadav007@gmail.com',
  },
  'aveersingharora': {
    username: 'AveerSinghArora',
    pass: 'MMI516AVE',
    name: 'Aveer Singh Arora',
    role: 'student',
    roll: '516',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Akshat Arora',
    fatherMob: '9796667777',
    mother: 'Shivangi Choudhary',
    motherMob: '8713005555',
    email: 'akshat.arora19@gmail.com',
  },
  'samasanchitbatta': {
    username: 'SamaSanchitBatta',
    pass: 'MMISAM',
    name: 'Sama Sanchit Batta',
    role: 'student',
    roll: '',
    class: 'Playgroup',
    gender: 'Female',
    father: 'Sanchit Batta',
    fatherMob: '9419197792',
    mother: 'Manasvi v gupta',
    motherMob: '9419141554',
    email: 'sanchitbatta87@gmail.com',
  },
  'tejassharma': {
    username: 'TejasSharma',
    pass: 'MMI517TEJ',
    name: 'Tejas Sharma',
    role: 'student',
    roll: '517',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Rahul Sharma',
    fatherMob: '9596661555',
    mother: 'Priyanka Sharma',
    motherMob: '9419109913',
    email: 'rahul.aries21@gmail.com',
  },
  'ridhavgupta': {
    username: 'RidhavGupta',
    pass: 'MMI527RID',
    name: 'Ridhav Gupta',
    role: 'student',
    roll: '527',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Raghav Gupta',
    fatherMob: '8800030300',
    mother: 'Urvashi Gupta',
    motherMob: '9796220727',
    email: 'raghav_gupta05@yahoo.com',
  },
  'kriyanshgupta': {
    username: 'KriyanshGupta',
    pass: 'MMI518KRI',
    name: 'Kriyansh Gupta',
    role: 'student',
    roll: '518',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'Vikrant Gupta',
    fatherMob: '9797836027',
    mother: 'Pooja Saini',
    motherMob: '9086025776',
    email: 'vikrantgupta41797@gmail.com',
  },
  'devishakundan': {
    username: 'DevishaKundan',
    pass: 'MMI520DEV',
    name: 'Devisha Kundan',
    role: 'student',
    roll: '520',
    class: 'Playgroup',
    gender: 'Female',
    father: 'Neeraj Kundan',
    fatherMob: '7006282974',
    mother: 'Barkha',
    motherMob: '9682153546',
    email: 'neerajkundaninc@gmail.com',
  },
  'gunvirsingh': {
    username: 'GunvirSingh',
    pass: 'MMI529GUN',
    name: 'Gunvir Singh',
    role: 'student',
    roll: '529',
    class: 'Playgroup',
    gender: 'male',
    father: 'Amandeep Singh',
    fatherMob: '7308200001',
    mother: 'Ganganpreet kaur',
    motherMob: '7837619608',
    email: 'aman.tiet@gmail.com',
  },
  'gourangigupta': {
    username: 'GourangiGupta',
    pass: 'MMI530GOU',
    name: 'Gourangi Gupta',
    role: 'student',
    roll: '530',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Mukul Gupta',
    fatherMob: '7006701144',
    mother: 'Anayana Gupta',
    motherMob: '9070090659',
    email: 'mukul.manifested@gmail.com',
  },
  'kiaaragupta': {
    username: 'KiaaraGupta',
    pass: 'MMI524KIA',
    name: 'Kiaara Gupta',
    role: 'student',
    roll: '524',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Rohit Gupta',
    fatherMob: '9797929292',
    mother: 'Shivani Gupta',
    motherMob: '9797029292',
    email: 'rohitlegno@gmail.com',
  },
  'viaanvinod': {
    username: 'ViaanVinod',
    pass: 'MMI522VIA',
    name: 'Viaan Vinod',
    role: 'student',
    roll: '522',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Vinod Kumar',
    fatherMob: '9419122956',
    mother: 'Dr. Shaveta',
    motherMob: '6005849327',
    email: 'vinodlalotra50@gmail.com',
  },
  'nitaragupta': {
    username: 'NitaraGupta',
    pass: 'MMI543NIT',
    name: 'Nitara Gupta',
    role: 'student',
    roll: '543',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Abhimanyu Gupta',
    fatherMob: '9906089889',
    mother: 'Ridhima Sharma',
    motherMob: '9796068774',
    email: 'abhimanyugupta07@gmail.com',
  },
  'ritanyamahajan': {
    username: 'RitanyaMahajan',
    pass: 'MMI538RIT',
    name: 'Ritanya Mahajan',
    role: 'student',
    roll: '538',
    class: 'Playgroup',
    gender: 'Female',
    father: 'Sanyam Kalsotra',
    fatherMob: '7006271237',
    mother: 'Ridhima',
    motherMob: '7889841042',
    email: 'sanyam.mech@hotmail.com',
  },
  'atharvjain': {
    username: 'AtharvJain',
    pass: 'MMI537ATH',
    name: 'Atharv Jain',
    role: 'student',
    roll: '537',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Naman Jain',
    fatherMob: '9086077727',
    mother: 'Ridhima Jain',
    motherMob: '9467707336',
    email: '',
  },
  'jasrajsingh': {
    username: 'JasrajSingh',
    pass: 'MMI528JAS',
    name: 'Jasraj Singh',
    role: 'student',
    roll: '528',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Kanwarpreet Singh',
    fatherMob: '8826461469',
    mother: 'Gurpreet Kaur',
    motherMob: '7340732713',
    email: 'kanwar1469@gmail.com',
  },
  'cyragupta': {
    username: 'CyraGupta',
    pass: 'MMI541CYR',
    name: 'Cyra Gupta',
    role: 'student',
    roll: '541',
    class: 'Nursery',
    gender: 'Female',
    father: 'Nitan Gupta',
    fatherMob: '8803600001',
    mother: 'Aditi Vaid',
    motherMob: '7006146110',
    email: 'aditigupta666@gmail.com',
  },
  'vidharthyograina': {
    username: 'VidharthYogRaina',
    pass: 'MMI531VID',
    name: 'Vidharth Yog Raina',
    role: 'student',
    roll: '531',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Gaurav Sharma',
    fatherMob: '9103697447',
    mother: 'Nishtha Nayyar',
    motherMob: '7780858505',
    email: 'gvraina@gmail.com',
  },
  'sagarikachalotra': {
    username: 'SagarikaChalotra',
    pass: 'MMI532SAG',
    name: 'Sagarika Chalotra',
    role: 'student',
    roll: '532',
    class: 'Playgroup',
    gender: 'Female',
    father: 'Parvesh Kumar Chalotra',
    fatherMob: '9419188300',
    mother: 'Bhawana Badyal',
    motherMob: '9419109384',
    email: 'dr.parvesh9@gmail.com',
  },
  'ridahtahir': {
    username: 'RidahTahir',
    pass: 'MMI533RID',
    name: 'Ridah Tahir',
    role: 'student',
    roll: '533',
    class: 'Playgroup',
    gender: 'Female',
    father: 'Tahir Naveed',
    fatherMob: '7006334203',
    mother: 'Tahniyat noon',
    motherMob: '9797461185',
    email: '',
  },
  'aarivabrol': {
    username: 'AarivAbrol',
    pass: 'MMI545AAR',
    name: 'Aariv Abrol',
    role: 'student',
    roll: '545',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Abhinav Abrol',
    fatherMob: '9419193888',
    mother: 'Rupali Abrol',
    motherMob: '9796423311',
    email: 'abhinav.abrol87@gmail.com',
  },
  'rahakhajuria': {
    username: 'RahaKhajuria',
    pass: 'MMIRAH',
    name: 'Raha Khajuria',
    role: 'student',
    roll: '',
    class: 'Pre-Nursery',
    gender: 'Female',
    father: 'Sourav Khajuria',
    fatherMob: '9622022266',
    mother: 'Himani Pangotra',
    motherMob: '8492000500',
    email: 'souravkhajuria61@gmail.com',
  },
  'taroobrumaan': {
    username: 'TaroobRumaan',
    pass: 'MMI534TAR',
    name: 'Taroob Rumaan',
    role: 'student',
    roll: '534',
    class: 'Nursery',
    gender: 'Female',
    father: 'Dr. Moin Ajaz Banday',
    fatherMob: '9419227612',
    mother: 'Dr. Snover Choudhary',
    motherMob: '7006277491',
    email: 'moinajaz@gmail.com',
  },
  'mohd.ibsambanday': {
    username: 'Mohd.IbsamBanday',
    pass: 'MMI535MOH',
    name: 'Mohd. Ibsam Banday',
    role: 'student',
    roll: '535',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Dr. Moin Ajaz Banday',
    fatherMob: '9419227612',
    mother: 'Dr. Snover Choudhary',
    motherMob: '7006277491',
    email: 'moinajaz@gmail.com',
  },
  'aymansyed': {
    username: 'AymanSyed',
    pass: 'MMI536AYM',
    name: 'Ayman Syed',
    role: 'student',
    roll: '536',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Abdullah Syed',
    fatherMob: '61425292836',
    mother: 'Ayesha Niaz',
    motherMob: '6005981374',
    email: 'syed.abdullah88@gmail.com',
  },
  'aliomar': {
    username: 'AliOmar',
    pass: 'MMI540ALI',
    name: 'Ali Omar',
    role: 'student',
    roll: '540',
    class: 'Nursery',
    gender: 'Male',
    father: '',
    fatherMob: '',
    mother: 'Farkhanda Waheed',
    motherMob: '7889901163',
    email: '',
  },
  'sehajpreetsingh': {
    username: 'SehajpreetSingh',
    pass: 'MMI544SEH',
    name: 'Sehajpreet Singh',
    role: 'student',
    roll: '544',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Amandeep Singh',
    fatherMob: '9858020106',
    mother: 'Manpreet Kour',
    motherMob: '9149925543',
    email: 'manpreetkourbali@gmail.com',
  },
  'saad': {
    username: 'Saad',
    pass: 'MMISAA',
    name: 'Saad',
    role: 'student',
    roll: '',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Talat Mehmood',
    fatherMob: '7889019537',
    mother: 'shehaz  anjum',
    motherMob: '9149505250',
    email: '',
  },
  'neevanantabrol': {
    username: 'NeevAnantAbrol',
    pass: 'MMI474NEE',
    name: 'Neev Anant Abrol',
    role: 'student',
    roll: '474',
    class: 'Pre-Nursery',
    gender: 'male',
    father: 'rohit Abrol',
    fatherMob: '9419155351',
    mother: 'palak Gupta',
    motherMob: '9419151942',
    email: '',
  },
  'shriyaanmahajan': {
    username: 'ShriyaanMahajan',
    pass: 'MMI542SHR',
    name: 'Shriyaan  Mahajan',
    role: 'student',
    roll: '542',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Prikshit  Gupta',
    fatherMob: '9419782409',
    mother: 'sakshi mahajann',
    motherMob: '9018535553',
    email: '',
  },
  'avyahluthra': {
    username: 'AvyahLuthra',
    pass: 'MMI453AVY',
    name: 'Avyah Luthra',
    role: 'student',
    roll: '453',
    class: 'Pre-Nursery',
    gender: 'female',
    father: 'Aman Gupta',
    fatherMob: '9419105000',
    mother: 'Avni Luthra',
    motherMob: '9103005000',
    email: '',
  },
  'avyanluthra': {
    username: 'Avyanluthra',
    pass: 'MMI465AVY',
    name: 'Avyan luthra',
    role: 'student',
    roll: '465',
    class: 'Pre-Nursery',
    gender: 'Male',
    father: 'Akshay',
    fatherMob: '7889632857',
    mother: 'Aastha Kakkar',
    motherMob: '9419104969',
    email: '',
  },
  'riyanshsingh': {
    username: 'RiyanshSingh',
    pass: 'MMI546RIY',
    name: 'Riyansh  Singh',
    role: 'student',
    roll: '546',
    class: 'Playgroup',
    gender: 'Male',
    father: 'Rabinder Singh',
    fatherMob: '9469122222',
    mother: 'Parvinder kour',
    motherMob: '9796085832',
    email: '',
  },
};


/* ─────────────────────────────────────────
   MOBILE NAV TOGGLE
───────────────────────────────────────── */
const navToggle  = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
  });
  primaryNav.querySelectorAll('a:not(.has-sub > a)').forEach(l =>
    l.addEventListener('click', () => primaryNav.classList.remove('open'))
  );
}

/* ─────────────────────────────────────────
   STICKY HEADER on scroll
───────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const h = document.getElementById('siteHeader');
  if (h) h.style.boxShadow = window.scrollY > 10
    ? '0 3px 14px rgba(0,0,0,0.12)'
    : '0 1px 6px rgba(0,0,0,0.07)';
});

/* ─────────────────────────────────────────
   GENERIC SLIDER (hero + login page)
───────────────────────────────────────── */
function initSlider(containerId, prevId, nextId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const slides = container.querySelectorAll('.hero-slide');
  const lines  = container.querySelectorAll('.slide-line');
  if (!slides.length) return;
  let cur = 0, timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    lines[cur] && lines[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    lines[cur] && lines[cur].classList.add('active');
  }
  function startAuto() { timer = setInterval(() => goTo(cur + 1), 4500); }
  function resetAuto()  { clearInterval(timer); startAuto(); }

  const p = document.getElementById(prevId);
  const n = document.getElementById(nextId);
  if (p) p.addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
  if (n) n.addEventListener('click', () => { goTo(cur + 1); resetAuto(); });
  lines.forEach(l => l.addEventListener('click', () => { goTo(parseInt(l.dataset.index)); resetAuto(); }));
  startAuto();
}

initSlider('heroSlider',  'heroPrev',   'heroNext');
initSlider('loginSlider', 'loginPrev',  'loginNext');

/* ─────────────────────────────────────────
   TESTIMONIALS SLIDER
───────────────────────────────────────── */
(function initTestiSlider() {
  const slides = document.querySelectorAll('.testi-slide');
  const dots   = document.querySelectorAll('.testi-dot');
  if (!slides.length) return;
  let cur = 0, timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    dots[cur] && dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur] && dots[cur].classList.add('active');
  }
  function startAuto() { timer = setInterval(() => goTo(cur + 1), 5500); }
  function resetAuto() { clearInterval(timer); startAuto(); }

  document.getElementById('testiPrev') && document.getElementById('testiPrev').addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
  document.getElementById('testiNext') && document.getElementById('testiNext').addEventListener('click', () => { goTo(cur + 1); resetAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { goTo(parseInt(d.dataset.index)); resetAuto(); }));

  startAuto();
})();

/* ─────────────────────────────────────────
   ADMISSION POPUP
───────────────────────────────────────── */
function openPopup() {
  const p = document.getElementById('admissionPopup');
  if (p) p.classList.add('open');
}
function closePopup() {
  const p = document.getElementById('admissionPopup');
  if (p) p.classList.remove('open');
}

['admissionBtn','admissionStripBtn','stickyAdmission','ttEnrolBtn'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', e => { e.preventDefault(); openPopup(); });
});
const popupClose = document.getElementById('popupClose');
if (popupClose) popupClose.addEventListener('click', closePopup);
const admPop = document.getElementById('admissionPopup');
if (admPop) admPop.addEventListener('click', e => { if (e.target === admPop) closePopup(); });

function handleEnquiry(e) {
  e.preventDefault();
  closePopup();
  showToast('Thank you! We will contact you shortly.', 'green');
  e.target.reset();
}

/* ─────────────────────────────────────────
   LOGIN PAGE TABS
───────────────────────────────────────── */
function switchLoginTab(name, btn) {
  document.querySelectorAll('.login-tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
  const pane = document.getElementById('ltab-' + name);
  if (pane) pane.classList.add('active');
  if (btn)  btn.classList.add('active');
}

/* ─────────────────────────────────────────
   LOGIN FORM
───────────────────────────────────────── */
function doLogin(e, role) {
  e.preventDefault();
  const userEl = document.getElementById('st-user');
  const passEl = document.getElementById('st-pass');

  if (role === 'student' && userEl && passEl) {
    const u = userEl.value.trim();
    const p = passEl.value.trim();

    if (!u || !p) {
      showToast('Please enter your username and password.', 'red');
      return;
    }

    const dbKey     = u.replace(/\s+/g, '').toLowerCase();
    const account   = STUDENT_DB[dbKey];
    const customPw  = localStorage.getItem('mmi_pw_' + dbKey);
    const validPass = customPw || (account ? account.pass : '');
    if (account && p === validPass && account.role === 'student') {
      localStorage.setItem('mmi_user',       u);
      localStorage.setItem('mmi_name',       account.name);
      localStorage.setItem('mmi_roll',       account.roll);
      localStorage.setItem('mmi_class',      account.class);
      localStorage.setItem('mmi_gender',     account.gender   || '');
      localStorage.setItem('mmi_father',     account.father   || '');
      localStorage.setItem('mmi_fatherMob',  account.fatherMob|| '');
      localStorage.setItem('mmi_mother',     account.mother   || '');
      localStorage.setItem('mmi_motherMob',  account.motherMob|| '');
      localStorage.setItem('mmi_email',      account.email    || '');
      showToast('Login successful! Loading your portal…', 'green');
      setTimeout(() => window.location.href = 'dashboard.html', 1200);
    } else {
      showToast('Incorrect username or password.', 'red');
    }
  } else {
    // Parent / Staff — placeholder redirect
    showToast('Login successful! Redirecting…', 'green');
    setTimeout(() => window.location.href = 'dashboard.html', 1200);
  }
}

/* ─────────────────────────────────────────
   PASSWORD TOGGLE
───────────────────────────────────────── */
function togglePw(inputId, iconId) {
  const inp  = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  if (icon) icon.className = inp.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash';
}

/* ─────────────────────────────────────────
   DASHBOARD NAV
───────────────────────────────────────── */
const SECTION_TITLES = {
  home: 'Dashboard', profile: 'My Profile', calendar: 'Monthly Calendar'
};

function switchCalTab(month, btn) {
  document.querySelectorAll('.cal-doc-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.cal-doc-tab').forEach(b => b.classList.remove('active'));
  const pane = document.getElementById('caldoc-' + month);
  if (pane) pane.classList.add('active');
  if (btn)  btn.classList.add('active');
}

function gotoSection(name, linkEl) {
  document.querySelectorAll('.dsec').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.dsb-link').forEach(l => l.classList.remove('active'));

  const sec = document.getElementById('sec-' + name);
  if (sec) sec.classList.add('active');
  if (linkEl) linkEl.classList.add('active');

  const crumb = document.getElementById('dtbCrumb');
  if (crumb) crumb.textContent = SECTION_TITLES[name] || 'Dashboard';

  // Close sidebar on mobile
  if (window.innerWidth <= 900) closeDsbSidebar();

  return false;
}

/* ─────────────────────────────────────────
   DASHBOARD SIDEBAR (mobile)
───────────────────────────────────────── */
const dsbSidebar = document.getElementById('dashSidebar');
const dsbOverlay = document.getElementById('dsbOverlay');
const dsbToggle  = document.getElementById('dsbToggle');
const dsbClose   = document.getElementById('dsbClose');

function openDsbSidebar()  { dsbSidebar && dsbSidebar.classList.add('open'); dsbOverlay && dsbOverlay.classList.add('on'); }
function closeDsbSidebar() { dsbSidebar && dsbSidebar.classList.remove('open'); dsbOverlay && dsbOverlay.classList.remove('on'); }
if (dsbToggle)  dsbToggle.addEventListener('click', openDsbSidebar);
if (dsbClose)   dsbClose.addEventListener('click', closeDsbSidebar);
if (dsbOverlay) dsbOverlay.addEventListener('click', closeDsbSidebar);

/* ─────────────────────────────────────────
   STUDENT PHOTO CAROUSEL
───────────────────────────────────────── */
let scIdx = 0;
let scTotal = 0;

function initCarousel() {
  const track = document.getElementById('scTrack');
  if (!track) return;
  const slides = track.querySelectorAll('.sc-slide');
  scTotal = slides.length;
  if (scTotal < 2) return;

  // Build dots — one dot per image (1 shown at a time)
  const dotsWrap = document.getElementById('scDots');
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    const positions = scTotal;
    for (let i = 0; i < positions; i++) {
      const d = document.createElement('button');
      d.className = 'sc-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', () => scGoTo(i));
      dotsWrap.appendChild(d);
    }
  }
  scRender(false);
}

function scMove(dir) {
  const maxIdx = scTotal - 1;
  scIdx = ((scIdx + dir) % (maxIdx + 1) + (maxIdx + 1)) % (maxIdx + 1);
  scRender(true);
}

function scGoTo(i) {
  scIdx = i;
  scRender(true);
}

function scRender(animate) {
  const track = document.getElementById('scTrack');
  if (!track) return;
  const viewport = track.parentElement;
  const slideW = viewport ? viewport.offsetWidth : 0;

  if (!animate) track.style.transition = 'none';
  track.style.transform = 'translateX(-' + (scIdx * slideW) + 'px)';
  if (!animate) {
    requestAnimationFrame(() => { track.style.transition = ''; });
  }

  document.querySelectorAll('.sc-dot').forEach((d, i) => {
    d.classList.toggle('active', i === scIdx);
  });
}

/* ─────────────────────────────────────────
   ATTENDANCE CALENDAR
───────────────────────────────────────── */
let calData     = {};  // 'YYYY-MM-DD' → 'P' or 'A'
let calMonthIdx = 0;   // index into ATTENDANCE_MONTHS

// Normalises any date string to YYYY-MM-DD.
// Handles: "2026-05-01", "5/1/2026", "01/05/2026", "Date(2026,4,1)" (gviz)
function normalizeDate(raw) {
  if (!raw) return '';
  const s = raw.toString().trim().split('T')[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  // gviz format: Date(YYYY,M,D)  where M is 0-based
  const gviz = s.match(/^Date\((\d+),(\d+),(\d+)\)$/);
  if (gviz) {
    const [, y, m, d] = gviz;
    return `${y}-${String(Number(m) + 1).padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  // M/D/YYYY or MM/DD/YYYY
  const slash = s.split('/');
  if (slash.length === 3) {
    const [m, d, y] = slash;
    return `${y.padStart(4, '0')}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return s;
}

function _getAttUrlForClass(m) {
  const cls = (localStorage.getItem('mmi_class') || '').toLowerCase().trim();
  if (cls === 'kindergarten') return m.urlKG;
  if (cls === 'nursery')      return m.urlN;
  return m.urlPN; // Pre-Nursery, Playgroup, Toddlers
}

async function loadAllAttendance() {
  const student = localStorage.getItem('mmi_user');
  if (!student) return;

  // Show the calendar immediately with the correct month (no data yet)
  const now = new Date();
  const idx = ATTENDANCE_MONTHS.findIndex(m => m.year === now.getFullYear() && m.month === now.getMonth());
  calMonthIdx = idx >= 0 ? idx : 0;
  renderCalendar();

  // Fetch all months in parallel, re-render after each one arrives
  await Promise.all(ATTENDANCE_MONTHS.map(async (m) => {
    const url = _getAttUrlForClass(m);
    if (!url) return;
    try {
      const res  = await fetch(url, { cache: 'no-store' });
      const text = await res.text();
      parseCSV(text)
        .filter(r => (r.student || '').toLowerCase().trim() === student.toLowerCase())
        .forEach(r => {
          const date   = normalizeDate(r.date);
          const status = (r.status || '').toString().toUpperCase().trim();
          if (date && (status === 'P' || status === 'A')) calData[date] = status;
        });
      renderCalendar(); // update as each month's data arrives
    } catch (_) {}
  }));
}

function calNav(dir) {
  const next = calMonthIdx + dir;
  if (next < 0 || next >= ATTENDANCE_MONTHS.length) return;
  calMonthIdx = next;
  renderCalendar();
}

function renderCalendar() {
  const m       = ATTENDANCE_MONTHS[calMonthIdx];
  const grid    = document.getElementById('calGrid');
  const titleEl = document.getElementById('calMonthTitle');
  if (!grid || !titleEl) return;

  titleEl.textContent = m.label;

  // Disable nav at edges
  const prevBtn = document.getElementById('calPrev');
  const nextBtn = document.getElementById('calNext');
  if (prevBtn) prevBtn.disabled = calMonthIdx === 0;
  if (nextBtn) nextBtn.disabled = calMonthIdx === ATTENDANCE_MONTHS.length - 1;

  const today        = new Date(); today.setHours(0, 0, 0, 0);
  const daysInMonth  = new Date(m.year, m.month + 1, 0).getDate();
  const firstDow     = new Date(m.year, m.month, 1).getDay(); // 0=Sun
  // Convert to Mon-based offset (Mon=0 … Sun=6)
  const startOffset  = firstDow === 0 ? 6 : firstDow - 1;

  let html = '';
  let present = 0, absent = 0;

  // Empty cells before the 1st
  for (let i = 0; i < startOffset; i++) html += '<div class="cal-cell empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const date    = new Date(m.year, m.month, d);
    const dow     = date.getDay(); // 0=Sun
    const dateStr = `${m.year}-${String(m.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const status  = calData[dateStr];
    let cls = 'cal-cell';

    if (dow === 0) {
      cls += ' no-school';           // Sunday
    } else if (date > today) {
      cls += ' future';              // Not yet
    } else if (status === 'P') {
      cls += ' present'; present++;
    } else if (status === 'A') {
      cls += ' absent';  absent++;
    } else {
      cls += ' no-data';             // Past school day, no record
    }

    // Highlight today
    if (date.getTime() === today.getTime()) cls += ' today';

    const badge = status === 'P' ? '<span class="cal-badge cal-p">P</span>'
                : status === 'A' ? '<span class="cal-badge cal-a">A</span>'
                : '';
    html += `<div class="${cls}"><span class="cal-day-num">${d}</span>${badge}</div>`;
  }

  grid.innerHTML = html;

  // Update stats ring
  const total  = present + absent;
  const numEl  = document.querySelector('.week-pct-num');
  const ring   = document.querySelector('.week-pct-circle circle:last-child');
  const items  = document.querySelectorAll('.was-item');
  const circ   = 238.76;

  if (total > 0) {
    const pct = Math.round((present / total) * 100);
    if (numEl) numEl.textContent = pct + '%';
    if (ring)  ring.setAttribute('stroke-dashoffset', (circ * (1 - pct / 100)).toFixed(1));
  } else {
    if (numEl) numEl.textContent = '–%';
    if (ring)  ring.setAttribute('stroke-dashoffset', circ.toFixed(2));
  }
  if (items[0]) items[0].innerHTML = `<span class="was-dot was-green"></span>${present} Present`;
  if (items[1]) items[1].innerHTML = `<span class="was-dot was-red"></span>${absent} Absent`;
}

/* ─────────────────────────────────────────
   DASHBOARD INIT (date + name)
───────────────────────────────────────── */
function initDashboard() {
  const dateEl = document.getElementById('dtbDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  const name      = localStorage.getItem('mmi_name')      || 'Student';
  const roll      = localStorage.getItem('mmi_roll')      || '';
  const cls       = localStorage.getItem('mmi_class')     || '';
  const gender    = localStorage.getItem('mmi_gender')    || '';
  const father    = localStorage.getItem('mmi_father')    || '';
  const fatherMob = localStorage.getItem('mmi_fatherMob') || '';
  const mother    = localStorage.getItem('mmi_mother')    || '';
  const motherMob = localStorage.getItem('mmi_motherMob') || '';
  const email     = localStorage.getItem('mmi_email')     || '';

  // Sidebar / topbar name
  ['wbName', 'dtb-name', 'sb-fullname'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = name;
  });

  const rollEl = document.getElementById('sb-roll');
  if (rollEl) rollEl.textContent = roll ? 'Roll: ' + roll : '';

  const clsEl = document.getElementById('sb-class');
  if (clsEl) clsEl.textContent = cls;

  // Profile page fields
  function setField(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '–';
  }
  setField('pp-fullname',   name);
  setField('pp-roll',       roll ? 'MMI-' + roll : '–');
  setField('pp-class',      cls);
  setField('pp-gender',     gender);
  setField('pp-father',     father);
  setField('pp-fatherMob',  fatherMob ? '+91-' + fatherMob : '–');
  setField('pp-mother',     mother);
  setField('pp-motherMob',  motherMob ? '+91-' + motherMob : '–');
  setField('pp-email',      email);
  setField('pp-session',    '2026 – 27');

  // ID badge
  const badgeRoll  = document.getElementById('pp-badge-roll');
  const badgeCls   = document.getElementById('pp-badge-class');
  if (badgeRoll) badgeRoll.textContent  = roll ? 'MMI-' + roll : '';
  if (badgeCls)  badgeCls.textContent   = cls;
}

/* ─────────────────────────────────────────
   RESULT TABS
───────────────────────────────────────── */
function selectRT(btn) {
  document.querySelectorAll('.rt').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
function showToast(msg, type = 'green') {
  let t = document.getElementById('mmi-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'mmi-toast';
    Object.assign(t.style, {
      position: 'fixed', bottom: '28px', left: '50%',
      transform: 'translateX(-50%) translateY(16px)',
      padding: '12px 28px', borderRadius: '50px',
      fontSize: '0.88rem', fontWeight: '700',
      color: '#fff', zIndex: '9999', opacity: '0',
      transition: 'all 0.3s ease', fontFamily: 'Open Sans, sans-serif',
      boxShadow: '0 6px 24px rgba(0,0,0,0.2)', pointerEvents: 'none'
    });
    document.body.appendChild(t);
  }
  t.style.background = type === 'green' ? '#126b36' : '#e50001';
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(16px)';
  }, 3200);
}

/* ─────────────────────────────────────────
   SCROLL FADE-IN ANIMATION
───────────────────────────────────────── */
function initFadeIn() {
  const els = document.querySelectorAll(
    '.pillar-card, .facility-card, .centre-card, .testi-card, .event-item, .news-item, .qs-card, .dash-card'
  );
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    io.observe(el);
  });
}

/* ─────────────────────────────────────────
   CSV PARSER
   Parses a raw CSV string into an array of
   objects using the first row as keys.
───────────────────────────────────────── */
function parseCSV(text) {
  const lines = text.trim().split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h, i) => {
    const clean = h.trim().replace(/^"|"$/g, '').toLowerCase();
    // If first column header is blank, treat it as "date"
    return clean || (i === 0 ? 'date' : `col${i}`);
  });
  return lines.slice(1).map(line => {
    const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    const obj  = {};
    headers.forEach((h, i) => { obj[h] = cols[i] || ''; });
    return obj;
  });
}

/* ─────────────────────────────────────────
   DRIVE GALLERY LOADER
   Calls the Apps Script Web App to list all
   images from the Drive folder automatically.
   Upload to the folder → appears on next load.
───────────────────────────────────────── */
async function loadDriveGallery() {
  if (!APPS_SCRIPT_URL) return;
  const track = document.getElementById('scTrack');
  if (!track) return;
  try {
    const cls    = localStorage.getItem('mmi_class') || '';
    const res    = await fetch(`${APPS_SCRIPT_URL}?type=gallery&class=${cls}`);
    const data   = await res.json();
    const images = data.images || [];
    if (!images.length) return;

    track.innerHTML = images.map(img =>
      `<div class="sc-slide"><img src="${img.url}" alt="${img.name}" loading="lazy"/></div>`
    ).join('');

    scIdx = 0;
    initCarousel();
  } catch (_) {
    // Network error — gallery stays empty
  }
}


/* ─────────────────────────────────────────
   NOTIFICATIONS LOADER
   Reads the "Notifications" tab from the same
   Google Sheet. Filters by student class or "all".

   Sheet class keywords:
     all  → every student
     K    → Kindergarten
     N    → Nursery
     P    → Pre-Nursery / Playgroup / Toddlers
───────────────────────────────────────── */

// Map the stored class name → sheet keyword
function classToNotifKey(cls) {
  const c = (cls || '').toLowerCase().trim();
  if (c === 'kindergarten')  return 'k';
  if (c === 'nursery')       return 'n';
  // Pre-Nursery, Playgroup, Toddlers all map to P
  return 'p';
}

async function loadNotifications() {
  const list = document.getElementById('notifList');
  if (!list) return;

  const storedClass  = localStorage.getItem('mmi_class') || '';
  const studentKey   = classToNotifKey(storedClass);   // 'k' | 'n' | 'p'

  try {
    const res  = await fetch(NOTIFICATIONS_CSV_URL);
    const text = await res.text();
    const rows = parseCSV(text);

    // Filter: show rows where class matches student key or is "all"
    const filtered = rows.filter(r => {
      const cls = (r.class || '').toLowerCase().trim();
      return cls === 'all' || cls === studentKey;
    });


    if (!filtered.length) {
      list.innerHTML = '<p style="font-size:0.84rem;color:#aaa;text-align:center;padding:18px 0;">No notifications at this time.</p>';
      return;
    }

    // Sort newest first (by date string — works for DD/MM/YYYY or YYYY-MM-DD)
    filtered.sort((a, b) => {
      const da = new Date(normalizeDate(a.date) || a.date);
      const db = new Date(normalizeDate(b.date) || b.date);
      return db - da;
    });

    list.innerHTML = filtered.map(r => {
      const type    = (r.type || 'general').toLowerCase().trim();
      const message = r.message || r.text || '';
      const date    = r.date || '';

      let itemClass = 'ns-item';
      let tagClass  = 'ns-type';
      let tagLabel  = 'General';

      if (type === 'urgent') {
        itemClass += ' urgent';
        tagClass  += ' urgent-type';
        tagLabel   = 'Urgent';
      } else if (type === 'holiday') {
        tagClass += ' holiday-type';
        tagLabel  = 'Holiday';
      }

      return `
        <div class="${itemClass}">
          <span class="${tagClass}">${tagLabel}</span>
          <p>${message}</p>
          <span class="ns-time">${date}</span>
        </div>`;
    }).join('');

  } catch (err) {
    console.error('Notifications load error:', err);
    list.innerHTML = '<p style="font-size:0.84rem;color:#aaa;text-align:center;padding:18px 0;">Could not load notifications.</p>';
  }
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initFadeIn();
  initGalleryLightbox();
  initCarousel();
  loadDriveGallery();
  loadAllAttendance();
  loadNotifications();
  renderSchoolCalendar('2026-05');
});

window.addEventListener('resize', () => { scRender(false); });

/* ─────────────────────────────────────────
   GALLERY LIGHTBOX
───────────────────────────────────────── */
let lbImages = [];
let lbIndex  = 0;

function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  // Populate lbImages so navigation (prev/next) works when opened via onclick
  lbImages = Array.from(items).map(img => ({ src: img.src, alt: img.alt }));

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightboxBtn();
    if (e.key === 'ArrowLeft')   lbNav(-1);
    if (e.key === 'ArrowRight')  lbNav(1);
  });
}

function openLightbox(index) {
  lbIndex = index;
  const lb    = document.getElementById('lightbox');
  const img   = document.getElementById('lbImg');
  const cap   = document.getElementById('lbCaption');
  if (!lb || !img) return;
  img.src    = lbImages[lbIndex].src;
  img.alt    = lbImages[lbIndex].alt;
  cap.textContent = lbImages[lbIndex].alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target !== document.getElementById('lightbox')) return;
  closeLightboxBtn();
}

function closeLightboxBtn() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNav(dir, e) {
  if (e) e.stopPropagation();
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  if (img) { img.src = lbImages[lbIndex].src; img.alt = lbImages[lbIndex].alt; }
  if (cap) cap.textContent = lbImages[lbIndex].alt || '';
}

/* ─────────────────────────────────────────
   CHANGE PASSWORD MODAL
   Passwords are saved per-user in localStorage
   as  mmi_pw_<username_key>
   doLogin checks this key first before the
   default STUDENT_DB password.
───────────────────────────────────────── */
function openCpwModal() {
  const overlay = document.getElementById('cpwOverlay');
  if (!overlay) return;
  document.getElementById('cpw-current').value  = '';
  document.getElementById('cpw-new').value      = '';
  document.getElementById('cpw-confirm').value  = '';
  document.getElementById('cpwError').textContent = '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCpwModal() {
  const overlay = document.getElementById('cpwOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function submitChangePassword() {
  const currentInput  = document.getElementById('cpw-current');
  const newInput      = document.getElementById('cpw-new');
  const confirmInput  = document.getElementById('cpw-confirm');
  const errorEl       = document.getElementById('cpwError');

  const currentVal = currentInput  ? currentInput.value.trim()  : '';
  const newVal     = newInput      ? newInput.value.trim()      : '';
  const confirmVal = confirmInput  ? confirmInput.value.trim()  : '';

  errorEl.textContent = '';

  const username = localStorage.getItem('mmi_user') || '';
  if (!username) {
    errorEl.textContent = 'Session expired. Please log in again.';
    return;
  }

  const dbKey       = username.replace(/\s+/g, '').toLowerCase();
  const storedKey   = 'mmi_pw_' + dbKey;
  const customPass  = localStorage.getItem(storedKey);
  const defaultPass = STUDENT_DB[dbKey] ? STUDENT_DB[dbKey].pass : '';
  const activePass  = customPass || defaultPass;

  if (!currentVal) {
    errorEl.textContent = 'Please enter your current password.';
    return;
  }
  if (currentVal !== activePass) {
    errorEl.textContent = 'Current password is incorrect.';
    return;
  }
  if (newVal.length < 6) {
    errorEl.textContent = 'New password must be at least 6 characters.';
    return;
  }
  if (newVal !== confirmVal) {
    errorEl.textContent = 'New passwords do not match.';
    return;
  }
  if (newVal === activePass) {
    errorEl.textContent = 'New password must be different from the current one.';
    return;
  }

  localStorage.setItem(storedKey, newVal);
  closeCpwModal();
  showToast('Password updated successfully!', 'green');
}

/* ═══════════════════════════════════════════════════
   SCHOOL CALENDAR
   Data extracted from monthly PDF calendars.
   Each day entry: [type, description]
   Types: holiday | special | activity | montessori |
          karate | writing | craft | rhyme | dance |
          culture | story | outdoor
═══════════════════════════════════════════════════ */
const SCHOOL_CALENDAR = {
  '2026-05': {
    title:  'May 2026',
    grade:  'Playgroup – Azalea',
    theme:  'Our Helping Heroes (Community Helpers)',
    notes: [
      'Kids to dress up as their favourite Community Helper on 15th May 2026.',
      'Children to come in Party dress on 29th May 2026 for the Fun Party.'
    ],
    days: {
      1:  [['holiday','Labor Day'],['holiday','Buddha Purnima Holiday']],
      4:  [['special','Labor Day Celebration'],['activity','Circle time · Theme Board: Community Helper'],['montessori','Transferring Beans (bowl to bowl)'],['rhyme','Rhyme Book: The Mulberry (p.12)'],['dance','Dance time']],
      5:  [['activity','Circle time · Theme Board: Community Helper'],['writing','Pre-writing (p.2–3)'],['craft','Art & Craft: Scribbling'],['karate','Karate Class']],
      6:  [['activity','Circle time · Community Helpers (Policeman)'],['writing','Worksheet: Matching pictures'],['montessori','Transferring Beans (Reinforcement)'],['rhyme','Rhyme Book: The Mulberry (p.12)'],['dance','Dance time']],
      7:  [['activity','Circle time · Things used by Policeman'],['writing','Pre-writing (p.4–5)'],['montessori','Sand Paper tracing (a, b)'],['karate','Karate Class']],
      8:  [['activity','Circle time · Importance of Mom'],['craft','Craft: Mother\'s Day Card'],['outdoor','Craft Outdoor · Play / Slides']],
      9:  [['special','Mother\'s Day Celebration']],
      10: [['special','Mother\'s Day']],
      11: [['activity','Circle time · Community Helpers (Doctor)'],['montessori','Pouring Beans into different containers'],['rhyme','Rhyme Book: Strawberry (p.14)'],['dance','Dance time']],
      12: [['activity','Circle time · Things used by Doctor'],['special','Doctor visits the School'],['rhyme','Rhyme Book: Strawberry (p.14)'],['karate','Karate Class']],
      13: [['activity','Circle time · Community Helpers (Teacher)'],['montessori','Pouring Beans (Reinforcement)'],['writing','Pre-writing Workbook (p.6–7)'],['rhyme','Rhyme Book: Strawberry (p.14)'],['dance','Dance time']],
      14: [['activity','Thematic Activity: Thank You Walk'],['montessori','Knobbed Cylinder I'],['story','Story Time: Be Kind & Say Thank You'],['rhyme','Rhyme Book: Strawberry (p.14)'],['karate','Karate Class']],
      15: [['special','Role Play Day (Dress as a Community Helper)'],['craft','Scribbling'],['rhyme','Rhyme Book: Strawberry (p.14)']],
      18: [['activity','Circle time · Introduction to Summer Season'],['culture','Culture Workbook (p.4–5)'],['montessori','Transferring Pom Pom balls with spoon'],['rhyme','Hindi Rhyme (p.18)'],['dance','Dance time']],
      19: [['activity','Circle time · Summer Fruit Flash Cards'],['culture','Culture Workbook (p.6–7)'],['montessori','Broad Stairs'],['rhyme','Hindi Rhyme (p.18)'],['karate','Karate Class']],
      20: [['activity','Summer Fruit & Flash Cards (Reinforcement)'],['culture','Culture Workbook (p.8–9)'],['rhyme','Hindi Rhyme (p.18)'],['dance','Dance time']],
      21: [['activity','Summer Vegetables Flash Cards'],['writing','Pre-Writing Workbook (p.8–9)'],['culture','Culture Workbook (p.10)'],['rhyme','Hindi Rhyme (p.18)'],['karate','Karate Class']],
      22: [['special','Mango Day Celebration'],['culture','Culture Workbook (p.11–12)'],['craft','Art & Craft: Colouring the Mango'],['rhyme','Hindi Rhyme (p.18)']],
      25: [['activity','Summer Vegetables (Reinforcement)'],['montessori','Sand Paper tracing (Reinforcement)'],['rhyme','Rhyme (p.19)'],['dance','Dance time']],
      26: [['activity','Reinforcement of Fruits & Vegetables'],['writing','Pre-Writing Workbook (p.10–11)'],['rhyme','Rhyme (p.19)'],['karate','Karate Class']],
      27: [['holiday','Eid-ul-Azha Holiday']],
      28: [['holiday','Eid-ul-Azha Holiday']],
      29: [['special','Fun Party'],['special','Eid Celebration (Come in Party Dress)']],
    }
  },
  '2026-06': null   // Coming soon — will be added when calendar is provided
};

/* ─────────────────────────────────────────
   SCHOOL CALENDAR STATE
───────────────────────────────────────── */
let schoolCalMonth   = '2026-05';
let schoolCalDay     = null;

const SC_TAG_LABELS = {
  holiday:    'Holiday',
  special:    'Special',
  activity:   'Activity',
  montessori: 'Montessori',
  karate:     'Karate',
  writing:    'Workbook',
  craft:      'Art & Craft',
  rhyme:      'Rhyme',
  dance:      'Dance',
  culture:    'Culture',
  story:      'Story',
  outdoor:    'Outdoor'
};

/* ─────────────────────────────────────────
   SWITCH MONTH TAB
───────────────────────────────────────── */
function schoolCalShowMonth(key, btn) {
  document.querySelectorAll('.school-cal-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  schoolCalMonth = key;
  schoolCalDay   = null;
  renderSchoolCalendar(key);
}

/* ─────────────────────────────────────────
   RENDER CALENDAR
───────────────────────────────────────── */
function renderSchoolCalendar(key) {
  const container = document.getElementById('schoolCalBody');
  if (!container) return;

  const data = SCHOOL_CALENDAR[key];

  if (!data) {
    container.innerHTML = `
      <div class="school-cal-coming">
        <i class="fa fa-clock fa-2x"></i>
        <p>Calendar for this month will be available soon.</p>
      </div>`;
    return;
  }

  const [year, monthIdx] = key.split('-').map(Number);
  const month       = monthIdx - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow    = new Date(year, month, 1).getDay(); // 0=Sun

  const today = new Date(); today.setHours(0, 0, 0, 0);

  // ── Theme banner
  const banner = `
    <div class="school-cal-banner">
      <div class="scb-left">
        <span class="scb-grade">${data.grade}</span>
        <span class="scb-theme"><i class="fa fa-star"></i> ${data.theme}</span>
      </div>
    </div>`;

  // ── Column headers
  const DOW   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const SUBJ  = ['','Practical Life','Sensorial','Language','Mathematics','Art & Culture',''];
  let headHtml = '<div class="school-grid-head">';
  DOW.forEach((d, i) => {
    headHtml += `<div class="school-grid-hcell">
      <span class="school-dow">${d}</span>
      <span class="school-subj">${SUBJ[i]}</span>
    </div>`;
  });
  headHtml += '</div>';

  // ── Day cells
  let bodyHtml = '<div class="school-grid-body">';
  for (let i = 0; i < firstDow; i++) bodyHtml += '<div class="school-day-cell empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const date      = new Date(year, month, d);
    const dow       = date.getDay();
    const isToday   = date.getTime() === today.getTime();
    const isWeekend = dow === 0 || dow === 6;
    const events    = data.days[d] || [];
    const hasHol    = events.some(e => e[0] === 'holiday');
    const hasSpc    = events.some(e => e[0] === 'special');

    let cls = 'school-day-cell';
    if (isWeekend)              cls += ' school-weekend';
    if (hasHol)                 cls += ' school-hol';
    else if (hasSpc)            cls += ' school-spc';
    if (isToday)                cls += ' school-today';
    if (schoolCalDay === d)     cls += ' school-sel';

    // Unique-type dots (max 5)
    const seen = new Set();
    const dots = events.map(e => {
      if (seen.has(e[0])) return '';
      seen.add(e[0]);
      return `<span class="school-dot school-dot-${e[0]}"></span>`;
    }).join('');

    bodyHtml += `<div class="${cls}" onclick="schoolCalSelectDay(${d},'${key}')">
      <span class="school-day-num">${d}</span>
      <div class="school-dots-row">${dots}</div>
    </div>`;
  }
  bodyHtml += '</div>';

  // ── Detail panel
  const detail = `<div class="school-detail" id="schoolCalDetail">
    <p class="school-detail-hint"><i class="fa fa-hand-pointer"></i> Tap a date to see the day's activities</p>
  </div>`;

  // ── Notes
  const notesHtml = (data.notes && data.notes.length) ? `
    <div class="school-notes">
      <p class="school-notes-title"><i class="fa fa-info-circle"></i> Important Notes</p>
      <ul>${data.notes.map(n => `<li>${n}</li>`).join('')}</ul>
    </div>` : '';

  // ── Legend
  const legendTypes = [
    ['holiday','Holiday'],['special','Special Event'],['activity','Activity'],
    ['montessori','Montessori'],['karate','Karate'],['writing','Workbook'],
    ['craft','Art & Craft'],['rhyme','Rhyme / Dance'],['culture','Culture']
  ];
  const legendHtml = `<div class="school-legend">
    ${legendTypes.map(([t,l]) => `<span class="school-leg-item"><span class="school-dot school-dot-${t}"></span>${l}</span>`).join('')}
  </div>`;

  container.innerHTML = banner
    + `<div class="school-cal-grid">${headHtml}${bodyHtml}</div>`
    + detail + legendHtml + notesHtml;

  if (schoolCalDay) schoolCalSelectDay(schoolCalDay, key);
}

/* ─────────────────────────────────────────
   SELECT A DAY
───────────────────────────────────────── */
function schoolCalSelectDay(day, key) {
  if (!SCHOOL_CALENDAR[key]) return;
  schoolCalDay = day;

  // Highlight selected cell
  document.querySelectorAll('.school-day-cell').forEach(c => c.classList.remove('school-sel'));
  const allCells = document.querySelectorAll('.school-day-cell:not(.empty)');
  if (allCells[day - 1]) allCells[day - 1].classList.add('school-sel');

  const panel = document.getElementById('schoolCalDetail');
  if (!panel) return;

  const data   = SCHOOL_CALENDAR[key];
  const events = data.days[day] || [];
  const [year, monthIdx] = key.split('-').map(Number);
  const dateStr = new Date(year, monthIdx - 1, day).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  if (!events.length) {
    panel.innerHTML = `
      <div class="school-detail-head"><i class="fa fa-calendar-day"></i><span>${dateStr}</span></div>
      <p class="school-no-events">No activities scheduled for this day.</p>`;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  const items = events.map(([type, text]) => `
    <div class="school-ev-row">
      <span class="school-ev-tag school-etag-${type}">${SC_TAG_LABELS[type] || type}</span>
      <span class="school-ev-text">${text}</span>
    </div>`).join('');

  panel.innerHTML = `
    <div class="school-detail-head"><i class="fa fa-calendar-day"></i><span>${dateStr}</span></div>
    <div class="school-ev-list">${items}</div>`;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
