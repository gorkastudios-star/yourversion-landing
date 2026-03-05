const { useMemo, useState, useEffect } = React;

const IconBase = ({ size = 14, strokeWidth = 2, className = "", children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Search = (props) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconBase>
);

const Plus = (props) => (
  <IconBase {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </IconBase>
);

const Trash2 = (props) => (
  <IconBase {...props}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </IconBase>
);

const ArrowUp = (props) => (
  <IconBase {...props}>
    <path d="m12 19 0-14" />
    <path d="m5 12 7-7 7 7" />
  </IconBase>
);

const ArrowDown = (props) => (
  <IconBase {...props}>
    <path d="m12 5 0 14" />
    <path d="m19 12-7 7-7-7" />
  </IconBase>
);

const Check = (props) => (
  <IconBase {...props}>
    <path d="m20 6-11 11-5-5" />
  </IconBase>
);

const ChevronRight = (props) => (
  <IconBase {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconBase>
);

const Clock = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </IconBase>
);

const RAW_PACKS = [
  {
    id: "poprock_es",
    name: "Pop-Rock Español",
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
    id: "disney",
    name: 'Pack "Disney"',
    songs: [
      { title: "Hakuna Matata", artist: "Rey León" },
      { title: "We don’t talk about Bruno", artist: "Encanto" },
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
    id: "los2000",
    name: "Los 2000",
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
      { title: "Don’t Stop The Music", artist: "Rihanna" },
      { title: "Princesas", artist: "Pereza" },
      { title: "Tenía tanto", artist: "Nena Daconte" },
      { title: "Me gustas tú", artist: "Manu Chao" },
      { title: "La taberna de Buda", artist: "Café Quijano" },
    ],
  },
  {
    id: "noche_viernes",
    name: 'Pack "Noche de Viernes"',
    songs: [
      { title: "La bilirrubina", artist: "Juan L Guerra" },
      { title: "Livin’ la vida loca", artist: "Ricky Martin" },
      { title: "Dancin Queen", artist: "Abba" },
      { title: "Dile", artist: "Don Omar" },
      { title: "Gasolina", artist: "Daddy Yankee" },
      { title: "Si antes te hubiera conocido", artist: "Karol G" },
      { title: "La macarena", artist: "Los del Río" },
      { title: "I gotta feeling", artist: "The Black Eyed Peas" },
      { title: "Don’t stop me now", artist: "Queen" },
      { title: "Smooth Criminal", artist: "Michael Jackson" },
      { title: "La morocha", artist: "BM, Luck Ra" },
      { title: "Rasputin", artist: "Boney M" },
      { title: "Just Dance", artist: "Lady Gaga" },
      { title: "Corazón espinado", artist: "Maná" },
      { title: "Hey ya!", artist: "Outkast" },
    ],
  },
  {
    id: "puro_rock",
    name: 'Pack "Puro Rock"',
    songs: [
      { title: "Stand By", artist: "Extremoduro" },
      { title: "Por la boca vive el pez", artist: "Fito" },
      { title: "Hay poco rock and roll", artist: "Platero y Tú" },
      { title: "Salir", artist: "Extremoduro" },
      { title: "Nothing Else Matters", artist: "Metallica" },
      { title: "Livin’ on a Prayer", artist: "Bon Jovi" },
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
    id: "estandar",
    name: 'Pack "Estándar"',
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

const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

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
      if (!songsMap.has(key)) {
        songsMap.set(key, {
          id: key,
          title: s.title,
          artist: s.artist || "",
        });
      }
      return key;
    });
    return { ...p, songIds };
  });
  return { catalog: Array.from(songsMap.values()), packs };
}

function makeUid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function App() {
  const { catalog, packs } = useMemo(() => buildCatalogAndPacks(RAW_PACKS), []);

  const [activePackId, setActivePackId] = useState("estandar");
  const [qPack, setQPack] = useState("");
  const [setlist, setSetlist] = useState([]);
  const [toast, setToast] = useState("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [pendingPackImport, setPendingPackImport] = useState(null);

  const DURATION_OPTIONS = [60, 80, 100, 120, 140, 160, 180];
  const [targetDuration, setTargetDuration] = useState(60);
  const AVERAGE_SONG_DURATION = 4;

  const targetSongCount = useMemo(() => {
    return Math.ceil(targetDuration / AVERAGE_SONG_DURATION);
  }, [targetDuration]);

  const activePack = useMemo(
    () => packs.find((p) => p.id === activePackId) || packs[0],
    [packs, activePackId]
  );

  const catalogById = useMemo(() => {
    const m = new Map();
    for (const s of catalog) m.set(s.id, s);
    return m;
  }, [catalog]);

  const selectedSongIds = useMemo(() => {
    const s = new Set();
    for (const it of setlist) s.add(it.songId);
    return s;
  }, [setlist]);

  useEffect(() => {
    const textarea = document.getElementById("repertorioSeleccionado");
    if (!textarea) return;
    const text = setlist
      .map((it, i) => {
        const ss = catalogById.get(it.songId);
        return `${i + 1}. ${ss?.title || "??"}${ss?.artist ? " — " + ss.artist : ""}`;
      })
      .join("\n");
    textarea.value = text;
  }, [setlist, catalogById]);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const packSongs = useMemo(() => {
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

  const removeItem = (itemUid) => {
    setSetlist((prev) => prev.filter((x) => x.uid !== itemUid));
  };

  const moveItem = (from, to) => {
    setSetlist((prev) => {
      if (from === to) return prev;
      const copy = prev.slice();
      const [it] = copy.splice(from, 1);
      copy.splice(to, 0, it);
      return copy;
    });
  };

  const importPack = (packId, mode) => {
    const pack = packs.find((p) => p.id === packId);
    if (!pack) return;

    if (mode === "replace") {
      const items = pack.songIds.map((songId) => ({ uid: makeUid(), songId }));
      setSetlist(items);
      flash("Colección importada");
    } else {
      const items = pack.songIds
        .filter((songId) => !selectedSongIds.has(songId))
        .map((songId) => ({ uid: makeUid(), songId }));
      if (items.length === 0) return flash("Sin pistas nuevas");
      setSetlist((prev) => [...prev, ...items]);
      flash(`${items.length} añadidas`);
    }
    setPendingPackImport(null);
  };

  const clearAll = () => {
    if (window.confirm("¿Seguro que quieres vaciar todo el setlist?")) {
      setSetlist([]);
      flash("Vaciado");
    }
  };

  const onDragStartSong = (e, songId) => {
    if (selectedSongIds.has(songId)) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", songId);
    e.dataTransfer.effectAllowed = "copy";
  };

  const onDropToSetlist = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const songId = e.dataTransfer.getData("text/plain");
    if (!songId) return;
    if (selectedSongIds.has(songId)) return flash("Ya seleccionada");
    addSong(songId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = () => {
    setIsDraggingOver(false);
  };

  const copyToClipboard = () => {
    const text = setlist
      .map((it, i) => {
        const ss = catalogById.get(it.songId);
        return `${i + 1}. ${ss?.title || "??"}${ss?.artist ? " — " + ss.artist : ""}`;
      })
      .join("\n");
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        flash("Copiado al portapapeles");
      })
      .catch(() => {
        flash("Error al copiar");
      });
  };

  return (
    <div className="font-[Outfit,sans-serif] p-0 md:p-0 lg:overflow-hidden flex flex-col selection:bg-zinc-200 rounded-[18px] shadow-xl" style={{
      boxShadow:'0 8px 32px rgba(197,160,89,0.10)',
      border:'none',
      height:'740px',
      minHeight:'740px',
      maxHeight:'740px',
      background:'#0a0a0a',
      color:'#e8e8ea'
    }}>
      {pendingPackImport && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white max-w-sm w-full shadow-2xl border border-zinc-100 p-8 rounded-sm">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Importar Colección</h3>
            <p className="text-lg font-serif text-black leading-tight mb-8 lowercase italic tracking-tight">
              ¿Desea combinar esta selección con la actual o comenzar un nuevo proyecto?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => importPack(pendingPackImport, "append")}
                className="w-full py-4 bg-zinc-100 hover:bg-zinc-200 text-black text-[9px] uppercase tracking-[0.3em] font-bold transition-all"
              >
                Añadir al actual
              </button>
              <button
                onClick={() => importPack(pendingPackImport, "replace")}
                className="w-full py-4 bg-black text-white text-[9px] uppercase tracking-[0.3em] font-bold transition-all hover:bg-zinc-800"
              >
                Comenzar de nuevo
              </button>
              <button
                onClick={() => setPendingPackImport(null)}
                className="w-full py-2 text-[8px] text-zinc-300 uppercase tracking-widest font-bold mt-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-black text-white px-8 py-3 shadow-2xl text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-3">
          <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
          {toast}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col bg-transparent shadow-none border-none overflow-hidden h-full relative rounded-[18px]">
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1.2fr_420px] min-h-0 overflow-hidden rounded-[18px]">
          <section className="flex flex-col lg:flex-row border-b-0 lg:border-b-0 lg:border-r-0 bg-transparent min-h-[40vh] lg:min-h-0 overflow-hidden rounded-l-[18px]">
            <div className="flex-none lg:w-64 bg-[#181818] border-b-0 lg:border-b-0 lg:border-r-0 flex flex-col rounded-l-[18px]">
              <div className="p-6 border-b-0 bg-transparent">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[11px] font-bold text-[var(--brass-accent)] uppercase tracking-[0.2em] flex items-center gap-2 font-sans">
                    <Clock size={11} strokeWidth={2} /> Duración
                  </h2>
                  <div className="text-[11px] font-bold text-[var(--brass-accent)] tracking-widest font-sans">
                    {setlist.length} <span className="text-zinc-300 mx-1">/</span> {targetSongCount}
                  </div>
                </div>

                <div className="relative group">
                  <select
                    value={targetDuration}
                    onChange={(e) => setTargetDuration(parseInt(e.target.value, 10))}
                    className="w-full bg-[#18120f] border border-[var(--brass-accent)] text-xs font-bold py-2 px-3 rounded-[8px] focus:outline-none focus:border-[var(--brass-accent)] appearance-none cursor-pointer transition-colors text-[var(--brass-accent)] font-serif shadow-lg"
                    style={{boxShadow:'0 2px 12px rgba(197,160,89,0.10)'}}
                  >
                    {DURATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{background:'#18120f', color:'var(--brass-accent)'}}>
                        {Math.floor(opt / 60)}h {opt % 60 > 0 ? `${opt % 60}min` : ""}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-300 group-hover:text-black transition-colors">
                    <ChevronRight size={12} className="rotate-90" />
                  </div>
                </div>

                <div className="mt-4 h-[2px] bg-zinc-800 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-[var(--brass-accent)] transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${Math.min(100, (setlist.length / targetSongCount) * 100)}%`, background:'linear-gradient(90deg, var(--brass-accent), #fffbe6 100%)' }}
                  ></div>
                </div>
              </div>

              <div className="hidden lg:block px-6 py-4 bg-transparent">
                <h2 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em] font-sans">Colecciones</h2>
              </div>

              <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden p-3 gap-0.5 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {packs.map((p) => {
                  const isActive = activePackId === p.id;
                  return (
                    <div key={p.id} className="flex items-center group/item px-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPendingPackImport(p.id);
                        }}
                        className={`p-2 transition-all duration-300 ${
                          isActive ? "text-white/40 hover:text-white" : "text-zinc-200 hover:text-black"
                        }`}
                        title="Importar colección completa"
                      >
                        <Plus size={14} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => {
                          setActivePackId(p.id);
                          setQPack("");
                        }}
                        className={`flex-1 flex justify-between items-center px-2 py-3.5 rounded-[8px] text-[11px] transition-all text-left group font-bold tracking-[0.05em] uppercase border border-transparent ${
                          isActive ? "bg-[var(--brass-accent)] text-black shadow-lg border-[var(--brass-accent)]" : "text-zinc-300 hover:text-[var(--brass-accent)] hover:border-[var(--brass-accent)]"
                        }`}
                      >
                        <span className="truncate font-bold tracking-[0.05em] uppercase">{p.name}</span>
                        <ChevronRight
                          size={12}
                          strokeWidth={2}
                          className={`hidden lg:block transition-transform duration-300 ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0 bg-transparent">
              <div className="p-6 border-b-0 bg-transparent z-10">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-zinc-300">
                    <Search size={13} strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-7 pr-3 py-2 border-b border-zinc-800 bg-transparent placeholder-zinc-500 focus:outline-none focus:border-zinc-800 transition-colors text-[11px] font-medium text-zinc-200 tracking-wide font-sans"
                    placeholder="Filtrar catálogo..."
                    value={qPack}
                    onChange={(e) => setQPack(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-0.5 bg-transparent">
                {packSongs.length === 0 ? (
                  <div className="text-center py-12 opacity-20">
                    <Search className="mx-auto h-5 w-5 mb-3" strokeWidth={1} />
                    <p className="text-[9px] uppercase tracking-widest font-bold">Sin pistas</p>
                  </div>
                ) : (
                  packSongs.map((s) => {
                    const isSelected = selectedSongIds.has(s.id);
                    return (
                      <div
                        key={s.id}
                        draggable={!isSelected}
                        onDragStart={(e) => onDragStartSong(e, s.id)}
                        className={`flex items-center py-2 px-3 transition-all duration-300 border border-transparent rounded-[8px] group ${
                          isSelected
                            ? "opacity-20 grayscale bg-transparent"
                            : "bg-zinc-900 hover:border-zinc-800 hover:shadow-lg cursor-grab active:cursor-grabbing border border-zinc-800"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => addSong(s.id)}
                          disabled={isSelected}
                          className="flex-shrink-0 mr-3 p-1.5 text-zinc-200 hover:text-black transition-all duration-300 disabled:opacity-0"
                          title="Añadir pista"
                        >
                          {isSelected ? <Check size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-bold text-zinc-200 truncate tracking-tight leading-none mb-1 font-sans" style={{fontFamily:'var(--font-main)'}}>{s.title}</p>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold truncate leading-none font-sans">{s.artist || "—"}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col bg-transparent min-h-[50vh] lg:min-h-0 border-t-0 lg:border-t-0 border-r-0 rounded-r-[18px]">
            <div className="p-6 border-b-0 bg-transparent flex justify-between items-center z-10">
              <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em] font-sans">Mi Set List</h2>
              <button
                onClick={clearAll}
                disabled={setlist.length === 0}
                className="text-zinc-500 hover:text-zinc-200 transition-colors disabled:opacity-0"
              >
                <Trash2 size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div
              className={`flex-1 overflow-y-auto relative transition-colors duration-500 ${isDraggingOver ? 'bg-[#181818]' : ''}`}
              onDrop={onDropToSetlist}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              {setlist.length === 0 ? (
                <div
                  className={`h-full min-h-[250px] flex flex-col items-center justify-center m-6 border border-dashed border-zinc-200 text-center transition-all ${
                    isDraggingOver ? "border-black" : ""
                  }`}
                >
                  <p className="text-[8px] font-bold text-zinc-300 uppercase tracking-[0.4em] mb-3">Componer lista</p>
                  <p className="text-[11px] text-zinc-400 font-serif italic max-w-[120px] leading-relaxed">
                    Deslice pistas desde la colección principal
                  </p>
                </div>
              ) : (
                <div className="pb-24">
                  {setlist.map((it, idx) => {
                    const s = catalogById.get(it.songId);
                    return (
                      <div
                        key={it.uid}
                        className="group flex items-center justify-between py-3 px-5 bg-zinc-900 border-b border-zinc-800 hover:bg-zinc-800 transition-all duration-300 rounded-[8px]"
                      >
                        <div className="flex items-center gap-4 overflow-hidden">
                          <span className="text-[11px] font-bold text-zinc-500 w-3 text-right flex-shrink-0 group-hover:text-zinc-200 transition-colors font-sans">
                            {idx + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-bold text-zinc-200 truncate tracking-tight leading-none mb-1 font-sans" style={{fontFamily:'var(--font-main)'}}>{s?.title || "??"}</p>
                            <p className="text-[9px] text-zinc-500 uppercase tracking-[0.15em] font-semibold leading-none font-sans">{s?.artist || "—"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          <button
                            onClick={() => moveItem(idx, Math.max(0, idx - 1))}
                            disabled={idx === 0}
                            className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-0"
                          >
                            <ArrowUp size={12} strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => moveItem(idx, Math.min(setlist.length - 1, idx + 1))}
                            disabled={idx === setlist.length - 1}
                            className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-0"
                          >
                            <ArrowDown size={12} strokeWidth={2} />
                          </button>
                          <button onClick={() => removeItem(it.uid)} className="p-1 text-zinc-500 hover:text-zinc-200 ml-1">
                            <Trash2 size={12} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-6 bg-transparent border-t-0 z-10 mt-auto rounded-b-[18px]">
              {setlist.length > 0 ? (
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-[9px] uppercase tracking-[0.3em] font-bold transition-all rounded-[8px] flex items-center justify-center shadow-lg font-sans border border-zinc-800"
                  >
                    Copiar
                  </button>
                  <button
                    onClick={() => flash("Setlist enviado con éxito")}
                    className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-[9px] uppercase tracking-[0.3em] font-bold transition-all rounded-[8px] shadow-xl flex items-center justify-center border border-zinc-800 font-sans"
                  >
                    Enviar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-32">
                  <div className="group flex items-center justify-between py-3 px-5 bg-zinc-900 border-b border-zinc-800 rounded-[8px] w-full max-w-md">
                    <div className="min-w-0 flex-1 text-center">
                      <p className="text-[13px] font-bold text-zinc-700 truncate tracking-tight leading-none mb-1 font-sans">(Vacío)</p>
                      <p className="text-[9px] text-zinc-600 uppercase tracking-[0.15em] font-semibold leading-none font-sans">Selecciona una canción</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const rootNode = document.getElementById("celListRoot");
if (rootNode) {
  ReactDOM.createRoot(rootNode).render(<App />);
}
