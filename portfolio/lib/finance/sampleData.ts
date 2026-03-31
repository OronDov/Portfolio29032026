// ─── Types ────────────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  billingDate: string;   // DD/MM/YYYY
  txDate: string;        // DD/MM/YYYY
  merchant: string;
  originalAmount: number;
  chargedAmount: number;
  category: string;
  cardholder: 'אורון' | 'לימור';
  month: string; // YYYY-MM
}

export interface MonthlyStats {
  month: string;     // YYYY-MM
  label: string;     // e.g. "ינואר 24"
  income: number;
  expenses: number;
  savings: number;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES: string[] = [
  'אוכל בחוץ/מסעדות',
  'קניות אוכל לבית',
  'שכירות',
  'דלק',
  'חניה',
  'חוגים-ילדים',
  'ביטוחים',
  'אינטרנט+טלפונים',
  'צהרונים',
  'נופש משפחתי',
  'בילויים',
  'פארמה',
  'ארנונה',
  'חשמל',
  'ביגוד והנעלה',
  'חו״ל',
  'שונות',
];

export const CATEGORY_COLORS: Record<string, string> = {
  'אוכל בחוץ/מסעדות':  '#8b5cf6',
  'קניות אוכל לבית':   '#60a5fa',
  'שכירות':             '#34d399',
  'דלק':                '#f97316',
  'חניה':               '#fbbf24',
  'חוגים-ילדים':        '#ec4899',
  'ביטוחים':            '#a78bfa',
  'אינטרנט+טלפונים':   '#22d3ee',
  'צהרונים':            '#4ade80',
  'נופש משפחתי':        '#fb923c',
  'בילויים':            '#f87171',
  'פארמה':              '#38bdf8',
  'ארנונה':             '#e879f9',
  'חשמל':               '#facc15',
  'ביגוד והנעלה':       '#94a3b8',
  'חו״ל':               '#f472b6',
  'שונות':              '#6b7280',
};

// ─── Monthly income / expense totals (Oct 2023 – Jun 2024, from תזרים sheet) ──

export const MONTHLY_STATS: MonthlyStats[] = [
  { month: '2023-10', label: 'אוק׳ 23', income: 23200, expenses: 25787, savings: -2587  },
  { month: '2023-11', label: 'נוב׳ 23', income: 18778, expenses: 28424, savings: -9646  },
  { month: '2023-12', label: 'דצמ׳ 23', income: 27851, expenses: 31955, savings: -4104  },
  { month: '2024-01', label: 'ינו׳ 24', income: 23141, expenses: 22676, savings:   465  },
  { month: '2024-02', label: 'פבר׳ 24', income: 20084, expenses: 18722, savings:  1362  },
  { month: '2024-03', label: 'מרץ 24',  income: 21386, expenses: 18037, savings:  3349  },
  { month: '2024-04', label: 'אפר׳ 24', income: 26727, expenses: 17527, savings:  9200  },
  { month: '2024-05', label: 'מאי 24',  income: 20474, expenses: 28740, savings: -8266  },
  { month: '2024-06', label: 'יונ׳ 24', income: 19549, expenses: 21986, savings: -2437  },
];

// ─── Sample transactions ───────────────────────────────────────────────────────
// Mirrors real Isracard export structure. Amounts in ILS.

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  // ── October 2023 ──────────────────────────────────────────────────────────
  { id:'t001', billingDate:'02/10/2023', txDate:'01/10/2023', merchant:'סונול רמת גן',        originalAmount:320, chargedAmount:320, category:'דלק',               cardholder:'אורון', month:'2023-10' },
  { id:'t002', billingDate:'02/10/2023', txDate:'01/10/2023', merchant:'חניון הבימה',         originalAmount:200, chargedAmount:200, category:'חניה',              cardholder:'אורון', month:'2023-10' },
  { id:'t003', billingDate:'02/10/2023', txDate:'02/10/2023', merchant:'שוק הכרמל',          originalAmount:480, chargedAmount:480, category:'קניות אוכל לבית',   cardholder:'לימור', month:'2023-10' },
  { id:'t004', billingDate:'02/10/2023', txDate:'03/10/2023', merchant:'ארומה דיזנגוף',      originalAmount:89,  chargedAmount:89,  category:'אוכל בחוץ/מסעדות', cardholder:'אורון', month:'2023-10' },
  { id:'t005', billingDate:'02/10/2023', txDate:'04/10/2023', merchant:'YES - מנוי',         originalAmount:100, chargedAmount:100, category:'בילויים',            cardholder:'לימור', month:'2023-10' },
  { id:'t006', billingDate:'02/10/2023', txDate:'05/10/2023', merchant:'פלאפון',              originalAmount:180, chargedAmount:180, category:'אינטרנט+טלפונים',   cardholder:'אורון', month:'2023-10' },
  { id:'t007', billingDate:'02/10/2023', txDate:'05/10/2023', merchant:'HOT',                originalAmount:200, chargedAmount:200, category:'אינטרנט+טלפונים',   cardholder:'אורון', month:'2023-10' },
  { id:'t008', billingDate:'02/10/2023', txDate:'06/10/2023', merchant:'מגדל ביטוח',        originalAmount:320, chargedAmount:320, category:'ביטוחים',             cardholder:'אורון', month:'2023-10' },
  { id:'t009', billingDate:'02/10/2023', txDate:'06/10/2023', merchant:'מלונות ישרוטל',     originalAmount:2017,chargedAmount:2017,category:'נופש משפחתי',        cardholder:'אורון', month:'2023-10' },
  { id:'t010', billingDate:'02/10/2023', txDate:'07/10/2023', merchant:'שופרסל דיל',        originalAmount:750, chargedAmount:750, category:'קניות אוכל לבית',   cardholder:'לימור', month:'2023-10' },
  { id:'t011', billingDate:'02/10/2023', txDate:'08/10/2023', merchant:'קאנטרי ארלוזורוב',  originalAmount:689, chargedAmount:689, category:'חוגים-ילדים',        cardholder:'לימור', month:'2023-10' },
  { id:'t012', billingDate:'02/10/2023', txDate:'09/10/2023', merchant:'עיריית תל אביב',    originalAmount:308, chargedAmount:308, category:'ארנונה',              cardholder:'אורון', month:'2023-10' },
  { id:'t013', billingDate:'02/10/2023', txDate:'10/10/2023', merchant:'סופר-פארם',         originalAmount:245, chargedAmount:245, category:'פארמה',               cardholder:'לימור', month:'2023-10' },
  { id:'t014', billingDate:'02/10/2023', txDate:'11/10/2023', merchant:'רולדין',             originalAmount:220, chargedAmount:220, category:'אוכל בחוץ/מסעדות', cardholder:'אורון', month:'2023-10' },
  { id:'t015', billingDate:'02/10/2023', txDate:'01/10/2023', merchant:'שכירות אוקטובר',   originalAmount:6600,chargedAmount:6600,category:'שכירות',              cardholder:'אורון', month:'2023-10' },
  { id:'t016', billingDate:'02/10/2023', txDate:'01/10/2023', merchant:'צהרון גלבוע',       originalAmount:1370,chargedAmount:1370,category:'צהרונים',             cardholder:'לימור', month:'2023-10' },
  { id:'t017', billingDate:'02/10/2023', txDate:'13/10/2023', merchant:'חשמל - חב. חשמל',  originalAmount:1036,chargedAmount:1036,category:'חשמל',                cardholder:'אורון', month:'2023-10' },
  { id:'t018', billingDate:'02/10/2023', txDate:'15/10/2023', merchant:'דינה זאבי - ביגוד', originalAmount:309, chargedAmount:309, category:'ביגוד והנעלה',       cardholder:'לימור', month:'2023-10' },
  { id:'t019', billingDate:'02/10/2023', txDate:'16/10/2023', merchant:'נענע10',             originalAmount:42,  chargedAmount:42,  category:'אוכל בחוץ/מסעדות', cardholder:'אורון', month:'2023-10' },
  { id:'t020', billingDate:'02/10/2023', txDate:'17/10/2023', merchant:'NETFLIX',            originalAmount:50,  chargedAmount:50,  category:'בילויים',            cardholder:'אורון', month:'2023-10' },
  { id:'t021', billingDate:'02/10/2023', txDate:'18/10/2023', merchant:'ביג פארם',          originalAmount:180, chargedAmount:180, category:'פארמה',               cardholder:'לימור', month:'2023-10' },
  { id:'t022', billingDate:'02/10/2023', txDate:'19/10/2023', merchant:'לנד רובר ת"א',     originalAmount:40,  chargedAmount:40,  category:'שונות',               cardholder:'אורון', month:'2023-10' },
  { id:'t023', billingDate:'02/10/2023', txDate:'20/10/2023', merchant:'תחנת דלק דור',      originalAmount:342, chargedAmount:342, category:'דלק',                cardholder:'לימור', month:'2023-10' },

  // ── January 2024 ──────────────────────────────────────────────────────────
  { id:'t101', billingDate:'02/01/2024', txDate:'01/01/2024', merchant:'שכירות ינואר',       originalAmount:6600, chargedAmount:6600, category:'שכירות',             cardholder:'אורון', month:'2024-01' },
  { id:'t102', billingDate:'02/01/2024', txDate:'01/01/2024', merchant:'צהרון גלבוע',         originalAmount:1370, chargedAmount:1370, category:'צהרונים',            cardholder:'לימור', month:'2024-01' },
  { id:'t103', billingDate:'02/01/2024', txDate:'02/01/2024', merchant:'אמות השקעות',        originalAmount:3898, chargedAmount:3898, category:'אוכל בחוץ/מסעדות',  cardholder:'אורון', month:'2024-01' },
  { id:'t104', billingDate:'02/01/2024', txDate:'03/01/2024', merchant:'שופרסל אונליין',     originalAmount:1467, chargedAmount:1467, category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-01' },
  { id:'t105', billingDate:'02/01/2024', txDate:'04/01/2024', merchant:'סונול גני תקווה',    originalAmount:868,  chargedAmount:868,  category:'דלק',                cardholder:'אורון', month:'2024-01' },
  { id:'t106', billingDate:'02/01/2024', txDate:'05/01/2024', merchant:'מנהרות הכרמל',       originalAmount:98,   chargedAmount:98,   category:'חניה',               cardholder:'אורון', month:'2024-01' },
  { id:'t107', billingDate:'02/01/2024', txDate:'06/01/2024', merchant:'HOT מובייל',         originalAmount:110,  chargedAmount:110,  category:'אינטרנט+טלפונים',    cardholder:'אורון', month:'2024-01' },
  { id:'t108', billingDate:'02/01/2024', txDate:'07/01/2024', merchant:'BOOKING.COM',        originalAmount:2568, chargedAmount:2568, category:'חו״ל',               cardholder:'אורון', month:'2024-01' },
  { id:'t109', billingDate:'02/01/2024', txDate:'08/01/2024', merchant:'מגדל ביטוח',        originalAmount:505,  chargedAmount:505,  category:'ביטוחים',             cardholder:'אורון', month:'2024-01' },
  { id:'t110', billingDate:'02/01/2024', txDate:'09/01/2024', merchant:'חניון רוטשילד',      originalAmount:402,  chargedAmount:402,  category:'חניה',               cardholder:'אורון', month:'2024-01' },
  { id:'t111', billingDate:'02/01/2024', txDate:'10/01/2024', merchant:'קאנטרי ארלוזורוב',  originalAmount:686,  chargedAmount:686,  category:'חוגים-ילדים',        cardholder:'לימור', month:'2024-01' },
  { id:'t112', billingDate:'02/01/2024', txDate:'11/01/2024', merchant:'עיריית תל אביב',    originalAmount:310,  chargedAmount:310,  category:'ארנונה',              cardholder:'אורון', month:'2024-01' },
  { id:'t113', billingDate:'02/01/2024', txDate:'12/01/2024', merchant:'פיל פיתוח למידה',   originalAmount:230,  chargedAmount:230,  category:'בילויים',             cardholder:'לימור', month:'2024-01' },

  // ── February 2024 ─────────────────────────────────────────────────────────
  { id:'t201', billingDate:'02/02/2024', txDate:'01/02/2024', merchant:'שכירות פברואר',      originalAmount:6600, chargedAmount:6600, category:'שכירות',             cardholder:'אורון', month:'2024-02' },
  { id:'t202', billingDate:'02/02/2024', txDate:'01/02/2024', merchant:'צהרון גלבוע',         originalAmount:1370, chargedAmount:1370, category:'צהרונים',            cardholder:'לימור', month:'2024-02' },
  { id:'t203', billingDate:'02/02/2024', txDate:'02/02/2024', merchant:'תיאטרון הבימה',      originalAmount:350,  chargedAmount:350,  category:'בילויים',             cardholder:'לימור', month:'2024-02' },
  { id:'t204', billingDate:'02/02/2024', txDate:'03/02/2024', merchant:'רמי לוי שיווק',     originalAmount:890,  chargedAmount:890,  category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-02' },
  { id:'t205', billingDate:'02/02/2024', txDate:'04/02/2024', merchant:'סונול רמת גן',       originalAmount:636,  chargedAmount:636,  category:'דלק',                cardholder:'אורון', month:'2024-02' },
  { id:'t206', billingDate:'02/02/2024', txDate:'05/02/2024', merchant:'HOT',                originalAmount:200,  chargedAmount:200,  category:'אינטרנט+טלפונים',    cardholder:'אורון', month:'2024-02' },
  { id:'t207', billingDate:'02/02/2024', txDate:'06/02/2024', merchant:'BOOKING.COM',        originalAmount:440,  chargedAmount:440,  category:'חו״ל',               cardholder:'אורון', month:'2024-02' },
  { id:'t208', billingDate:'02/02/2024', txDate:'07/02/2024', merchant:'הראל ביטוח',        originalAmount:1012, chargedAmount:1012, category:'ביטוחים',             cardholder:'אורון', month:'2024-02' },
  { id:'t209', billingDate:'02/02/2024', txDate:'08/02/2024', merchant:'קאנטרי',             originalAmount:686,  chargedAmount:686,  category:'חוגים-ילדים',        cardholder:'לימור', month:'2024-02' },
  { id:'t210', billingDate:'02/02/2024', txDate:'09/02/2024', merchant:'נדב קינוחים',        originalAmount:180,  chargedAmount:180,  category:'אוכל בחוץ/מסעדות',  cardholder:'אורון', month:'2024-02' },
  { id:'t211', billingDate:'02/02/2024', txDate:'10/02/2024', merchant:'סופר-פארם',          originalAmount:220,  chargedAmount:220,  category:'פארמה',               cardholder:'לימור', month:'2024-02' },
  { id:'t212', billingDate:'02/02/2024', txDate:'11/02/2024', merchant:'שופרסל',             originalAmount:1141, chargedAmount:1141, category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-02' },
  { id:'t213', billingDate:'02/02/2024', txDate:'12/02/2024', merchant:'מנהרות הכרמל',       originalAmount:120,  chargedAmount:120,  category:'חניה',               cardholder:'אורון', month:'2024-02' },

  // ── March 2024 ────────────────────────────────────────────────────────────
  { id:'t301', billingDate:'02/03/2024', txDate:'01/03/2024', merchant:'שכירות מרץ',         originalAmount:6600, chargedAmount:6600, category:'שכירות',             cardholder:'אורון', month:'2024-03' },
  { id:'t302', billingDate:'02/03/2024', txDate:'01/03/2024', merchant:'צהרון גלבוע',         originalAmount:1370, chargedAmount:1370, category:'צהרונים',            cardholder:'לימור', month:'2024-03' },
  { id:'t303', billingDate:'02/03/2024', txDate:'02/03/2024', merchant:'ארומה יקנעם',         originalAmount:95,   chargedAmount:95,   category:'אוכל בחוץ/מסעדות',  cardholder:'אורון', month:'2024-03' },
  { id:'t304', billingDate:'02/03/2024', txDate:'03/03/2024', merchant:'סונול',               originalAmount:507,  chargedAmount:507,  category:'דלק',                cardholder:'אורון', month:'2024-03' },
  { id:'t305', billingDate:'02/03/2024', txDate:'04/03/2024', merchant:'BOOKING.COM',         originalAmount:440,  chargedAmount:440,  category:'חו״ל',               cardholder:'אורון', month:'2024-03' },
  { id:'t306', billingDate:'02/03/2024', txDate:'05/03/2024', merchant:'ביטוח לאומי',        originalAmount:1076, chargedAmount:1076, category:'ביטוחים',             cardholder:'אורון', month:'2024-03' },
  { id:'t307', billingDate:'02/03/2024', txDate:'06/03/2024', merchant:'רמי לוי',            originalAmount:780,  chargedAmount:780,  category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-03' },
  { id:'t308', billingDate:'02/03/2024', txDate:'07/03/2024', merchant:'ייעוץ שינה',          originalAmount:563,  chargedAmount:563,  category:'שונות',               cardholder:'לימור', month:'2024-03' },
  { id:'t309', billingDate:'02/03/2024', txDate:'08/03/2024', merchant:'קאנטרי ארלוזורוב',  originalAmount:496,  chargedAmount:496,  category:'חוגים-ילדים',        cardholder:'לימור', month:'2024-03' },
  { id:'t310', billingDate:'02/03/2024', txDate:'09/03/2024', merchant:'חניון דיזנגוף',       originalAmount:538,  chargedAmount:538,  category:'חניה',               cardholder:'אורון', month:'2024-03' },
  { id:'t311', billingDate:'02/03/2024', txDate:'10/03/2024', merchant:'HOT + פלאפון',        originalAmount:338,  chargedAmount:338,  category:'אינטרנט+טלפונים',    cardholder:'אורון', month:'2024-03' },
  { id:'t312', billingDate:'02/03/2024', txDate:'11/03/2024', merchant:'מוזיאון תל אביב',    originalAmount:200,  chargedAmount:200,  category:'בילויים',             cardholder:'לימור', month:'2024-03' },
  { id:'t313', billingDate:'02/03/2024', txDate:'12/03/2024', merchant:'שופרסל',              originalAmount:1241, chargedAmount:1241, category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-03' },

  // ── April 2024 ────────────────────────────────────────────────────────────
  { id:'t401', billingDate:'02/04/2024', txDate:'01/04/2024', merchant:'שכירות אפריל',        originalAmount:6600, chargedAmount:6600, category:'שכירות',             cardholder:'אורון', month:'2024-04' },
  { id:'t402', billingDate:'02/04/2024', txDate:'01/04/2024', merchant:'צהרון גלבוע',         originalAmount:1370, chargedAmount:1370, category:'צהרונים',            cardholder:'לימור', month:'2024-04' },
  { id:'t403', billingDate:'02/04/2024', txDate:'02/04/2024', merchant:'ROOTS',               originalAmount:420,  chargedAmount:420,  category:'אוכל בחוץ/מסעדות',  cardholder:'אורון', month:'2024-04' },
  { id:'t404', billingDate:'02/04/2024', txDate:'03/04/2024', merchant:'סונול קיסריה',        originalAmount:473,  chargedAmount:473,  category:'דלק',                cardholder:'אורון', month:'2024-04' },
  { id:'t405', billingDate:'02/04/2024', txDate:'04/04/2024', merchant:'חניון עזריאלי',       originalAmount:320,  chargedAmount:320,  category:'חניה',               cardholder:'אורון', month:'2024-04' },
  { id:'t406', billingDate:'02/04/2024', txDate:'05/04/2024', merchant:'קאנטרי ארלוזורוב',  originalAmount:439,  chargedAmount:439,  category:'חוגים-ילדים',        cardholder:'לימור', month:'2024-04' },
  { id:'t407', billingDate:'02/04/2024', txDate:'06/04/2024', merchant:'ביטוח מגדל',         originalAmount:1190, chargedAmount:1190, category:'ביטוחים',             cardholder:'אורון', month:'2024-04' },
  { id:'t408', billingDate:'02/04/2024', txDate:'07/04/2024', merchant:'ייעוץ שינה',          originalAmount:563,  chargedAmount:563,  category:'שונות',               cardholder:'לימור', month:'2024-04' },
  { id:'t409', billingDate:'02/04/2024', txDate:'08/04/2024', merchant:'שופרסל',              originalAmount:1516, chargedAmount:1516, category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-04' },
  { id:'t410', billingDate:'02/04/2024', txDate:'09/04/2024', merchant:'HOT',                 originalAmount:338,  chargedAmount:338,  category:'אינטרנט+טלפונים',    cardholder:'אורון', month:'2024-04' },
  { id:'t411', billingDate:'02/04/2024', txDate:'10/04/2024', merchant:'עיריית תל אביב',     originalAmount:309,  chargedAmount:309,  category:'ארנונה',              cardholder:'אורון', month:'2024-04' },
  { id:'t412', billingDate:'02/04/2024', txDate:'11/04/2024', merchant:'המגדל הלבן - מסעדה', originalAmount:680,  chargedAmount:680,  category:'אוכל בחוץ/מסעדות',  cardholder:'אורון', month:'2024-04' },
  { id:'t413', billingDate:'02/04/2024', txDate:'12/04/2024', merchant:'סופר-פארם',           originalAmount:493,  chargedAmount:493,  category:'פארמה',               cardholder:'לימור', month:'2024-04' },

  // ── May 2024 ──────────────────────────────────────────────────────────────
  { id:'t501', billingDate:'02/05/2024', txDate:'01/05/2024', merchant:'שכירות מאי',          originalAmount:6600, chargedAmount:6600, category:'שכירות',             cardholder:'אורון', month:'2024-05' },
  { id:'t502', billingDate:'02/05/2024', txDate:'01/05/2024', merchant:'צהרון גלבוע',          originalAmount:1370, chargedAmount:1370, category:'צהרונים',            cardholder:'לימור', month:'2024-05' },
  { id:'t503', billingDate:'02/05/2024', txDate:'02/05/2024', merchant:'מלון דן תל אביב',     originalAmount:2695, chargedAmount:2695, category:'נופש משפחתי',        cardholder:'אורון', month:'2024-05' },
  { id:'t504', billingDate:'02/05/2024', txDate:'03/05/2024', merchant:'מטפלת לנעמה',          originalAmount:6351, chargedAmount:6351, category:'שונות',               cardholder:'לימור', month:'2024-05' },
  { id:'t505', billingDate:'02/05/2024', txDate:'04/05/2024', merchant:'קאנטרי',               originalAmount:281,  chargedAmount:281,  category:'חוגים-ילדים',        cardholder:'לימור', month:'2024-05' },
  { id:'t506', billingDate:'02/05/2024', txDate:'05/05/2024', merchant:'שופרסל',               originalAmount:3421, chargedAmount:3421, category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-05' },
  { id:'t507', billingDate:'02/05/2024', txDate:'06/05/2024', merchant:'סונול',                originalAmount:600,  chargedAmount:600,  category:'דלק',                cardholder:'אורון', month:'2024-05' },
  { id:'t508', billingDate:'02/05/2024', txDate:'07/05/2024', merchant:'חניון עזריאלי',        originalAmount:1520, chargedAmount:1520, category:'חניה',               cardholder:'אורון', month:'2024-05' },
  { id:'t509', billingDate:'02/05/2024', txDate:'08/05/2024', merchant:'הראל ביטוח',          originalAmount:926,  chargedAmount:926,  category:'ביטוחים',             cardholder:'אורון', month:'2024-05' },
  { id:'t510', billingDate:'02/05/2024', txDate:'09/05/2024', merchant:'HOT',                  originalAmount:338,  chargedAmount:338,  category:'אינטרנט+טלפונים',    cardholder:'אורון', month:'2024-05' },
  { id:'t511', billingDate:'02/05/2024', txDate:'10/05/2024', merchant:'מוניות גט',            originalAmount:46,   chargedAmount:46,   category:'שונות',               cardholder:'לימור', month:'2024-05' },
  { id:'t512', billingDate:'02/05/2024', txDate:'11/05/2024', merchant:'NETFLIX',              originalAmount:50,   chargedAmount:50,   category:'בילויים',             cardholder:'אורון', month:'2024-05' },
  { id:'t513', billingDate:'02/05/2024', txDate:'12/05/2024', merchant:'רמי לוי',             originalAmount:890,  chargedAmount:890,  category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-05' },

  // ── June 2024 ─────────────────────────────────────────────────────────────
  { id:'t601', billingDate:'02/06/2024', txDate:'01/06/2024', merchant:'שכירות יוני',          originalAmount:6600, chargedAmount:6600, category:'שכירות',             cardholder:'אורון', month:'2024-06' },
  { id:'t602', billingDate:'02/06/2024', txDate:'01/06/2024', merchant:'צהרון גלבוע',          originalAmount:1370, chargedAmount:1370, category:'צהרונים',            cardholder:'לימור', month:'2024-06' },
  { id:'t603', billingDate:'02/06/2024', txDate:'02/06/2024', merchant:'מלון ישרוטל',          originalAmount:1927, chargedAmount:1927, category:'נופש משפחתי',        cardholder:'אורון', month:'2024-06' },
  { id:'t604', billingDate:'02/06/2024', txDate:'03/06/2024', merchant:'מטפלת לנעמה',          originalAmount:2000, chargedAmount:2000, category:'שונות',               cardholder:'לימור', month:'2024-06' },
  { id:'t605', billingDate:'02/06/2024', txDate:'04/06/2024', merchant:'BOOKING.COM',          originalAmount:1394, chargedAmount:1394, category:'חו״ל',               cardholder:'אורון', month:'2024-06' },
  { id:'t606', billingDate:'02/06/2024', txDate:'05/06/2024', merchant:'שופרסל',               originalAmount:971,  chargedAmount:971,  category:'קניות אוכל לבית',    cardholder:'לימור', month:'2024-06' },
  { id:'t607', billingDate:'02/06/2024', txDate:'06/06/2024', merchant:'סונול',                originalAmount:474,  chargedAmount:474,  category:'דלק',                cardholder:'אורון', month:'2024-06' },
  { id:'t608', billingDate:'02/06/2024', txDate:'07/06/2024', merchant:'ארומה',                originalAmount:175,  chargedAmount:175,  category:'אוכל בחוץ/מסעדות',  cardholder:'אורון', month:'2024-06' },
  { id:'t609', billingDate:'02/06/2024', txDate:'08/06/2024', merchant:'הראל',                 originalAmount:372,  chargedAmount:372,  category:'ביטוחים',             cardholder:'אורון', month:'2024-06' },
  { id:'t610', billingDate:'02/06/2024', txDate:'09/06/2024', merchant:'חניון',                originalAmount:1170, chargedAmount:1170, category:'חניה',               cardholder:'אורון', month:'2024-06' },
  { id:'t611', billingDate:'02/06/2024', txDate:'10/06/2024', merchant:'מים - עיריית ת"א',    originalAmount:175,  chargedAmount:175,  category:'שונות',               cardholder:'אורון', month:'2024-06' },
  { id:'t612', billingDate:'02/06/2024', txDate:'11/06/2024', merchant:'HOT',                  originalAmount:338,  chargedAmount:338,  category:'אינטרנט+טלפונים',    cardholder:'אורון', month:'2024-06' },
  { id:'t613', billingDate:'02/06/2024', txDate:'12/06/2024', merchant:'סופר-פארם',            originalAmount:568,  chargedAmount:568,  category:'פארמה',               cardholder:'לימור', month:'2024-06' },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export function getCategoryTotals(
  transactions: Transaction[],
  month?: string
): { category: string; amount: number; color: string }[] {
  const filtered = month
    ? transactions.filter((t) => t.month === month)
    : transactions;

  const totals: Record<string, number> = {};
  for (const t of filtered) {
    totals[t.category] = (totals[t.category] ?? 0) + t.chargedAmount;
  }

  return Object.entries(totals)
    .map(([category, amount]) => ({
      category,
      amount: Math.round(amount),
      color: CATEGORY_COLORS[category] ?? '#6b7280',
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function formatILS(amount: number): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
  }).format(amount);
}
