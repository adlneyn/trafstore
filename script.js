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
            let waNumber = "6285167971251"; // Nomor utama untuk Lainnya, Hiring
            if (type === 'Jaseb LPM' || type === 'Jaseb LPFP' || type === 'Editing' || type === 'Wording' || type === 'Setup Acc') {
                waNumber = "6283876026185"; // Nomor kasir baru
            }

            let textTemplate = "";

            if (type === 'Jaseb LPM' || type === 'Jaseb LPFP') {
                textTemplate = `Misi min mau mesen *${item}*

FORMAT JASA SEBAR LPM/LPFP [PASTIKAN MEMESAN DI JAM KERJA [09.00 - 23.00 WIB]]

⸙ ꯭ ꯭ ꯭✦    Nama Pemesanan   ─   
⸙ ꯭ ꯭ ꯭✦    Nomor   ─   08 (wajib diisi)
⸙ ꯭ ꯭ ꯭✦    Banyak   ─   ${item}
⸙ ꯭ ꯭ ꯭✦    Hari   ─   1/2/3/4/5/6/7 Day
⸙ ꯭ ꯭ ꯭✦    Sebar   ─   1×/2×/3×
> Sesi 01: 09.00 - 00.00 WIB
> Sesi 02 : 00.00 - 00.00 WIB
> Sesi 03 : 00.00 - 23.00 WIB
> n. ISI JIKA MEMAKAI SESI, WAJIB DI JAM KERJA
⸙ ꯭ ꯭ ꯭✦    Fee+   ─   Tidak/Foto/Video/Store/1821+
⸙ ꯭ ꯭ ꯭✦    Waktu   ─   Inrush/Tidak
⸙ ꯭ ꯭ ꯭✦    Screenshot   ─   Panjang/Pendek/Tidak

LANGSUNG KIRIM LIST MU
Inrush: +100
Store: +100
1821+: +100
Bervideo: +50
Berfoto: +25

Jika dalam 1 jam tidak dibalas, harap chat kembali, terima kasih.
Kontak pengaduan: 085167971251.`;
            } else if (type === 'Editing' || type === 'Wording' || type === 'Setup Acc') {
                textTemplate = `Misi min mau mesen *${item}*

        
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

Jika dalam 1 jam tidak dibalas, harap chat kembali, terima kasih.
Kontak pengaduan: 085167971251.`;
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
                <div onclick="${onclickAction}" class="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/80 card-hover flex justify-between items-center cursor-pointer group shadow-sm">
                    <div class="pr-2">
                        <h3 class="font-bold text-xs sm:text-sm text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">${title}</h3>
                        ${price ? `<p class="text-xs font-semibold text-blue-600 mt-0.5">${price}</p>` : ''}
                    </div>
                    <div class="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 flex items-center justify-center transition-all flex-shrink-0 text-xs shadow-inner">
                        <i class="fa-solid fa-arrow-right-long group-hover:translate-x-0.5 transition-transform"></i>
                    </div>
                </div>
            `;

            const renderSubHeader = (title) => `
                <div class="col-span-full pt-4 pb-1">
                    <h4 class="text-xs font-bold text-blue-800 tracking-wider uppercase bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200/60">${title}</h4>
                </div>
            `;

            // 1. JASEB LPM
            const lpmPrices = {50:80, 100:130, 150:180, 200:230, 250:280, 300:330, 350:380, 400:430, 450:480, 500:530, 550:580, 600:630, 650:680, 700:730, 750:780, 800:830, 850:880, 900:930, 950:980, 1000:1030};
            document.getElementById('grid-lpm').innerHTML = Object.entries(lpmPrices).map(([num, price]) => renderCard(`${num} LPM`, `Rp${price.toLocaleString('id-ID')}`, `orderViaWA('${num} LPM', 'Jaseb LPM')`)).join('');

            // 2. JASEB LPFP
            const lpfpPrices = {50:100, 100:200, 150:350, 200:400, 250:500, 300:600, 350:700, 400:800, 450:900, 500:1000, 550:1100, 600:1200, 650:1300, 700:1400, 750:1500, 800:1600, 850:1700, 900:1800, 950:1900, 1000:2000};
            document.getElementById('grid-lpfp').innerHTML = Object.entries(lpfpPrices).map(([num, price]) => renderCard(`${num} LPFP`, `Rp${price.toLocaleString('id-ID')}`, `orderViaWA('${num} LPFP', 'Jaseb LPFP')`)).join('');

            // 3. EDITING
            const renderGroupedCards = (groups) => {
                let html = '';
                groups.forEach(g => {
                    html += renderSubHeader(g.header);
                    g.items.forEach(i => {
                        html += renderCard(i.n, i.p, `orderViaWA('${g.header.replace(/[-]/g, '').trim()} — ${i.n}', 'Editing')`);
                    });
                });
                return html;
            };

            const editAccountGroups = [
                { header: "- PROFILE", items: [{n: "SIMPLE", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "FULL", p: "Rp11.000"}] },
                { header: "- MOODBOARD BASIC + HEADER", items: [{n: "3 SLIDE", p: "Rp4.000"}, {n: "6 SLIDE", p: "Rp8.000"}] },
                { header: "- MOODBOARD DECO SIMPLE + HEADER", items: [{n: "3 SLIDE", p: "Rp8.000"}, {n: "6 SLIDE", p: "Rp12.000"}] },
                { header: "- MOODBOARD DECO MEDIUM + HEADER", items: [{n: "3 SLIDE", p: "Rp12.000"}, {n: "6 SLIDE", p: "Rp16.000"}] },
                { header: "- MOODBOARD DECO FULL + HEADER", items: [{n: "3 SLIDE", p: "Rp16.000"}, {n: "6 SLIDE", p: "Rp20.000"}] },
                { header: "- LOVEBOARD DECO SIMPLE + HEADER", items: [{n: "3 SLIDE", p: "Rp8.000"}, {n: "6 SLIDE", p: "Rp12.000"}] },
                { header: "- LOVEBOARD DECO MEDIUM + HEADER", items: [{n: "3 SLIDE", p: "Rp12.000"}, {n: "6 SLIDE", p: "Rp16.000"}] },
                { header: "- LOVEBOARD DECO FULL + HEADER", items: [{n: "3 SLIDE", p: "Rp16.000"}, {n: "6 SLIDE", p: "Rp20.000"}] }
            ];

            const editRandomGroups = [
                { header: "- MANIPS", items: [{n: "SELCA", p: "Rp2.000"}, {n: "HALF BODY", p: "Rp5.000"}, {n: "FULL BODY", p: "Rp8.000"}, {n: "REALITIS", p: "Rp12.000"}, {n: "COMPLEX", p: "Rp15.000+"}] },
                { header: "- SCRIBBLE", items: [{n: "SIMPLE", p: "Rp1.000"}, {n: "MEDIUM", p: "Rp4.000"}, {n: "FULL", p: "Rp7.000"}] }
            ];

            const editCoupleGroups = [
                { header: "- WALLPAPER COUPLE", items: [{n: "SIMPLE", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "FULL", p: "Rp11.000"}] },
                { header: "- CYBER COUPLE", items: [{n: "SIMPLE", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "FULL", p: "Rp9.000"}] },
                { header: "- POLAROID PHOTO", items: [{n: "SIMPLE", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "FULL", p: "Rp11.000"}] },
                { header: "- CLOSE UP FOTBAR", items: [{n: "SIMPLE", p: "Rp2.000"}, {n: "MEDIUM", p: "Rp5.000"}, {n: "FULL", p: "Rp8.000"}] }
            ];

            const editGroupGroups = [
                { header: "- ID CARD", items: [{n: "SIMPLE", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "FULL", p: "Rp11.000"}] },
                { header: "- TWINBON", items: [{n: "SIMPLE", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "FULL", p: "Rp9.000"}] },
                { header: "- TWINBON BDAY", items: [{n: "SIMPLE", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "FULL", p: "Rp11.000"}] },
                { header: "- TEMPLATE EVENT", items: [{n: "SIMPLE", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "FULL", p: "Rp9.000"}] },
                { header: "- TEMPLATE BDAY", items: [{n: "SIMPLE", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "FULL", p: "Rp11.000"}] },
                { header: "- TICKET DONE", items: [{n: "SIMPLE", p: "Rp2.000"}, {n: "MEDIUM", p: "Rp5.000"}, {n: "FULL", p: "Rp8.000"}] },
                { header: "- SURAT HAK PATEN", items: [{n: "SIMPLE", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "FULL", p: "Rp9.000"}] },
                { header: "- RAPORT", items: [{n: "SIMPLE", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "FULL", p: "Rp9.000"}] },
                { header: "- SERTIFIKAT", items: [{n: "SIMPLE", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "FULL", p: "Rp9.000"}] },
                { header: "- ARTIKEL NON-MATERI", items: [{n: "SIMPLE", p: "Rp2.000"}, {n: "MEDIUM", p: "Rp5.000"}, {n: "FULL", p: "Rp8.000"}] },
                { header: "- ARTIKEL WITH-MATERI", items: [{n: "SIMPLE", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "FULL", p: "Rp11.000"}] },
                { header: "- YEARBOOK", items: [{n: "SIMPLE", p: "Rp8.000"}, {n: "MEDIUM", p: "Rp11.000"}, {n: "FULL", p: "Rp14.000"}] }
            ];

            document.getElementById('grid-edit-account').innerHTML = renderGroupedCards(editAccountGroups);
            document.getElementById('grid-edit-random').innerHTML = renderGroupedCards(editRandomGroups);
            document.getElementById('grid-edit-couple').innerHTML = renderGroupedCards(editCoupleGroups);
            document.getElementById('grid-edit-group').innerHTML = renderGroupedCards(editGroupGroups);

            document.getElementById('editing-general-notes').innerHTML = `
                <strong>ADDITION / TAMBAHAN:</strong><br>
                • EXTRA CHR: +RP1.500 / SLIDE<br>
                • SIMPLE EDIT: +RP2.000 / SLIDE<br>
                • FULL EDIT: +RP3.000 / SLIDE<br><br>
                <strong>NOTE & KETENTUAN EDITING:</strong><br>
                • HARGA BERDASARKAN PANJANG DAN TINGKAT KESULITAN.<br>
                • REVISI MAKSIMAL 3X.<br>
                • PENGERJAAN MENYESUAIKAN ANTRIAN ORDER.
            `;

            // 4. WORDING
            const wordingGroups = [
                { header: "— WORDING PACK BIASA [BIO + DN + LOC] —", items: [{n: "SHORT", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "LONG", p: "Rp11.000"}] },
                { header: "— WORDING PACK COMPLETE [BIO + DN + LOC + TITLE KATALOG + FAKE IG] —", items: [{n: "SHORT", p: "Rp12.000"}, {n: "MEDIUM", p: "Rp15.000"}, {n: "LONG", p: "Rp18.000"}] },
                { header: "— WORDING BIO —", items: [{n: "SHORT", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "LONG", p: "Rp9.000"}] },
                { header: "— WORDING PFP —", items: [{n: "SHORT", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "LONG", p: "Rp9.000"}] },
                { header: "— WORDING LOCATION —", items: [{n: "SHORT", p: "Rp1.000"}, {n: "MEDIUM", p: "Rp4.000"}, {n: "LONG", p: "Rp7.000"}] },
                { header: "— WORDING DISPLAY NAME —", items: [{n: "SHORT", p: "Rp1.000"}, {n: "MEDIUM", p: "Rp4.000"}, {n: "LONG", p: "Rp7.000"}] },
                { header: "— WORDING TITLE KATALOG —", items: [{n: "SHORT", p: "Rp2.000"}, {n: "MEDIUM", p: "Rp5.000"}, {n: "LONG", p: "Rp8.000"}] },
                { header: "— WORDING LIST GROUP —", items: [{n: "SHORT", p: "Rp7.000"}, {n: "MEDIUM", p: "Rp9.000"}, {n: "LONG", p: "Rp12.000"}] },
                { header: "— WORDING BIRTHDAY —", items: [{n: "SHORT", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "LONG", p: "Rp9.000"}] },
                { header: "— WORDING UP-CHR —", items: [{n: "SHORT", p: "Rp2.000"}, {n: "MEDIUM", p: "Rp5.000"}, {n: "LONG", p: "Rp9.000"}] },
                { header: "— WORDING HASHTAG —", items: [{n: "SHORT", p: "Rp4.000"}, {n: "MEDIUM", p: "Rp7.000"}, {n: "LONG", p: "Rp9.000"}] },
                { header: "— WORDING DESK GROUP —", items: [{n: "SHORT", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "LONG", p: "Rp11.000"}] },
                { header: "— WORDING DESK KATALOG —", items: [{n: "SHORT", p: "Rp5.000"}, {n: "MEDIUM", p: "Rp8.000"}, {n: "LONG", p: "Rp11.000"}] },
                { header: "— WORDING FAKE IG —", items: [{n: "SHORT", p: "Rp1.000"}, {n: "MEDIUM", p: "Rp4.000"}, {n: "LONG", p: "Rp7.000"}] }
            ];

            let wordingHtml = '';
            wordingGroups.forEach(g => {
                wordingHtml += renderSubHeader(g.header);
                g.items.forEach(i => {
                    wordingHtml += renderCard(i.n, i.p, `orderViaWA('${g.header.replace(/[—]/g, '').trim()} — ${i.n}', 'Wording')`);
                });
            });
            document.getElementById('grid-wording').innerHTML = wordingHtml;

            document.getElementById('wording-general-notes').innerHTML = `
                <strong>NOTE & KETENTUAN WORDING:</strong><br>
                • HARGA BERDASARKAN PANJANG WORDING DAN TINGKAT KESULITAN.<br>
                • REVISI MAKSIMAL 3X.<br>
                • PENGERJAAN MENYESUAIKAN ANTRIAN ORDER.
            `;

            // 5. SETUP ACC
            const setupPaketa = [
                {n: "SHORT", p: "RP10.000"},
                {n: "MEDIUM", p: "RP12.000"},
                {n: "LONG", p: "RP15.000"}
            ];
            document.getElementById('grid-setup-paketa').innerHTML = setupPaketa.map(i => renderCard(i.n, i.p, `orderViaWA('Setup Paket A (${i.n})', 'Setup Acc')`)).join('');
            document.getElementById('note-paketa').innerHTML = `<strong>ISI:</strong> BIO, DISPLAY NAME, LOCATION<br><strong>ADD-ON DECO:</strong> DECO 3 SLIDE (+RP6.000) | DECO 6 SLIDE (+RP7.000)`;

            const setupPaketb = [
                {n: "SHORT", p: "RP12.000"},
                {n: "MEDIUM", p: "RP14.000"},
                {n: "LONG", p: "RP17.000"}
            ];
            document.getElementById('grid-setup-paketb').innerHTML = setupPaketb.map(i => renderCard(i.n, i.p, `orderViaWA('Setup Paket B (${i.n})', 'Setup Acc')`)).join('');
            document.getElementById('note-paketb').innerHTML = `<strong>ISI:</strong> BIO, DISPLAY NAME, LOCATION, TITLE KATALOG<br><strong>ADD-ON DECO:</strong> DECO 3 SLIDE (+RP6.000) | DECO 6 SLIDE (+RP7.000)`;

            const setupPaketc = [
                {n: "SHORT", p: "RP15.000"},
                {n: "MEDIUM", p: "RP18.000"},
                {n: "LONG", p: "RP21.000"}
            ];
            document.getElementById('grid-setup-paketc').innerHTML = setupPaketc.map(i => renderCard(i.n, i.p, `orderViaWA('Setup Paket C (${i.n})', 'Setup Acc')`)).join('');
            document.getElementById('note-paketc').innerHTML = `<strong>ISI:</strong> BIO, DISPLAY NAME, LOCATION, FAKE IG, TITLE KATALOG<br><strong>ADD-ON DECO:</strong> DECO 3 SLIDE (+RP6.000) | DECO 6 SLIDE (+RP7.000)`;

            const setupBirthday = [
                {n: "SHORT", p: "RP12.000"},
                {n: "MEDIUM", p: "RP15.000"},
                {n: "LONG", p: "RP18.000"}
            ];
            document.getElementById('grid-setup-birthday').innerHTML = setupBirthday.map(i => renderCard(i.n, i.p, `orderViaWA('Birthday Pack (${i.n})', 'Setup Acc')`)).join('');
            document.getElementById('note-birthday').innerHTML = `<strong>ISI:</strong> TWIBBON BIRTHDAY, STIKER BIRTHDAY, WORDING BIRTHDAY`;

            document.getElementById('setup-general-notes').innerHTML = `
                <strong>NOTE & KETENTUAN SETUP ACC:</strong><br>
                • STIKER BIRTHDAY BERISI 5 STIKER.<br>
                • TAMBAHAN STIKER DIKENAKAN BIAYA RP2.000 / STIKER.<br>
                • REVISI MAKSIMAL 3X.
            `;

            // 6. LAINNYA
            const lainnyaData = [
                {n: "NOKOS WHATSAPP", p: "Rp5.500"},
                {n: "NOKOS TELEGRAM", p: "Rp3.500"},
                {n: "SEWA BOT", p: "Start Rp1.000"},
                {n: "SEWA BOT + PREM", p: "Start Rp1.500"}
            ];
            document.getElementById('grid-lainnya').innerHTML = lainnyaData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Lainnya')`)).join('');
        });
