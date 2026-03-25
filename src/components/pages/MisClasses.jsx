import { useState, useEffect, useRef } from "react";
import Topbar from "../Topbar.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Paleta de colores por clase ──────────────────────────────────────────────
const COLORS = [
  {
    accent: "#378ADD",
    tagBg: "#E6F1FB",
    tagText: "#185FA5",
    pillBg: "#E6F1FB",
    pillText: "#185FA5",
    avatarBg: "#B5D4F4",
    avatarText: "#0C447C",
  },
  {
    accent: "#1D9E75",
    tagBg: "#E1F5EE",
    tagText: "#0F6E56",
    pillBg: "#E1F5EE",
    pillText: "#0F6E56",
    avatarBg: "#9FE1CB",
    avatarText: "#085041",
  },
  {
    accent: "#D85A30",
    tagBg: "#FAECE7",
    tagText: "#993C1D",
    pillBg: "#FAECE7",
    pillText: "#993C1D",
    avatarBg: "#F5C4B3",
    avatarText: "#712B13",
  },
  {
    accent: "#7F77DD",
    tagBg: "#EEEDFE",
    tagText: "#534AB7",
    pillBg: "#EEEDFE",
    pillText: "#534AB7",
    avatarBg: "#CECBF6",
    avatarText: "#3C3489",
  },
];

// ── Datos de ejemplo (reemplazar con llamada real a la API) ──────────────────
const MOCK_CLASSES = [
  {
    _id: "1",
    colorIdx: 0,
    code: "BD-301",
    name: "Bases de Datos Relacionales",
    description: "Diseño, implementación y optimización de bases de datos SQL.",
    professor: "Prof. Carlos Mendoza",
    credits: 3,
    schedule: [
      { day: "Lunes", time: "7:00 AM – 9:00 AM", room: "Sala 204" },
      { day: "Miércoles", time: "7:00 AM – 9:00 AM", room: "Sala 204" },
    ],
    period: "morning",
    forum: [
      {
        _id: "m1",
        name: "Ana Torres",
        initials: "AT",
        time: "hace 2h",
        text: "¿Alguien tiene el ejercicio 4 del taller de normalización?",
      },
      {
        _id: "m2",
        name: "Luis García",
        initials: "LG",
        time: "hace 1h",
        text: "Sí, te lo paso por el grupo de WhatsApp",
      },
      {
        _id: "m3",
        name: "Prof. Mendoza",
        initials: "PM",
        time: "hace 30min",
        text: "Recuerden que el quiz es el viernes. Estudien las formas normales hasta la 3FN.",
      },
    ],
  },
  {
    _id: "2",
    colorIdx: 1,
    code: "ALG-201",
    name: "Algoritmos y Estructuras",
    description:
      "Análisis de algoritmos, complejidad computacional y estructuras de datos avanzadas.",
    professor: "Prof. María Jiménez",
    credits: 4,
    schedule: [
      { day: "Martes", time: "10:00 AM – 12:00 PM", room: "Lab 301" },
      { day: "Jueves", time: "10:00 AM – 12:00 PM", room: "Lab 301" },
    ],
    period: "morning",
    forum: [
      {
        _id: "m4",
        name: "Santiago Ruiz",
        initials: "SR",
        time: "hace 3h",
        text: "¿Cuál es la diferencia entre un heap y un BST?",
      },
      {
        _id: "m5",
        name: "Prof. Jiménez",
        initials: "PJ",
        time: "hace 2h",
        text: "Gran pregunta. La semana que viene lo vemos con ejemplos en clase.",
      },
    ],
  },
  {
    _id: "3",
    colorIdx: 2,
    code: "RED-410",
    name: "Redes y Comunicaciones",
    description:
      "Protocolos de red, arquitectura TCP/IP y seguridad en comunicaciones.",
    professor: "Prof. Roberto Vargas",
    credits: 3,
    schedule: [
      { day: "Lunes", time: "2:00 PM – 4:00 PM", room: "Sala 110" },
      { day: "Viernes", time: "2:00 PM – 4:00 PM", room: "Sala 110" },
    ],
    period: "afternoon",
    forum: [
      {
        _id: "m6",
        name: "Camila Díaz",
        initials: "CD",
        time: "ayer",
        text: "El laboratorio de Wireshark fue muy útil, aprendí bastante.",
      },
    ],
  },
  {
    _id: "4",
    colorIdx: 3,
    code: "ING-501",
    name: "Ingeniería de Software",
    description:
      "Metodologías ágiles, patrones de diseño y ciclo de vida del software.",
    professor: "Prof. Elena Castillo",
    credits: 4,
    schedule: [
      { day: "Miércoles", time: "6:00 PM – 8:00 PM", room: "Sala 215" },
      { day: "Viernes", time: "6:00 PM – 8:00 PM", room: "Sala 215" },
    ],
    period: "evening",
    forum: [
      {
        _id: "m7",
        name: "Miguel Ospina",
        initials: "MO",
        time: "hace 5h",
        text: "¿Qué herramienta usamos para los diagramas UML del proyecto?",
      },
      {
        _id: "m8",
        name: "Prof. Castillo",
        initials: "PC",
        time: "hace 4h",
        text: "Pueden usar draw.io o Lucidchart, cualquiera está bien.",
      },
      {
        _id: "m9",
        name: "Valentina Cruz",
        initials: "VC",
        time: "hace 1h",
        text: "Yo uso draw.io y está muy bien, lo recomiendo.",
      },
    ],
  },
];

// ── Utilidades ───────────────────────────────────────────────────────────────
function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ── Sub-componente: Modal ────────────────────────────────────────────────────
function ClassModal({ cls, onClose }) {
  const [view, setView] = useState("forum");
  const [messages, setMessages] = useState(cls.forum || []);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);
  const col = COLORS[cls.colorIdx % COLORS.length];

  useEffect(() => {
    if (view === "forum" && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, view]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    const newMsg = {
      _id: Date.now().toString(),
      name: "Tú",
      initials: "TU",
      time: "ahora",
      text,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // ── Conectar a tu API real ──
    // try {
    //   await fetch(`${API_URL}/clases/${cls._id}/foro`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ text }),
    //   });
    // } catch (err) {
    //   console.error('Error al enviar mensaje:', err);
    // }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={styles.modalOverlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: col.tagText,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 2,
              }}
            >
              {cls.code}
            </p>
            <h2 style={styles.modalTitle}>{cls.name}</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={styles.modalTabs}>
          {["forum", "schedule"].map((v) => (
            <button
              key={v}
              style={{
                ...styles.modalTab,
                ...(view === v
                  ? {
                      borderBottom: `2px solid ${col.accent}`,
                      color: col.accent,
                      fontWeight: 500,
                    }
                  : {}),
              }}
              onClick={() => setView(v)}
            >
              {v === "forum" ? `Foro (${messages.length})` : "Horario"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div ref={bodyRef} style={styles.modalBody}>
          {view === "schedule" ? (
            <div>
              <p style={styles.sectionLabel}>Sesiones semanales</p>
              {cls.schedule.map((s, i) => (
                <div key={i} style={styles.scheduleRow}>
                  <span style={styles.dayName}>{s.day}</span>
                  <span style={styles.dayTime}>{s.time}</span>
                  <span style={styles.dayRoom}>{s.room}</span>
                </div>
              ))}
              <p style={{ ...styles.sectionLabel, marginTop: 24 }}>Detalles</p>
              {[
                { label: "Profesor", value: cls.professor },
                { label: "Créditos", value: cls.credits },
                { label: "Código", value: cls.code },
              ].map((r) => (
                <div key={r.label} style={styles.scheduleRow}>
                  <span style={styles.dayName}>{r.label}</span>
                  <span style={styles.dayTime}>{r.value}</span>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <p style={styles.emptyState}>
              Aún no hay mensajes. ¡Sé el primero!
            </p>
          ) : (
            messages.map((m) => (
              <div key={m._id} style={styles.forumMsg}>
                <div
                  style={{
                    ...styles.avatar,
                    background: col.avatarBg,
                    color: col.avatarText,
                  }}
                >
                  {m.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={styles.msgName}>{m.name}</span>
                  <span style={styles.msgTime}>{m.time}</span>
                  <p style={styles.msgText}>{m.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input foro */}
        {view === "forum" && (
          <div style={styles.forumInputArea}>
            <textarea
              style={styles.forumInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe un mensaje al grupo..."
              rows={1}
            />
            <button
              style={{ ...styles.sendBtn, background: col.accent }}
              onClick={handleSend}
            >
              Enviar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Componente principal: MisClases ──────────────────────────────────────────
export default function MisClases() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [activeClass, setActiveClass] = useState(null);

  useEffect(() => {
    // ── Descomentar para conectar a tu API real ──
    // fetch(`${API_URL}/clases/mis-clases`, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    // })
    //   .then(res => res.json())
    //   .then(data => setClasses(data.map((c, i) => ({ ...c, colorIdx: i % COLORS.length }))))
    //   .catch(console.error)
    //   .finally(() => setLoading(false));

    // ── Datos de ejemplo ──
    setTimeout(() => {
      setClasses(MOCK_CLASSES);
      setLoading(false);
    }, 500);
  }, []);

  const FILTERS = [
    { key: "all", label: "Todas" },
    { key: "morning", label: "Mañana" },
    { key: "afternoon", label: "Tarde" },
    { key: "evening", label: "Noche" },
  ];

  const filtered =
    filter === "all" ? classes : classes.filter((c) => c.period === filter);

  return (
    <div className="">
      <Topbar />
      <div style={styles.app}>
        {/* Header */}

        <div style={styles.header}>
          <h1 style={styles.h1}>Mis clases</h1>
          <p style={styles.subtitle}>
            Semestre 2026-1 · {classes.length} clases matriculadas
          </p>
        </div>

        {/* Filtros */}
        <div style={styles.tabs}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              style={{
                ...styles.tab,
                ...(filter === f.key ? styles.tabActive : {}),
              }}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {loading ? (
          <p style={styles.emptyState}>Cargando clases...</p>
        ) : filtered.length === 0 ? (
          <p style={styles.emptyState}>No hay clases en este horario.</p>
        ) : (
          <div style={styles.grid}>
            {filtered.map((cls) => {
              const col = COLORS[cls.colorIdx % COLORS.length];
              return (
                <div key={cls._id} style={styles.card}>
                  <div
                    style={{
                      height: 4,
                      background: col.accent,
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                  <div style={styles.cardBody}>
                    <p style={{ ...styles.cardCode, color: col.tagText }}>
                      {cls.code} · {cls.credits} créditos
                    </p>
                    <h2 style={styles.cardTitle}>{cls.name}</h2>
                    <p style={styles.cardDesc}>{cls.description}</p>

                    {/* Profesor */}
                    <div style={styles.metaRow}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{ opacity: 0.45, flexShrink: 0 }}
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a5 5 0 0 0-5 5h10a5 5 0 0 0-5-5z" />
                      </svg>
                      <span style={styles.metaText}>{cls.professor}</span>
                    </div>

                    {/* Píldoras de horario */}
                    <div style={styles.pills}>
                      {cls.schedule.map((s, i) => (
                        <span
                          key={i}
                          style={{
                            ...styles.pill,
                            background: col.pillBg,
                            color: col.pillText,
                          }}
                        >
                          {s.day} {s.time.split("–")[0].trim()}
                        </span>
                      ))}
                    </div>

                    {/* Acciones */}
                    <div style={styles.cardFooter}>
                      <button
                        style={styles.btnSecondary}
                        onClick={() =>
                          setActiveClass({ ...cls, initialView: "schedule" })
                        }
                      >
                        Horario
                      </button>
                      <button
                        style={{ ...styles.btnPrimary, background: col.accent }}
                        onClick={() =>
                          setActiveClass({ ...cls, initialView: "forum" })
                        }
                      >
                        Foro ({cls.forum?.length ?? 0})
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {activeClass && (
          <ClassModal cls={activeClass} onClose={() => setActiveClass(null)} />
        )}
      </div>
    </div>
  );
}

// ── Estilos ──────────────────────────────────────────────────────────────────
const styles = {
  app: {
    maxWidth: 1100,
    margin: "0 auto",
    fontFamily: "'DM Sans', sans-serif",
  },
  header: { marginBottom: "1.5rem" },
  h1: { fontSize: 26, fontWeight: 500, color: "#111", margin: 0 },
  subtitle: { fontSize: 14, color: "#888", marginTop: 4 },
  tabs: { display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" },
  tab: {
    padding: "6px 16px",
    fontSize: 13,
    borderRadius: 20,
    border: "0.5px solid #ddd",
    background: "transparent",
    color: "#666",
    cursor: "pointer",
  },
  tabActive: { background: "#111", color: "#fff", borderColor: "transparent" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    border: "0.5px solid #e5e5e5",
    borderRadius: 12,
    overflow: "hidden",
    transition: "border-color 0.15s",
  },
  cardBody: { padding: "1.25rem" },
  cardCode: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: 500, color: "#111", marginBottom: 4 },
  cardDesc: { fontSize: 13, color: "#777", lineHeight: 1.5, marginBottom: 14 },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
    color: "#666",
    fontSize: 13,
  },
  metaText: { fontSize: 13 },
  pills: { display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 16 },
  pill: { fontSize: 11, padding: "3px 8px", borderRadius: 20, fontWeight: 500 },
  cardFooter: {
    display: "flex",
    gap: 8,
    borderTop: "0.5px solid #f0f0f0",
    paddingTop: 14
    
  },
  btnSecondary: {
    flex: 1,
    padding: "8px 12px",
    fontSize: 13,
    borderRadius: 8,
    border: "0.5px solid #ddd",
    background: "transparent",
    color: "#111",
    cursor: "pointer",
  },
  btnPrimary: {
    flex: 1,
    padding: "8px 12px",
    fontSize: 13,
    borderRadius: 8,
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
  },
  emptyState: {
    textAlign: "center",
    padding: "3rem 1rem",
    color: "#aaa",
    fontSize: 14,
  },

  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 100,
  },
  modal: {
    background: "#fff",
    borderRadius: "12px 12px 0 0",
    width: "100%",
    maxWidth: 620,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    padding: "1.25rem 1.25rem 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  modalTitle: { fontSize: 17, fontWeight: 500, color: "#111", margin: 0 },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "0.5px solid #ddd",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    color: "#666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTabs: {
    display: "flex",
    borderBottom: "0.5px solid #eee",
    padding: "0 1.25rem",
    marginTop: 12,
  },
  modalTab: {
    padding: "10px 16px",
    fontSize: 14,
    border: "none",
    borderBottom: "2px solid transparent",
    background: "transparent",
    color: "#888",
    cursor: "pointer",
    marginBottom: -1,
  },
  modalBody: { flex: 1, overflowY: "auto", padding: "1.25rem",  },

  // Schedule
  sectionLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 10,
  },
  scheduleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "0.5px solid #f0f0f0",
    fontSize: 14,
  },
  dayName: { fontWeight: 500, color: "#111", minWidth: 90 },
  dayTime: { color: "#666" },
  dayRoom: { fontSize: 12, color: "#aaa" },

  // Forum
  forumMsg: { display: "flex", gap: 10, marginBottom: "1.25rem" },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 500,
    flexShrink: 0,
  },
  msgName: { fontSize: 13, fontWeight: 500, color: "#111" },
  msgTime: { fontSize: 11, color: "#bbb", marginLeft: 6 },
  msgText: { fontSize: 14, color: "#555", lineHeight: 1.5, marginTop: 3 },
  forumInputArea: {
    borderTop: "0.5px solid #eee",
    padding: "1rem 1.25rem",
    display: "flex",
    gap: 10,
    alignItems: "flex-end",
  },
  forumInput: {
    flex: 1,
    padding: "9px 12px",
    fontSize: 14,
    borderRadius: 8,
    border: "0.5px solid #ddd",
    background: "#f9f9f9",
    color: "#111",
    fontFamily: "inherit",
    resize: "none",
    minHeight: 40,
    maxHeight: 100,
    outline: "none",
  },
  sendBtn: {
    padding: "9px 18px",
    fontSize: 13,
    borderRadius: 8,
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    height: 40,
    fontFamily: "inherit",
  },
};
