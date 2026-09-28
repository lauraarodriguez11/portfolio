import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Github, Linkedin, Mail, ExternalLink, Star, Home as HomeIcon, FileText } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Importar fuentes de Google
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&family=Source+Sans+3:wght@300;400;600;700&family=Space+Grotesk:wght@700&display=swap');
`;
document.head.appendChild(styleSheet);

const GH_USERNAME = "lauraarodriguez11";

// Sugerencias por pestaña
const SUGGESTED_TAGS_TECH = [
  "Python",
  "SQL",
  "Tableau",
  "Spark",
  "ML",
  "DL",
  "XAI",
  "RPA",
  "Scikit-learn",
];
const SUGGESTED_TAGS_ART = [
  "Moda",
  "Ura Wenyers",
  "Yute Culture",
  "Upcycling",
  "Patronaje Modular",
  "Accesorios",
  "Dirección Creativa",
];

// Catálogo de categorías
const CATEGORIES = [
  { name: "Todas", tags: [] },
  {
    name: "Bases de Datos",
    tags: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Neo4j",
      "NoSQL",
      "Modelo E-R",
      "SQL Scripts",
      "Triggers",
      "Vistas",
      "XML",
      "SQL",
    ],
  },
  {
    name: "Estadística & Ciencia de Datos",
    tags: ["Pandas", "NumPy", "SciPy", "Statsmodels", "Estadística", "EDA", "Inferencia", "Spark"],
  },
  {
    name: "Machine Learning & Deep Learning",
    tags: [
      "Scikit-learn",
      "Random Forest",
      "XGBoost",
      "PCA",
      "K-Means",
      "ARIMA",
      "Holt-Winters",
      "CNN",
      "RNN",
      "Transformers",
      "ViT",
      "NLP",
      "XAI",
    ],
  },
  {
    name: "Visualización & BI",
    tags: ["Tableau", "Power BI", "Dashboards", "Data Visualization"],
  },
  {
    name: "Automatización & RPA",
    tags: ["RPA", "UiPath", "n8n", "Make"],
  },
];

// ======= Proyectos MANUALES =======
const PROJECTS = [
  {
    id: "tfg-emociones",
    title: "Clasificación de Emociones mediante Aprendizaje Automático",
    role: "TFG · NLP · ML/DL",
    year: 2024,
    tags: [
      "Python",
      "NLP",
      "ML",
      "DL",
      "SVM",
      "Random Forest",
      "Naive Bayes",
      "RNN",
      "LSTM",
      "Transformers",
      "XLM-Roberta",
    ],
    blurb:
      "Trabajo Fin de Grado centrado en la clasificación automática de emociones en textos cortos de redes sociales (ira, asco, miedo, alegría, tristeza y sorpresa). Incluye un marco teórico detallado de IA, aprendizaje automático y redes neuronales, seguido de una aplicación práctica en Python con modelos clásicos y Transformers.",
    image: `${import.meta.env.BASE_URL}cover_tfg.png`,
    links: [
      { label: "GitHub", href: "https://github.com/lauraarodriguez11/TFG_clasificacion_emociones" },
      {
        label: "PDF TFG",
        href: "https://github.com/lauraarodriguez11/TFG_clasificacion_emociones/blob/main/TFG-Laura-Rodriguez-Ropero_signed.pdf",
      },
    ],
    category: "tech",
  },
  {
    id: "ucm-01",
    title: "Creación de una Base de Datos",
    role: "SQL · Modelado de Datos",
    year: 2024,
    tags: ["MySQL", "Modelo E-R", "SQL Scripts", "Triggers", "Vistas", "SQL"],
    blurb:
      "Diseño e implementación de una base de datos relacional para gestionar eventos culturales. Incluye modelo entidad-relación, paso a modelo lógico, creación en MySQL con restricciones, vistas y triggers automáticos.",
    image: `${import.meta.env.BASE_URL}cover1.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/1" }],
    category: "tech",
  },
  {
    id: "ucm-02",
    title: "Filtrado y Agregación de un Catálogo Online",
    role: "NoSQL · MongoDB",
    year: 2024,
    tags: ["MongoDB", "JavaScript", "Agregación", "Filtrado", "Data Analysis"],
    blurb:
      "Interacción con un catálogo de moda en MongoDB mediante inserciones, actualizaciones, filtrado y consultas de agregación. Scripts en JS y Python con conclusiones analíticas.",
    image: `${import.meta.env.BASE_URL}cover2.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/2" }],
    category: "tech",
  },
  {
    id: "ucm-03",
    title: "Estadística Descriptiva e Inferencia",
    role: "Estadística · Python",
    year: 2024,
    tags: ["Python", "Pandas", "NumPy", "SciPy", "Matplotlib", "ML"],
    blurb:
      "Análisis estadístico de anchura de cráneos egipcios en dos periodos históricos. Medidas descriptivas, tests de normalidad, intervalos de confianza y contraste de hipótesis con test t.",
    image: `${import.meta.env.BASE_URL}cover3.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/3" }],
    category: "tech",
  },
  {
    id: "ucm-04",
    title: "Proyecto de Programación con Python",
    role: "Python · Programación Estructurada · Buenas Prácticas",
    year: 2024,
    tags: ["Python", "Pandas", "PEP-8", "Pruebas Unitarias", "Automatización", "MapReduce"],
    blurb:
      "Estructuración de código, clases, funciones y pruebas unitarias con dataset de películas. Incluye script MapReduce y cumplimiento riguroso de PEP-8.",
    image: `${import.meta.env.BASE_URL}cover4.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/4" }],
    category: "tech",
  },
  {
    id: "ucm-05",
    title: "Análisis Financiero de Easy Loans",
    role: "Business Intelligence · Visualización de Datos",
    year: 2025,
    tags: ["Tableau", "Business Intelligence", "Dashboards", "Data Visualization", "KPIs"],
    blurb:
      "Desarrollo de análisis financiero en Tableau para Easy Loans: detección de patrones de comportamiento, evaluación de calidad de préstamos y dashboards de KPI accionables.",
    image: `${import.meta.env.BASE_URL}cover5.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/5" }],
    category: "tech",
  },
  {
    id: "ucm-06",
    title: "Modelos de Regresión Lineal y Logística",
    role: "Python · Estadística · Modelización Predictiva",
    year: 2025,
    tags: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Regresión Lineal",
      "Regresión Logística",
      "Selección de Modelos",
      "ML",
    ],
    blurb:
      "Modelos predictivos en Python: depuración, outliers, selección de variables clásica y aleatoria, y evaluación con métricas de rendimiento e interpretación de coeficientes.",
    image: `${import.meta.env.BASE_URL}cover6.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/6" }],
    category: "tech",
  },
  {
    id: "ucm-07",
    title: "Series Temporales de Temperaturas Oceánicas",
    role: "Python · Series Temporales · Modelización Predictiva",
    year: 2025,
    tags: ["Python", "Pandas", "Statsmodels", "ARIMA", "Holt-Winters", "Validación de Modelos", "ML"],
    blurb:
      "Modelización de series temporales con estacionalidad: descomposición, tests ADF/KPSS, Holt exponencial y modelos ARIMA/Auto-ARIMA comparados con MSE y MAE.",
    image: `${import.meta.env.BASE_URL}cover7.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/7" }],
    category: "tech",
  },
  {
    id: "ucm-08",
    title: "ACP y Clustering",
    role: "Python · Reducción de Dimensionalidad · Machine Learning",
    year: 2025,
    tags: ["Python", "Seaborn", "Scikit-learn", "PCA", "K-Means", "Clustering Jerárquico", "Silhouette Score", "ML"],
    blurb:
      "Análisis multivariado: PCA para reducción de dimensionalidad seguido de K-Means y clustering jerárquico evaluados mediante el método del codo y Silhouette Score.",
    image: `${import.meta.env.BASE_URL}cover8.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/8" }],
    category: "tech",
  },
  {
    id: "ucm-09",
    title: "RandomForest y XGBoost",
    role: "Python · Machine Learning · Modelos Ensemble",
    year: 2025,
    tags: ["Python", "Scikit-learn", "XGBoost", "Random Forest", "GridSearchCV", "Cross Validation", "Feature Importance", "ML"],
    blurb:
      "Modelos predictivos en Python con árboles de decisión, Random Forest y XGBoost. Optimización con GridSearchCV y evaluación con métricas de clasificación y feature importance.",
    image: `${import.meta.env.BASE_URL}cover9.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/9" }],
    category: "tech",
  },
  {
    id: "ucm-10",
    title: "Modelización Predictiva End2End con Scikit-learn",
    role: "Python · Machine Learning · Pipelines",
    year: 2025,
    tags: ["Python", "Scikit-learn", "Pipelines", "Preprocesamiento", "Validación Cruzada", "GridSearchCV", "ML"],
    blurb:
      "Flujo end-to-end con Pipelines de scikit-learn, transformadores personalizados, preprocesamiento y benchmarking de múltiples clasificadores con validación cruzada.",
    image: `${import.meta.env.BASE_URL}cover10.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/10" }],
    category: "tech",
  },
  {
    id: "ucm-11",
    title: "Deep Learning: Redes Densas y Convolucionales",
    role: "Python · Deep Learning · Redes Neuronales",
    year: 2025,
    tags: ["Python", "TensorFlow", "Keras", "Redes Neuronales Densas", "CNN", "Clasificación", "Regresión", "DL"],
    blurb:
      "Diseño y entrenamiento de arquitecturas densas y convolucionales en TensorFlow/Keras aplicadas a tareas de visión y regresión.",
    image: `${import.meta.env.BASE_URL}cover11.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/11" }],
    category: "tech",
  },
  {
    id: "ucm-12",
    title: "Predicción de Temperaturas con RNN",
    role: "Python · Deep Learning · Series Temporales",
    year: 2025,
    tags: ["Python", "TensorFlow", "Keras", "RNN", "Series Temporales", "Predicción", "DL"],
    blurb:
      "Redes recurrentes (RNN) en Keras para series temporales y predicción de temperaturas mínimas con horizonte multietapa.",
    image: `${import.meta.env.BASE_URL}cover12.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/12" }],
    category: "tech",
  },
  {
    id: "ucm-13",
    title: "Fine-Tuning en NLP: Clasificación y QA",
    role: "Python · NLP · Transfer Learning",
    year: 2025,
    tags: ["Python", "Transformers", "Hugging Face", "Fine-Tuning", "Text Classification", "Question Answering", "DL"],
    blurb:
      "Fine-tuning sobre modelos preentrenados de Hugging Face para clasificación textual y question answering supervisado.",
    image: `${import.meta.env.BASE_URL}cover13.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/13" }],
    category: "tech",
  },
  {
    id: "ucm-14",
    title: "Análisis de Préstamos con PySpark",
    role: "Big Data · PySpark · Databricks",
    year: 2025,
    tags: ["Python", "PySpark", "Databricks", "Big Data", "ETL", "Data Analysis", "Spark", "ML"],
    blurb:
      "Limpieza, transformación y agregación de micropréstamos a gran escala con PySpark sobre Databricks.",
    image: `${import.meta.env.BASE_URL}cover14.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/14" }],
    category: "tech",
  },
  {
    id: "correos-logs-json",
    title: "Librería de logging en JSON para robots RPA",
    role: "UiPath · RPA",
    year: 2025,
    tags: ["UiPath", "JSON", "RPA", "Logs"],
    blurb:
      "Librería modular en UiPath para estandarizar logs en JSON integrada en robots en producción de Correos, alimentando dashboards de Power BI.",
    image: `${import.meta.env.BASE_URL}correos.png`,
    links: [],
    category: "tech",
  },
  {
    id: "correos-n8n-make",
    title: "Orquestación experimental con n8n y Make",
    role: "Automatización · Orquestación",
    year: 2025,
    tags: ["n8n", "Make", "Automatización", "RPA"],
    blurb:
      "Entornos locales con n8n y Make para flujos de integración y escalabilidad con robots UiPath.",
    image: `${import.meta.env.BASE_URL}correos.png`,
    links: [],
    category: "tech",
  },
  {
    id: "correos-neo4j",
    title: "Exploración de grafos con Neo4j",
    role: "Bases de datos · I+D",
    year: 2025,
    tags: ["Neo4j", "Grafos", "Análisis de datos"],
    blurb:
      "Modelado de esquemas de nodos y relaciones en Neo4j para análisis complejo y automatización.",
    image: `${import.meta.env.BASE_URL}correos.png`,
    links: [],
    category: "tech",
  },
  {
    id: "correos-soporte-transversal",
    title: "Soporte transversal y mantenimiento RPA",
    role: "Operaciones · Producción",
    year: 2025,
    tags: ["RPA", "UiPath", "Mantenimiento", "Colaboración"],
    blurb:
      "Resolución de incidencias y seguimiento de proyectos desplegados en producción coordinando con equipos técnicos y de negocio.",
    image: `${import.meta.env.BASE_URL}correos.png`,
    links: [],
    category: "tech",
  },
  {
    id: "balteus",
    title: "Balteus x Wenyers",
    role: "Colaboración · Accesorios",
    year: 2025,
    tags: ["Accesorios", "Modular", "Diseño", "Prototipado", "Funcionalidad", "Brand Collab"],
    blurb:
      "Colaboración con la marca Balteus en el diseño de una colección Otoño-Invierno 2025 de hebillas modulares explorando la unión entre estética y funcionalidad.",
    image: `${import.meta.env.BASE_URL}balteus.webp`,
    links: [],
    category: "art",
  },
  {
    id: "yute-culture",
    title: "Yute Culture — Colección Cápsula",
    role: "Dirección Creativa · Diseño de Moda · Patronaje Modular",
    year: 2026,
    tags: ["Moda", "Yute Culture", "Ura Wenyers", "Patronaje Modular", "Upcycling", "Estampación", "Dirección Creativa"],
    blurb:
      "Colección cápsula nacida de la deconstrucción del saco de patatas de yute tradicional y el juego fonético 'yute' / 'youth'. Tensión entre la aspereza rural y la silueta urbana. Incluye piezas modulares con cuellos y sobrefaldas desmontables, volúmenes arquitectónicos y rapports folclóricos propios.",
    image: `${import.meta.env.BASE_URL}balteus.webp`,
    links: [],
    category: "art",
  },
  {
    id: "re-chulos",
    title: "Re-chulos — Premio al Mejor Proyecto de Upcycling",
    role: "Upcycling · Concurso San Isidro · Moda Sostenible",
    year: 2026,
    tags: ["Upcycling", "Moda Sostenible", "Premio", "moda-re-", "Confección"],
    blurb:
      "Premio al Mejor Proyecto de Upcycling en el concurso 'Re-Chulos' de San Isidro (Madrid), organizado con moda-re-. Reinterpretación del traje castizo madrileño confeccionado al 100% con 3 prendas de segunda mano y textiles recuperados, desfilado en pasarela abierta.",
    image: `${import.meta.env.BASE_URL}balteus.webp`,
    links: [],
    category: "art",
  },
  {
    id: "manemane-fall26",
    title: "Cápsula MANÉMANÉ Fall 26",
    role: "Diseño de Colección · Confección",
    year: 2026,
    tags: ["Diseño", "Confección", "MANÉMANÉ", "Pasarela", "Satén"],
    blurb:
      "Propuesta de 10 looks a partir de los recursos conceptuales de Miguel Becer tras su presentación en MBFWM. Confección física de pantalón estructurado con volantes laterales en satén bicolor.",
    image: `${import.meta.env.BASE_URL}balteus.webp`,
    links: [],
    category: "art",
  },
  {
    id: "blazer-deconstruccion",
    title: "Deconstrucción Digital de Blazer",
    role: "Co-diseño con Santiago Yáñez · Moulage Digital",
    year: 2026,
    tags: ["Moulage", "Patronaje Digital", "Sastrería", "Experimentación"],
    blurb:
      "Experimentación volumétrica partiendo del moulage espontáneo con dos blazers clásicas sobre maniquí y su posterior traducción a entornos digitales mediante manipulación fotográfica.",
    image: `${import.meta.env.BASE_URL}balteus.webp`,
    links: [],
    category: "art",
  },
];

// === Utilidades ===
function useDebouncedValue(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function usePDFImages(pdfUrl) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!pdfUrl) return;
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const out = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.25 });
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: ctx, viewport }).promise;
          out.push(canvas.toDataURL());
        }
        if (!cancelled) setImages(out);
      } catch (e) {
        console.error("PDF render error", e);
        setImages([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);
  return images;
}

function useContainerWidth() {
  const ref = React.useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

// Componente OneLineTags corregido (sin duplicaciones)
function OneLineTags({ tags = [], onTagClick }) {
  const containerRef = React.useRef(null);
  const [count, setCount] = React.useState(tags.length);

  const recompute = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    let low = 0,
      high = tags.length,
      best = 0;

    const test = (n) =>
      new Promise((resolve) => {
        setCount(n);
        requestAnimationFrame(() => {
          const fits = el.scrollWidth <= el.clientWidth + 1;
          resolve(fits);
        });
      });

    (async () => {
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const fits = await test(mid);
        if (fits) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      setCount(best);
    })();
  }, [tags]);

  React.useEffect(() => {
    recompute();
    const ro = new ResizeObserver(() => recompute());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recompute]);

  const visible = tags.slice(0, count);
  const truncated = count < tags.length;

  return (
    <div ref={containerRef} className="flex items-center flex-nowrap overflow-hidden min-w-0">
      {visible.map((t, idx) => (
        <button
          key={`${t}-${idx}`}
          onClick={(e) => {
            e.stopPropagation();
            onTagClick?.(t);
          }}
          className="mr-1.5 last:mr-0 rounded-2xl border px-2.5 py-0.5 text-xs bg-white hover:shadow shrink-0"
          title={t}
        >
          {t}
        </button>
      ))}
      {truncated && (
        <span className="ml-1 text-sm text-[hsl(215_16%_40%)] shrink-0" aria-label="más">
          …
        </span>
      )}
    </div>
  );
}

// === Páginas flipbook ===
function CoverPage() {
  return (
    <div className="relative w-full h-full [transform-style:preserve-3d]">
      <div className="absolute inset-0 grid place-items-center bg-white text-black [backface-visibility:hidden]">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight">Laura Rodríguez</h1>
          <p className="mt-2 text-sm opacity-80">Portfolio · Data × Moda & Arte</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-white [backface-visibility:hidden] [transform:rotateY(180deg)]" />
    </div>
  );
}

function BackCoverPage() {
  return (
    <div className="relative w-full h-full [transform-style:preserve-3d]">
      <div className="absolute inset-0 bg-white [backface-visibility:hidden]" />
      <div className="absolute inset-0 bg-white [backface-visibility:hidden] [transform:rotateY(180deg)]" />
    </div>
  );
}

// Variantes para animación en cascada fluida
const cascadeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cascadeCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
};

export default function Portfolio() {
  const [items] = useState(PROJECTS);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("Todas");
  const [sort, setSort] = useState("recent");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [view, setView] = useState("home"); // home | tech | art
  const [category, setCategory] = useState("Todas");

  const CATEGORY_NAMES = useMemo(() => CATEGORIES.map((c) => c.name), []);
  const dq = useDebouncedValue(q, 250);

  // PDF + flipbook medidas
  const pdfImages = usePDFImages(`${import.meta.env.BASE_URL}portfolio.pdf`);
  const [pageAspect, setPageAspect] = useState(1.414);
  useEffect(() => {
    if (!pdfImages.length) return;
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) setPageAspect(img.naturalHeight / img.naturalWidth);
    };
    img.src = pdfImages[0];
  }, [pdfImages]);

  const flipPages = React.useMemo(
    () =>
      pdfImages.map((src, i) => (
        <div key={`page-${i}`} className="relative w-full h-full [transform-style:preserve-3d]">
          <div className="absolute inset-0 grid place-items-center bg-white [backface-visibility:hidden]">
            <img src={src} alt={`Página ${i + 1}`} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="absolute inset-0 bg-transparent [backface-visibility:hidden] [transform:rotateY(180deg)]" />
        </div>
      )),
    [pdfImages]
  );

  const [wrapRef, wrapW] = useContainerWidth();

  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    setTag("Todas");
    setCategory("Todas");
  }, [view]);

  const filtered = useMemo(() => {
    const norm = (s) => s.toLowerCase();
    const source = view === "home" ? items : items.filter((p) => p.category === view);
    const currentCat = CATEGORIES.find((c) => c.name === category);
    const matchesCategory = (p) => {
      if (!currentCat || currentCat.name === "Todas") return true;
      const pTags = p.tags || [];
      return pTags.some((t) => currentCat.tags.includes(t));
    };
    let list = source.filter((p) => {
      const haystack = [p.title, p.role, (p.tags || []).join(" ")].map(String).join(" ").toLowerCase();
      const hitQ = !dq || haystack.includes(norm(dq));
      const hitTag = tag === "Todas" || (p.tags || []).includes(tag);
      const hitCategory = matchesCategory(p);
      return hitQ && hitCategory && hitTag;
    });
    if (sort === "recent") list = list.sort((a, b) => b.year - a.year);
    if (sort === "az") list = list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [dq, tag, sort, items, view, category]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[hsl(0_0%_98%)] text-black">
      {/* HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <nav className="flex items-center rounded-2xl border overflow-hidden">
            <button
              onClick={() => {
                setView("tech");
                scrollToProjects();
              }}
              className={`h-10 px-3 text-sm ${view === "tech" ? "bg-black text-white" : "hover:bg-[hsl(214.3_31.8%_95%)]"}`}
            >
              Tech
            </button>
            <div className="w-px self-stretch bg-black/80" aria-hidden />
            <button
              onClick={() => {
                setView("art");
              }}
              className={`h-10 px-3 text-sm ${view === "art" ? "bg-black text-white" : "hover:bg-[hsl(214.3_31.8%_95%)]"}`}
            >
              Art
            </button>
          </nav>

          <button
            onClick={() => setView("home")}
            aria-label="Inicio"
            title="Inicio"
            className={`h-10 px-3 flex items-center justify-center text-sm border rounded-2xl ${
              view === "home" ? "bg-black text-white" : "hover:bg-[hsl(214.3_31.8%_95%)]"
            }`}
          >
            <HomeIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight"
        >
          {view === "home" && "Laura Rodríguez · CV"}
          {view === "tech" && "Ciencia de Datos e IA"}
          {view === "art" && "Diseño de Moda & Arte"}
        </motion.h1>
        <p className="mt-3 w-full text-[hsl(215_16%_40%)]">
          {view === "home" && <>Creative Technologist | Data Scientist with a Passion for Fashion</>}
          {view === "tech" && (
            <>
              Integro <strong>análisis de datos</strong> e <strong>IA</strong> para crear soluciones robustas, explicables y útiles.
            </>
          )}
          {view === "art" && (
            <>
              Exploro <strong>diseño de moda</strong>, <strong>dirección artística</strong> y experimentación textil con enfoque vanguardista.
            </>
          )}
        </p>
        {view !== "home" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(view === "tech" ? SUGGESTED_TAGS_TECH : SUGGESTED_TAGS_ART).map((k) => {
              const isActive = tag === k;
              return (
                <button
                  key={k}
                  onClick={() => {
                    setTag(isActive ? "Todas" : k);
                    scrollToProjects();
                  }}
                  className={`rounded-2xl border px-2.5 py-1 text-sm ${
                    isActive ? "bg-black text-white" : "bg-white hover:shadow"
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* HOME: CV secciones */}
      {view === "home" && (
        <section className="max-w-6xl mx-auto px-4 py-0 space-y-6">
          {/* Experiencia laboral */}
          <div className="rounded-2xl border p-4 bg-white/70">
            <h2 className="text-lg font-semibold mb-2">Experiencia</h2>

            <div className="flex justify-between mt-2">
              <div className="font-medium mr-4">Profesora de Matemática Aplicada | UNIE Universidad</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">Enero 2026 - En curso</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>Docente del módulo de Minería de Datos para alumnos de 4º curso del Grado de Matemáticas.</li>
              <li>Diseño de casos prácticos de análisis multivariante, validación cruzada y modelado predictivo.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: Minería de Datos · Python · R · Estadística · Machine Learning</div>

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">Programa Jóven Talento - Correos (Equipo DALIA)</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">Febrero - Agosto 2025</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>Desarrollo modular en UiPath, automatización de procesos (RPA), orquestación con n8n y Make.</li>
              <li>Trazabilidad en JSON y trabajo técnico en entornos corporativos complejos.</li>
              <li>Colaboración transversal con equipos técnicos y de negocio; mejora de la escalabilidad de robots en producción.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: UiPath · n8n · Make · JSON · Git · RPA</div>

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">Colaboración de diseño - Balteus (colección Otoño-Invierno 2025)</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">Mayo - Julio 2025</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>Diseño y evaluación de variantes modulares de hebillas; equilibrio estética-funcionalidad.</li>
              <li>Colaboración con fundadores y dirección creativa para alineación con identidad de marca.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: Illustrator · Photoshop · Diseño industrial · Dibujo técnico</div>

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">Miembro de comité organizador del XXIV Encuentro Nacional de Estudiantes de Matemáticas</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">Julio 2023</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>Coordinación logística y gestión de comunicaciones con más de 300 asistentes.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: Gestión de eventos · Comunicación · Diseño gráfico</div>
          </div>

          {/* Educación */}
          <div className="rounded-2xl border p-4 bg-white/70 mt-4">
            <h2 className="text-lg font-semibold mb-2">Educación</h2>

            <div className="flex justify-between mt-2">
              <div className="font-medium mr-4">Título Superior en Diseño de Moda - Universidad Europea | IADE</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">2025 - En curso</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>Proyectos de diseño experimental con enfoque en sostenibilidad y técnicas mixtas.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: Dibujo técnico · Patronaje · Estilismo · Photoshop · Illustrator</div>

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">Máster en Big Data, Data Science e IA - Universidad Complutense de Madrid</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">2024 - 2025</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>TFM: Autenticación de autoría pictórica mediante IA explicable.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: SQL · NoSQL · Python · ML · DL · NLP · Spark · MLflow · Explainable AI</div>

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">Grado en Matemáticas - Universidad de Extremadura</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">2019 - 2024</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>TFG: Clasificación de emociones mediante Deep Learning.</li>
              <li>Erasmus: Universidad de Zielona Góra, Polonia (2023–2024).</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: Álgebra · Estadística · Geometría · Topología · Análisis Matemático</div>
          </div>

          {/* Premios y Reconocimientos */}
          <div className="rounded-2xl border p-4 bg-white/70 mt-4">
            <h2 className="text-lg font-semibold mb-2">Premios y Reconocimientos</h2>

            <div className="flex justify-between mt-2">
              <div className="font-medium mr-4">Premio al Mejor Proyecto de Upcycling — Concurso 'Re-Chulos' de San Isidro</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">Mayo 2026</div>
            </div>
            <p className="text-sm mt-1">Concurso de moda sostenible organizado con moda-re- reinterpretando el traje castizo madrileño.</p>

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">1.ᵉʳ Premio – Competición de Becas Máster Big Data, Data Science e IA (UCM – NTIC Master)</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">Septiembre 2025</div>
            </div>
            <p className="text-sm mt-1">Reconocimiento al mejor proyecto final de máster por autenticación pictórica con XAI.</p>

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">Ganadora del reto de Tirme - II Circular Innovation Hackathon (Palma de Mallorca)</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">Noviembre 2024</div>
            </div>
            <p className="text-sm mt-1">Propuesta de solución tecnológica circular con impacto en sostenibilidad y trazabilidad de residuos.</p>
          </div>

          {/* Habilidades */}
          <div className="rounded-2xl border p-4 bg-white/70">
            <h2 className="text-lg font-semibold mb-2">Habilidades</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li><strong>Ciclo completo del dato:</strong> adquisición, limpieza, análisis, modelado predictivo y visualización.</li>
              <li><strong>Programación:</strong> Python, R, SQL, control de versiones Git en entornos colaborativos.</li>
              <li><strong>Big Data & Bases de Datos:</strong> Apache Spark, PostgreSQL, MySQL, MongoDB, Neo4j.</li>
              <li><strong>ML, Deep Learning & XAI:</strong> scikit-learn, TensorFlow, Keras, Hugging Face, SHAP.</li>
              <li><strong>Automatización & RPA:</strong> UiPath, n8n, Make, trazabilidad JSON.</li>
              <li><strong>Diseño & Moda:</strong> Patronaje industrial, técnicas de confección, upcycling, Adobe Illustrator y Photoshop.</li>
            </ul>
          </div>

          {/* Idiomas */}
          <div className="rounded-2xl border p-4 bg-white/70">
            <h2 className="text-lg font-semibold mb-2">Idiomas</h2>
            <ul className="text-sm list-none space-y-1">
              <li><strong>Español:</strong> Nativo</li>
              <li><strong>Inglés:</strong> B2 (Cambridge)</li>
              <li><strong>Francés:</strong> B1 (DELF-EOI)</li>
            </ul>
          </div>

          {/* Descargas */}
          <div className="rounded-2xl border p-4 bg-white/70">
            <h2 className="text-lg font-semibold mb-2">Descargas</h2>
            <div className="flex flex-wrap gap-2">
              <a href={`${import.meta.env.BASE_URL}CV_LR.pdf`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]" target="_blank" rel="noreferrer"><FileText className="size-4" /> CV (PDF)</a>
              <a href={`${import.meta.env.BASE_URL}CV_ENG_LR.pdf`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]" target="_blank" rel="noreferrer"><FileText className="size-4" /> CV in English (PDF)</a>
              <a href={`${import.meta.env.BASE_URL}CV_mixto.pdf`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]" target="_blank" rel="noreferrer"><FileText className="size-4" /> CV híbrido (PDF)</a>
              <a href={`${import.meta.env.BASE_URL}portfolio.pdf`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]" target="_blank" rel="noreferrer"><FileText className="size-4" /> Portfolio Moda (PDF)</a>
            </div>
          </div>
        </section>
      )}

      {/* === ARTE: Flipbook primero === */}
      {view === "art" && pdfImages.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-0 pb-2">
          <div className="md:hidden landscape:hidden mb-4 rounded-2xl border p-4 bg-amber-50 text-amber-900 text-sm flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Para una mejor experiencia, <strong>gira tu dispositivo horizontalmente</strong> para ver el portfolio.</span>
          </div>

          <div ref={wrapRef} className="border rounded-2xl px-3 py-4 bg-white overflow-hidden">
            {(() => {
              const innerW = Math.max(wrapW - 24, 360);
              const pageW = Math.floor(innerW / 2);
              const pageH = Math.round(pageW * pageAspect);
              const minPageW = 280;
              const minPageH = Math.round(minPageW * pageAspect);

              return (
                <div className="w-full">
                  <HTMLFlipBook
                    width={pageW}
                    height={pageH}
                    size="stretch"
                    minWidth={minPageW}
                    maxWidth={pageW}
                    minHeight={minPageH}
                    maxHeight={pageH}
                    showCover={true}
                    usePortrait={false}
                    autoSize={true}
                    maxShadowOpacity={0.15}
                    mobileScrollSupport={true}
                    className="mx-auto"
                    style={{ background: "transparent", width: "100%" }}
                  >
                    <CoverPage />
                    {flipPages}
                    <BackCoverPage />
                  </HTMLFlipBook>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* SEARCH BAR (solo en Tech) */}
      {view === "tech" && (
        <section className="max-w-6xl mx-auto px-4 pb-2">
          <div className="border rounded-2xl p-4 flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_auto] items-stretch md:items-center bg-white/70">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[hsl(215_16%_40%)]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por título, rol o etiqueta…"
                className="w-full pl-9 h-10 rounded-xl border bg-white px-3 outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                scrollToProjects();
              }}
              className="h-10 rounded-xl border bg-white px-3"
              aria-label="Categoría"
            >
              {CATEGORY_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-xl border bg-white px-3">
              <option value="recent">Recientes</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </section>
      )}

      {/* GRID EN CASCADA INTERACTIVA */}
      {view !== "home" && (
        <section id="projects" className="max-w-6xl mx-auto px-4 py-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <p className="text-[hsl(215_16%_40%)]">No se han encontrado proyectos.</p>
            ) : (
              <motion.div
                key={`${view}-${category}-${tag}-${sort}`}
                variants={cascadeContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]"
              >
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    variants={cascadeCardVariants}
                    whileHover={{
                      y: -8,
                      rotateX: 3,
                      rotateY: -3,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="will-change-transform"
                  >
                    <article
                      onClick={() => {
                        setActive(p);
                        setOpen(true);
                      }}
                      className="group aspect-square overflow-hidden rounded-2xl border hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm flex flex-col justify-between"
                    >
                      <div className="relative h-[46%] overflow-hidden bg-zinc-100">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center bg-[hsl(214.3_31.8%_91.4%)]">
                            <span className="text-sm text-[hsl(215_16%_40%)]">Sin imagen</span>
                          </div>
                        )}
                        <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[11px] px-2 py-0.5 rounded-full font-medium">
                          {p.year}
                        </span>
                      </div>

                      <div className="h-[54%] p-4 pb-3 flex flex-col justify-between min-h-0">
                        <div>
                          <h3
                            className={`font-semibold leading-tight text-zinc-900 ${
                              p.title.length > 38 ? "text-base line-clamp-2" : "text-lg line-clamp-1"
                            }`}
                          >
                            {p.title}
                          </h3>
                          <div className="text-xs text-[hsl(215_16%_40%)] truncate mt-0.5">{p.role}</div>
                          <p className="mt-1.5 text-xs text-[hsl(215_16%_28%)] line-clamp-2 leading-relaxed">
                            {p.blurb}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 items-center pt-2 border-t border-zinc-100">
                          {(p.tags || []).slice(0, 3).map((t) => {
                            const isActive = tag === t;
                            return (
                              <button
                                key={t}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTag(isActive ? "Todas" : t);
                                  scrollToProjects();
                                }}
                                className={`rounded-xl border px-2 py-0.5 text-[11px] transition-colors ${
                                  isActive ? "bg-black text-white" : "bg-white hover:bg-zinc-100 text-zinc-700"
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                          {(p.tags || []).length > 3 && (
                            <span className="text-[11px] text-zinc-400">+{(p.tags || []).length - 3}</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-2xl max-h-[90vh] rounded-2xl bg-white text-black shadow-xl ring-1 ring-[hsl(214.3_31.8%_91.4%)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
          >
            {active && (
              <>
                <div className="p-4 border-b sticky top-0 bg-white z-10">
                  <h2 id="project-title" className="text-xl font-semibold">{active.title}</h2>
                  <div className="text-xs text-[hsl(215_16%_40%)] flex gap-2 mt-1">
                    <span>{active.role}</span>
                    <span>•</span>
                    <span>{active.year}</span>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto">
                  {active.image && (
                    <div className="rounded-xl overflow-hidden ring-1 ring-[hsl(214.3_31.8%_91.4%)]">
                      <img src={active.image} alt={active.title} className="w-full h-auto object-cover" loading="lazy" />
                    </div>
                  )}

                  <p className="mt-3 text-sm leading-relaxed">{active.blurb}</p>

                  {(active.tags?.length ?? 0) > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {active.tags.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setOpen(false);
                            setTag(t);
                            scrollToProjects();
                          }}
                          className="rounded-2xl border px-2.5 py-0.5 text-xs bg-white hover:shadow"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 pb-2 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {(active.links?.length ?? 0) > 0 &&
                        active.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]"
                          >
                            <ExternalLink className="size-4" />
                            {l.label}
                          </a>
                        ))}
                    </div>

                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)] shrink-0"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-10 border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="font-semibold">¿Hablamos?</div>
            <div className="text-sm text-[hsl(215_16%_40%)]">Disponible desde las 12pm · Madrid</div>
          </div>
          <div className="flex gap-2">
            <a href="mailto:lauraarodriguez11@gmail.com" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]">
              <Mail className="size-4" /> Email
            </a>
            <a href="https://www.linkedin.com/in/laurarodriguezropero" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]">
              <Linkedin className="size-4" /> LinkedIn
            </a>
            <a href={`https://github.com/${GH_USERNAME}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]">
              <Github className="size-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}