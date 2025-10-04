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

// =====================
//  PORTFOLIO LITE ++
//  - Tabs (Tecnología / Arte)
//  - Chips de etiquetas clicables (filtran y hacen scroll)
//  - Import auto de GitHub + división de "master_ucm" en subproyectos (directorios)
//  - Flipbook PDF en la sección de Arte (ajustado a ancho, sin marco negro, sin scroll)
// =====================

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
const SUGGESTED_TAGS_ART = [];

// Catálogo de categorías (cada una lista sus tags oficiales)
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

// ======= Proyectos MANUALES (edítalos con tus proyectos reales) =======
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
      "Trabajo Fin de Grado centrado en la clasificación automática de emociones en textos cortos de redes sociales (ira, asco, miedo, alegría, tristeza y sorpresa). Incluye un marco teórico detallado de IA, aprendizaje automático y redes neuronales, seguido de una aplicación práctica en Python. Se implementaron modelos ML (SVM, Random Forest, Naive Bayes) y DL (RNN, LSTM y Transformers con XLM-Roberta), con un exhaustivo preprocesamiento textual y técnicas de optimización (GridSearch, RandomSearch). La evaluación utilizó métricas como precisión, recall, F1-score y accuracy, comparando enfoques clásicos y de deep learning. El documento completo recoge resultados, discusión crítica, limitaciones y posibles líneas de mejora.",
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
      "Diseño e implementación de una base de datos relacional para gestionar eventos culturales. Incluye modelo entidad-relación, paso a modelo lógico, creación en MySQL con restricciones y relaciones, inserción de datos variados, 10+ consultas avanzadas, vistas y triggers automáticos.",
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
      "Interacción con un catálogo de moda en MongoDB mediante inserciones, actualizaciones, filtrado y consultas de agregación. Se incluyen scripts en JS y Python para gestionar y visualizar datos, con un informe PDF explicando dataset, queries y conclusiones analíticas.",
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
      "Análisis estadístico de anchura de cráneos egipcios en dos periodos históricos. Incluye medidas descriptivas, boxplots, test de normalidad (Kolmogorov-Smirnov), intervalos de confianza y contraste de hipótesis mediante test t, con interpretación rigurosa y contextualizada.",
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
      "Proyecto de programación en Python orientado a la correcta estructuración del código, uso de funciones y clases, y aplicación de pruebas exhaustivas. Se trabajó con un dataset de películas, desarrollando procesos de análisis, automatización de tareas y visualización de resultados. Incluye la implementación de un script independiente con técnica MapReduce, además de buenas prácticas como documentación clara y cumplimiento de PEP-8.",
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
      "Desarrollo de un análisis financiero en Tableau para la empresa Easy Loans, enfocado en detectar patrones de comportamiento, evaluar la calidad de los préstamos y proponer recomendaciones estratégicas. Incluye la creación de dashboards interactivos, cálculos personalizados y visualizaciones avanzadas que permiten extraer insights accionables para la toma de decisiones.",
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
      "Construcción de modelos predictivos con regresión lineal y logística en Python. Incluye depuración de datos, tratamiento de outliers, variables perdidas y creación de funciones auxiliares. Los modelos fueron optimizados con selección clásica y aleatoria, evaluados mediante métricas de desempeño y acompañados de una interpretación de coeficientes clave.",
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
      "Análisis y modelización de series temporales con estacionalidad en Python. Se aplicaron técnicas de descomposición, pruebas de estacionariedad (ADF, KPSS), modelos de suavizado exponencial de Holt y ARIMA/Auto-ARIMA. El rendimiento fue evaluado mediante métricas MSE y MAE, comparando enfoques clásicos y automatizados de predicción.",
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
      "Aplicación de técnicas de minería de datos para análisis multivariado. Se utilizó PCA para reducción de dimensionalidad e interpretación de componentes principales, seguido de clustering jerárquico y K-Means. Se evaluó la calidad de los grupos mediante el método del codo y la puntuación de silueta, comparando la eficacia de los diferentes enfoques.",
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
      "Construcción de modelos predictivos en Python para determinar el color original de vehículos usados a partir de características técnicas. Se entrenaron y evaluaron árboles de decisión, Random Forest y XGBoost, aplicando GridSearchCV con validación cruzada para optimizar hiperparámetros. El desempeño fue medido con métricas como accuracy, precision, recall, F1-score y AUC, junto con un análisis de importancia de variables.",
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
      "Desarrollo de un flujo de modelización predictiva end-to-end en Python con scikit-learn. Incluye la construcción de pipelines con transformadores personalizados, aplicación de técnicas de preprocesamiento, ajuste de hiperparámetros y comparación de múltiples algoritmos de clasificación. Se presentan métricas de evaluación y visualizaciones que permiten interpretar el rendimiento de los modelos.",
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
      "Implementación de modelos de deep learning aplicando tanto redes densas como convolucionales para resolver problemas de clasificación y regresión. El trabajo incluye el diseño, entrenamiento y evaluación de las arquitecturas en TensorFlow/Keras, interpretando métricas y comparando el rendimiento de ambos enfoques.",
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
      "Construcción de un modelo de red neuronal recurrente (RNN) en TensorFlow/Keras para predecir temperaturas mínimas diarias en Melbourne con un horizonte de dos días. Se aplicaron técnicas de modelado de series temporales, entrenamiento supervisado y evaluación de predicciones en datos reales.",
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
      "Aplicación de fine-tuning sobre modelos de lenguaje preentrenados para resolver tareas de procesamiento de lenguaje natural. Se desarrollaron experimentos en clasificación de textos y en respuesta automática a preguntas, evaluando el rendimiento de los modelos ajustados con técnicas supervisadas.",
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
      "Procesamiento y análisis de datos de micropréstamos de Kiva mediante PySpark en entorno Databricks. Incluye transformaciones, limpieza y agregaciones a gran escala para explorar patrones en montos, sectores y países, aplicando técnicas de Big Data para el análisis eficiente de grandes volúmenes de información.",
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
      "Diseño e implementación de una librería modular en UiPath para estandarizar la generación de logs en formato JSON. Integrada en todos los robots en producción de Correos, mejoró la trazabilidad, el diagnóstico de incidencias y la observabilidad de procesos, alimentando además dashboards de Power BI para monitorizar la ejecución de los robots.",
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
      "Configuración de entornos locales con n8n y Make como laboratorio de orquestación de procesos. Desarrollo de flujos de prueba para evaluar integraciones con robots UiPath y explorar la escalabilidad de soluciones de automatización en Correos.",
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
      "Experimentación con Neo4j como base de datos orientada a grafos, desarrollando pequeños esquemas de nodos y relaciones en entorno de laboratorio. El objetivo fue familiarizarme con el modelado de grafos y evaluar su utilidad en escenarios de análisis y automatización.",
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
      "Apoyo operativo en la resolución de incidencias y tareas transversales en distintos procesos de negocio. Participación en la puesta en marcha y seguimiento de proyectos desplegados en producción junto a ATOS, coordinando con equipos técnicos y de negocio.",
    image: `${import.meta.env.BASE_URL}correos.png`,
    links: [],
    category: "tech",
  },
  {
    id: "balteus",
    title: "Balteus x Wenyers",
    role: "Colaboración · Accesorios",
    year: 2025,
    tags: [
      "Accesorios", "Modular", "Diseño", "Prototipado",
      "Funcionalidad", "Complementos", "Brand Collab"
    ],
    blurb:
      "Colaboración con la marca Balteus en el diseño de una colección Otoño-Invierno 2025 de hebillas de cinturón modulares. Desarrollo de propuestas estéticas y funcionales, explorando nuevas posibilidades en el diseño de accesorios de moda.",
    image: `${import.meta.env.BASE_URL}balteus.webp`,
    links: [
      // { label: "Proyecto", href: "#" },
    ],
    category: "art",
  },
];

// ======= Tarjetas CV/Resumen (Home) =======
const RESUME_CARDS = [
  {
    id: "cv-exp-1",
    title: "Data & Automation — Correos",
    role: "Experiencia",
    year: 2025,
    tags: ["RPA", "UiPath", "n8n", "Make", "Data"],
    blurb:
      "Automatización de procesos con UiPath y orquestación n8n/Make. Trazabilidad JSON, monitorización y resiliencia en producción.",
    image: "",
    links: [{ label: "Caso (resumen)", href: "#" }],
    category: "home",
  },
  {
    id: "cv-exp-2",
    title: "Proyectos de Datos & Visualización",
    role: "Experiencia / Proyectos",
    year: 2025,
    tags: ["Python", "SQL", "Tableau", "EDA"],
    blurb: "Análisis exploratorio, modelización clásica y dashboards ejecutivos. Integración con Git/GitHub y buenas prácticas.",
    image: "",
    links: [{ label: "GitHub", href: `https://github.com/${GH_USERNAME}` }],
    category: "home",
  },
  {
    id: "cv-edu-1",
    title: "Máster Big Data, Data Science e IA — UCM",
    role: "Educación",
    year: 2025,
    tags: ["Máster", "UCM"],
    blurb: "SQL, NoSQL, Estadística, ML, DL, NLP, Spark. 14 trabajos prácticos desglosados en el portfolio.",
    image: "",
    links: [{ label: "Repositorio Máster", href: `https://github.com/${GH_USERNAME}/master_ucm` }],
    category: "home",
  },
  {
    id: "cv-edu-2",
    title: "Diseño de Moda (en curso)",
    role: "Educación",
    year: 2025,
    tags: ["Moda", "Diseño"],
    blurb: "Formación en patronaje, materiales y dirección artística. Enfoque en unión estética–funcionalidad.",
    image: "",
    links: [],
    category: "home",
  },
  {
    id: "cv-award-1",
    title: "Circular Innovation Hackathon (ganadora)",
    role: "Premios & Méritos",
    year: 2024,
    tags: ["Sostenibilidad", "IA", "Hackathon"],
    blurb: "Solución de IA para optimizar procesos de gestión de residuos y economía circular.",
    image: "",
    links: [{ label: "Proyecto", href: "#" }],
    category: "home",
  },
  {
    id: "cv-skill-1",
    title: "Habilidades clave",
    role: "Habilidades",
    year: 2025,
    tags: ["Python", "SQL", "Tableau", "RPA", "IA", "XAI", "Fashion"],
    blurb: "Python (pandas, scikit-learn), SQL, UiPath, n8n/Make, Tableau, Git, XAI (Grad-CAM, IG).",
    image: "",
    links: [],
    category: "home",
  },
  {
    id: "cv-lang",
    title: "Idiomas",
    role: "Idiomas",
    year: 2025,
    tags: ["ES", "EN", "FR"],
    blurb: "Español (nativa) · Inglés (B2, Cambridge) · Francés (B1, EOI).",
    image: "",
    links: [],
    category: "home",
  },
  {
    id: "cv-pdf",
    title: "CV Mixto (PDF)",
    role: "Documento",
    year: 2025,
    tags: ["CV", "PDF"],
    blurb: "Descarga mi CV completo en PDF (mixto tecnología + arte).",
    image: "",
    links: [{ label: "Descargar CV", href: `${import.meta.env.BASE_URL}CV_mixto.pdf` }],
    category: "home",
  },
  {
    id: "cv-portfolio-art",
    title: "Portfolio de Arte (PDF)",
    role: "Documento",
    year: 2025,
    tags: ["Arte", "PDF"],
    blurb: "Selección de trabajos visuales y moda. Disponible también en vista flipbook.",
    image: "",
    links: [{ label: "Descargar Portfolio", href: `${import.meta.env.BASE_URL}portfolio.pdf` }],
    category: "home",
  },
];

// === Utilidades ===
function useDebouncedValue(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t); }, [value, delay]);
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
    return () => { cancelled = true; };
  }, [pdfUrl]);
  return images;
}

function useContainerWidth() {
  const ref = React.useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => { for (const e of entries) setW(e.contentRect.width); });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

function OneLineTags({ tags = [], onTagClick }) {
  const containerRef = React.useRef(null);
  const [count, setCount] = React.useState(tags.length);

  const recompute = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;


function OneLineTags({ tags = [], onTagClick }) {
  const containerRef = React.useRef(null);
  const [count, setCount] = React.useState(tags.length);

  const recompute = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    let low = 0, high = tags.length, best = 0;

    const test = (n) =>
      new Promise((resolve) => {
        setCount(n);
        requestAnimationFrame(() => {
          const fits = el.scrollWidth <= el.clientWidth + 1; // tolerancia subpíxeles
          resolve(fits);
        });
      });

    (async () => {
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const fits = await test(mid);
        if (fits) { best = mid; low = mid + 1; } else { high = mid - 1; }
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
          onClick={(e) => { e.stopPropagation(); onTagClick?.(t); }}
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


    // Prueba binaria: encuentra el máximo número de chips que caben sin overflow
    let low = 0, high = tags.length, best = 0;

    const test = (n) =>
      new Promise((resolve) => {
        setCount(n);
        requestAnimationFrame(() => {
          // Pequeña tolerancia por subpíxeles
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

  return (
    <div ref={containerRef} className="flex items-center flex-nowrap overflow-hidden min-w-0">
      {tags.slice(0, count).map((t, idx) => (
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
  const [pageAspect, setPageAspect] = useState(1.414); // A4 aprox
  useEffect(() => {
    if (!pdfImages.length) return;
    const img = new Image();
    img.onload = () => { if (img.naturalWidth && img.naturalHeight) setPageAspect(img.naturalHeight / img.naturalWidth); };
    img.src = pdfImages[0];
  }, [pdfImages]);

  const flipPages = React.useMemo(
    () => pdfImages.map((src, i) => (
      <div key={`page-${i}`} className="relative w-full h-full [transform-style:preserve-3d]">
        <div className="absolute inset-0 grid place-items-center bg-white [backface-visibility:hidden]">
          <img src={src} alt={`Página ${i + 1}`} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="absolute inset-0 bg-transparent [backface-visibility:hidden] [transform:rotateY(180deg)]" />
      </div>
    )),
    [pdfImages]
  );

  // Medir ancho del recuadro del flipbook
  const [wrapRef, wrapW] = useContainerWidth();

  // Filtrado
  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { setTag("Todas"); setCategory("Todas"); }, [view]);

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

  // Bloquear scroll del body cuando modal abierto
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // === UI ===
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[hsl(0_0%_98%)] text-black">
      {/* HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          
          {/* IZQUIERDA: Tech / Art */}
          <nav className="flex items-center rounded-2xl border overflow-hidden">
            <button
              onClick={() => { setView("tech"); scrollToProjects(); }}
              className={`h-10 px-3 text-sm ${view==="tech" ? "bg-black text-white" : "hover:bg-[hsl(214.3_31.8%_95%)]"}`}
            >
              Tech
            </button>
            <div className="w-px self-stretch bg-black/80" aria-hidden />
            <button
              onClick={() => { setView("art"); }}
              className={`h-10 px-3 text-sm ${view==="art" ? "bg-black text-white" : "hover:bg-[hsl(214.3_31.8%_95%)]"}`}
            >
              Art
            </button>
          </nav>

          {/* DERECHA: Home */}
          <button
            onClick={() => setView("home")}
            aria-label="Inicio"
            title="Inicio"
            className={`h-10 px-3 flex items-center justify-center text-sm border rounded-2xl ${view==="home" ? "bg-black text-white" : "hover:bg-[hsl(214.3_31.8%_95%)]"}`}
          >
            <HomeIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-6">
        <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {view === "home" && "Laura Rodríguez · CV"}
          {view === "tech" && "Ciencia de Datos e IA"}
          {view === "art" && "Diseño de Moda & Arte"}
        </motion.h1>
        <p className="mt-3 w-full text-[hsl(215_16%_40%)]">
          {view === "home" && <>Creative Technologist | Data Scientist with a Passion for Fashion</>}
          {view === "tech" && <>Integro <strong>análisis de datos</strong> e <strong>IA</strong> para crear soluciones robustas, explicables y útiles.</>}
          {view === "art" && <>Exploro <strong>diseño de moda</strong>, <strong>dirección artística</strong> y visualización creativa con un enfoque funcional.</>}
        </p>
        {view !== "home" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(view === "tech" ? SUGGESTED_TAGS_TECH : SUGGESTED_TAGS_ART).map(k => {
              const isActive = tag === k;
              return (
                <button
                  key={k}
                  onClick={() => {
                    setTag(isActive ? "Todas" : k); // toggle
                    scrollToProjects();
                  }}
                  className={`rounded-2xl border px-2.5 py-1 text-sm ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-white hover:shadow"
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* HOME: CV secciones (texto estático) */}
      {view === "home" && (
        <section className="max-w-6xl mx-auto px-4 py-0 space-y-6">
          {/* Experiencia laboral */}
          <div className="rounded-2xl border p-4 bg-white/70">
            <h2 className="text-lg font-semibold mb-2">Experiencia</h2>

            <div className="flex justify-between mt-2">
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
              <div className="font-medium mr-4">Ganadora del reto de Tirme - II Circular Innovation Hackathon (Palma de Mallorca)</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">Noviembre 2024</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>Propuesta de solución tecnológica circular con impacto en sostenibilidad y trazabilidad de residuos.</li>
              <li>Trabajo en equipo multidisciplinar y presentación ante jurado empresarial.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: Innovación · Data · Economía circular · Prototipado</div>

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
              <li>🏆 Premio al mejor proyecto final de máster (Competición de Becas UCM – NTIC Master).</li>
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

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">Tres cursos anuales de Teatro - Escuela de Interpretación y compañía Createatro</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">2016 - 2019</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>Expresión corporal, improvisación, trabajo en grupo y puesta en escena.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: Escénica · Improvisación · Comunicación · Creatividad</div>

            <div className="flex justify-between mt-3">
              <div className="font-medium mr-4">Enseñanzas Elementales de Música (Piano y Lenguaje Musical) - Escuelas Municipales de Música</div>
              <div className="text-xs text-[hsl(215_16%_40%)] whitespace-nowrap">2006 - 2013</div>
            </div>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
              <li>Formación instrumental básica y teoría musical elemental.</li>
            </ul>
            <div className="mt-2 text-xs text-[hsl(215_16%_40%)]">Stack: Piano · Solfeo · Lenguaje musical · Práctica artística</div>
          </div>

          {/* Habilidades */}
          <div className="rounded-2xl border p-4 bg-white/70">
            <h2 className="text-lg font-semibold mb-2">Habilidades</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li><strong>Manejo del ciclo completo del dato:</strong> adquisición, limpieza, análisis, modelado y visualización.</li>
              <li><strong>Programación eficiente en Python, R y SQL,</strong> con control de versiones en Git en entornos colaborativos.</li>
              <li><strong>Procesamiento de datos a gran escala</strong> con Apache Spark y bases de datos relacionales (<strong>PostgreSQL, MySQL</strong>) y <strong>NoSQL</strong> (MongoDB, Cassandra).</li>
              <li><strong>Desarrollo e implementación de soluciones</strong> basadas en <strong>Machine Learning, Deep Learning y NLP,</strong> con enfoque en validación, trazabilidad e interpretabilidad.</li>
              <li>Uso de frameworks como <strong>scikit-learn, TensorFlow, Keras, PyTorch</strong> y <strong>spaCy</strong>.</li>
              <li><strong>Visualización clara y orientada a negocio</strong> con Tableau, Power BI y bibliotecas de Python (<strong>Matplotlib, Seaborn, Plotly, Streamlit</strong>).</li>
              <li><strong>Diseño de arquitecturas de datos</strong> y desarrollo de pipelines eficientes con <strong>PySpark</strong> y <strong>Pandas</strong>.</li>
              <li><strong>Manejo básico de herramientas creativas</strong> como Adobe Photoshop e Illustrator para creación de recursos visuales e infografías.</li>
              <li><strong>Familiaridad con diseño UI/UX, storytelling visual</strong> y tipografía digital aplicada a dashboards.</li>
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
        <section className="max-w-6xl mx-auto px-4 pb-2">
          {/* Mensaje solo visible en móvil vertical */}
          <div className="md:hidden landscape:hidden mb-4 rounded-2xl border p-4 bg-amber-50 text-amber-900 text-sm flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Para una mejor experiencia, <strong>gira tu dispositivo horizontalmente</strong> para ver el portfolio.</span>
          </div>
          
          <div ref={wrapRef} className="border rounded-2xl px-3 py-4 bg-white overflow-hidden">            
            {(() => {
              const innerW = Math.max(wrapW - 24, 360); // restar padding aprox (px-3)
              const pageW = Math.floor(innerW / 2);      // tamaño de UNA página (spread = 2 páginas)
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

      {/* SEARCH BAR + TAGS (solo en Tech) */}
      {view === "tech" && (
        <section className="max-w-6xl mx-auto px-4 pb-2">
          <div className="border rounded-2xl p-4 flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_auto] items-stretch md:items-center bg-white/70">             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[hsl(215_16%_40%)]"/>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por título, rol o etiqueta…"
                className="w-full pl-9 h-10 rounded-xl border bg-white px-3 outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); scrollToProjects(); }}
              className="h-10 rounded-xl border bg-white px-3"
              aria-label="Categoría"
            >
              {CATEGORY_NAMES.map((name) => (<option key={name} value={name}>{name}</option>))}
            </select>
            <select value={sort} onChange={(e)=>setSort(e.target.value)} className="h-10 rounded-xl border bg-white px-3">
              <option value="recent">Recientes</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </section>
      )}

      {/* GRID */}
      {view !== "home" && (
        <section id="projects" className="max-w-6xl mx-auto px-4 py-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <p className="text-[hsl(215_16%_40%)]">No se han encontrado proyectos.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    <article
                      onClick={() => { setActive(p); setOpen(true); }}
                      className="group aspect-square overflow-hidden rounded-2xl border hover:shadow-xl transition-shadow cursor-pointer bg-white/70 flex flex-col"
                    >
                      {/* Imagen ocupa ~46% del alto del cuadrado */}
                      <div className="relative h-[46%] overflow-hidden">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center bg-[hsl(214.3_31.8%_91.4%)]">
                            <span className="text-sm text-[hsl(215_16%_40%)]">Sin imagen</span>
                          </div>
                        )}
                      </div>

                      {/* Contenido: ocupa el resto del cuadrado */}
                      <div className="h-[55%] p-4 pb-3 grid grid-rows-[auto_auto_1fr_auto] gap-2 min-h-0">
                        <h3
                          className={`font-semibold leading-tight ${
                            p.title.length > 38 ? "text-base line-clamp-3" : "text-lg line-clamp-2"
                          }`}
                        >
                          {p.title}
                        </h3>
                        <div className="text-xs text-[hsl(215_16%_40%)] flex items-center justify-between mt-1 flex-none">
                          <span className="truncate max-w-[70%]">{p.role}</span>
                          <span>{p.year}</span>
                        </div>

                        {/* un pelín más de texto, pero controlado */}
                        <p className="mt-2 text-sm text-[hsl(215_16%_28%)] line-clamp-3 flex-none">
                          {p.blurb}
                        </p>

                        {/* Fila inferior: TODAS las tags, pegadas abajo y sin hueco */}
                        <div className="flex flex-wrap gap-1.5 items-center -mb-1">
                          {(p.tags || []).map((t) => {
                            const isActive = tag === t;
                            return (
                              <button
                                key={t}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTag(isActive ? "Todas" : t); // toggle on/off
                                  scrollToProjects();
                                }}
                                className={`rounded-2xl border px-2.5 py-0.5 text-xs ${
                                  isActive
                                    ? "bg-black text-white"
                                    : "bg-white hover:shadow"
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}

                          {typeof p.stars === "number" && (
                            <span className="ml-auto inline-flex items-center gap-1 text-xs text-[hsl(215_16%_40%)]">
                              <Star className="size-3" /> {p.stars}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </section>
      )}


      {/* MODAL con scroll interno */}
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
                    <span>{active.role}</span><span>•</span><span>{active.year}</span>
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
                          onClick={() => { setOpen(false); setTag(t); scrollToProjects(); }}
                          className="rounded-2xl border px-2.5 py-0.5 text-xs bg-white hover:shadow"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  {(active.links?.length ?? 0) > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {active.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]">
                          <ExternalLink className="size-4" />
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 pb-2 flex justify-end">
                    <button onClick={() => setOpen(false)} className="rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]">
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
            <a href="mailto:lauraarodriguez11@gmail.com" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]"><Mail className="size-4"/> Email</a>
            <a href="https://www.linkedin.com/in/laurarodriguezropero" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]"><Linkedin className="size-4"/> LinkedIn</a>
            <a href={`https://github.com/${GH_USERNAME}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]"><Github className="size-4"/> GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}