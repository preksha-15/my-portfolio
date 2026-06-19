import { useState, useEffect, useRef } from "react";

const CONFIG = {
  name: { first: "Preksha", last: "Agarwal" },
  nav: ["Projects", "About", "Contact"],
  navHome: "Home",
  headline: ["Inspired by Curiosity", "Driven by Innovation", "Creating Meaningful Impact"],
  italicLine: 1,
  bio: "I believe every great innovation begins with a simple question: \u201cWhat if?\u201d Driven by curiosity, I explore AI, Data Science, Web Development, and Research to build meaningful solutions that turn ideas into real-world impact.",
  socials: ["Instagram", "GitHub", "LinkedIn"],
  photoSrc: null,
  email: "prekshaa1512@gmail.com",
  instagram: "https://www.instagram.com/_.preksheee._/",
  github: "https://github.com/preksha-15",
  linkedin: "https://www.linkedin.com/in/preksha-agarwal-074559331/",
  location: "India",
  projects: [
    {
      id: 1,
      title: "Customer Churn Prediction",
      tag: "ML | Fintech | Banking Analytics",
      year: "2026",
      link: "https://github.com/preksha-15/CCP_banking-customer-churn-prediction",
      liveLink: "https://ccp-banking-nsunvelngjyvehw2uxq6pk.streamlit.app/",
      desc: "A machine learning web application that predicts whether a bank customer is likely to churn using a stacking ensemble of Random Forest, XGBoost, and Logistic Regression. The system handles class imbalance with SMOTE and achieves an AUC-ROC score of 0.92 for reliable churn prediction.",
      skills: ["Python", "XGBoost", "Random Forest", "SMOTE", "Flask", "Scikit-learn"],
    },
    {
      id: 2,
      title: "GzMPDD",
      tag: "AI | Computer Vision | Agriculture",
      year: "2024",
      link: "https://github.com/preksha-15/-GzMPDD-Plant-disease-detection",
      liveLink: null,
      desc: "An AI-powered agricultural intelligence system that detects plant leaf diseases using a generalizable YOLOv8n model. By combining background noise removal, cross-species disease mapping, and a dual-dataset training approach, the system delivers accurate real-time disease detection across diverse plant species.",
      skills: ["YOLOv8", "PyTorch", "OpenCV", "Python", "Dataset Fusion", "Real-time ML"],
    },
    {
      id: 3,
      title: "Eye Sight",
      tag: "AI | ML | Accessibility",
      year: "2025",
      link: "https://github.com/preksha-15/EYE-SIGHT-",
      liveLink: null,
      desc: "An AI-powered reading assistant designed to improve accessibility for visually impaired users. By combining Optical Character Recognition, automatic language detection, and text-to-speech synthesis, the system converts printed and handwritten text from images into natural speech, enabling users to access information quickly and independently.",
      skills: ["OCR", "TTS", "Python", "NLP", "LangDetect", "Accessibility"],
    },
  ],
  experience: [
    {
      role: "Summer Intern",
      org: "Plasser India Pvt. Ltd.",
      period: "May 2026 — Present",
      desc: "Currently working under the guidance of industry mentors while developing technical projects and gaining exposure to enterprise technologies. Includes specialized sessions on ISMS, ERP workflows, SAP fundamentals, and industry-scale operational practices.",
    },
    {
      role: "Research Team Core Member",
      org: "Microsoft Technical Club",
      period: "June 2025 — Present",
      desc: "Contributing to research-focused initiatives, exploring emerging technologies, and collaborating on projects that encourage technical curiosity and innovation.",
    },
    {
      role: "Software Development Intern",
      org: "Dahlia Technologies Pvt. Ltd.",
      period: "Aug 2025 — Oct 2025",
      desc: "Worked on web development projects, gaining hands-on experience with professional software development workflows, team collaboration, and real-world application development.",
    },
  ],
  education: [
    {
      institution: "Vellore Institute of Technology",
      period: "2023 — Present",
      detail: "B.Tech in Computer Science Engineering",
    },
    {
      institution: "Vidya Mandir Public School",
      period: "2023",
      detail: "Senior Secondary Education (Class XII)",
    },
    {
      institution: "Vidya Mandir Public School",
      period: "2021",
      detail: "Secondary Education (Class X)",
    },
  ],
};

const C = {
  bg: "#080808", cream: "#F2F2F2", creamDark: "#D2D2D2",
  olive: "#5F5F5F", oliveMid: "#999999", textDark: "#121212",
};

const IconEmail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#EA4335"/>
    <path d="M4 7l8 5.5L20 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
    <rect x="4" y="7" width="16" height="11" rx="1.5" stroke="#fff" strokeWidth="1.6"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <defs>
      <radialGradient id="ig" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="20%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="100%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig)"/>
    <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.6"/>
    <circle cx="17.5" cy="6.5" r="1" fill="#fff"/>
  </svg>
);

const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="12" fill="#24292e"/>
    <path d="M12 5.5C8.41 5.5 5.5 8.41 5.5 12c0 2.87 1.86 5.3 4.44 6.16.32.06.44-.14.44-.31v-1.08c-1.8.39-2.18-.87-2.18-.87-.3-.75-.72-.95-.72-.95-.59-.4.04-.39.04-.39.65.05 1 .67 1 .67.58 1 1.52.71 1.89.54.06-.42.23-.71.41-.87-1.44-.16-2.95-.72-2.95-3.2 0-.71.25-1.28.67-1.73-.07-.17-.29-.82.06-1.7 0 0 .55-.18 1.8.67.52-.14 1.08-.21 1.63-.21.55 0 1.11.07 1.63.21 1.25-.85 1.8-.67 1.8-.67.35.88.13 1.53.06 1.7.42.45.67 1.02.67 1.73 0 2.49-1.52 3.04-2.96 3.2.23.2.44.6.44 1.2v1.79c0 .17.12.37.44.31C16.64 17.3 18.5 14.87 18.5 12c0-3.59-2.91-6.5-6.5-6.5z" fill="#fff"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0A66C2"/>
    <path d="M7 10h2.5v7H7v-7zm1.25-1.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM11 10h2.4v.96C13.7 10.4 14.5 10 15.5 10c2.2 0 2.5 1.44 2.5 3.32V17h-2.5v-3.18c0-.76-.01-1.74-1.06-1.74-1.06 0-1.24.83-1.24 1.69V17H11v-7z" fill="#fff"/>
  </svg>
);

const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#E53935"/>
    <circle cx="12" cy="9" r="2.5" fill="#fff"/>
  </svg>
);

/* ── Mobile detector — only true at widths <= 900px. Desktop is always false here. ───── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );
  useEffect(() => {
    function check() { setIsMobile(window.innerWidth <= 900); }
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ── 3D Skill Sphere — slower, sharper ───────────────────────────────── */
function SkillSphere({ skills, size = 300 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const SIZE = size;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const R = SIZE * 0.38;

    const count = skills.length;
    const points = skills.map((label, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        label,
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.cos(phi),
        oz: Math.sin(phi) * Math.sin(theta),
      };
    });

    // Slower rotation speeds
    const rotY = 0.003;
    const rotX = 0.002;

    function rotatePoints() {
      const mx = mouseRef.current.x * 0.00008;
      const my = mouseRef.current.y * 0.00008;

      points.forEach(p => {
        const cosY = Math.cos(rotY + mx);
        const sinY = Math.sin(rotY + mx);
        let nx = p.ox * cosY + p.oz * sinY;
        let nz = -p.ox * sinY + p.oz * cosY;
        p.ox = nx; p.oz = nz;

        const cosX = Math.cos(rotX + my);
        const sinX = Math.sin(rotX + my);
        let ny = p.oy * cosX - p.oz * sinX;
        nz = p.oy * sinX + p.oz * cosX;
        p.oy = ny; p.oz = nz;
      });
    }

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      rotatePoints();

      // Orbit rings — clearly visible
      const rings = [
        { r: R * 0.52, alpha: 0.08 },
        { r: R * 0.76, alpha: 0.12 },
        { r: R * 1.0,  alpha: 0.16 },
        { r: R * 1.2,  alpha: 0.07 },
      ];
      rings.forEach(({ r, alpha }) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(242,242,242,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Tilted elliptical ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(0.42);
      ctx.scale(1, 0.36);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.06, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(242,242,242,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      const sorted = [...points].sort((a, b) => a.oz - b.oz);

      // Connection lines
      ctx.save();
      for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const p = sorted[i], q = sorted[j];
          const dot = p.ox * q.ox + p.oy * q.oy + p.oz * q.oz;
          if (dot > 0.72) {
            const alpha = ((p.oz + 1) / 2) * ((q.oz + 1) / 2) * 0.25;
            ctx.beginPath();
            ctx.moveTo(cx + p.ox * R, cy + p.oy * R);
            ctx.lineTo(cx + q.ox * R, cy + q.oy * R);
            ctx.strokeStyle = `rgba(210,210,210,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Dots + labels
      sorted.forEach(p => {
        const depth = (p.oz + 1) / 2;
        const px = cx + p.ox * R;
        const py = cy + p.oy * R;
        const dotR = 2.5 + depth * 3;
        const alpha = 0.25 + depth * 0.75;
        const fontSize = Math.round(9 + depth * 5.5);

        // Subtle glow ring for front-facing dots
        if (depth > 0.65) {
          ctx.beginPath();
          ctx.arc(px, py, dotR + 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(242,242,242,${alpha * 0.14})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,242,242,${alpha})`;
        ctx.fill();

        ctx.font = `${depth > 0.55 ? "600" : "400"} ${fontSize}px 'DM Sans', sans-serif`;
        ctx.fillStyle = `rgba(242,242,242,${alpha * 0.9})`;
        ctx.textAlign = "center";
        ctx.fillText(p.label.toUpperCase(), px, py - dotR - 6);
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [skills, size]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={e => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseRef.current = {
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        };
      }}
      style={{ display: "block", cursor: "crosshair" }}
    />
  );
}

/* ── Loader ──────────────────────────────────────────────────────────── */
function Loader({ onDone }) {
  const phrase = "Hey, Welcome";
  useEffect(() => {
    const t = setTimeout(onDone, phrase.length * 65 + 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:999, background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20 }}>
      <div style={{ display:"flex" }}>
        {phrase.split("").map((ch, i) => (
          <span key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,4rem)", color:C.cream, display:"inline-block", opacity:0, transform:"translateY(50px)", animation:`waveUp 0.55s ease forwards ${i*0.065}s`, whiteSpace:ch===" "?"pre":undefined }}>
            {ch===" " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
      <div style={{ height:1, background:C.cream, opacity:0.25, width:0, animation:"lineGrow 1.5s ease forwards 0.4s" }}/>
      <style>{`
        @keyframes waveUp   { to { opacity:1; transform:translateY(0); } }
        @keyframes lineGrow { to { width:160px; } }
      `}</style>
    </div>
  );
}

/* ── Card ────────────────────────────────────────────────────────────── */
function Card({ children, style={}, from="bottom", delay=0, show }) {
  const origins = { left:"translateX(-65px)", right:"translateX(65px)", top:"translateY(-65px)", bottom:"translateY(65px)" };
  const styleCopy = { ...style };
  const currentTransform = show ? (styleCopy.transform ?? "translate(0,0)") : origins[from];
  delete styleCopy.transform;
  return (
    <div style={{ borderRadius:14, overflow:"hidden", position:"relative", opacity:show?1:0, transform:currentTransform, transition:`opacity 1.25s cubic-bezier(.22,1,.36,1) ${delay}s, transform 1.25s cubic-bezier(.22,1,.36,1) ${delay}s`, ...styleCopy }}>
      {children}
    </div>
  );
}

/* ── Main Portfolio ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const isMobile = useIsMobile();
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [showContactCard, setShowContactCard] = useState(false);
  const [showBioCard, setShowBioCard] = useState(false);
  const [showPhotoCard, setShowPhotoCard] = useState(false);
  const [showSocialBar, setShowSocialBar] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectDir, setProjectDir] = useState(1);
  const [projectAnimating, setProjectAnimating] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const timers = [
      setTimeout(() => setShow(true), 120),
      setTimeout(() => setShowHero(true), 220),
      setTimeout(() => setShowPhotoCard(true), 280),
      setTimeout(() => setShowContactCard(true), 360),
      setTimeout(() => setShowBioCard(true), 420),
      setTimeout(() => setShowSocialBar(true), 520),
    ];
    return () => timers.forEach(clearTimeout);
  }, [loaded]);

  useEffect(() => {
    if (!showContact) { setShowContactModal(false); return; }
    const t = setTimeout(() => setShowContactModal(true), 30);
    return () => clearTimeout(t);
  }, [showContact]);

  useEffect(() => {
    if (!loaded) return;
    let touchStartY = null;
    function onWheel(e) {
      if (isMobile) return; // mobile scrolls naturally inside sections, no swipe-to-navigate
      if (showContact || showContactModal || showProjects) return;
      if (Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0 && !showAbout) openAbout();
      else if (e.deltaY < 0 && showAbout) setShowAbout(false);
    }
    function onTouchStart(e) { touchStartY = e.touches?.[0]?.clientY; }
    function onTouchEnd(e) {
      if (isMobile) return; // mobile scrolls naturally inside sections, no swipe-to-navigate
      if (touchStartY == null) return;
      const dy = touchStartY - (e.changedTouches?.[0]?.clientY);
      if (dy > 60 && !showAbout && !showContact && !showContactModal && !showProjects) openAbout();
      else if (dy < -60 && showAbout && !showContact && !showContactModal) setShowAbout(false);
      touchStartY = null;
    }
    window.addEventListener("wheel", onWheel, { passive:true });
    window.addEventListener("touchstart", onTouchStart, { passive:true });
    window.addEventListener("touchend", onTouchEnd, { passive:true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [loaded, showAbout, showContact, showContactModal, showProjects, isMobile]);

  function navigateProject(dir) {
    if (projectAnimating) return;
    const next = projectIndex + dir;
    if (next < 0 || next === CONFIG.projects.length) return;
    setProjectDir(dir); setProjectAnimating(true);
    setTimeout(() => { setProjectIndex(next); setProjectAnimating(false); }, 420);
  }

  function handleDone() { setLoaded(true); }
  function openContact()  { setShowAbout(false); setShowProjects(false); setShowContact(true); }
  function openAbout()    { setShowContact(false); setShowContactModal(false); setShowProjects(false); setShowAbout(true); }
  function openProjects() { setShowAbout(false); setShowContact(false); setShowContactModal(false); setShowProjects(true); }
  function closeContact() { setShowContactModal(false); setTimeout(() => setShowContact(false), 420); }
  function goHome()       { setShowAbout(false); setShowContact(false); setShowContactModal(false); setShowProjects(false); setProjectIndex(0); }

  const contactLinks = [
    { icon:<IconEmail />,     label:CONFIG.email,       href:`mailto:${CONFIG.email}`, note:"Email" },
    { icon:<IconInstagram />, label:"@_.preksheee._",    href:CONFIG.instagram,         note:"Instagram" },
    { icon:<IconGitHub />,    label:"preksha-15",        href:CONFIG.github,            note:"GitHub" },
    { icon:<IconLinkedIn />,  label:"Preksha Agarwal",   href:CONFIG.linkedin,          note:"LinkedIn" },
  ];

  const proj = CONFIG.projects[projectIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { background:${C.bg}; overflow:hidden; height:100%; width:100%; margin:0; padding:0; }
        a { text-decoration:none; }
        .clink { transition: opacity 0.2s, transform 0.2s, background 0.2s; }
        .clink:hover { opacity:1 !important; transform:translateX(4px); background:rgba(255,255,255,0.09) !important; }
        .proj-link { transition: opacity 0.2s, letter-spacing 0.2s; }
        .proj-link:hover { opacity:1 !important; letter-spacing:0.04em; }
        .live-link { transition: opacity 0.2s, letter-spacing 0.2s; }
        .live-link:hover { opacity:1 !important; letter-spacing:0.04em; }
        @keyframes slideUpIn   { from{transform:translateY(60px);opacity:0}  to{transform:translateY(0);opacity:1} }
        @keyframes slideDownIn { from{transform:translateY(-60px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes slideUpOut  { from{transform:translateY(0);opacity:1}     to{transform:translateY(-60px);opacity:0} }
        @keyframes slideDownOut{ from{transform:translateY(0);opacity:1}     to{transform:translateY(60px);opacity:0} }
        @keyframes sphereFadeIn{ from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        .scroll-hidden { overflow-y:auto; }
        .scroll-hidden::-webkit-scrollbar { display:none; }
        .scroll-hidden { -ms-overflow-style:none; scrollbar-width:none; }
        .contact-panel::-webkit-scrollbar { width:3px; }
        .contact-panel::-webkit-scrollbar-track { background:transparent; }
        .contact-panel::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.15); border-radius:99px; }
        .contact-panel { scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.15) transparent; }
        /* Mobile-only rules. These NEVER apply above 900px, so desktop is untouched. */
        @media (max-width:900px) {
          .main-grid { grid-template-columns:1fr !important; }
          html, body { overflow:auto !important; }
        }
      `}</style>

      {!loaded && <Loader onDone={handleDone}/>}

      <div style={{ height:isMobile?"100dvh":"100vh", width:"100%", display:"flex", flexDirection:"column", padding:isMobile?"16px":"32px", background:C.bg, fontFamily:"'DM Sans',sans-serif", opacity:loaded?1:0, transition:"opacity 0.75s ease", gap:8, overflow:"hidden", minWidth:0, position:"relative" }}>

        {/* NAV */}
        <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 4px", flexShrink:0, opacity:show?1:0, transform:show?"translateY(0)":"translateY(-20px)", transition:"opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s" }}>
          <span style={{ color:C.cream, textTransform:"uppercase", fontSize:isMobile?"0.74rem":"0.88rem", letterSpacing:"0.06em" }}>
            <span style={{ fontWeight:300 }}>{CONFIG.name.first} </span>
            <span style={{ fontWeight:500 }}>{CONFIG.name.last}</span>
          </span>
          <ul style={{ display:"flex", gap:isMobile?14:32, listStyle:"none" }}>
            <li>
              <a href="#" style={{ color:C.cream, fontSize:isMobile?"0.62rem":"0.7rem", letterSpacing:"0.13em", textTransform:"uppercase", opacity:0.65, cursor:"pointer" }}
                onClick={e=>{e.preventDefault();goHome();}} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.65}>Home</a>
            </li>
            {CONFIG.nav.map(n=>(
              <li key={n}>
                <a href="#" style={{ color:C.cream, fontSize:isMobile?"0.62rem":"0.7rem", letterSpacing:"0.13em", textTransform:"uppercase", opacity:0.65, cursor:"pointer" }}
                  onClick={e=>{e.preventDefault();const t=n.toLowerCase();if(t==="contact")openContact();else if(t==="about")openAbout();else openProjects();}}
                  onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.65}>{n}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* MAIN GRID */}
        <div className="main-grid" style={{ flex:1, display:"grid", gridTemplateColumns:showContact?"65% 0%":showProjects?"100% 0%":"65% 35%", gridTemplateRows:"1fr", gap:8, minHeight:0, minWidth:0, overflow:"hidden" }}>

          {/* LEFT COLUMN */}
          <div style={{ position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", gap:8, minHeight:0, height:"100%" }}>

            {/* HOME LAYER */}
            <div className={isMobile?"scroll-hidden":""} style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", gap:8, transform:showAbout?"translateY(-110%)":showProjects?"translateX(-110%)":"translateY(0)", transition:"transform 1.15s cubic-bezier(.22,1,.36,1)", overflowY:isMobile?"auto":"hidden" }}>
              <Card from="left" delay={0.12} show={showHero} style={{ flex:isMobile?"0 0 auto":"1 1 0", minHeight:isMobile?220:0, overflow:"hidden", transform:showContact?"translateX(-18px) scale(0.98)":"none", opacity:showContact?0.88:1 }}>
                <div style={{ background:C.cream, height:"100%", padding:isMobile?"28px 22px 22px":"48px 64px 36px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start", position:"relative", overflow:"hidden" }}>
                  <span style={{ position:"absolute", top:16, right:18, fontSize:"0.55rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.olive, opacity:0.35 }}>Work</span>
                  <h1 style={{ fontFamily:"'Playfair Display',serif", lineHeight:1.05, color:C.textDark, maxWidth:"64ch", margin:0 }}>
                    {CONFIG.headline.map((line,i)=>(
                      <span key={i} style={{ display:"block", fontSize:i===CONFIG.italicLine?(isMobile?"1.4rem":"clamp(1.9rem,3.2vw,3.6rem)"):(isMobile?"1.5rem":"clamp(2rem,3.6vw,3.8rem)"), fontWeight:i===CONFIG.italicLine?400:900, fontStyle:i===CONFIG.italicLine?"italic":"normal", marginBottom:i===CONFIG.italicLine?"6px":"0" }}>{line}</span>
                    ))}
                  </h1>
                </div>
              </Card>
              <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:8, flexShrink:0, height:isMobile?"auto":200 }}>
                <Card from="bottom" delay={0.3} show={showContactCard} style={{ height:"100%", transform:showContact?"translateX(-14px) scale(0.98)":"none", opacity:showContact?0.94:1 }}>
                  <div style={{ background:C.olive, padding:isMobile?"16px 18px":"20px 24px", display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%", cursor:"pointer", minHeight:isMobile?110:"auto" }}
                    onMouseEnter={e=>e.currentTarget.querySelector(".cbig").style.letterSpacing="0.02em"}
                    onMouseLeave={e=>e.currentTarget.querySelector(".cbig").style.letterSpacing="normal"}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <p style={{ fontSize:"0.75rem", color:C.cream, opacity:0.7, lineHeight:1.55 }}>Have some<br/>questions?</p>
                      <span style={{ color:C.cream, fontSize:"1.3rem", opacity:0.85, cursor:"pointer" }} onClick={openContact}>↗</span>
                    </div>
                    <p className="cbig" style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:isMobile?"1.5rem":"clamp(1.5rem,2.2vw,2.4rem)", color:C.cream, lineHeight:1.1, transition:"letter-spacing 0.3s ease" }}>Contact me</p>
                  </div>
                </Card>
                <Card from="right" delay={0.24} show={showBioCard} style={{ height:"100%", transform:showContact?"translateX(-14px) scale(0.98)":"none", opacity:showContact?0.94:1 }}>
                  <div style={{ background:C.cream, padding:isMobile?"16px 18px":"20px 24px", display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%", minHeight:isMobile?150:"auto" }}>
                    <svg viewBox="0 0 60 60" fill="none" style={{ width:32, height:32, opacity:0.28 }}>
                      {[28,20,12,5].map(r=>(<circle key={r} cx="30" cy="30" r={r} stroke={C.olive} strokeWidth="0.8"/>))}
                      <circle cx="30" cy="30" r="2" fill={C.olive}/>
                    </svg>
                    <p style={{ fontSize:"0.8rem", lineHeight:1.75, color:C.textDark, opacity:0.72, marginTop:10 }}>{CONFIG.bio}</p>
                  </div>
                </Card>
              </div>
              {isMobile && <div style={{ height:8, flexShrink:0 }}/>}
            </div>

            {/* ABOUT LAYER */}
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", gap:8, transform:showAbout?"translateY(0)":"translateY(110%)", transition:"transform 1.15s cubic-bezier(.22,1,.36,1)", willChange:"transform" }}>
              <Card from="bottom" delay={0.06} show={showAbout} style={{ flex:1, minHeight:0 }}>
                <div className="scroll-hidden" style={{ background:C.cream, height:"100%", padding:isMobile?"26px 20px 26px":"36px 44px 36px", display:"flex", flexDirection:"column", gap:0, minHeight:0, overflowY:"auto" }}>

                  {/* eyebrow + headline */}
                  <p style={{ textTransform:"uppercase", letterSpacing:"0.22em", color:C.olive, fontSize:"0.62rem", margin:"0 0 10px", fontWeight:600 }}>Know me</p>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?"1.5rem":"clamp(1.6rem,2.6vw,2.4rem)", margin:"0 0 2px", lineHeight:1.06, color:C.textDark, fontWeight:900 }}>Drawn to ideas, systems,</h2>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?"1.5rem":"clamp(1.6rem,2.6vw,2.4rem)", margin:"0 0 20px", lineHeight:1.06, color:C.textDark, fontWeight:400, fontStyle:"italic" }}>and figuring things out.</h2>

                  {/* stat cards */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:isMobile?6:10, marginBottom:18 }}>
                    {[
                      { num:"3+", label:"Projects Shipped" },
                      { num:"2",  label:"Internships" },
                      { num:"VIT", label:"B.Tech CSE" },
                    ].map(({ num, label }) => (
                      <div key={label} style={{ background:"rgba(0,0,0,0.05)", borderRadius:10, padding:isMobile?"10px 8px":"12px 14px" }}>
                        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?"1.2rem":"1.5rem", fontWeight:900, color:C.textDark, margin:0, lineHeight:1 }}>{num}</p>
                        <p style={{ fontSize:isMobile?"0.52rem":"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:C.olive, margin:"5px 0 0" }}>{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* quote */}
                  <div style={{ background:"rgba(0,0,0,0.04)", borderRadius:10, padding:isMobile?"12px 14px":"14px 18px", marginBottom:16, borderLeft:`3px solid ${C.olive}` }}>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?"0.82rem":"0.9rem", fontStyle:"italic", color:C.textDark, lineHeight:1.7, opacity:0.78, margin:0 }}>
                      "I'm Preksha — a CS undergrad at VIT who's into AI, research, and building things that actually work. Most of my time goes into learning deeply, building thoughtfully, and being curious enough to try things I haven't done before."
                    </p>
                  </div>

                  {/* interest tags */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:18 }}>
                    {["Artificial Intelligence","Data Science","Web Development","Computer Vision","Research","Technical Writing"].map(t => (
                      <span key={t} style={{ background:"rgba(0,0,0,0.07)", borderRadius:99, padding:"4px 13px", fontSize:isMobile?"0.62rem":"0.68rem", color:C.textDark, letterSpacing:"0.03em" }}>{t}</span>
                    ))}
                  </div>

                  {/* divider */}
                  <div style={{ height:1, background:"rgba(0,0,0,0.08)", margin:"2px 0 18px" }}/>

                  {/* experience + education — stacked on mobile, side-by-side on desktop */}
                  <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?22:28, flex:1 }}>
                    {/* experience */}
                    <div>
                      <p style={{ fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.olive, fontWeight:700, margin:"0 0 12px" }}>Experience</p>
                      {CONFIG.experience.map((ex, i) => (
                        <div key={i} style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr auto", gap:isMobile?4:12, padding:"11px 0", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
                          <div>
                            <p style={{ margin:0, fontSize:"0.84rem", fontWeight:700, color:C.textDark, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                              {ex.role}
                              {ex.period.includes("Present") && (
                                <span style={{ background:C.textDark, color:C.cream, fontSize:"0.52rem", letterSpacing:"0.08em", textTransform:"uppercase", padding:"2px 7px", borderRadius:99 }}>Now</span>
                              )}
                            </p>
                            <p style={{ margin:"2px 0 5px", fontSize:"0.72rem", color:C.olive, fontWeight:500 }}>{ex.org}</p>
                            <p style={{ margin:0, fontSize:"0.72rem", lineHeight:1.65, color:C.textDark, opacity:0.58 }}>{ex.desc}</p>
                          </div>
                          <p style={{ margin:0, fontSize:"0.65rem", color:C.oliveMid, whiteSpace:isMobile?"normal":"nowrap", textAlign:isMobile?"left":"right", paddingTop:2, lineHeight:1.5 }}>
                            {ex.period.split(" — ").map((s,j) => <span key={j} style={{ display:isMobile?"inline":"block", marginRight:isMobile?6:0 }}>{s}</span>)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* education */}
                    <div>
                      <p style={{ fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.olive, fontWeight:700, margin:"0 0 12px" }}>Education</p>
                      {CONFIG.education.map((ed, i) => (
                        <div key={i} style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr auto", gap:isMobile?4:12, padding:"11px 0", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
                          <div>
                            <p style={{ margin:0, fontSize:"0.84rem", fontWeight:700, color:C.textDark }}>{ed.institution}</p>
                            <p style={{ margin:"3px 0 0", fontSize:"0.72rem", color:C.olive, opacity:0.85 }}>{ed.detail}</p>
                          </div>
                          <p style={{ margin:0, fontSize:"0.65rem", color:C.oliveMid, whiteSpace:"nowrap", textAlign:isMobile?"left":"right", paddingTop:2 }}>{ed.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ height:28, flexShrink:0 }}/>
                </div>
              </Card>
            </div>

            {/* PROJECTS LAYER */}
            <div style={{ position:"absolute", inset:0, transform:showProjects?"translateX(0)":"translateX(110%)", transition:"transform 1.15s cubic-bezier(.22,1,.36,1)", pointerEvents:showProjects?"auto":"none", display:"flex" }}>
              <div className={isMobile?"scroll-hidden":""} style={{ width:"100%", height:"100%", background:C.bg, display:"flex", flexDirection:isMobile?"column":"row", borderRadius:24, overflow:isMobile?"auto":"hidden", border:"1px solid rgba(255,255,255,0.06)" }}>

                {/* project info panel */}
                <div style={{ flex:1, padding:isMobile?"28px 22px 24px":"44px 52px 36px", display:"flex", flexDirection:"column", overflow:isMobile?"visible":"hidden" }}>

                  {/* header */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:isMobile?16:24, flexShrink:0 }}>
                    <div>
                      <p style={{ textTransform:"uppercase", letterSpacing:"0.18em", color:C.oliveMid, fontSize:"0.65rem", margin:0, fontWeight:500 }}>Selected work</p>
                      <h3 style={{ margin:"8px 0 0", fontFamily:"'Playfair Display',serif", fontSize:isMobile?"1.4rem":"clamp(1.6rem,2.4vw,2rem)", color:C.cream, fontWeight:700 }}>Projects</h3>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <p style={{ color:C.oliveMid, fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.08em", margin:0 }}>
                        {String(projectIndex+1).padStart(2,"0")} / {String(CONFIG.projects.length).padStart(2,"0")}
                      </p>
                      <p style={{ color:C.oliveMid, fontSize:"0.7rem", opacity:0.45, margin:"4px 0 0" }}>{proj.year}</p>
                    </div>
                  </div>

                  {/* animated content */}
                  <div style={{ flex:isMobile?"none":1, display:"flex", alignItems:"center", overflow:"hidden", minHeight:0 }} key={`${projectIndex}-${projectAnimating}`}>
                    <div style={{
                      width:"100%",
                      display:"flex", flexDirection:"column", gap:14,
                      animation: projectAnimating
                        ? (projectDir>0 ? "slideUpOut 0.38s ease forwards" : "slideDownOut 0.38s ease forwards")
                        : (projectDir>0 ? "slideUpIn 0.45s cubic-bezier(.22,1,.36,1) forwards" : "slideDownIn 0.45s cubic-bezier(.22,1,.36,1) forwards"),
                    }}>
                      <span style={{ display:"inline-block", background:"rgba(255,255,255,0.05)", color:C.oliveMid, fontSize:"0.67rem", fontWeight:600, letterSpacing:"0.1em", padding:"5px 14px", borderRadius:99, border:"1px solid rgba(255,255,255,0.1)", textTransform:"uppercase", alignSelf:"flex-start" }}>
                        {proj.tag}
                      </span>

                      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?"1.5rem":"clamp(1.6rem,2.8vw,2.5rem)", margin:0, lineHeight:1.08, color:C.cream, fontWeight:900 }}>
                        {proj.title}
                      </h2>

                      <div style={{ height:1, background:"rgba(255,255,255,0.07)", flexShrink:0 }}/>

                      <p style={{ color:C.cream, opacity:0.52, lineHeight:1.85, fontSize:isMobile?"0.8rem":"0.86rem", margin:0 }}>
                        {proj.desc}
                      </p>

                      {/* Links row */}
                      <div style={{ display:"flex", alignItems:"center", gap:20, marginTop:4, flexWrap:"wrap" }}>
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="proj-link"
                          style={{ color:C.oliveMid, fontWeight:700, display:"inline-flex", alignItems:"center", gap:6, fontSize:"0.82rem", opacity:0.75 }}>
                          View on GitHub ↗
                        </a>

                        {proj.liveLink && (
                          <>
                            <span style={{ width:1, height:14, background:"rgba(255,255,255,0.12)", display:"inline-block" }}/>
                            <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="live-link"
                              style={{ color:C.cream, fontWeight:700, display:"inline-flex", alignItems:"center", gap:6, fontSize:"0.82rem", opacity:0.82 }}>
                              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block", boxShadow:"0 0 6px rgba(74,222,128,0.55)" }}/>
                              Live Demo ↗
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* nav arrows */}
                  <div style={{ display:"flex", gap:12, alignItems:"center", flexShrink:0, marginTop:16 }}>
                    {[[-1,"↑"],[1,"↓"]].map(([dir,arrow])=>{
                      const disabled = (dir===-1&&projectIndex===0)||(dir===1&&projectIndex===CONFIG.projects.length-1);
                      return (
                        <button key={dir} onClick={()=>navigateProject(dir)} disabled={disabled}
                          style={{ width:42, height:42, borderRadius:"50%", background:"transparent", border:`1px solid rgba(255,255,255,${disabled?0.07:0.2})`, cursor:disabled?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", color:C.cream, opacity:disabled?0.18:0.8, transition:"opacity 0.25s" }}>
                          {arrow}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* skill sphere panel */}
                <div key={`sphere-${projectIndex}`} style={{ width:isMobile?"100%":320, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, borderLeft:isMobile?"none":"1px solid rgba(255,255,255,0.05)", borderTop:isMobile?"1px solid rgba(255,255,255,0.05)":"none", background:"rgba(255,255,255,0.012)", padding:isMobile?"24px 0 32px":0 }}>
                  <div style={{ animation:"sphereFadeIn 0.65s cubic-bezier(.22,1,.36,1) forwards", opacity:0 }}>
                    <SkillSphere skills={proj.skills} size={isMobile?220:300} />
                  </div>
                  <p style={{ fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.oliveMid, opacity:0.4, margin:0 }}>Tech Stack</p>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — hidden on mobile (folded into Home layer flow would duplicate; instead we hide it here since photo+social are decorative on small screens) */}
          {!isMobile && (
            <div style={{ display:"flex", flexDirection:"column", gap:8, minHeight:0, position:"relative", transform:showContact?"translateX(-18px)":showProjects?"translateX(110%)":"none", transition:"transform 1.15s cubic-bezier(.22,1,.36,1)" }}>
              <Card from="top" delay={0.18} show={showPhotoCard} style={{ flex:1, minHeight:0 }}>
                <div style={{ background:C.olive, height:"100%" }}>
                  {CONFIG.photoSrc
                    ? <img src={CONFIG.photoSrc} alt="Profile" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                    : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:C.cream, opacity:0.25, fontSize:"0.72rem", letterSpacing:"0.12em", textTransform:"uppercase" }}>Your Photo</div>
                  }
                </div>
              </Card>
              <Card from="left" delay={0.36} show={showSocialBar} style={{ flexShrink:0 }}>
                <div style={{ background:C.oliveMid, height:48, display:"flex", alignItems:"center", justifyContent:"space-around", padding:"0 16px" }}>
                  {[
                    { label:"Instagram", href:CONFIG.instagram },
                    { label:"GitHub",    href:CONFIG.github },
                    { label:"LinkedIn",  href:CONFIG.linkedin },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize:"0.62rem", letterSpacing:"0.14em", textTransform:"uppercase", color:C.textDark, opacity:0.6, transition:"opacity 0.2s" }}
                      onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.6}>
                      {label}
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* MOBILE: compact social bar shown under Home content instead of full right column */}
          {isMobile && !showAbout && !showProjects && !showContact && (
            <div style={{ position:"absolute", bottom:8, left:0, right:0, display:"flex", justifyContent:"center", gap:18, padding:"10px 0", background:"rgba(255,255,255,0.04)", borderRadius:12, zIndex:2 }}>
              {[
                { label:"Instagram", href:CONFIG.instagram },
                { label:"GitHub",    href:CONFIG.github },
                { label:"LinkedIn",  href:CONFIG.linkedin },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:"0.6rem", letterSpacing:"0.12em", textTransform:"uppercase", color:C.cream, opacity:0.7 }}>
                  {label}
                </a>
              ))}
            </div>
          )}

        </div>

        {/* CONTACT OVERLAY */}
        {showContact && (
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.42)", zIndex:8, pointerEvents:showContactModal?"auto":"none", opacity:showContactModal?1:0, transition:"opacity 1.25s cubic-bezier(.22,1,.36,1)" }} />
        )}
        {showContact && (
          <div style={{ position:"absolute", top:isMobile?16:32, right:isMobile?16:32, left:isMobile?16:"auto", bottom:isMobile?16:32, width:isMobile?"auto":"40vw", maxWidth:isMobile?"none":"520px", background:"rgba(14,14,14,0.97)", borderRadius:isMobile?20:28, padding:isMobile?"28px 20px 24px":"36px 32px 32px", display:"flex", flexDirection:"column", zIndex:10, boxShadow:"0 28px 80px rgba(0,0,0,0.35)", border:"1px solid rgba(255,255,255,0.07)", opacity:showContactModal?1:0, transform:showContactModal?"translateY(0) scale(1)":"translateY(22px) scale(0.98)", transition:"opacity 1.25s cubic-bezier(.22,1,.36,1), transform 1.25s cubic-bezier(.22,1,.36,1)", overflowY:"auto", gap:0 }} className="contact-panel">
            <button onClick={closeContact} style={{ position:"absolute", top:isMobile?16:24, right:isMobile?16:24, border:"none", background:"transparent", color:C.cream, fontSize:"1.5rem", cursor:"pointer" }}>↙</button>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:isMobile?"1.6rem":"clamp(1.8rem,2.8vw,2.4rem)", margin:0, color:C.cream }}>Contact me!</h2>
            <p style={{ marginTop:10, color:C.cream, opacity:0.5, fontSize:"0.82rem", lineHeight:1.7, fontStyle:"italic" }}>
              Whether it's a project, collaboration, an interesting conversation, or just a hello, my inbox is always open.
            </p>
            <div style={{ height:1, background:"rgba(255,255,255,0.07)", margin:"22px 0" }}/>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {contactLinks.map(({ icon, label, href, note }) => (
                <a key={href} href={href} target={href.startsWith("mailto")?"_self":"_blank"} rel="noopener noreferrer"
                  className="clink"
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 16px", borderRadius:13, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", opacity:0.88, cursor:"pointer" }}>
                  <span style={{ flexShrink:0, display:"flex" }}>{icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ margin:0, fontSize:"0.68rem", color:C.cream, opacity:0.4, textTransform:"uppercase", letterSpacing:"0.1em" }}>{note}</p>
                    <p style={{ margin:"2px 0 0", fontSize:"0.86rem", color:C.cream, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{label}</p>
                  </div>
                  <span style={{ color:C.cream, opacity:0.25, fontSize:"0.85rem" }}>↗</span>
                </a>
              ))}
              <div style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 16px", borderRadius:13, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ flexShrink:0, display:"flex" }}><IconLocation /></span>
                <div>
                  <p style={{ margin:0, fontSize:"0.68rem", color:C.cream, opacity:0.4, textTransform:"uppercase", letterSpacing:"0.1em" }}>Location</p>
                  <p style={{ margin:"2px 0 0", fontSize:"0.86rem", color:C.cream, fontWeight:500 }}>{CONFIG.location}</p>
                </div>
              </div>
            </div>
            <div style={{ height:1, background:"rgba(255,255,255,0.07)", margin:"22px 0" }}/>
            <p style={{ margin:"0 0 12px", fontSize:"0.68rem", color:C.cream, opacity:0.35, textTransform:"uppercase", letterSpacing:"0.12em" }}>Or send a quick message</p>
            <div style={{ display:"grid", gap:10 }}>
              <input placeholder="Your email" style={{ width:"100%", padding:"13px 15px", borderRadius:12, border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.05)", color:C.cream, outline:"none", fontSize:"0.86rem" }}/>
              <textarea placeholder="Your message" rows={4} style={{ width:"100%", padding:"13px 15px", borderRadius:12, border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.05)", color:C.cream, outline:"none", resize:"none", fontSize:"0.86rem" }}/>
              <button style={{ padding:"13px 20px", borderRadius:12, border:"none", background:C.cream, color:C.textDark, fontWeight:700, cursor:"pointer", fontSize:"0.88rem" }}>Send message</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
