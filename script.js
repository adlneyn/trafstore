function checkStoreStatus() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const wib = new Date(utc + (3600000 * 7));
    const hours = wib.getHours();

    const badge = document.getElementById('store-status-badge');
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');

    if (hours >= 9 && hours < 23) {
        if (badge) badge.className = "hidden sm:flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 shadow-inner";
        if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-400 animate-pulse";
        if (text) text.innerText = "Jam Open: 09.00 - 23.00 WIB";
    } else {
        if (badge) badge.className = "hidden sm:flex items-center space-x-2 bg-rose-950/60 border border-rose-800/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-rose-200 shadow-inner";
        if (dot) dot.className = "w-2 h-2 rounded-full bg-rose-500 animate-pulse";
        if (text) text.innerText = "Store Close (Buka Jam 09.00)";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkStoreStatus();
    setInterval(checkStoreStatus, 60000);
});

function switchPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(p => p.classList.add('hidden'));

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }

    const desktopButtons = document.querySelectorAll('.nav-btn');
    desktopButtons.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white', 'bg-amber-500');
        btn.classList.add('bg-slate-100', 'text-slate-700');
    });

    desktopButtons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${pageId}'`)) {
            btn.classList.remove('bg-slate-100', 'text-slate-700');
            if(pageId === 'hiring') {
                btn.classList.add('bg-amber-500', 'text-white');
            } else {
                btn.classList.add('bg-blue-600', 'text-white');
            }
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const icon = document.getElementById('hamburger-icon');
    if (drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        drawer.classList.add('hidden');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
}

function orderViaWA(item, type) {
    let waNumber = "6285167971251"; // Nomor utama untuk App Prem, Top Up, Lainnya, Hiring
    if (type === 'Jaseb LPM' || type === 'Jaseb LPFP' || type === 'Editing' || type === 'Wording' || type === 'Setup Acc') {
        waNumber = "6283876026185"; // Nomor kasir baru
    }

    let textTemplate = "";

    if (type === 'Jaseb LPM' || type === 'Jaseb LPFP') {
        textTemplate = `Misi min mau mesen *${item}*

format
⸙ ꯭ ꯭ ꯭✦    Nama Pemesanan   ─   
⸙ ꯭ ꯭ ꯭✦    Nomor   ─   08 (wajib diisi)
⸙ ꯭ ꯭ ꯭✦    Banyak   ─   ${item}
⸙ ꯭ ꯭ ꯭✦    Hari   ─   1/2/3/4/5/6/7 Day
⸙ ꯭ ꯭ ꯭✦    Sebar   ─   1×/2×/3×
> Sesi 01: 09.00 - 00.00
> Sesi 02 : 00.00 - 00.00
> Sesi 03 : 00.00 - 23.00
> n. only wib, isi jika ingin memakai sesi
⸙ ꯭ ꯭ ꯭✦    Fee+   ─   Tidak/Foto/Video
⸙ ꯭ ꯭ ꯭✦    Waktu   ─   Inrush/Tidak
⸙ ꯭ ꯭ ꯭✦    Screenshot   ─   Panjang/Pendek/Tidak

LANGSUNG KIRIM LIST MU
Inrush: +100
Store: +100
Berfoto: +25
Bervideo: +50

Jika dalam 1 jam tidak dibalas, harap chat kembali, terima kasih.`;
    } else if (type === 'Editing' || type === 'Wording' || type === 'Setup Acc') {
        textTemplate = `Misi min mau mesen *${item}*

format
FORMAT EDITING DAN WORDING
⸙ ꯭ ꯭ ꯭✦    Nama Pemesanan   ─   
⸙ ꯭ ꯭ ꯭✦    Nomor   ─   08 (wajib)
⸙ ꯭ ꯭ ꯭✦    Pesanan   ─   ${item}
⸙ ꯭ ꯭ ꯭✦    Jumlah   ─   
⸙ ꯭ ꯭ ꯭✦    Insrush   ─    Ya/Tidak
⸙ ꯭ ꯭ ꯭✦    Refrensi   ─   
> wajib untuk yang inrush
⸙ ꯭ ꯭ ꯭✦    Muse + Name   ─   
⸙ ꯭ ꯭ ꯭✦    Theme  ─   
⸙ ꯭ ꯭ ꯭✦    Ukuran  ─   
⸙ ꯭ ꯭ ꯭✦    Ukuran Wording  ─   Short/Medium/Long
⸙ ꯭ ꯭ ꯭✦    Req++  ─   

Jika dalam 1 jam tidak dibalas, harap chat kembali, terima kasih.`;
    } else if (type === 'App Premium' || type === 'Top Up Game') {
        textTemplate = `Misi min, mesen *${item}* ready gak min?`;
    } else if (type === 'Lainnya') {
        textTemplate = `Misi min, mau mesen *${item}* ada min?`;
    }

    const encodedText = encodeURIComponent(textTemplate);
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, "_blank");
}

function applyTeam(divisi) {
    const waNumber = "6285167971251";
    const textTemplate = `Misi, saya *muse+nama* niat jadi team *${divisi}*
> n, isi dan pilih divisi jika ingin pesan mu di jawab.`;
    const encodedText = encodeURIComponent(textTemplate);
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, "_blank");
}

function askAdmin() {
    window.open(`https://wa.me/6285167971251?text=${encodeURIComponent("Misi min, izin nanya dong")}`, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
    const renderCard = (title, price, onclickAction) => `
        <div onclick="${onclickAction}" class="bg-white p-3.5 rounded-2xl border border-slate-200/80 card-hover flex justify-between items-center cursor-pointer group shadow-sm">
            <div class="pr-2">
                <h3 class="font-bold text-xs sm:text-sm text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">${title}</h3>
                ${price ? `<p class="text-xs font-semibold text-blue-600 mt-0.5">${price}</p>` : ''}
            </div>
            <div class="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 flex items-center justify-center transition-all flex-shrink-0 text-xs shadow-inner">
                <i class="fa-solid fa-arrow-right-long group-hover:translate-x-0.5 transition-transform"></i>
            </div>
        </div>
    `;

    // 1. JASEB LPM
    const lpmData = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];
    document.getElementById('grid-lpm').innerHTML = lpmData.map(num => renderCard(`${num} LPM`, `RP. ${num}`, `orderViaWA('${num} LPM', 'Jaseb LPM')`)).join('');

    // 2. JASEB LPFP
    const lpfpPrices = {50:75, 100:125, 150:175, 200:225, 250:275, 300:325, 350:375, 400:425, 450:475, 500:525, 550:575, 600:625, 650:675, 700:725, 750:775, 800:825, 850:875, 900:925, 950:975, 1000:1025};
    document.getElementById('grid-lpfp').innerHTML = Object.entries(lpfpPrices).map(([num, price]) => renderCard(`${num} LPFP`, `RP. ${price}`, `orderViaWA('${num} LPFP', 'Jaseb LPFP')`)).join('');

    // 3. EDITING
    const editMagazine = [{n:"2 SLIDE", p:"RP. 3.000"}, {n:"3 SLIDE", p:"RP. 4.000"}, {n:"6 SLIDE", p:"RP. 7.000"}];
    document.getElementById('grid-edit-magazine').innerHTML = editMagazine.map(i => renderCard(i.n, i.p, `orderViaWA('Magazine ${i.n}', 'Editing')`)).join('');
    document.getElementById('note-magazine').innerHTML = `<strong>ADDITION / TAMBAHAN:</strong><br>• EXTRA CHR: +RP. 1.500 / SLIDE<br>• SIMPLE EDIT: +RP. 2.000 / SLIDE<br>• FULL EDIT: +RP. 3.000 / SLIDE`;

    const editHeader = [{n:"HEADER MAGAZINE", p:"RP. 4.000"}, {n:"HEADER DECO", p:"RP. 5.000"}, {n:"HEADER DESIGN", p:"RP. 6.000"}];
    document.getElementById('grid-edit-header').innerHTML = editHeader.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Editing')`)).join('');

    const editProfile = [{n:"ICONS DECO", p:"RP. 5.000"}, {n:"ICONS DESIGN", p:"RP. 6.000"}];
    document.getElementById('grid-edit-profile').innerHTML = editProfile.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Editing')`)).join('');
    document.getElementById('note-profile').innerHTML = `<strong>ADDITION / TAMBAHAN:</strong><br>• EXTRA CHR: +RP. 1.500 / SLIDE`;

    const editManips = [{n:"MANIPS SELCA", p:"RP. 5.000"}, {n:"MANIPS POLAROID", p:"RP. 6.000"}, {n:"MANIPS HALFBODY", p:"RP. 7.000"}, {n:"MANIPS PHOTOBOOTH", p:"RP. 8.000"}];
    document.getElementById('grid-edit-manips').innerHTML = editManips.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Editing')`)).join('');
    document.getElementById('note-manips').innerHTML = `<strong>ADDITION / TAMBAHAN:</strong><br>• FREE 2–3 CHARA, LEBIH: +RP. 2.000 / CHARA<br>• SCRIBBLE: +RP. 2.000<br>• KISSED: +RP. 2.000`;

    const editTwibbonIDC = [{n:"IDC NON TRAINEE", p:"RP. 5.000"}, {n:"IDC TRAINEE", p:"RP. 6.000"}];
    document.getElementById('grid-edit-twibbonidc').innerHTML = editTwibbonIDC.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Editing')`)).join('');

    const editTwibbonTWB = [{n:"TWB BDAY DECO SIMPLE EDIT", p:"RP. 3.000"}, {n:"TWB BDAY DECO MEDIUM EDIT", p:"RP. 5.000"}, {n:"TWB BDAY DECO FULL EDIT", p:"RP. 7.000"}, {n:"STC BDAY", p:"RP. 4.000"}];
    document.getElementById('grid-edit-twibbontwb').innerHTML = editTwibbonTWB.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Editing')`)).join('');
    document.getElementById('note-twibbontwb').innerHTML = `<strong>ADDITION / TAMBAHAN:</strong><br>• +1 SLIDE: +RP. 2.000<br>• +1 STC: +RP. 1.000<br>• DESIGN / CYBER EDIT: +RP. 2.000`;

    const editPoster = [{n:"SIMPLE EDIT", p:"RP. 6.000"}, {n:"MEDIUM EDIT", p:"RP. 8.000"}, {n:"FULL EDIT", p:"RP. 10.000"}];
    document.getElementById('grid-edit-poster').innerHTML = editPoster.map(i => renderCard(i.n, i.p, `orderViaWA('Poster ${i.n}', 'Editing')`)).join('');
    document.getElementById('note-poster').innerHTML = `<strong>ADDITION / TAMBAHAN:</strong><br>• DESIGN / CYBER EDIT: +RP. 2.000<br>• FREE 2–4 CHARA, LEBIH: +RP. 2.000 / CHARA<br>• MATERIAL DARI KAMI: +RP. 3.000`;

    const editMoodboard = [
        {n:"MOODBOARD BASIC 3 SLIDE", p:"RP. 4.000"}, {n:"MOODBOARD BASIC 6 SLIDE", p:"RP. 7.000"},
        {n:"MOODBOARD DECO 3 SLIDE (SIMPLE)", p:"RP. 4.000"}, {n:"MOODBOARD DECO 3 SLIDE (MEDIUM)", p:"RP. 7.000"}, {n:"MOODBOARD DECO 3 SLIDE (FULL)", p:"RP. 10.000"},
        {n:"MOODBOARD DECO 6 SLIDE (SIMPLE)", p:"RP. 7.000"}, {n:"MOODBOARD DECO 6 SLIDE (MEDIUM)", p:"RP. 10.000"}, {n:"MOODBOARD DECO 6 SLIDE (FULL)", p:"RP. 13.000"},
        {n:"MOODBOARD DESIGN 3 SLIDE (SIMPLE)", p:"RP. 7.000"}, {n:"MOODBOARD DESIGN 3 SLIDE (MEDIUM)", p:"RP. 9.000"}, {n:"MOODBOARD DESIGN 3 SLIDE (FULL)", p:"RP. 11.000"},
        {n:"MOODBOARD DESIGN 6 SLIDE (SIMPLE)", p:"RP. 9.000"}, {n:"MOODBOARD DESIGN 6 SLIDE (MEDIUM)", p:"RP. 11.000"}, {n:"MOODBOARD DESIGN 6 SLIDE (FULL)", p:"RP. 13.000"},
        {n:"LOVEBOARD DECO 3 SLIDE (SIMPLE) + HEADER", p:"RP. 5.000"}, {n:"LOVEBOARD DECO 3 SLIDE (MEDIUM) + HEADER", p:"RP. 8.000"}, {n:"LOVEBOARD DECO 3 SLIDE (FULL) + HEADER", p:"RP. 11.000"},
        {n:"LOVEBOARD DECO 6 SLIDE (SIMPLE) + HEADER", p:"RP. 8.000"}, {n:"LOVEBOARD DECO 6 SLIDE (MEDIUM) + HEADER", p:"RP. 11.000"}, {n:"LOVEBOARD DECO 6 SLIDE (FULL) + HEADER", p:"RP. 14.000"},
        {n:"LOVEBOARD DESIGN 3 SLIDE (SIMPLE) + HEADER", p:"RP. 8.000"}, {n:"LOVEBOARD DESIGN 3 SLIDE (MEDIUM) + HEADER", p:"RP. 10.000"}, {n:"LOVEBOARD DESIGN 3 SLIDE (FULL) + HEADER", p:"RP. 12.000"},
        {n:"LOVEBOARD DESIGN 6 SLIDE (SIMPLE) + HEADER", p:"RP. 10.000"}, {n:"LOVEBOARD DESIGN 6 SLIDE (MEDIUM) + HEADER", p:"RP. 12.000"}, {n:"LOVEBOARD DESIGN 6 SLIDE (FULL) + HEADER", p:"RP. 14.000"}
    ];
    document.getElementById('grid-edit-moodboard').innerHTML = editMoodboard.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Editing')`)).join('');

    document.getElementById('editing-general-notes').innerHTML = `
        <strong>NOTE & KETENTUAN EDITING:</strong><br>
        • HARGA BERDASARKAN PANJANG DAN TINGKAT KESULITAN.<br>
        • REQUEST DESIGN CUSTOM, DETAIL RUMIT, ATAU TAMBAHAN KARAKTER DAPAT DIKENAKAN BIAYA TAMBAHAN.<br>
        • REVISI MAKSIMAL 3X.<br>
        • REVISI DI LUAR KETENTUAN DAPAT DIKENAKAN BIAYA TAMBAHAN.<br>
        • PENGERJAAN MENYESUAIKAN ANTRIAN ORDER.<br>
        • HARGA BISA BERUBAH TERGANTUNG TINGKAT KESULITAN.<br>
        • SILAKAN KONSULTASI TERLEBIH DAHULU UNTUK MENENTUKAN DESIGN YANG SESUAI.
    `;

    // 4. WORDING
    const wordingData = [
        {n: "WORDING PFP", p: "RP. 6.000 - 11.000"},
        {n: "WORDING BIO", p: "RP. 4.000 - 8.000"},
        {n: "WORDING LOC", p: "RP. 3.000 - 5.000"},
        {n: "WORDING KATALOG / FREE TITLE", p: "RP. 4.000 - 6.000"},
        {n: "WORDING BIRTHDAY", p: "RP. 5.000 - 9.000"},
        {n: "WORDING DESK GROUP", p: "RP. 5.000 - 9.000"},
        {n: "WORDING LIST", p: "RP. 6.000 - 10.000"},
        {n: "4 BC CONTACT", p: "RP. 3.000"},
        {n: "DISPLAY NAME", p: "RP. 2.000"},
        {n: "UPDATE CHAR", p: "RP. 4.000 - 5.000"},
        {n: "GREETING MESSAGE (SHORT)", p: "RP. 3.000"},
        {n: "GREETING MESSAGE (MEDIUM)", p: "RP. 5.000"},
        {n: "GREETING MESSAGE (LONG)", p: "RP. 7.000"}
    ];
    document.getElementById('grid-wording').innerHTML = wordingData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Wording')`)).join('');

    // 5. SETUP ACC
    const setupPaketa = [
        {n: "PAKET A (SHORT)", p: "RP. 10.000"},
        {n: "PAKET A (MEDIUM)", p: "RP. 12.000"},
        {n: "PAKET A (LONG)", p: "RP. 15.000"}
    ];
    document.getElementById('grid-setup-paketa').innerHTML = setupPaketa.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Setup Acc')`)).join('');
    document.getElementById('note-paketa').innerHTML = `<strong>ISI:</strong> BIO, DISPLAY NAME, LOCATION<br><strong>ADD-ON DECO:</strong> 3 SLIDE (+RP. 6.000) | 6 SLIDE (+RP. 7.000)`;

    const setupPaketb = [
        {n: "PAKET B (SHORT)", p: "RP. 12.000"},
        {n: "PAKET B (MEDIUM)", p: "RP. 14.000"},
        {n: "PAKET B (LONG)", p: "RP. 17.000"}
    ];
    document.getElementById('grid-setup-paketb').innerHTML = setupPaketb.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Setup Acc')`)).join('');
    document.getElementById('note-paketb').innerHTML = `<strong>ISI:</strong> BIO, DISPLAY NAME, LOCATION, TITLE KATALOG<br><strong>ADD-ON DECO:</strong> 3 SLIDE (+RP. 6.000) | 6 SLIDE (+RP. 7.000)`;

    const setupPaketc = [
        {n: "SETUP COMPLITE C (SHORT)", p: "RP. 15.000"},
        {n: "SETUP COMPLITE C (MEDIUM)", p: "RP. 18.000"},
        {n: "SETUP COMPLITE C (LONG)", p: "RP. 21.000"}
    ];
    document.getElementById('grid-setup-paketc').innerHTML = setupPaketc.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Setup Acc')`)).join('');
    document.getElementById('note-paketc').innerHTML = `<strong>ISI:</strong> BIO, DISPLAY NAME, LOCATION, FAKE IG, TITLE KATALOG<br><strong>ADD-ON DECO:</strong> 3 SLIDE (+RP. 6.000) | 6 SLIDE (+RP. 7.000)`;

    const setupBirthday = [
        {n: "BIRTHDAY PACK (SHORT)", p: "RP. 12.000"},
        {n: "BIRTHDAY PACK (MEDIUM)", p: "RP. 15.000"},
        {n: "BIRTHDAY PACK (LONG)", p: "RP. 18.000"}
    ];
    document.getElementById('grid-setup-birthday').innerHTML = setupBirthday.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Setup Acc')`)).join('');
    document.getElementById('note-birthday').innerHTML = `<strong>ISI:</strong> TWIBBON BIRTHDAY, STIKER BIRTHDAY, WORDING BIRTHDAY`;

    document.getElementById('setup-general-notes').innerHTML = `
        <strong>NOTE & KETENTUAN SETUP ACC:</strong><br>
        • SHORT, MEDIUM, DAN LONG MENYESUAIKAN DETAIL ISI SETUP.<br>
        • ISI SETUP MENYESUAIKAN MENU YANG DIPILIH.<br>
        • STIKER BIRTHDAY BERISI 5 STIKER.<br>
        • TAMBAHAN STIKER DIKENAKAN BIAYA RP2.000 / STIKER.<br>
        • HARGA PACK LEBIH HEMAT DARIPADA ORDER SATUAN.<br>
        • REVISI MAKSIMAL 3X.
    `;

    // 6. APP PREMIUM
    const amData = [{n:"AM ANDROID 1B",p:"RP. 2.000"},{n:"AM IOS 1B",p:"RP. 2.000"},{n:"APPLE MUSIC IOS 1B",p:"RP. 4.500"},{n:"APPLE MUSIC ANDROID 1B",p:"RP. 9.000"},{n:"APPLE MUSIC FAMHEAD 1B",p:"RP. 10.000"}];
    document.getElementById('grid-am').innerHTML = amData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    const spotData = [{n:"SPOTIFY 1B INDPLAN",p:"RP. 15.500"},{n:"SPOTIFY 1B FAMPLAN",p:"RP. 19.500"},{n:"YOUTUBE 1B AB",p:"RP. 3.000"},{n:"YOUTUBE 1B AA",p:"RP. 14.000"},{n:"ZOOM 7H",p:"RP. 4.500"},{n:"ZOOM 2M",p:"RP. 5.500"}];
    document.getElementById('grid-spot').innerHTML = spotData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    const editAppData = [{n:"CANVA 1B MEM",p:"RP. 1.500"},{n:"CANVA IT MEM",p:"RP. 9.000"},{n:"CANVA LIFETIME MEM",p:"RP. 10.000"},{n:"CANVA 1B OWN",p:"RP. 7.000"},{n:"CAPCUT 7H SHAR",p:"RP. 4.000"},{n:"CAPCUT 1B SHAR",p:"RP. 21.000"},{n:"CAPCUT 7H PRIV",p:"RP. 5.000"},{n:"CAPCUT 1B PRIV",p:"RP. 28.000"},{n:"PICSART 7H SHAR",p:"RP. 4.000"},{n:"PICSART 1B SHAR",p:"RP. 8.000"},{n:"PICSART 7H PRIV",p:"RP. 5.500"},{n:"PICSART 1B PRIV",p:"RP. 33.500"},{n:"REMINI 7H SHAR",p:"RP. 5.500"},{n:"REMINI 7H PRIV",p:"RP. 6.000"},{n:"REMINI 1B WEB",p:"RP. 11.000"},{n:"MEITU 14H",p:"RP. 6.000"},{n:"MEITU 1B",p:"RP. 20.500"}];
    document.getElementById('grid-editapp').innerHTML = editAppData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    const streamData = [{n:"NETLIX 2U10",p:"RP. 17.000"},{n:"NETFLIX 1U1P",p:"RP. 31.000"},{n:"NETFLIX 1B PRIV",p:"RP. 140.000"},{n:"DISNEY 2U1P",p:"RP. 16.000"},{n:"DISNEY 1U1P",p:"RP. 22.500"},{n:"DISNEY 1B PRIV",p:"RP. 127.500"},{n:"HBO 1U1P",p:"RP. 14.000"},{n:"HBO 1U1P (2)",p:"RP. 23.000"},{n:"HBO 1B PRIV",p:"RP. 64.500"},{n:"PRIME VID 1B SHAR",p:"RP. 4.000"},{n:"PRIME VID 1B PRIV",p:"RP. 9.000"},{n:"BSTATION 1B PRIV",p:"RP. 25.500"},{n:"BSTATION 1B SHAR",p:"RP. 9.000"},{n:"IQIYI 1B SHAR",p:"RP. 10.500"},{n:"IQIYI 1B PRIV",p:"RP. 28.000"},{n:"LOKLOK 1B SHAR",p:"RP. 16.000"},{n:"LOKLOK 1B PRIV",p:"RP. 39.500"},{n:"VIDEO PL 1B SHAR",p:"RP. 17.000"},{n:"VIDEO PL 1B TV ONLY",p:"RP. 9.000"},{n:"VIDEO MOBILE 1B",p:"RP. 55.000"},{n:"VIDEO PL 1B PRIV",p:"RP. 38.000"},{n:"VIU 1H",p:"RP. 1.500"},{n:"VIU 1B",p:"RP. 1.500"},{n:"VIU 3B",p:"RP. 2.000"},{n:"VIU LT",p:"RP. 4.000"},{n:"VIU PAKET 10ACC",p:"RP. 4.000"},{n:"WETV 6U SHAR",p:"RP. 6.000"},{n:"WETV 1B SHAR",p:"RP. 16.000"},{n:"WETV 1B PRIV",p:"RP. 27.500"},{n:"YOUKU 1B SHAR",p:"RP. 6.000"},{n:"YOUKU 1B PRIV",p:"RP. 24.500"},{n:"WINK 7H",p:"RP. 5.000"},{n:"WINK 1B",p:"RP. 25.000"}];
    document.getElementById('grid-stream').innerHTML = streamData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    const aiData = [{n:"BLACKBOX AI 14H SHAR",p:"RP. 6.000"},{n:"BLACKBOX AI 1B SHAR",p:"RP. 19.500"},{n:"BLACKBOX AI 1T PRIV",p:"RP. 185.500"},{n:"CHATGPT 14H SHAR",p:"RP. 30.500"},{n:"CHATGPT 1B SHAR",p:"RP. 54.500"},{n:"GEMINI 12B LINK",p:"RP. 16.000"},{n:"DUOLINGGO 7H",p:"RP. 4.000"},{n:"FIZZO 1B SHAR",p:"RP. 6.000"},{n:"SCRIBD 1B PRIV",p:"RP. 11.000"}];
    document.getElementById('grid-ai').innerHTML = aiData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    // 7. TOP UP GAME
    const aovLol = [{n:"TOPUP AOV 7V",p:"RP. 4.000"},{n:"TOPUP AOV 18V",p:"RP. 7.500"},{n:"TOPUP AOV 40V",p:"RP. 10.000"},{n:"TOPUP AOV 90V",p:"RP. 18.500"},{n:"TOPUP AOV 230V",p:"RP. 44.000"},{n:"TOPUP LOL 425WC",p:"RP. 54.000"},{n:"TOPUP LOL 1.000WC",p:"RP. 118.000"},{n:"TOPUP LOL 1.850WC",p:"RP. 212.000"},{n:"TOPUP LOL 3.275WC",p:"RP. 371.000"},{n:"TOPUP LOL 4.800WC",p:"RP. 530.000"}];
    document.getElementById('grid-aovlol').innerHTML = aovLol.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Top Up Game')`)).join('');

    const ffData = [{n:"TOPUP FF 5D",p:"RP. 2.000"},{n:"TOPUP FF 20D",p:"RP. 5.000"},{n:"TOPUP FF 50D",p:"RP. 8.500"},{n:"TOPUP FF 100D",p:"RP. 16.000"},{n:"TOPUP FF 500D",p:"RP. 61.000"},{n:"TOPUP FF BP CARD",p:"RP. 40.500"},{n:"TOPUP FF PASS L6",p:"RP. 6.000"},{n:"TOPUP FF PASS L25",p:"RP. 9.500"},{n:"TOPUP FF PASS L30",p:"RP. 14.500"},{n:"TOPUP FF PASS MINGGUAN",p:"RP. 27.500"},{n:"TOPUP FF PASS MINGGUAN + 100D",p:"RP. 40.500"},{n:"TOPUP FF PASS BULANAN + 20D",p:"RP. 84.000"},{n:"TOPUP FF PASS BULANAN X2",p:"RP. 159.500"},{n:"TOPUP FFMAX 5D",p:"RP. 2.000"},{n:"TOPUP FFMAX 100D",p:"RP. 14.000"},{n:"TOPUP FFMAX MEM BULANAN",p:"RP. 80.000"}];
    document.getElementById('grid-ff').innerHTML = ffData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Top Up Game')`)).join('');

    const hoyoData = [{n:"TOPUP GENSHIN WELKIN",p:"RP. 88.000"},{n:"TOPUP GENSHIN 60GC",p:"RP. 14.000"},{n:"TOPUP GENSHIN 300+30GC",p:"RP. 62.000"},{n:"TOPUP GENSHIN 6480+1600GC",p:"RP. 1.773.000"},{n:"TOPUP HONKAI ES",p:"RP. 84.500"},{n:"TOPUP HONKAI 60OS",p:"RP. 18.000"},{n:"TOPUP HONKAI 300+30OS",p:"RP. 84.500"},{n:"TOPUP HONKAI ALL PACK",p:"RP. 3.283.000"},{n:"TOPUP ZZZ INTER-KNOT",p:"RP. 81.500"},{n:"TOPUP ZZZ 60M",p:"RP. 18.000"},{n:"TOPUP ZZZ 300M",p:"RP. 81.500"},{n:"TOPUP ZZZ ALL PACK M",p:"RP. 3.275.500"}];
    document.getElementById('grid-hoyo').innerHTML = hoyoData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Top Up Game')`)).join('');

    const otherGames = [{n:"TOPUP ML 5D",p:"RP. 3.000"},{n:"TOPUP ML 100D",p:"RP. 21.500"},{n:"TOPUP ML AVT 1.499M",p:"RP. 251.000"},{n:"TOPUP PUBG 60UC",p:"RP. 17.000"},{n:"TOPUP PUBG 325UC",p:"RP. 77.500"},{n:"TOPUP ROBLOX GIFT 50K",p:"RP. 48.500"},{n:"TOPUP ROBLOX VR 100RB",p:"RP. 83.000"},{n:"TOPUP VALORAN 475VP",p:"RP. 54.500"},{n:"TOPUP VALORAN 1.000VP",p:"RP. 106.500"},{n:"TOPUP ZEPETO 14Z",p:"RP. 15.000"},{n:"TOPUP ZEPETO 58Z",p:"RP. 53.500"},{n:"WETV 25C",p:"RP. 5.000"},{n:"WETV 299C",p:"RP. 43.500"},{n:"WETV 1.099C",p:"RP. 154.000"}];
    document.getElementById('grid-othergames').innerHTML = otherGames.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Top Up Game')`)).join('');

    // 8. LAINNYA
    const lainnyaData = [
        {n: "NOKOS WHATSAPP", p: "RP. 5.500"},
        {n: "NOKOS TELEGRAM", p: "RP. 3.500"},
        {n: "SEWA BOT", p: "Start RP. 1.000"},
        {n: "SEWA BOT + PREM", p: "Start RP. 1.500"}
    ];
    document.getElementById('grid-lainnya').innerHTML = lainnyaData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Lainnya')`)).join('');
});