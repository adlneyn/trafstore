// Format Pesan WhatsApp
function orderViaWA(item, type) {
    const waNumber = "6285167971251";
    let textTemplate = "";

    if (type === 'Jaseb LPM' || type === 'Jaseb LPFP') {
        textTemplate = `Misi min mau mesen *${item}*

format
⸙ ꯭ ꯭ ꯭✦    Nama Pesanan   ─   ${item}
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

Tanyakan jika ada pertanyaan, sabar pasti akan di jawab`;
    } else if (type === 'Editing' || type === 'Wording') {
        textTemplate = `Misi min mau mesen *${item}*

format
FORMAT EDITING DAN WORDING
⸙ ꯭ ꯭ ꯭✦    Jenis Pesanan   ─   ${type}
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

Jika ada yang ingin ditanyakan langsung tanyakan, harap bersabar pasti akan di balas`;
    } else if (type === 'App Premium' || type === 'Top Up Game') {
        textTemplate = `Misi min, mesen *${item}* ready gak min?`;
    } else if (type === 'Lainnya') {
        textTemplate = `Misi min, mau mesen *${item}* ada min?`;
    }

    const encodedText = encodeURIComponent(textTemplate);
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, "_blank");
}

function askAdmin() {
    window.open(`https://wa.me/6285167971251?text=${encodeURIComponent("Misi min, izin nanya dong")}`, "_blank");
}

// Render Menu ke HTML
document.addEventListener("DOMContentLoaded", () => {
    
    const renderCard = (title, price, onclickAction) => `
        <div onclick="${onclickAction}" class="bg-white p-3.5 rounded-2xl border border-slate-200/80 card-hover flex justify-between items-center cursor-pointer group shadow-sm">
            <div class="pr-2">
                <h3 class="font-bold text-xs sm:text-sm text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">${title}</h3>
                ${price ? `<p class="text-xs font-semibold text-blue-600 mt-0.5">RP. ${price}</p>` : ''}
            </div>
            <div class="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 flex items-center justify-center transition-all flex-shrink-0 text-xs shadow-inner">
                <i class="fa-solid fa-arrow-right-long group-hover:translate-x-0.5 transition-transform"></i>
            </div>
        </div>
    `;

    // 1. JASEB LPM
    const lpmData = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];
    document.getElementById('grid-lpm').innerHTML = lpmData.map(num => renderCard(`${num} LPM`, num, `orderViaWA('${num} LPM', 'Jaseb LPM')`)).join('');

    // 2. JASEB LPFP
    const lpfpPrices = {50:75, 100:125, 150:175, 200:225, 250:275, 300:325, 350:375, 400:425, 450:475, 500:525, 550:575, 600:625, 650:675, 700:725, 750:775, 800:825, 850:875, 900:925, 950:975, 1000:1025};
    document.getElementById('grid-lpfp').innerHTML = Object.entries(lpfpPrices).map(([num, price]) => renderCard(`${num} LPFP`, price, `orderViaWA('${num} LPFP', 'Jaseb LPFP')`)).join('');

    // 3. EDITING
    const editingData = ["PROFILE", "KATALOG", "SERTIFIKAT", "POSTER", "ID CARD", "TWINBON", "YEARBOOK", "MANIPS SELCA", "MANIPS HALF BODY", "MANIPS FULL BODY", "SCRIBBLE KISS", "SCRIBBLE HAFT", "SCRIBBLE FULL"];
    document.getElementById('grid-editing').innerHTML = editingData.map(item => renderCard(item, null, `orderViaWA('${item}', 'Editing')`)).join('');

    // 4. WORDING
    const wordingData = ["WORDING BIO", "WORDING PFP", "WORDING LOCATION", "WORDING DISPLAY NAME", "WORDING TITTLE KATALOG", "WORDING LIST GRUP", "WORDING BIRTHDAY", "WORDING UP-CHAR", "WORDING LIST HASTAG", "WORDING DESC GRUP", "WORDING DESC KATALOG"];
    document.getElementById('grid-wording').innerHTML = wordingData.map(item => renderCard(item, null, `orderViaWA('${item}', 'Wording')`)).join('');

    // 5. APP PREMIUM
    const amData = [{n:"AM ANDROID 1B",p:"2.000"},{n:"AM IOS 1B",p:"2.000"},{n:"APPLE MUSIC IOS 1B",p:"4.500"},{n:"APPLE MUSIC ANDROID 1B",p:"9.000"},{n:"APPLE MUSIC FAMHEAD 1B",p:"10.000"}];
    document.getElementById('grid-am').innerHTML = amData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    const spotData = [{n:"SPOTIFY 1B INDPLAN",p:"15.500"},{n:"SPOTIFY 1B FAMPLAN",p:"19.500"},{n:"YOUTUBE 1B AB",p:"3.000"},{n:"YOUTUBE 1B AA",p:"14.000"},{n:"ZOOM 7H",p:"4.500"},{n:"ZOOM 2M",p:"5.500"}];
    document.getElementById('grid-spot').innerHTML = spotData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    const editAppData = [{n:"CANVA 1B MEM",p:"1.500"},{n:"CANVA IT MEM",p:"9.000"},{n:"CANVA LIFETIME MEM",p:"10.000"},{n:"CANVA 1B OWN",p:"7.000"},{n:"CAPCUT 7H SHAR",p:"4.000"},{n:"CAPCUT 1B SHAR",p:"21.000"},{n:"CAPCUT 7H PRIV",p:"5.000"},{n:"CAPCUT 1B PRIV",p:"28.000"},{n:"PICSART 7H SHAR",p:"4.000"},{n:"PICSART 1B SHAR",p:"8.000"},{n:"PICSART 7H PRIV",p:"5.500"},{n:"PICSART 1B PRIV",p:"33.500"},{n:"REMINI 7H SHAR",p:"5.500"},{n:"REMINI 7H PRIV",p:"6.000"},{n:"REMINI 1B WEB",p:"11.000"},{n:"MEITU 14H",p:"6.000"},{n:"MEITU 1B",p:"20.500"}];
    document.getElementById('grid-editapp').innerHTML = editAppData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    const streamData = [{n:"NETLIX 2U10",p:"17.000"},{n:"NETFLIX 1U1P",p:"31.000"},{n:"NETFLIX 1B PRIV",p:"140.000"},{n:"DISNEY 2U1P",p:"16.000"},{n:"DISNEY 1U1P",p:"22.500"},{n:"DISNEY 1B PRIV",p:"127.500"},{n:"HBO 1U1P",p:"14.000"},{n:"HBO 1U1P (2)",p:"23.000"},{n:"HBO 1B PRIV",p:"64.500"},{n:"PRIME VID 1B SHAR",p:"4.000"},{n:"PRIME VID 1B PRIV",p:"9.000"},{n:"BSTATION 1B PRIV",p:"25.500"},{n:"BSTATION 1B SHAR",p:"9.000"},{n:"IQIYI 1B SHAR",p:"10.500"},{n:"IQIYI 1B PRIV",p:"28.000"},{n:"LOKLOK 1B SHAR",p:"16.000"},{n:"LOKLOK 1B PRIV",p:"39.500"},{n:"VIDEO PL 1B SHAR",p:"17.000"},{n:"VIDEO PL 1B TV ONLY",p:"9.000"},{n:"VIDEO MOBILE 1B",p:"55.000"},{n:"VIDEO PL 1B PRIV",p:"38.000"},{n:"VIU 1H",p:"1.500"},{n:"VIU 1B",p:"1.500"},{n:"VIU 3B",p:"2.000"},{n:"VIU LT",p:"4.000"},{n:"VIU PAKET 10ACC",p:"4.000"},{n:"WETV 6U SHAR",p:"6.000"},{n:"WETV 1B SHAR",p:"16.000"},{n:"WETV 1B PRIV",p:"27.500"},{n:"YOUKU 1B SHAR",p:"6.000"},{n:"YOUKU 1B PRIV",p:"24.500"},{n:"WINK 7H",p:"5.000"},{n:"WINK 1B",p:"25.000"}];
    document.getElementById('grid-stream').innerHTML = streamData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    const aiData = [{n:"BLACKBOX AI 14H SHAR",p:"6.000"},{n:"BLACKBOX AI 1B SHAR",p:"19.500"},{n:"BLACKBOX AI 1T PRIV",p:"185.500"},{n:"CHATGPT 14H SHAR",p:"30.500"},{n:"CHATGPT 1B SHAR",p:"54.500"},{n:"GEMINI 12B LINK",p:"16.000"},{n:"DUOLINGGO 7H",p:"4.000"},{n:"FIZZO 1B SHAR",p:"6.000"},{n:"SCRIBD 1B PRIV",p:"11.000"}];
    document.getElementById('grid-ai').innerHTML = aiData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'App Premium')`)).join('');

    // 6. TOP UP GAME
    const aovLol = [{n:"TOPUP AOV 7V",p:"4.000"},{n:"TOPUP AOV 18V",p:"7.500"},{n:"TOPUP AOV 40V",p:"10.000"},{n:"TOPUP AOV 90V",p:"18.500"},{n:"TOPUP AOV 230V",p:"44.000"},{n:"TOPUP LOL 425WC",p:"54.000"},{n:"TOPUP LOL 1.000WC",p:"118.000"},{n:"TOPUP LOL 1.850WC",p:"212.000"},{n:"TOPUP LOL 3.275WC",p:"371.000"},{n:"TOPUP LOL 4.800WC",p:"530.000"}];
    document.getElementById('grid-aovlol').innerHTML = aovLol.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Top Up Game')`)).join('');

    const ffData = [{n:"TOPUP FF 5D",p:"2.000"},{n:"TOPUP FF 20D",p:"5.000"},{n:"TOPUP FF 50D",p:"8.500"},{n:"TOPUP FF 100D",p:"16.000"},{n:"TOPUP FF 500D",p:"61.000"},{n:"TOPUP FF BP CARD",p:"40.500"},{n:"TOPUP FF PASS L6",p:"6.000"},{n:"TOPUP FF PASS L25",p:"9.500"},{n:"TOPUP FF PASS L30",p:"14.500"},{n:"TOPUP FF PASS MINGGUAN",p:"27.500"},{n:"TOPUP FF PASS MINGGUAN + 100D",p:"40.500"},{n:"TOPUP FF PASS BULANAN + 20D",p:"84.000"},{n:"TOPUP FF PASS BULANAN X2",p:"159.500"},{n:"TOPUP FFMAX 5D",p:"2.000"},{n:"TOPUP FFMAX 100D",p:"14.000"},{n:"TOPUP FFMAX MEM BULANAN",p:"80.000"}];
    document.getElementById('grid-ff').innerHTML = ffData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Top Up Game')`)).join('');

    const hoyoData = [{n:"TOPUP GENSHIN WELKIN",p:"88.000"},{n:"TOPUP GENSHIN 60GC",p:"14.000"},{n:"TOPUP GENSHIN 300+30GC",p:"62.000"},{n:"TOPUP GENSHIN 6480+1600GC",p:"1.773.000"},{n:"TOPUP HONKAI ES",p:"84.500"},{n:"TOPUP HONKAI 60OS",p:"18.000"},{n:"TOPUP HONKAI 300+30OS",p:"84.500"},{n:"TOPUP HONKAI ALL PACK",p:"3.283.000"},{n:"TOPUP ZZZ INTER-KNOT",p:"81.500"},{n:"TOPUP ZZZ 60M",p:"18.000"},{n:"TOPUP ZZZ 300M",p:"81.500"},{n:"TOPUP ZZZ ALL PACK M",p:"3.275.500"}];
    document.getElementById('grid-hoyo').innerHTML = hoyoData.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Top Up Game')`)).join('');

    const otherGames = [{n:"TOPUP ML 5D",p:"3.000"},{n:"TOPUP ML 100D",p:"21.500"},{n:"TOPUP ML AVT 1.499M",p:"251.000"},{n:"TOPUP PUBG 60UC",p:"17.000"},{n:"TOPUP PUBG 325UC",p:"77.500"},{n:"TOPUP ROBLOX GIFT 50K",p:"48.500"},{n:"TOPUP ROBLOX VR 100RB",p:"83.000"},{n:"TOPUP VALORAN 475VP",p:"54.500"},{n:"TOPUP VALORAN 1.000VP",p:"106.500"},{n:"TOPUP ZEPETO 14Z",p:"15.000"},{n:"TOPUP ZEPETO 58Z",p:"53.500"},{n:"WETV 25C",p:"5.000"},{n:"WETV 299C",p:"43.500"},{n:"WETV 1.099C",p:"154.000"}];
    document.getElementById('grid-othergames').innerHTML = otherGames.map(i => renderCard(i.n, i.p, `orderViaWA('${i.n}', 'Top Up Game')`)).join('');

    // 7. LAINNYA
    const lainnyaData = ["NOKOS", "SEWA BOT", "KEBSOS WA", "KEBSOS TELEGRAM", "KEBSOS INSTAGRAM", "KEBSOS TIKTOK", "KEBSOS FACEBOOK"];
    document.getElementById('grid-lainnya').innerHTML = lainnyaData.map(item => renderCard(item, null, `orderViaWA('${item}', 'Lainnya')`)).join('');
});