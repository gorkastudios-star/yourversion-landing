const { useState, useEffect, useMemo } = React;

const I = ({ children, size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);
const Calculator = (p) => <I {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/></I>;
const Copy = (p) => <I {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></I>;
const Settings = (p) => <I {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></I>;
const Plus = (p) => <I {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></I>;
const Trash2 = (p) => <I {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></I>;
const Receipt = (p) => <I {...p}><path d="M4 2h16v20l-3-2-3 2-2-2-2 2-3-2-3 2V2z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/></I>;
const Table = (p) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></I>;
const AlertTriangle = (p) => <I {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></I>;
const CheckCircle2 = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></I>;
const Save = (p) => <I {...p}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></I>;
const CalendarIcon = (p) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></I>;
const DollarSign = (p) => <I {...p}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></I>;
const ChevronDown = (p) => <I {...p}><polyline points="6 9 12 15 18 9"/></I>;
const ChevronUp = (p) => <I {...p}><polyline points="18 15 12 9 6 15"/></I>;

const DEFAULT_CONFIG = {
  basePrice: 600,
  baseMinutes: 90,
  ownSoundHire: 150,
  extraSoundHire: 250,
  travelPerKm: 0.5,
  costPerExtraSong: 50,
  maxExtraSongs: 3,
  accommodationCost: 150,
};

function docToLead(doc) {
  const d = doc.data();
  const dateOnly = d.dateTime ? String(d.dateTime).split("T")[0] : (d.date || new Date().toISOString().split("T")[0]);
  return {
    id: doc.id,
    name: d.name || "Nuevo Cliente",
    email: d.email || "",
    phone: d.phone || "",
    date: dateOnly,
    location: d.location || "",
    durationMinutes: d.durationMinutes ?? 90,
    extraSongs: d.extraSongs ?? 0,
    soundNeeded: d.soundNeeded ?? (d.needsEquipment === "No" ? "No" : "Sí"),
    status: d.status || "Nuevo",
    total: d.total ?? 0,
    stayOvernight: d.stayOvernight || "No",
    attendees: Number(d.attendees ?? d.guests ?? 0),
    spaceType: d.spaceType || "Interior",
    travelDistance: d.travelDistance ?? 0,
    eventType: d.eventType || "",
    comments: d.comments || "",
    setlist: d.setlist || "",
    createdAt: d.createdAt || "",
  };
}

function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [authUser, setAuthUser] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState("calendario");
  const [userConfig, setUserConfig] = useState({ user: "yvadmin", pass: "cigarrito" });
  const [userConfigDirty, setUserConfigDirty] = useState(false);
  const [userConfigMsg, setUserConfigMsg] = useState("");
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const [leads, setLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [budget, setBudget] = useState({ items: [], total: 0, warnings: [] });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);

  // Load config from Firestore once
  useEffect(() => {
    db.collection("config").doc("tarifas").get().then((doc) => {
      if (doc.exists) setConfig({ ...DEFAULT_CONFIG, ...doc.data() });
    }).catch((e) => console.warn("Config load error:", e));
    db.collection("config").doc("crmuser").get().then((doc) => {
      if (doc.exists) setUserConfig({ ...userConfig, ...doc.data() });
    }).catch((e) => console.warn("User config load error:", e));
  }, []);

  // Load leads from Firestore
  const loadLeads = () => {
    db.collection("leads").orderBy("createdAt", "desc").get().then((snap) => {
      const mapped = snap.docs.map(docToLead);
      setLeads(mapped);
      setSelectedLeadId((prev) => {
        if (prev && mapped.some((l) => l.id === prev)) return prev;
        return mapped[0]?.id || null;
      });
    }).catch((e) => console.warn("Error loading leads:", e));
  };

  useEffect(() => { loadLeads(); }, []);

  const currentLead = useMemo(() => leads.find((l) => l.id === selectedLeadId) || leads[0], [leads, selectedLeadId]);

  useEffect(() => {
    if (!currentLead) return;

    let items = [];
    let total = 0;
    let warnings = [];

    const pricePerMinute = config.basePrice / config.baseMinutes;
    const calculatedCache = Math.round(pricePerMinute * currentLead.durationMinutes);
    items.push({ label: `Cache (${currentLead.durationMinutes} min)`, price: calculatedCache });
    total += calculatedCache;

    if (currentLead.extraSongs > 0) {
      if (currentLead.extraSongs > config.maxExtraSongs) {
        warnings.push("Limite temas extra superado.");
      }
      const songsCost = currentLead.extraSongs * config.costPerExtraSong;
      items.push({ label: `Temas extra (${currentLead.extraSongs})`, price: songsCost });
      total += songsCost;
    }

    if (currentLead.soundNeeded !== "No") {
      items.push({ label: "Sonido Propio", price: config.ownSoundHire });
      total += config.ownSoundHire;
      const limit = currentLead.spaceType === "Interior" ? 150 : 100;
      if (currentLead.attendees > limit) {
        warnings.push("Aforo elevado para equipo.");
        items.push({ label: "Sonido Extra", price: config.extraSoundHire });
        total += config.extraSoundHire;
      }
    }

    const travelCost = currentLead.travelDistance * config.travelPerKm;
    if (travelCost > 0) {
      items.push({ label: `Km (${currentLead.travelDistance}km)`, price: travelCost });
      total += travelCost;
    }

    if (currentLead.stayOvernight === "Sí") {
      items.push({ label: "Estancia", price: config.accommodationCost });
      total += config.accommodationCost;
    }

    setBudget({ items, total, warnings });
    setLeads((prev) => prev.map((l) => (l.id === currentLead.id ? { ...l, total } : l)));
  }, [selectedLeadId, config, currentLead]);

  // --- MANUAL SAVE: persist all leads + config to Firestore ---
  const saveAll = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const batch = db.batch();
      // Save config
      batch.set(db.collection("config").doc("tarifas"), config);
      // Save user config if dirty
      if (userConfigDirty) {
        batch.set(db.collection("config").doc("crmuser"), userConfig);
        setUserConfigDirty(false);
      }
      // Save each lead
      for (const lead of leads) {
        const ref = db.collection("leads").doc(lead.id);
        const { id, ...data } = lead;
        batch.set(ref, data, { merge: true });
      }
      await batch.commit();
      setDirty(false);
      setSaveMsg("Guardado");
      setTimeout(() => setSaveMsg("") , 2000);
    } catch (e) {
      console.error("Save error:", e);
      setSaveMsg("Error al guardar");
      setTimeout(() => setSaveMsg("") , 3000);
    } finally {
      setSaving(false);
    }
  };

  const updateLeadField = (id, field, value) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
    setDirty(true);
  };

  const addNewLead = async () => {
    const newLead = {
      name: "Nuevo Cliente",
      email: "",
      phone: "",
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      location: "",
      durationMinutes: 90,
      extraSongs: 0,
      soundNeeded: "Sí",
      status: "Nuevo",
      total: 0,
      stayOvernight: "No",
      attendees: 100,
      spaceType: "Interior",
      travelDistance: 0,
    };
    try {
      const docRef = await db.collection("leads").add(newLead);
      setLeads((prev) => [{ ...newLead, id: docRef.id }, ...prev]);
      setSelectedLeadId(docRef.id);
    } catch (e) {
      console.warn("Error adding lead:", e);
    }
  };

  const deleteLead = async (id) => {
    try {
      await db.collection("leads").doc(id).delete();
    } catch (e) {
      console.warn("Delete error:", e);
    }
    const filtered = leads.filter((l) => l.id !== id);
    setLeads(filtered);
    setSelectedLeadId(filtered[0]?.id || null);
  };

  const generateEmailText = () => {
    if (!currentLead) return "";
    const formattedDate = new Date(currentLead.date).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
    const itemsText = budget.items.map((item) => `- ${item.label}: ${item.price}EUR`).join("\n");
    return `Hola ${currentLead.name},\n\nGracias por contactar con nosotros para el ${formattedDate} en ${currentLead.location}.\n\nPresupuesto detallado:\n${itemsText}\n\nTOTAL: ${budget.total} EUR\n\nQuedamos a vuestra disposicion.\n\nUn saludo,\nYourVersion`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmailText());
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1800);
  };

  const StatusBadge = ({ status, id }) => {
    const colors = {
      Nuevo: "bg-blue-500/20 text-blue-300 border-blue-500/50",
      Contactado: "bg-purple-500/20 text-purple-300 border-purple-500/50",
      Presupuestado: "bg-amber-500/20 text-amber-300 border-amber-500/50",
      Confirmado: "bg-green-500/20 text-green-300 border-green-500/50",
      Perdido: "bg-red-500/20 text-red-300 border-red-500/50",
    };
    return (
      <select
        value={status}
        onChange={(e) => updateLeadField(id, "status", e.target.value)}
        className={`text-[10px] px-2 py-0.5 rounded border outline-none cursor-pointer font-bold uppercase ${colors[status] || "bg-neutral-800 text-neutral-400"}`}
      >
        <option value="Nuevo">Nuevo</option>
        <option value="Contactado">Contactado</option>
        <option value="Presupuestado">Presupuestado</option>
        <option value="Confirmado">Confirmado</option>
        <option value="Perdido">Perdido</option>
      </select>
    );
  };

  const doLogin = () => {
    if (authUser === userConfig.user && authPass === userConfig.pass) {
      setAuthError("");
      setIsAuthed(true);
    } else {
      setAuthError("Credenciales incorrectas");
    }
  };

  // --- Calendar helpers (must be before any early return to respect hooks rules) ---
  const calendarMonth = (() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  })();
  const [calYear, setCalYear] = useState(calendarMonth.year);
  const [calMonth, setCalMonth] = useState(calendarMonth.month);

  const calDays = useMemo(() => {
    const first = new Date(calYear, calMonth, 1);
    const startDay = first.getDay() === 0 ? 6 : first.getDay() - 1;
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [calYear, calMonth]);

  const leadsByDate = useMemo(() => {
    const map = {};
    leads.forEach((l) => { if (l.date) { (map[l.date] = map[l.date] || []).push(l); } });
    return map;
  }, [leads]);

  const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); };

  // --- Finance helpers ---
  const financeStats = useMemo(() => {
    const confirmed = leads.filter((l) => l.status === "Confirmado");
    const pending = leads.filter((l) => l.status !== "Confirmado" && l.status !== "Perdido");
    const lost = leads.filter((l) => l.status === "Perdido");
    const totalConfirmed = confirmed.reduce((s, l) => s + (l.total || 0), 0);
    const totalPending = pending.reduce((s, l) => s + (l.total || 0), 0);
    const totalPipeline = leads.reduce((s, l) => s + (l.total || 0), 0);
    const conversionRate = leads.length > 0 ? Math.round((confirmed.length / leads.length) * 100) : 0;
    const avgDeal = confirmed.length > 0 ? Math.round(totalConfirmed / confirmed.length) : 0;
    return { confirmed, pending, lost, totalConfirmed, totalPending, totalPipeline, conversionRate, avgDeal };
  }, [leads]);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-black text-neutral-300 flex items-center justify-center p-6">
        <div className="w-full max-w-md border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
          <h1 className="text-sm uppercase tracking-[0.3em] text-amber-500 font-bold">CRM Privado YourVersion</h1>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-neutral-500 font-bold">Usuario</label>
            <input value={authUser} onChange={(e) => setAuthUser(e.target.value)} className="w-full bg-black/50 border border-neutral-800 p-2 text-sm outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-neutral-500 font-bold">Contrasena</label>
            <input type="password" value={authPass} onChange={(e) => setAuthPass(e.target.value)} className="w-full bg-black/50 border border-neutral-800 p-2 text-sm outline-none" onKeyDown={(e)=>{ if(e.key === 'Enter') doLogin(); }} />
          </div>
          <button onClick={doLogin} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs uppercase tracking-[0.2em] font-bold py-2">Entrar</button>
          <p className="text-red-400 text-xs min-h-[16px]">{authError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-neutral-300 font-sans flex flex-col overflow-hidden">
      <header className="bg-neutral-900/80 border-b border-neutral-800 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-500" />
          <h1 className="text-sm font-serif text-amber-500 tracking-tight uppercase font-bold">Booking System</h1>
        </div>
        <div className="flex items-center gap-2">
          <nav className="flex gap-1 bg-black/40 p-1 rounded-md border border-neutral-800">
            {[
                { id: "calendario", label: "Calendario", icon: CalendarIcon },
                { id: "pipeline", label: "Pipeline", icon: Table },
                { id: "budget", label: "Calculadora", icon: Receipt },
                { id: "finanzas", label: "Finanzas", icon: DollarSign },
                { id: "crmconfig", label: "Config CRM", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-all ${activeTab === tab.id ? "bg-amber-600 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                >
                  <tab.icon className="w-3 h-3" /> {tab.label}
                </button>
              ))}
          </nav>
                {/* ═══ CONFIGURACIÓN CRM (usuario/contraseña) ═══ */}
                {activeTab === "crmconfig" && (
                  <div className="max-w-md mx-auto bg-neutral-900/40 border border-neutral-800 rounded p-6 mt-6 flex flex-col gap-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-2"><Settings className="w-4 h-4" /> Configuración de acceso CRM</h2>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase text-neutral-500 font-bold">Usuario</label>
                      <input type="text" value={userConfig.user} onChange={e => { setUserConfig({ ...userConfig, user: e.target.value }); setUserConfigDirty(true); }} className="w-full bg-black/50 border border-neutral-800 p-2 text-sm outline-none" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase text-neutral-500 font-bold">Contraseña</label>
                      <input type="password" value={userConfig.pass} onChange={e => { setUserConfig({ ...userConfig, pass: e.target.value }); setUserConfigDirty(true); }} className="w-full bg-black/50 border border-neutral-800 p-2 text-sm outline-none" />
                    </div>
                    <button onClick={async () => {
                      try {
                        await db.collection("config").doc("crmuser").set(userConfig);
                        setUserConfigDirty(false);
                        setUserConfigMsg("Guardado");
                        setTimeout(() => setUserConfigMsg("") , 2000);
                      } catch (e) {
                        setUserConfigMsg("Error al guardar");
                        setTimeout(() => setUserConfigMsg("") , 3000);
                      }
                    }}
                      disabled={!userConfigDirty}
                      className={`px-4 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-all ${userConfigDirty ? "bg-green-600 hover:bg-green-700 text-white animate-pulse" : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300"}`}
                    >
                      <Save className="w-3.5 h-3.5" /> Guardar
                    </button>
                    <p className="text-green-500 text-xs min-h-[16px]">{userConfigMsg}</p>
                    <p className="text-[10px] text-neutral-600 italic mt-1"><AlertTriangle className="w-3 h-3 inline text-amber-600 mr-1" />Cambiar estos datos afecta al acceso de todos los usuarios.</p>
                  </div>
                )}
          <a
            href="index.html"
            className="px-3 py-1 rounded text-[11px] font-bold border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
          >
            Volver a la landing
          </a>
          <button
            onClick={saveAll}
            disabled={saving}
            className={`px-4 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-all ${dirty ? "bg-green-600 hover:bg-green-700 text-white animate-pulse" : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300"}`}
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? "Guardando..." : saveMsg || (dirty ? "Guardar *" : "Guardar")}
          </button>
        </div>
      </header>

      <main className="flex-1 p-3 overflow-hidden">
        <div className="max-w-[1600px] mx-auto h-full flex flex-col gap-3">

          {/* ═══ CALENDARIO ═══ */}
          {activeTab === "calendario" && (
              <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                <div className="flex justify-center items-center shrink-0">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-300">Calendario Anual {calYear}</h2>
                </div>
                <div className="flex-1 bg-neutral-900/40 border border-neutral-800 rounded overflow-auto p-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {Array.from({length:12}).map((_,m) => {
                      const first = new Date(calYear, m, 1);
                      const startDay = first.getDay() === 0 ? 6 : first.getDay() - 1;
                      const daysInMonth = new Date(calYear, m + 1, 0).getDate();
                      const calDays = [];
                      for (let i = 0; i < startDay; i++) calDays.push(null);
                      for (let d = 1; d <= daysInMonth; d++) calDays.push(d);
                      return (
                        <div key={m} className="bg-black/30 border border-neutral-800 rounded p-2 flex flex-col">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-amber-500 uppercase">{monthNames[m]}</span>
                            <span className="text-[10px] text-neutral-500 font-mono">{calYear}</span>
                          </div>
                          <div className="grid grid-cols-7 text-center text-[9px] uppercase font-bold text-neutral-500 border-b border-neutral-800">
                            {["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map((d) => <div key={d} className="p-1">{d}</div>)}
                          </div>
                          <div className="grid grid-cols-7 auto-rows-[minmax(28px,1fr)]">
                            {calDays.map((day, i) => {
                              if (day === null) return <div key={`e${i}`} className="border-r border-b border-neutral-800/30 bg-neutral-950/30" />;
                              const dateStr = `${calYear}-${String(m + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                              const dayLeads = leadsByDate[dateStr] || [];
                              const today = new Date();
                              const isToday = day === today.getDate() && m === today.getMonth() && calYear === today.getFullYear();
                              return (
                                <div key={day} className={`border-r border-b border-neutral-800/30 p-0.5 ${isToday ? "bg-amber-500/10" : "hover:bg-white/5"}`}>
                                  <div className={`text-[9px] font-bold mb-0.5 ${isToday ? "text-amber-400" : "text-neutral-500"}`}>{day}</div>
                                  {dayLeads.map((l) => {
                                    const statusColor = {Nuevo:"bg-blue-500",Contactado:"bg-purple-500",Presupuestado:"bg-amber-500",Confirmado:"bg-green-500",Perdido:"bg-red-500"}[l.status] || "bg-neutral-600";
                                    return (
                                      <div key={l.id} onClick={() => { setSelectedLeadId(l.id); setActiveTab("pipeline"); }} className={`${statusColor} text-white text-[8px] font-bold px-1 py-0.5 rounded mb-0.5 truncate cursor-pointer hover:opacity-80`}>
                                        {l.name} — {l.location || "?"}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
          )}

          {/* ═══ PIPELINE (all client data) ═══ */}
          {activeTab === "pipeline" && (
            <div className="flex-1 flex flex-col gap-3 overflow-hidden">
              <div className="flex justify-between items-center shrink-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Pipeline de Eventos / Leads</h2>
                <div className="flex items-center gap-2">
                  <button onClick={loadLeads} className="border border-neutral-700 text-neutral-400 hover:text-white text-[10px] font-bold px-3 py-1 rounded">Actualizar</button>
                  <button onClick={addNewLead} className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1.5"><Plus className="w-3 h-3" /> Nuevo Lead</button>
                </div>
              </div>

              {/* Detail card for selected lead */}
              {currentLead && (
                <div className="bg-neutral-900/60 border border-amber-500/30 rounded shrink-0">
                  <button onClick={() => setDetailOpen(!detailOpen)} className="w-full flex justify-between items-center p-3 hover:bg-white/5 transition-colors">
                    <h3 className="text-xs text-amber-500 font-bold uppercase">Detalle: {currentLead.name} — <span className="text-neutral-400 font-mono">{currentLead.total} EUR</span></h3>
                    <div className="flex items-center gap-2">
                      <span onClick={(e) => e.stopPropagation()}><StatusBadge status={currentLead.status} id={currentLead.id} /></span>
                      <span className="text-[10px] text-neutral-500 font-bold uppercase flex items-center gap-1">{detailOpen ? <><ChevronUp className="w-3 h-3" /> Ocultar</> : <><ChevronDown className="w-3 h-3" /> Mostrar más</>}</span>
                    </div>
                  </button>
                  {detailOpen && <div className="px-3 pb-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-[10px]">
                    <div><span className="text-neutral-500 uppercase block">Email</span><input className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.email} onChange={(e) => updateLeadField(currentLead.id, "email", e.target.value)} /></div>
                    <div><span className="text-neutral-500 uppercase block">Teléfono</span><input className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.phone} onChange={(e) => updateLeadField(currentLead.id, "phone", e.target.value)} /></div>
                    <div><span className="text-neutral-500 uppercase block">Fecha</span><input type="date" className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.date} onChange={(e) => updateLeadField(currentLead.id, "date", e.target.value)} /></div>
                    <div><span className="text-neutral-500 uppercase block">Lugar</span><input className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.location} onChange={(e) => updateLeadField(currentLead.id, "location", e.target.value)} /></div>
                    <div><span className="text-neutral-500 uppercase block">Tipo evento</span><input className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.eventType} onChange={(e) => updateLeadField(currentLead.id, "eventType", e.target.value)} /></div>
                    <div><span className="text-neutral-500 uppercase block">Asistentes</span><input type="number" className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.attendees} onChange={(e) => updateLeadField(currentLead.id, "attendees", Number(e.target.value))} /></div>
                    <div><span className="text-neutral-500 uppercase block">Duración (min)</span><input type="number" className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.durationMinutes} onChange={(e) => updateLeadField(currentLead.id, "durationMinutes", Number(e.target.value))} /></div>
                    <div><span className="text-neutral-500 uppercase block">Sonido</span><select className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.soundNeeded} onChange={(e) => updateLeadField(currentLead.id, "soundNeeded", e.target.value)}><option value="Sí">Sí</option><option value="No">No</option></select></div>
                    <div><span className="text-neutral-500 uppercase block">Espacio</span><select className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.spaceType} onChange={(e) => updateLeadField(currentLead.id, "spaceType", e.target.value)}><option value="Interior">Interior</option><option value="Exterior">Exterior</option></select></div>
                    <div><span className="text-neutral-500 uppercase block">Dormir</span><select className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.stayOvernight} onChange={(e) => updateLeadField(currentLead.id, "stayOvernight", e.target.value)}><option value="No">No</option><option value="Sí">Sí</option></select></div>
                    <div><span className="text-neutral-500 uppercase block">Km viaje</span><input type="number" className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.travelDistance} onChange={(e) => updateLeadField(currentLead.id, "travelDistance", Number(e.target.value))} /></div>
                    <div><span className="text-neutral-500 uppercase block">Temas extra</span><input type="number" className="bg-black/40 border border-neutral-800 rounded px-1 py-0.5 w-full text-white" value={currentLead.extraSongs} onChange={(e) => updateLeadField(currentLead.id, "extraSongs", Number(e.target.value))} /></div>
                  </div>
                  {currentLead.comments && (
                    <div className="mt-2"><span className="text-[9px] text-neutral-500 uppercase">Comentarios</span><p className="text-[11px] text-neutral-400 bg-black/30 rounded p-1.5 mt-0.5">{currentLead.comments}</p></div>
                  )}
                  {currentLead.setlist && (
                    <div className="mt-2"><span className="text-[9px] text-neutral-500 uppercase">Setlist solicitado</span><p className="text-[11px] text-neutral-400 bg-black/30 rounded p-1.5 mt-0.5 whitespace-pre-wrap">{currentLead.setlist}</p></div>
                  )}
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-[9px] text-neutral-600">Creado: {currentLead.createdAt ? new Date(currentLead.createdAt).toLocaleString("es-ES") : "—"}</span>
                    <span className="text-sm font-bold text-amber-500">{currentLead.total} EUR</span>
                  </div>
                  </div>}
                </div>
              )}

              {/* Table */}
              <div className="flex-1 bg-neutral-900/40 border border-neutral-800 rounded overflow-hidden flex flex-col">
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead className="bg-black/40 text-[10px] uppercase font-bold text-neutral-500 border-b border-neutral-800 sticky top-0">
                      <tr>
                        <th className="p-2 border-r border-neutral-800">Cliente</th>
                        <th className="p-2 border-r border-neutral-800">Email</th>
                        <th className="p-2 border-r border-neutral-800">Tlf</th>
                        <th className="p-2 border-r border-neutral-800">Fecha</th>
                        <th className="p-2 border-r border-neutral-800">Tipo</th>
                        <th className="p-2 border-r border-neutral-800">Lugar</th>
                        <th className="p-2 border-r border-neutral-800 text-center">Asist.</th>
                        <th className="p-2 border-r border-neutral-800 text-center">Sonido</th>
                        <th className="p-2 border-r border-neutral-800 text-center">Status</th>
                        <th className="p-2 border-r border-neutral-800 text-right">Total</th>
                        <th className="p-2 text-center">Acc.</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {leads.map((lead) => (
                        <tr key={lead.id} className={`border-b border-neutral-800/50 hover:bg-white/5 cursor-pointer ${selectedLeadId === lead.id ? "bg-amber-500/10" : ""}`} onClick={() => setSelectedLeadId(lead.id)}>
                          <td className="p-2 border-r border-neutral-800 font-bold text-white truncate max-w-[140px]">{lead.name}</td>
                          <td className="p-2 border-r border-neutral-800 text-neutral-400 truncate max-w-[160px]">{lead.email || "—"}</td>
                          <td className="p-2 border-r border-neutral-800 text-neutral-400">{lead.phone || "—"}</td>
                          <td className="p-2 border-r border-neutral-800 text-neutral-400 font-mono">{lead.date || "—"}</td>
                          <td className="p-2 border-r border-neutral-800 text-neutral-400 truncate max-w-[100px]">{lead.eventType || "—"}</td>
                          <td className="p-2 border-r border-neutral-800 text-neutral-400 truncate max-w-[120px]">{lead.location || "—"}</td>
                          <td className="p-2 border-r border-neutral-800 text-center text-neutral-400">{lead.attendees || "—"}</td>
                          <td className="p-2 border-r border-neutral-800 text-center text-neutral-400">{lead.soundNeeded}</td>
                          <td className="p-2 border-r border-neutral-800 text-center" onClick={(e) => e.stopPropagation()}><StatusBadge status={lead.status} id={lead.id} /></td>
                          <td className="p-2 border-r border-neutral-800 text-right font-bold text-amber-500 font-mono">{lead.total}€</td>
                          <td className="p-2 text-center">
                            <div className="flex justify-center gap-1">
                              <button onClick={(e) => { e.stopPropagation(); setSelectedLeadId(lead.id); setActiveTab("budget"); }} className="p-1 hover:text-amber-500" title="Calcular"><Receipt className="w-3.5 h-3.5" /></button>
                              <button onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }} className="p-1 hover:text-red-500" title="Eliminar"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-[10px] text-neutral-500 italic flex items-center gap-2 shrink-0">
                <AlertTriangle className="w-3 h-3 text-amber-600" /> Haz clic en una fila para ver/editar todos los datos del lead.
              </div>
            </div>
          )}

          {/* ═══ CALCULADORA (presupuesto + config tarifas) ═══ */}
          {activeTab === "budget" && (
            <div className="flex-1 flex flex-col gap-3 overflow-auto">
            {/* Config tarifas generales */}
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 shrink-0 flex items-center gap-2"><Settings className="w-3.5 h-3.5 text-amber-500" /> Tarifas Generales <span className="text-neutral-600 normal-case tracking-normal font-normal">— plantilla base para todos los leads</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 shrink-0">
              <div className="bg-neutral-900/40 p-3 rounded border border-neutral-800 space-y-2">
                <h3 className="text-[10px] text-amber-500 font-bold uppercase border-b border-neutral-800 pb-1">Cache</h3>
                <div className="flex flex-col"><span className="text-[9px] text-neutral-500 uppercase">Precio Base</span><input type="number" value={config.basePrice} onChange={(e) => { setConfig({ ...config, basePrice: Number(e.target.value) }); setDirty(true); }} className="bg-black/40 border border-neutral-800 text-xs p-1 rounded" /></div>
                <div className="flex flex-col"><span className="text-[9px] text-neutral-500 uppercase">Minutos</span><input type="number" value={config.baseMinutes} onChange={(e) => { setConfig({ ...config, baseMinutes: Number(e.target.value) }); setDirty(true); }} className="bg-black/40 border border-neutral-800 text-xs p-1 rounded" /></div>
              </div>
              <div className="bg-neutral-900/40 p-3 rounded border border-neutral-800 space-y-2">
                <h3 className="text-[10px] text-amber-500 font-bold uppercase border-b border-neutral-800 pb-1">Canciones</h3>
                <div className="flex flex-col"><span className="text-[9px] text-neutral-500 uppercase">EUR / Extra</span><input type="number" value={config.costPerExtraSong} onChange={(e) => { setConfig({ ...config, costPerExtraSong: Number(e.target.value) }); setDirty(true); }} className="bg-black/40 border border-neutral-800 text-xs p-1 rounded" /></div>
                <div className="flex flex-col"><span className="text-[9px] text-neutral-500 uppercase">Limite</span><input type="number" value={config.maxExtraSongs} onChange={(e) => { setConfig({ ...config, maxExtraSongs: Number(e.target.value) }); setDirty(true); }} className="bg-black/40 border border-neutral-800 text-xs p-1 rounded" /></div>
              </div>
              <div className="bg-neutral-900/40 p-3 rounded border border-neutral-800 space-y-2">
                <h3 className="text-[10px] text-amber-500 font-bold uppercase border-b border-neutral-800 pb-1">Sonido</h3>
                <div className="flex flex-col"><span className="text-[9px] text-neutral-500 uppercase">Propio (EUR)</span><input type="number" value={config.ownSoundHire} onChange={(e) => { setConfig({ ...config, ownSoundHire: Number(e.target.value) }); setDirty(true); }} className="bg-black/40 border border-neutral-800 text-xs p-1 rounded" /></div>
                <div className="flex flex-col"><span className="text-[9px] text-neutral-500 uppercase">Extra (EUR)</span><input type="number" value={config.extraSoundHire} onChange={(e) => { setConfig({ ...config, extraSoundHire: Number(e.target.value) }); setDirty(true); }} className="bg-black/40 border border-neutral-800 text-xs p-1 rounded" /></div>
              </div>
              <div className="bg-neutral-900/40 p-3 rounded border border-neutral-800 space-y-2">
                <h3 className="text-[10px] text-amber-500 font-bold uppercase border-b border-neutral-800 pb-1">Logistica</h3>
                <div className="flex flex-col"><span className="text-[9px] text-neutral-500 uppercase">EUR / Km</span><input type="number" step="0.1" value={config.travelPerKm} onChange={(e) => { setConfig({ ...config, travelPerKm: Number(e.target.value) }); setDirty(true); }} className="bg-black/40 border border-neutral-800 text-xs p-1 rounded" /></div>
                <div className="flex flex-col"><span className="text-[9px] text-neutral-500 uppercase">Estancia (EUR)</span><input type="number" value={config.accommodationCost} onChange={(e) => { setConfig({ ...config, accommodationCost: Number(e.target.value) }); setDirty(true); }} className="bg-black/40 border border-neutral-800 text-xs p-1 rounded" /></div>
              </div>
            </div>

            {/* Presupuesto para lead seleccionado */}
            {currentLead && <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden">
              <div className="bg-neutral-900/40 border border-neutral-800 rounded p-3 space-y-3 overflow-y-auto">
                <h3 className="text-[10px] text-amber-500 font-bold uppercase border-b border-neutral-800 pb-1">Detalles Tecnicos: {currentLead.name}</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1"><label className="text-[9px] uppercase text-neutral-500">Dormir</label><select value={currentLead.stayOvernight} onChange={(e)=>updateLeadField(currentLead.id, "stayOvernight", e.target.value)} className="w-full bg-black/40 border border-neutral-800 text-xs p-1.5 rounded"><option value="No">No</option><option value="Sí">Sí</option></select></div>
                  <div className="space-y-1"><label className="text-[9px] uppercase text-neutral-500">Km Totales</label><input type="number" value={currentLead.travelDistance} onChange={(e)=>updateLeadField(currentLead.id, "travelDistance", Number(e.target.value))} className="w-full bg-black/40 border border-neutral-800 text-xs p-1.5 rounded" /></div>
                  <div className="space-y-1"><label className="text-[9px] uppercase text-neutral-500">Temas fuera setlist</label><input type="number" value={currentLead.extraSongs} onChange={(e)=>updateLeadField(currentLead.id, "extraSongs", Number(e.target.value))} className="w-full bg-black/40 border border-neutral-800 text-xs p-1.5 rounded" /></div>
                  <div className="space-y-1"><label className="text-[9px] uppercase text-neutral-500">Asistentes</label><input type="number" value={currentLead.attendees} onChange={(e)=>updateLeadField(currentLead.id, "attendees", Number(e.target.value))} className="w-full bg-black/40 border border-neutral-800 text-xs p-1.5 rounded" /></div>
                  <div className="space-y-1"><label className="text-[9px] uppercase text-neutral-500">Sonido</label><select value={currentLead.soundNeeded} onChange={(e)=>updateLeadField(currentLead.id, "soundNeeded", e.target.value)} className="w-full bg-black/40 border border-neutral-800 text-xs p-1.5 rounded"><option value="Sí">Sí</option><option value="No">No</option></select></div>
                  <div className="space-y-1"><label className="text-[9px] uppercase text-neutral-500">Espacio</label><select value={currentLead.spaceType} onChange={(e)=>updateLeadField(currentLead.id, "spaceType", e.target.value)} className="w-full bg-black/40 border border-neutral-800 text-xs p-1.5 rounded"><option value="Interior">Interior</option><option value="Exterior">Exterior</option></select></div>
                </div>
              </div>
              <div className="bg-neutral-900/40 border border-neutral-800 rounded flex flex-col overflow-hidden">
                <div className="bg-black/40 p-2 border-b border-neutral-800 flex justify-between items-center"><span className="text-[10px] font-bold uppercase">Presupuesto</span><span className="text-xl font-bold text-amber-500">{budget.total} EUR</span></div>
                <div className="p-3 overflow-y-auto flex-1 space-y-1.5">
                  {budget.items.map((item, idx) => <div key={idx} className="flex justify-between text-xs border-b border-neutral-800 pb-1"><span className="text-neutral-400">{item.label}</span><span className="text-white font-mono">{item.price} EUR</span></div>)}
                  {budget.warnings.map((w, i) => <div key={i} className="p-1.5 bg-red-950/20 border border-red-900/30 text-[10px] text-red-400 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> {w}</div>)}
                </div>
              </div>
              <div className="bg-neutral-900/40 border border-neutral-800 rounded flex flex-col overflow-hidden">
                <div className="bg-black/40 p-2 border-b border-neutral-800 flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase">Respuesta</span>
                  <button onClick={copyToClipboard} className="text-[10px] bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded flex items-center gap-1">{emailCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{emailCopied ? "Copiado" : "Copiar"}</button>
                </div>
                <div className="p-3 flex-1 overflow-hidden"><textarea readOnly className="w-full h-full bg-transparent text-neutral-400 text-[11px] font-sans resize-none outline-none leading-snug" value={generateEmailText()} /></div>
              </div>
            </div>}
            {!currentLead && <p className="text-[10px] text-neutral-600 italic">Selecciona un lead en Pipeline para calcular su presupuesto.</p>}
            <p className="text-[10px] text-neutral-600 italic shrink-0"><AlertTriangle className="w-3 h-3 inline text-amber-600 mr-1" />Recuerda pulsar "Guardar" en el header para guardar los cambios de tarifas.</p>
            </div>
          )}

          {/* ═══ FINANZAS ═══ */}
          {activeTab === "finanzas" && (
            <div className="flex-1 flex flex-col gap-3 overflow-auto">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 shrink-0">Finanzas y Objetivos</h2>
              {/* KPI cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
                <div className="bg-neutral-900/40 border border-neutral-800 rounded p-3 text-center">
                  <div className="text-[9px] text-neutral-500 uppercase font-bold">Facturación Confirmada</div>
                  <div className="text-2xl font-bold text-green-400 mt-1">{financeStats.totalConfirmed} €</div>
                  <div className="text-[9px] text-neutral-600">{financeStats.confirmed.length} eventos</div>
                </div>
                <div className="bg-neutral-900/40 border border-neutral-800 rounded p-3 text-center">
                  <div className="text-[9px] text-neutral-500 uppercase font-bold">Pendiente</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">{financeStats.totalPending} €</div>
                  <div className="text-[9px] text-neutral-600">{financeStats.pending.length} leads</div>
                </div>
                <div className="bg-neutral-900/40 border border-neutral-800 rounded p-3 text-center">
                  <div className="text-[9px] text-neutral-500 uppercase font-bold">Pipeline Total</div>
                  <div className="text-2xl font-bold text-white mt-1">{financeStats.totalPipeline} €</div>
                  <div className="text-[9px] text-neutral-600">{leads.length} leads totales</div>
                </div>
                <div className="bg-neutral-900/40 border border-neutral-800 rounded p-3 text-center">
                  <div className="text-[9px] text-neutral-500 uppercase font-bold">Tasa Conversión</div>
                  <div className="text-2xl font-bold text-blue-400 mt-1">{financeStats.conversionRate}%</div>
                  <div className="text-[9px] text-neutral-600">Media: {financeStats.avgDeal} €/evento</div>
                </div>
              </div>

              {/* Status breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-neutral-900/40 border border-neutral-800 rounded p-3">
                  <h3 className="text-[10px] text-amber-500 font-bold uppercase border-b border-neutral-800 pb-1 mb-2">Desglose por Status</h3>
                  {["Nuevo","Contactado","Presupuestado","Confirmado","Perdido"].map((st) => {
                    const count = leads.filter((l) => l.status === st).length;
                    const amount = leads.filter((l) => l.status === st).reduce((s,l) => s + (l.total || 0), 0);
                    const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                    const barColor = {Nuevo:"bg-blue-500",Contactado:"bg-purple-500",Presupuestado:"bg-amber-500",Confirmado:"bg-green-500",Perdido:"bg-red-500"}[st];
                    return (
                      <div key={st} className="mb-2">
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span className="text-neutral-400 font-bold">{st}</span>
                          <span className="text-neutral-500">{count} leads · {amount} €</span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-1.5">
                          <div className={`${barColor} h-1.5 rounded-full transition-all`} style={{width: `${pct}%`}} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-neutral-900/40 border border-neutral-800 rounded p-3">
                  <h3 className="text-[10px] text-amber-500 font-bold uppercase border-b border-neutral-800 pb-1 mb-2">Eventos Confirmados</h3>
                  {financeStats.confirmed.length === 0 && <p className="text-[10px] text-neutral-600 italic">Ningún evento confirmado aún.</p>}
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {financeStats.confirmed.map((l) => (
                      <div key={l.id} className="flex justify-between items-center text-[11px] border-b border-neutral-800/50 pb-1">
                        <div>
                          <span className="text-white font-bold">{l.name}</span>
                          <span className="text-neutral-500 ml-2">{l.date} · {l.location || "?"}</span>
                        </div>
                        <span className="text-green-400 font-bold font-mono">{l.total} €</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lost deals */}
              {financeStats.lost.length > 0 && (
                <div className="bg-neutral-900/40 border border-neutral-800 rounded p-3">
                  <h3 className="text-[10px] text-red-400 font-bold uppercase border-b border-neutral-800 pb-1 mb-2">Perdidos ({financeStats.lost.length})</h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {financeStats.lost.map((l) => (
                      <div key={l.id} className="flex justify-between text-[11px] text-neutral-500 border-b border-neutral-800/30 pb-0.5">
                        <span>{l.name} — {l.date}</span>
                        <span className="text-red-400/60 font-mono">{l.total} €</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}



        </div>
      </main>

      <footer className="bg-neutral-900/30 border-t border-neutral-800 px-4 py-1.5 shrink-0">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-[9px] text-neutral-600 uppercase tracking-widest font-bold">
          <div className="flex gap-4"><span>Leads: {leads.length}</span><span>Confirmados: {financeStats.confirmed.length}</span><span>Perdidos: {financeStats.lost.length}</span></div>
          <div className="flex gap-4 items-center"><span className="text-amber-600">Lead: {currentLead?.name || "-"}</span><span className="text-green-500">Confirmado: {financeStats.totalConfirmed}€</span><span>Pipeline: {financeStats.totalPipeline}€</span></div>
        </div>
      </footer>
    </div>
  );
}

const root = document.getElementById("crmRoot");
if (root) {
  ReactDOM.createRoot(root).render(<App />);
}
