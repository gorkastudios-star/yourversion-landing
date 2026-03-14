/* YourVersion – Setlist Builder + Booking Form (browser/CDN build) */
const { useState, useMemo, useEffect, useRef } = React;

/* ── Inline Lucide-style icon components ── */
const I = ({ children, size = 24, sw = 2, className = "" }) => (
  React.createElement('svg', {xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:sw,strokeLinecap:"round",strokeLinejoin:"round",className}, children)
);
const SearchIcon = (p) => <I {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></I>;
const Plus = (p) => <I {...p}><path d="M5 12h14"/><path d="M12 5v14"/></I>;
const Trash2 = (p) => <I {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></I>;
const ArrowUp = (p) => <I {...p}><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></I>;
const ArrowDown = (p) => <I {...p}><path d="m19 12-7 7-7-7"/><path d="M12 5v14"/></I>;
const Check = (p) => <I {...p}><path d="M20 6 9 17l-5-5"/></I>;
const ChevronRight = (p) => <I {...p}><path d="m9 18 6-6-6-6"/></I>;
const ChevronLeft = (p) => <I {...p}><path d="m15 18-6-6 6-6"/></I>;
const Clock = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></I>;
const RefreshCw = (p) => <I {...p}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></I>;
const MapPin = (p) => <I {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></I>;
const Users = (p) => <I {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></I>;
const Mail = (p) => <I {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></I>;
const Phone = (p) => <I {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></I>;
const Music = (p) => <I {...p}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></I>;
const Zap = (p) => <I {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></I>;

/* ── Song Data ── */
const RAW_PACKS = [
  {
    id: "poprock_es", name: "Pop-Rock Español",
    songs: [
      { title: "Devuélveme a mi chica", artist: "Hombres G" },
      { title: "La chica de ayer", artist: "Nacha Pop" },
      { title: "Déjame", artist: "Los Secretos" },
      { title: "Salta", artist: "Tequila" },
      { title: "Besos", artist: "El Canto del Loco" },
      { title: "A quién le importa", artist: "Alaska" },
      { title: "El roce de tu cuerpo", artist: "Platero y Tú" },
      { title: "Como Camarón", artist: "Estopa" },
      { title: "Baila Morena", artist: "Zucchero" },
      { title: "So payaso", artist: "Extremoduro" },
      { title: "Clavado en un bar", artist: "Maná" },
      { title: "Corazón espinado", artist: "Santana" },
      { title: "De música ligera", artist: "Soda Stereo" },
      { title: "Que te quería", artist: "La 5ª Estación" },
      { title: "Veneno en la piel", artist: "Radio Futura" },
      { title: "La casa por el tejado", artist: "Fito" },
      { title: "Los perros", artist: "Arde Bogotá" },
      { title: "Lágrimas desordenadas", artist: "Melendi" },
      { title: "El último vals", artist: "LODVG" },
      { title: "Todos me miran", artist: "Gloria Trevi" },
    ],
  },
  {
    id: "disney", name: 'Pack "Disney"',
    songs: [
      { title: "Hakuna Matata", artist: "Rey León" },
      { title: "We don't talk about Bruno", artist: "Encanto" },
      { title: "Let it go", artist: "Frozen" },
      { title: "Bajo el mar", artist: "La Sirenita" },
      { title: "Todo un hombre haré de ti", artist: "Mulán" },
      { title: "Best of both worlds", artist: "Hannah Montana" },
      { title: "This is me", artist: "Camp Rock" },
      { title: "Boop to the top", artist: "High School Musical" },
      { title: "La vaca lola", artist: "" },
      { title: "Colores en el viento", artist: "Pocahontas" },
      { title: "Hay un amigo en mí", artist: "Toy Story" },
    ],
  },
  {
    id: "los2000", name: "Los 2000",
    songs: [
      { title: "Boulevard of Broken Dreams", artist: "Green Day" },
      { title: "Me equivocaría otra vez", artist: "Fito" },
      { title: "Dani California", artist: "RHCP" },
      { title: "Seven Nation Army", artist: "TWS" },
      { title: "Take Me Out", artist: "Franz Ferdinand" },
      { title: "Left Outside Alone", artist: "Anastacia" },
      { title: "20 de enero", artist: "LODVG" },
      { title: "Nothing In My Way", artist: "Keane" },
      { title: "Barbie de extrarradio", artist: "Melendi" },
      { title: "Toxic", artist: "Britney Spears" },
      { title: "La camisa negra", artist: "Juanes" },
      { title: "Feel", artist: "Robbie Williams" },
      { title: "Bad Romance", artist: "Lady Gaga" },
      { title: "A Punk", artist: "Vampire Weekend" },
      { title: "Electric Feel", artist: "MGMT" },
      { title: "Don't Stop The Music", artist: "Rihanna" },
      { title: "Princesas", artist: "Pereza" },
      { title: "Tenía tanto", artist: "Nena Daconte" },
      { title: "Me gustas tú", artist: "Manu Chao" },
      { title: "La taberna de Buda", artist: "Café Quijano" },
    ],
  },
  {
    id: "noche_viernes", name: 'Pack "Noche de Viernes"',
    songs: [
      { title: "La bilirrubina", artist: "Juan L Guerra" },
      { title: "Livin' la vida loca", artist: "Ricky Martin" },
      { title: "Dancin Queen", artist: "Abba" },
      { title: "Dile", artist: "Don Omar" },
      { title: "Gasolina", artist: "Daddy Yankee" },
      { title: "Si antes te hubiera conocido", artist: "Karol G" },
      { title: "La macarena", artist: "Los del Río" },
      { title: "I gotta feeling", artist: "The Black Eyed Peas" },
      { title: "Don't stop me now", artist: "Queen" },
      { title: "Smooth Criminal", artist: "Michael Jackson" },
      { title: "La morocha", artist: "BM, Luck Ra" },
      { title: "Rasputin", artist: "Boney M" },
      { title: "Just Dance", artist: "Lady Gaga" },
      { title: "Corazón espinado", artist: "Maná" },
      { title: "Hey ya!", artist: "Outkast" },
    ],
  },
  {
    id: "puro_rock", name: 'Pack "Puro Rock"',
    songs: [
      { title: "Stand By", artist: "Extremoduro" },
      { title: "Por la boca vive el pez", artist: "Fito" },
      { title: "Hay poco rock and roll", artist: "Platero y Tú" },
      { title: "Salir", artist: "Extremoduro" },
      { title: "Nothing Else Matters", artist: "Metallica" },
      { title: "Livin' on a Prayer", artist: "Bon Jovi" },
      { title: "Another One", artist: "Queen" },
      { title: "20 abril", artist: "Celtas Cortos" },
      { title: "Déjame", artist: "Los Secretos" },
      { title: "A quién le importa", artist: "Alaska" },
      { title: "Entre dos tierras", artist: "Héroes del Silencio" },
      { title: "You Shook Me All Night Long", artist: "AC/DC" },
      { title: "Smell Like a Teen Spirit", artist: "Nirvana" },
      { title: "Du Hast", artist: "Rammstein" },
      { title: "Zombie", artist: "Cranberries" },
    ],
  },
  {
    id: "estandar", name: 'Pack "Estándar"',
    songs: [
      { title: "Princesas", artist: "Pereza" },
      { title: "Rosas", artist: "La Oreja de Van Gogh" },
      { title: "Zapatillas", artist: "Canto del Loco" },
      { title: "Cómo te atreves", artist: "Morat" },
      { title: "Carolina", artist: "Mclan" },
      { title: "Terriblemente Cruel", artist: "Leiva" },
      { title: "La tortura", artist: "Shakira & Alejandro Sanz" },
      { title: "Marry you", artist: "Bruno Mars" },
      { title: "Stand By", artist: "Extremoduro" },
      { title: "Como Camarón", artist: "Estopa" },
      { title: "Resurrección", artist: "Amaral" },
      { title: "Por la boca vive el pez", artist: "Fito" },
      { title: "Ametsatan", artist: "ETS" },
      { title: "Hay poco Rock&Roll", artist: "Platero y tú" },
      { title: "Sebas, Guille y los demás", artist: "Amaral" },
      { title: "Salir", artist: "Extremoduro" },
      { title: "Mi gran noche", artist: "Raphael" },
    ],
  },
];

/* ── Google Sheets Integration ── */
// Para sincronizar con Google Sheets:
// 1. Crea una hoja con columnas: pack_id | pack_name | title | artist
// 2. Archivo → Compartir → Publicar en la web → Hoja completa → CSV
// 3. Pega la URL publicada aquí:
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1qJyxJ6ss_D1RA8mpCXXwODw-6ZoK6tPajstPUyrHOrI/export?format=csv&gid=0";

function parseCSV(text) {
  const lines = []; let current = []; let field = ""; let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') { current.push(field.trim()); field = ""; }
      else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
        current.push(field.trim());
        if (current.some(f => f)) lines.push(current);
        current = []; field = "";
        if (ch === '\r') i++;
      } else field += ch;
    }
  }
  if (field || current.length) { current.push(field.trim()); if (current.some(f => f)) lines.push(current); }
  return lines;
}

function csvToRawPacks(rows) {
  const dataRows = rows.slice(1);
  const packMap = new Map();
  const packOrder = [];
  for (const row of dataRows) {
    const [packId, packName, title, artist] = row;
    if (!packId || !title) continue;
    if (!packMap.has(packId)) {
      packMap.set(packId, { id: packId, name: packName || packId, songs: [] });
      packOrder.push(packId);
    }
    packMap.get(packId).songs.push({ title, artist: artist || "" });
  }
  return packOrder.map(id => packMap.get(id));
}

/* ── Helpers ── */
const slugify = (s) =>
  (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const songKey = (title, artist) => {
  const t = slugify(title);
  const a = slugify(artist || "");
  return a ? `${t}__${a}` : `${t}__na`;
};

function buildCatalogAndPacks(rawPacks) {
  const songsMap = new Map();
  const packs = rawPacks.map((p) => {
    const songIds = p.songs.map((s) => {
      const key = songKey(s.title, s.artist);
      if (!songsMap.has(key)) songsMap.set(key, { id: key, title: s.title, artist: s.artist || "" });
      return key;
    });
    return { ...p, songIds };
  });
  return { catalog: Array.from(songsMap.values()), packs };
}

function makeUid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

/* ── Main App ── */
function SetlistApp() {
  const [rawPacksData, setRawPacksData] = useState(GOOGLE_SHEET_CSV_URL ? [] : RAW_PACKS);
  const [sheetsLoading, setSheetsLoading] = useState(!!GOOGLE_SHEET_CSV_URL);
  const [sheetsError, setSheetsError] = useState(false);
  const { catalog, packs } = useMemo(() => buildCatalogAndPacks(rawPacksData), [rawPacksData]);

  const [activePackId, setActivePackId] = useState(GOOGLE_SHEET_CSV_URL ? null : "estandar");
  const [qPack, setQPack] = useState("");
  const [setlist, setSetlist] = useState([]);
  const [toast, setToast] = useState("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isSendingQuote, setIsSendingQuote] = useState(false);
  const [pendingPackImport, setPendingPackImport] = useState(null);
  const [replaceMenuConfig, setReplaceMenuConfig] = useState(null);
  const [hoveredPackId, setHoveredPackId] = useState(null);

  const [bookingData, setBookingData] = useState({
    name: "", email: "", phone: "", date: "", eventType: "", location: "", guests: "", travelDistance: 0,
    showDuration: "60 min", format: "Cóctel", hasSoundSystem: "No lo sé", needsOurSound: false,
    spaceType: "Interior", spaceSize: "", expectedAudience: "", stageSize: "", soundPower: "",
    powerDistance: "", maxPower: "", lightingType: "", lightingControl: "", comments: ""
  });

  useEffect(() => {
    if (!GOOGLE_SHEET_CSV_URL) return;
    const cacheBust = '_t=' + Date.now();
    const url = GOOGLE_SHEET_CSV_URL + (GOOGLE_SHEET_CSV_URL.includes('?') ? '&' : '?') + cacheBust;
    fetch(url, { redirect: 'follow' })
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const ct = r.headers.get('content-type') || '';
        if (ct.includes('text/html')) throw new Error('Got HTML instead of CSV — sheet may not be shared publicly');
        return r.text();
      })
      .then(text => {
        if (text.startsWith('<!') || text.startsWith('<html')) throw new Error('Got HTML page — check sharing settings');
        const rows = parseCSV(text);
        if (rows.length > 1) {
          const newPacks = csvToRawPacks(rows);
          if (newPacks.length > 0) {
            setRawPacksData(newPacks);
            setActivePackId(newPacks[0].id);
          } else { setSheetsError(true); }
        } else { setSheetsError(true); }
      })
      .catch((err) => { console.error('[YourVersion] Google Sheets sync error:', err); setSheetsError(true); setRawPacksData(RAW_PACKS); setActivePackId('estandar'); })
      .finally(() => setSheetsLoading(false));
  }, []);

  const DURATION_OPTIONS = [60, 80, 100, 120, 140, 160, 180];
  const [targetDuration, setTargetDuration] = useState(60);
  const AVERAGE_SONG_DURATION = 4;

  const targetSongCount = useMemo(() => Math.ceil(targetDuration / AVERAGE_SONG_DURATION), [targetDuration]);
  const activePack = useMemo(() => packs.find((p) => p.id === activePackId) || packs[0] || null, [packs, activePackId]);
  const catalogById = useMemo(() => { const m = new Map(); for (const s of catalog) m.set(s.id, s); return m; }, [catalog]);
  const selectedSongIds = useMemo(() => { const s = new Set(); for (const it of setlist) s.add(it.songId); return s; }, [setlist]);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const packSongs = useMemo(() => {
    if (!activePack) return [];
    const qq = slugify(qPack.trim());
    const list = activePack.songIds.map((id) => catalogById.get(id)).filter(Boolean);
    if (!qq) return list;
    return list.filter((s) => slugify(`${s.title} ${s.artist}`).includes(qq));
  }, [activePack, qPack, catalogById]);

  const addSong = (songId) => {
    if (selectedSongIds.has(songId)) return flash("Ya seleccionada");
    setSetlist((prev) => [...prev, { uid: makeUid(), songId }]);
    flash("Añadida");
  };

  const replaceItem = (index, newSongId) => {
    if (selectedSongIds.has(newSongId)) { flash("Ya está en la lista"); return; }
    setSetlist((prev) => { const copy = [...prev]; copy[index] = { ...copy[index], songId: newSongId }; return copy; });
    setReplaceMenuConfig(null); setHoveredPackId(null); flash("Sustituida");
  };

  const removeItem = (uid) => setSetlist((prev) => prev.filter((x) => x.uid !== uid));

  const moveItem = (from, to) => {
    setSetlist((prev) => { if (from === to) return prev; const c = prev.slice(); const [it] = c.splice(from, 1); c.splice(to, 0, it); return c; });
  };

  const importPack = (packId, mode) => {
    const pack = packs.find(p => p.id === packId);
    if (!pack) return;
    if (mode === "replace") {
      setSetlist(pack.songIds.map((songId) => ({ uid: makeUid(), songId })));
      flash("Colección importada");
    } else {
      const items = pack.songIds.filter((sid) => !selectedSongIds.has(sid)).map((songId) => ({ uid: makeUid(), songId }));
      if (!items.length) return flash("Sin pistas nuevas");
      setSetlist((prev) => [...prev, ...items]);
      flash(`${items.length} añadidas`);
    }
    setPendingPackImport(null);
  };

  const clearAll = () => { if (window.confirm("¿Seguro que quieres vaciar todo el setlist?")) { setSetlist([]); flash("Vaciado"); } };

  const onDragStartSong = (e, songId) => {
    if (selectedSongIds.has(songId)) { e.preventDefault(); return; }
    e.dataTransfer.setData("text/plain", songId); e.dataTransfer.effectAllowed = "copy";
  };
  const onDropToSetlist = (e) => { e.preventDefault(); setIsDraggingOver(false); const sid = e.dataTransfer.getData("text/plain"); if (sid && !selectedSongIds.has(sid)) addSong(sid); };
  const onDragOver = (e) => { e.preventDefault(); setIsDraggingOver(true); e.dataTransfer.dropEffect = "copy"; };
  const onDragLeave = () => setIsDraggingOver(false);

  const copyToClipboard = () => {
    const text = setlist.map((it, i) => { const ss = catalogById.get(it.songId); return `${i+1}. ${ss?.title||"??"}${ss?.artist?" — "+ss.artist:""}`; }).join("\n");
    navigator.clipboard?.writeText(text).then(() => flash("Copiado al portapapeles")).catch(() => flash("Error al copiar"));
  };

  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Google Places Autocomplete + Distance from Galdakao
  const locationInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (autocompleteRef.current) return;
    const init = () => {
      if (!window.google?.maps?.places || !locationInputRef.current) return false;
      const ac = new google.maps.places.Autocomplete(locationInputRef.current, {
        types: ['geocode', 'establishment'],
        componentRestrictions: { country: 'es' },
      });
      autocompleteRef.current = ac;
      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        if (!place.geometry) return;
        const name = place.formatted_address || place.name;
        setBookingData(prev => ({ ...prev, location: name }));
        const svc = new google.maps.DistanceMatrixService();
        svc.getDistanceMatrix({
          origins: ['Galdakao, Bizkaia, Spain'],
          destinations: [{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }],
          travelMode: 'DRIVING',
        }, (res, status) => {
          if (status === 'OK' && res.rows[0].elements[0].status === 'OK') {
            const kmOneWay = Math.round(res.rows[0].elements[0].distance.value / 1000);
            setBookingData(prev => ({ ...prev, travelDistance: kmOneWay * 2 }));
          }
        });
      });
      return true;
    };
    if (!init()) {
      const iv = setInterval(() => { if (init()) clearInterval(iv); }, 500);
      return () => clearInterval(iv);
    }
  }, []);

  const requestQuoteByEmail = async () => {
    if (isSendingQuote) return;

    const required = [
      ["name", "Nombre"],
      ["email", "Email"],
      ["date", "Fecha y hora del evento"],
      ["eventType", "Tipo de evento"],
      ["location", "Lugar/Localidad"],
      ["hasSoundSystem", "Necesidad de llevar equipo"],
      ["spaceType", "Tipo de espacio"],
      ["guests", "Nº de asistentes"],
    ];

    const missing = required.filter(([k]) => !String(bookingData[k] ?? "").trim()).map(([, label]) => label);
    if (missing.length) {
      flash(`Faltan datos: ${missing.join(", ")}`);
      return;
    }

    const subject = `Solicitud presupuesto YourVersion - ${bookingData.name}`;
    const setlistText = setlist.length > 0
      ? setlist.map((it, i) => {
          const ss = catalogById.get(it.songId);
          return `${i + 1}. ${ss?.title || "??"}${ss?.artist ? " - " + ss.artist : ""}`;
        }).join("\n")
      : "No se ha seleccionado repertorio.";

    const body = [
      "Nueva solicitud de presupuesto desde la web:",
      "",
      `Nombre: ${bookingData.name}`,
      `Email: ${bookingData.email}`,
      `Telefono: ${bookingData.phone || "No indicado"}`,
      `Fecha y hora: ${bookingData.date}`,
      `Tipo de evento: ${bookingData.eventType}`,
      `Lugar/Localidad: ${bookingData.location}`,
      `Asistentes aprox.: ${bookingData.guests}`,
      "",
      `¿Necesitaremos llevar equipo?: ${bookingData.hasSoundSystem}`,
      `Tipo de espacio: ${bookingData.spaceType}`,
      "",
      "Repertorio elegido:",
      setlistText,
      "",
      `Comentarios: ${bookingData.comments || "Sin comentarios"}`,
    ].join("\n");

    const payload = {
      _subject: subject,
      _captcha: "false",
      _template: "table",
      nombre: bookingData.name,
      email: bookingData.email,
      telefono: bookingData.phone || "No indicado",
      fecha_hora: bookingData.date,
      tipo_evento: bookingData.eventType,
      lugar: bookingData.location,
      asistentes: bookingData.guests,
      llevar_equipo: bookingData.hasSoundSystem,
      tipo_espacio: bookingData.spaceType,
      repertorio: setlistText,
      comentarios: bookingData.comments || "Sin comentarios",
      resumen: body,
    };

    try {
      setIsSendingQuote(true);
      const res = await fetch("https://formsubmit.co/ajax/yourversionbilbao@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Save lead to Firestore so it shows up in the CRM
      try {
        await db.collection("leads").add({
          createdAt: new Date().toISOString(),
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone || "",
          dateTime: bookingData.date,
          eventType: bookingData.eventType,
          location: bookingData.location,
          guests: bookingData.guests,
          needsEquipment: bookingData.hasSoundSystem,
          spaceType: bookingData.spaceType,
          comments: bookingData.comments || "",
          setlist: setlistText,
          status: "Nuevo",
          durationMinutes: 90,
          extraSongs: 0,
          soundNeeded: bookingData.hasSoundSystem === "No" ? "No" : "Sí",
          stayOvernight: "No",
          attendees: Number(bookingData.guests || 0),
          travelDistance: bookingData.travelDistance || 0,
          total: 0,
        });
      } catch (fbErr) {
        console.warn("[YourVersion] No se pudo guardar en Firestore:", fbErr);
      }

      flash("Solicitud enviada con éxito");
    } catch (err) {
      console.error("[YourVersion] Error enviando solicitud:", err);
      flash("No se pudo enviar. Revisa conexión e inténtalo de nuevo");
    } finally {
      setIsSendingQuote(false);
    }
  };

  const currentRepertoireSummary = useMemo(() => {
    return setlist.map((it) => { const ss = catalogById.get(it.songId); return `${ss?.title||"??"}${ss?.artist?" ("+ss.artist+")":""}`; }).join(", ");
  }, [setlist, catalogById]);

  return (
    <div className="text-[#e8e8ea] font-sans p-4 md:p-8 lg:overflow-y-auto selection:bg-[#c5a059]/20" style={{fontFamily:"'Outfit',sans-serif"}}>
      {/* Modal de Importación */}
      {pendingPackImport && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] max-w-sm w-full shadow-2xl shadow-black/40 border border-white/[0.08] p-8 rounded-sm">
            <h3 className="text-xs font-bold text-[#c5a059] uppercase tracking-[0.2em] mb-4">Colección Completa</h3>
            <p className="text-lg font-serif text-[#e8e8ea] leading-tight mb-8 lowercase italic tracking-tight">¿Desea combinar esta selección con el proyecto actual o comenzar uno nuevo?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => importPack(pendingPackImport, "append")} className="w-full py-4 bg-white/[0.06] hover:bg-white/[0.12] text-[#e8e8ea] text-[9px] uppercase tracking-[0.3em] font-bold transition-all">Añadir al actual</button>
              <button onClick={() => importPack(pendingPackImport, "replace")} className="w-full py-4 bg-[#c5a059] text-black text-[9px] uppercase tracking-[0.3em] font-bold transition-all hover:bg-[#d4b46e]">Comenzar de nuevo</button>
              <button onClick={() => setPendingPackImport(null)} className="w-full py-2 text-[8px] text-[#555] uppercase tracking-widest font-bold mt-2">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Menú Global de Reemplazo */}
      {replaceMenuConfig && (
        <React.Fragment>
          <div className="fixed inset-0 z-[120]" onClick={() => { setReplaceMenuConfig(null); setHoveredPackId(null); }} />
          <div className="fixed w-52 bg-[#111] border border-white/[0.08] shadow-2xl shadow-black/50 py-2 z-[121] rounded-sm" style={{ top: replaceMenuConfig.top, right: replaceMenuConfig.right }}>
            <div className="px-4 pb-2 mb-2 border-b border-white/[0.05] text-[8px] font-bold text-[#c5a059] uppercase tracking-[0.2em]">Sustituir por...</div>
            {packs.map((p) => (
              <div key={p.id} className="relative" onMouseEnter={() => setHoveredPackId(p.id)}>
                <button className="w-full text-left px-4 py-2 hover:bg-white/[0.05] flex justify-between items-center text-[10px] font-bold text-[#888] uppercase tracking-widest transition-colors">
                  <span className="truncate">{p.name}</span>
                  <ChevronLeft size={12} className="text-[#555]" />
                </button>
                {hoveredPackId === p.id && (
                  <div className="absolute right-full top-0 w-64 bg-[#111] border border-white/[0.08] shadow-2xl shadow-black/50 py-2 z-[122] mr-1 max-h-72 overflow-y-auto rounded-sm">
                    <div className="px-4 pb-2 mb-2 border-b border-white/[0.05] text-[10px] font-serif italic text-[#c5a059] lowercase tracking-tight sticky top-0 bg-[#111]/95 backdrop-blur-sm">{p.name}</div>
                    {p.songIds.map((sid) => {
                      const song = catalogById.get(sid);
                      const already = selectedSongIds.has(sid);
                      return (
                        <button key={sid} disabled={already} onClick={(e) => { e.stopPropagation(); replaceItem(replaceMenuConfig.index, sid); }}
                          className={`w-full text-left px-4 py-1.5 text-xs transition-colors ${already ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/[0.05] hover:text-[#e8e8ea]'}`}>
                          <div className="font-bold truncate tracking-tight text-[#ccc]">{song.title}</div>
                          <div className="text-[9px] uppercase tracking-widest opacity-40 truncate">{song.artist}</div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </React.Fragment>
      )}

      {/* Toast */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="bg-[#c5a059] text-black px-8 py-3 shadow-2xl shadow-[#c5a059]/20 text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-3">
          <span className="w-1 h-1 bg-black rounded-full animate-pulse"></span>
          {toast}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16">
        {/* ═══ SETLIST BUILDER ═══ */}
        <div className="bg-[#0a0a0a] shadow-2xl shadow-black/40 border border-white/[0.08] overflow-hidden h-[90vh] lg:h-[85vh] relative flex flex-col rounded-sm">

          {/* Loading overlay mientras carga desde Google Sheets */}
          {sheetsLoading && (
            <div className="absolute inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
              <div className="w-8 h-8 border-2 border-white/[0.1] border-t-[#c5a059] rounded-full animate-spin"></div>
              <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#888]">Cargando repertorio...</p>
            </div>
          )}

          {/* Error banner */}
          {sheetsError && !sheetsLoading && (
            <div className="bg-red-900/20 border-b border-red-500/20 px-6 py-3 flex items-center justify-center gap-3">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-red-400">Error al sincronizar — mostrando repertorio local</p>
            </div>
          )}

          {/* Sync badge */}
          {GOOGLE_SHEET_CSV_URL && !sheetsLoading && !sheetsError && (
            <div className="bg-[#c5a059]/5 border-b border-[#c5a059]/10 px-6 py-2 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#888]">Sincronizado con Google Sheets</p>
            </div>
          )}
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[240px_1fr_360px] min-h-0 overflow-hidden">
            {/* Col 1 – Packs sidebar */}
            <div className="flex-none lg:min-h-0 bg-[#080808] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col">
              <div className="p-6 border-b border-white/[0.08] bg-[#0a0a0a]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[9px] font-bold text-[#888] uppercase tracking-[0.2em] flex items-center gap-2"><Clock size={11} sw={2} /> Duración</h2>
                  <div className="text-[10px] font-bold text-[#e8e8ea] tracking-widest">{setlist.length} <span className="text-[#555] mx-1">/</span> {targetSongCount}</div>
                </div>
                <div className="relative group">
                  <select value={targetDuration} onChange={(e)=>setTargetDuration(parseInt(e.target.value))}
                    className="w-full bg-transparent border-b border-white/[0.08] text-xs font-bold text-[#e8e8ea] py-1.5 focus:outline-none focus:border-[#c5a059] appearance-none cursor-pointer transition-colors">
                    {DURATION_OPTIONS.map(o=><option key={o} value={o} style={{background:'#111',color:'#e8e8ea'}}>{Math.floor(o/60)}h {o%60>0?`${o%60}min`:''}</option>)}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#555] group-hover:text-[#c5a059] transition-colors"><ChevronRight size={12} className="rotate-90"/></div>
                </div>
                <div className="mt-4 h-[1.5px] bg-white/[0.08] overflow-hidden">
                  <div className="h-full bg-[#c5a059] transition-all duration-700 ease-out" style={{width:`${Math.min(100,(setlist.length/targetSongCount)*100)}%`}}></div>
                </div>
              </div>
              <div className="hidden lg:block px-6 py-4 bg-white/[0.02]"><h2 className="text-[9px] font-bold text-[#555] uppercase tracking-[0.3em]">Colecciones</h2></div>
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden p-3 gap-0.5 flex-1" style={{scrollbarWidth:'none'}}>
                {packs.map((p) => {
                  const isActive = activePackId === p.id;
                  return (
                    <div key={p.id} className="flex items-center group/item px-2">
                      <button onClick={(e)=>{e.stopPropagation();setPendingPackImport(p.id);}} className={`p-2 transition-all duration-300 ${isActive?'text-black/40 hover:text-black':'text-[#444] hover:text-[#c5a059]'}`}><Plus size={14} sw={2.5}/></button>
                      <button onClick={()=>{setActivePackId(p.id);setQPack("");}}
                        className={`flex-1 flex justify-between items-center px-2 py-3.5 rounded-sm text-[11px] transition-all text-left group ${isActive?"bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20":"text-[#777] hover:text-[#e8e8ea]"}`}>
                        <span className="truncate font-bold tracking-[0.05em] uppercase">{p.name}</span>
                        <ChevronRight size={12} sw={2} className={`hidden lg:block transition-transform duration-300 ${isActive?"translate-x-0 opacity-100":"-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40"}`}/>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Col 2 – Songs list */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#0a0a0a]">
              <div className="p-6 border-b border-white/[0.05] bg-[#0a0a0a] z-10">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-[#555]"><SearchIcon size={13} sw={1.5}/></div>
                  <input type="text" className="block w-full pl-7 pr-3 py-2 border-b border-white/[0.08] bg-transparent placeholder-[#444] focus:outline-none focus:border-[#c5a059] transition-colors text-[11px] font-medium text-[#e8e8ea] tracking-wide"
                    placeholder="Filtrar catálogo..." value={qPack} onChange={(e)=>setQPack(e.target.value)}/>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-0.5 bg-[#090909]">
                {packSongs.map((s) => {
                  const isSel = selectedSongIds.has(s.id);
                  return (
                    <div key={s.id} draggable={!isSel} onDragStart={(e)=>onDragStartSong(e,s.id)}
                      className={`flex items-center py-2 px-3 transition-all duration-300 border border-transparent rounded-sm group ${isSel?"opacity-20 grayscale":"bg-[#0a0a0a] hover:border-white/[0.08] hover:bg-white/[0.03] cursor-grab active:cursor-grabbing"}`}>
                      <button onClick={()=>addSong(s.id)} disabled={isSel} className="flex-shrink-0 mr-3 p-1.5 text-[#444] hover:text-[#c5a059] transition-all duration-300 disabled:opacity-0">
                        {isSel ? <Check size={14} sw={2.5}/> : <Plus size={14} sw={2.5}/>}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-bold text-[#e8e8ea] truncate tracking-tight leading-none mb-1">{s.title}</p>
                        <p className="text-[9px] text-[#888] uppercase tracking-widest font-semibold truncate leading-none">{s.artist||"—"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Col 3 – Setlist panel */}
            <div className="flex flex-col bg-[#0a0a0a] min-h-[50vh] lg:min-h-0 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
              <div className="p-6 border-b border-white/[0.08] bg-[#0a0a0a] flex justify-between items-center z-10">
                <h2 className="text-[9px] font-bold text-[#888] uppercase tracking-[0.3em]">Mi Selección</h2>
                <button onClick={clearAll} disabled={!setlist.length} className="text-[#444] hover:text-[#c5a059] transition-colors disabled:opacity-0"><Trash2 size={14} sw={1.5}/></button>
              </div>
              <div className={`flex-1 overflow-y-auto relative transition-colors duration-500 ${isDraggingOver?'bg-white/[0.03]':''}`}
                onDrop={onDropToSetlist} onDragOver={onDragOver} onDragLeave={onDragLeave}>
                {setlist.length === 0 ? (
                  <div className="h-full min-h-[250px] flex flex-col items-center justify-center m-6 border border-dashed border-white/[0.1] text-center">
                    <p className="text-[8px] font-bold text-[#555] uppercase tracking-[0.4em] mb-3">Componer lista</p>
                  </div>
                ) : (
                  <div className="pb-24">
                    {setlist.map((it, idx) => {
                      const s = catalogById.get(it.songId);
                      return (
                        <div key={it.uid} className="group flex items-center justify-between py-3 px-5 bg-[#0a0a0a] border-b border-white/[0.05] hover:bg-white/[0.03] transition-all duration-300">
                          <div className="flex items-center gap-4 overflow-hidden">
                            <span className="text-[9px] font-bold text-[#444] w-3 text-right flex-shrink-0">{idx+1}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[12px] font-bold text-[#e8e8ea] truncate tracking-tight mb-1 leading-none">{s?.title||"??"}</p>
                              <p className="text-[8px] text-[#888] uppercase tracking-[0.15em] font-semibold leading-none">{s?.artist||"—"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button onClick={(e)=>{const r=e.currentTarget.getBoundingClientRect();setReplaceMenuConfig({id:it.uid,index:idx,top:r.bottom+8,right:window.innerWidth-r.right});}} className="p-1 text-[#444] hover:text-[#c5a059]"><RefreshCw size={12} sw={2.5}/></button>
                            <button onClick={()=>moveItem(idx,Math.max(0,idx-1))} className="p-1 text-[#444] hover:text-[#c5a059]"><ArrowUp size={12} sw={2}/></button>
                            <button onClick={()=>moveItem(idx,Math.min(setlist.length-1,idx+1))} className="p-1 text-[#555] hover:text-[#c5a059]"><ArrowDown size={12} sw={2}/></button>
                            <button onClick={()=>removeItem(it.uid)} className="p-1 text-[#555] hover:text-red-400"><Trash2 size={12} sw={2}/></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="p-6 bg-[#0a0a0a] border-t border-white/[0.08] z-10 mt-auto flex gap-3">
                <button onClick={copyToClipboard} className="flex-1 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-[#e8e8ea] text-[8px] uppercase tracking-[0.3em] font-bold transition-all rounded-sm">Copiar</button>
                <button onClick={()=>{const el=document.getElementById('booking-section');el?.scrollIntoView({behavior:'smooth'});flash("Prosiga con el presupuesto");}} className="flex-1 py-3 bg-[#c5a059] hover:bg-[#d4b46e] text-black text-[8px] uppercase tracking-[0.3em] font-bold transition-all rounded-sm">Finalizar Lista</button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BUDGET REQUEST FORM ═══ */}
        <section id="booking-section" className="bg-[#0a0a0a] border border-white/[0.08] shadow-2xl shadow-black/40 p-8 md:p-16 mb-20 rounded-sm">
          <div className="max-w-4xl mx-auto">
            <header className="mb-20 text-center">
              <h2 className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.6em] mb-4">Pedir Presupuesto</h2>
              <p className="text-2xl font-serif text-[#888] italic lowercase tracking-tight">Cuéntanos tu idea y te responderemos en menos de 24h.</p>
            </header>

            <form className="space-y-16" onSubmit={(e)=>e.preventDefault()}>
              {/* Datos personales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="border-b border-white/[0.08] pb-2">
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">Nombre*</label>
                  <input name="name" value={bookingData.name} onChange={handleBookingChange} className="w-full bg-transparent border-none text-base font-serif italic text-[#e8e8ea] focus:outline-none p-0 placeholder-[#444]" placeholder="Su nombre..." required/>
                </div>
                <div className="border-b border-white/[0.08] pb-2">
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">Email*</label>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-[#555]"/>
                    <input name="email" type="email" value={bookingData.email} onChange={handleBookingChange} className="w-full bg-transparent border-none text-base font-serif italic text-[#e8e8ea] focus:outline-none p-0 placeholder-[#444]" placeholder="ejemplo@email.com" required/>
                  </div>
                </div>
                <div className="border-b border-white/[0.08] pb-2">
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">Teléfono</label>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-[#555]"/>
                    <input name="phone" value={bookingData.phone} onChange={handleBookingChange} className="w-full bg-transparent border-none text-base font-serif italic text-[#e8e8ea] focus:outline-none p-0 placeholder-[#444]" placeholder="+34 ..."/>
                  </div>
                </div>
              </div>

              {/* Detalles del evento */}
              <div className="grid grid-cols-1 gap-y-12">
                <div className="space-y-12 max-w-2xl">
                  <div className="border-b border-white/[0.08] pb-2">
                    <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">Fecha y hora del evento*</label>
                    <input name="date" type="datetime-local" value={bookingData.date} onChange={handleBookingChange} className="w-full bg-transparent border-none text-xs font-bold text-[#e8e8ea] focus:outline-none p-0 cursor-pointer" style={{colorScheme:'dark'}} required/>
                  </div>
                  <div className="border-b border-white/[0.08] pb-2">
                    <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">Tipo de evento*</label>
                    <select name="eventType" value={bookingData.eventType} onChange={handleBookingChange} className="w-full bg-transparent border-none text-xs font-bold text-[#e8e8ea] focus:outline-none p-0 cursor-pointer" style={{colorScheme:'dark'}} required>
                      <option value="" style={{background:'#111'}}>Selecciona una opción</option>
                      <option value="Boda" style={{background:'#111'}}>Boda</option>
                      <option value="Cóctel" style={{background:'#111'}}>Cóctel</option>
                      <option value="Evento Empresa" style={{background:'#111'}}>Evento Empresa</option>
                      <option value="Fiesta Privada" style={{background:'#111'}}>Fiesta Privada</option>
                    </select>
                  </div>
                  <div className="border-b border-white/[0.08] pb-2">
                    <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">Lugar/Localidad*</label>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-[#555]"/>
                      <input ref={locationInputRef} name="location" value={bookingData.location} onChange={handleBookingChange} className="w-full bg-transparent border-none text-base font-serif italic text-[#e8e8ea] focus:outline-none p-0 placeholder-[#444]" placeholder="Ciudad o establecimiento..." required autoComplete="off" />
                    </div>
                    {bookingData.travelDistance > 0 && (
                      <div className="mt-2 flex items-center gap-2 text-[10px]">
                        <span className="text-amber-500/80 font-bold">↔ {bookingData.travelDistance} km ida y vuelta desde Galdakao</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sonido */}
              <div className="pt-8 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="border-b border-white/[0.08] pb-2">
                    <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">¿Sabéis si necesitaremos llevar nuestro equipo de sonido?</label>
                    <select name="hasSoundSystem" value={bookingData.hasSoundSystem} onChange={handleBookingChange} className="w-full bg-transparent border-none text-xs font-bold text-[#e8e8ea] focus:outline-none p-0" style={{colorScheme:'dark'}}>
                      <option value="No lo sé" style={{background:'#111'}}>No lo sé</option>
                      <option value="Sí" style={{background:'#111'}}>Sí, lo necesitaremos</option>
                      <option value="No" style={{background:'#111'}}>No, no hará falta</option>
                    </select>
                  </div>

                  <div className="border-b border-white/[0.08] pb-2">
                    <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">Tipo de espacio para el show</label>
                    <select name="spaceType" value={bookingData.spaceType} onChange={handleBookingChange} className="w-full bg-transparent border-none text-xs font-bold text-[#e8e8ea] focus:outline-none p-0" style={{colorScheme:'dark'}}>
                      <option value="Interior" style={{background:'#111'}}>Interior</option>
                      <option value="Exterior" style={{background:'#111'}}>Exterior</option>
                    </select>
                  </div>

                  <div className="border-b border-white/[0.08] pb-2">
                    <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">¿Cuántas personas van a asistir?</label>
                    <input name="guests" type="number" min="0" step="1" value={bookingData.guests} onChange={handleBookingChange} className="w-full bg-transparent border-none text-base font-serif italic text-[#e8e8ea] focus:outline-none p-0 placeholder-[#444]" placeholder="Número aproximado..."/>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-8 border border-white/[0.08] bg-white/[0.02] relative overflow-hidden group w-full">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity text-[#c5a059]"><Zap size={40} sw={1}/></div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-[#e8e8ea]">Equipo de sonido propio</h4>
                    <p className="text-xs text-[#888] italic font-serif leading-relaxed">Trabajamos con un sistema de 800 W de potencia.</p>
                    <ul className="mt-4 space-y-2 text-[10px] uppercase tracking-[0.15em] font-bold text-[#aaa]">
                      <li>Interiores: hasta 150 personas</li>
                      <li>Exteriores: hasta 100 personas</li>
                    </ul>
                    <p className="mt-4 text-[9px] text-[#666] leading-relaxed">Indicad arriba si necesitaremos llevar este equipo y os enviaremos el presupuesto ajustado.</p>
                  </div>
                </div>
              </div>

              {/* Requisitos y repertorio */}
              <div className="space-y-12">
                <div className="border-b border-white/[0.08] pb-2">
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-[#888] mb-3">Comentarios</label>
                  <textarea name="comments" value={bookingData.comments} onChange={handleBookingChange} className="w-full bg-transparent border-none text-xs font-medium text-[#aaa] focus:outline-none p-0 placeholder-[#444] resize-none h-20 leading-relaxed" placeholder="Cualquier otra información relevante..."/>
                </div>
                <div className="bg-white/[0.02] p-8 border border-white/[0.06] rounded-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Music size={14} className="text-[#c5a059]"/>
                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#888]">Repertorio elegido en la web</label>
                    {setlist.length > 0 && <span className="ml-auto text-[9px] font-bold text-[#c5a059]/60 tabular-nums">{setlist.length} {setlist.length===1?"tema":"temas"}</span>}
                  </div>
                  {setlist.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {setlist.map((it, i) => {
                        const ss = catalogById.get(it.songId);
                        return (
                          <div key={i} className="group flex items-center gap-2 px-3 py-2 bg-white/[0.04] border border-white/[0.07] rounded-sm hover:border-[#c5a059]/30 hover:bg-[#c5a059]/[0.04] transition-all duration-300">
                            <span className="text-[10px] font-bold text-[#c5a059]/40 tabular-nums w-4 text-right">{i+1}</span>
                            <span className="text-xs font-medium text-[#e8e8ea]">{ss?.title || "??"}</span>
                            {ss?.artist && <span className="text-[10px] text-[#666] font-medium">{ss.artist}</span>}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm font-serif italic text-[#555]">No se ha seleccionado repertorio todavía.</p>
                  )}
                  <p className="text-[8px] text-[#444] mt-6 uppercase tracking-widest font-bold">Resumen automático basado en su selección superior</p>
                </div>
              </div>

              {/* Botón enviar */}
              <div className="pt-20 flex flex-col items-center">
                <button type="button" onClick={requestQuoteByEmail} disabled={isSendingQuote}
                  className="group relative px-24 py-6 bg-[#c5a059] text-black text-[11px] uppercase tracking-[0.5em] font-bold overflow-hidden transition-all hover:bg-[#d4b46e] disabled:opacity-60 disabled:cursor-not-allowed">
                  <span className="relative z-10">{isSendingQuote ? "Enviando..." : "Quiero Presupuesto"}</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <div className="mt-10 flex items-center gap-2 opacity-20">
                  <span className="h-px w-8 bg-[#c5a059]"></span>
                  <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#888]">YourVersion Professional Services</p>
                  <span className="h-px w-8 bg-[#c5a059]"></span>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── Mount ── */
const _root = document.getElementById('setlistAppRoot');
if (_root) ReactDOM.createRoot(_root).render(<SetlistApp />);