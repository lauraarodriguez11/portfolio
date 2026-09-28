import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Github, Linkedin, Mail, ExternalLink, Home as HomeIcon, FileText, Loader2, Image as ImageIcon, Video as VideoIcon, Play } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// Worker vía CDN para garantizar compatibilidad total en despliegues estáticos con Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// Fuentes tipográficas
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&family=Source+Sans+3:wght@300;400;600;700&family=Space+Grotesk:wght@700&display=swap');
`;
document.head.appendChild(styleSheet);

const GH_USERNAME = "lauraarodriguez11";

// Sugerencias disciplinares por sección
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
  "Diseño de Moda",
  "Patronaje",
  "Confección",
  "Fotografía",
  "Upcycling",
  "Investigación Textil",
  "Illustrator",
  "Photoshop",
  "InDesign",
  "Premiere"
];

// Categorías para Data & AI (Tech)
const CATEGORIES_TECH = [
  { name: "Todas", tags: [] },
  {
    name: "Bases de Datos",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "Neo4j", "NoSQL", "Modelo E-R", "SQL Scripts", "Triggers", "Vistas", "XML", "SQL"],
  },
  {
    name: "Estadística & Ciencia de Datos",
    tags: ["Pandas", "NumPy", "SciPy", "Statsmodels", "Estadística", "EDA", "Inferencia", "Spark"],
  },
  {
    name: "Machine Learning & Deep Learning",
    tags: ["Scikit-learn", "Random Forest", "XGBoost", "PCA", "K-Means", "ARIMA", "Holt-Winters", "CNN", "RNN", "Transformers", "ViT", "NLP", "XAI"],
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

// Categorías disciplinares para Atelier (Arte)
const CATEGORIES_ART = [
  { name: "Todas", tags: [] },
  {
    name: "Diseño de Moda & Colección",
    tags: ["Diseño de Moda", "Moda", "Colección", "Yute Culture", "MANÉMANÉ", "Pasarela", "GreenWalk Awards", "Utopía"],
  },
  {
    name: "Patronaje & Confección",
    tags: ["Patronaje", "Patronaje Modular", "Confección", "Sastrería", "Moulage"],
  },
  {
    name: "Upcycling & Sostenibilidad",
    tags: ["Upcycling", "Moda Sostenible", "Premio", "moda-re-", "Zero Waste", "Biomateriales"],
  },
  {
    name: "Edición & Producción Digital",
    tags: ["Patronaje Digital", "Illustrator", "Photoshop", "Diseño Digital", "Fichas Técnicas", "InDesign", "Premiere"],
  },
  {
    name: "Audiovisual & Dirección Creativa",
    tags: ["Fotografía", "Dirección Creativa", "Styling", "Editorial", "Fashion Film", "Vídeo"],
  },
  {
    name: "Accesorios & Artesanía Textil",
    tags: ["Accesorios", "Modular", "Complementos", "Prototipado", "Investigación Textil", "Tatuaje sobre Cuero"],
  },
];

// ======= Catálogo de Proyectos =======
const PROJECTS = [
  {
    id: "tfm-xai-arte",
    title: "Autenticación Pictórica mediante IA Explicable (XAI) y LLMs",
    role: "TFM · Computer Vision · XAI · Ensembles",
    year: 2025,
    tags: [
      "Python",
      "XAI",
      "PyTorch",
      "Transformers",
      "ViT",
      "Swin-Tiny",
      "CNN",
      "SHAP",
      "Grad-CAM",
      "Integrated Gradients",
      "LIME",
      "LLM",
      "ML",
      "DL",
    ],
    blurb:
      "Trabajo Fin de Máster centrado en la atribución de autoría pictórica entre Goya y Velázquez mediante un sistema híbrido multi-modelo validado con bibliografía histórica razonada. Integra análisis cromático (Random Forest con SHAP TreeExplainer), visión de obra completa (ConvNeXt-Tiny con Grad-CAM y Swin Transformer jerárquico por parches con Integrated Gradients), y análisis facial (ViT CLIP con SmoothGrad/Attention Rollout y embeddings faciales con LIME). Las salidas se consolidan en un meta-modelo de regresión logística regularizada alcanzando un 0.98 de Accuracy y 0.99 de F1-Score, complementado con una capa explicativa final en lenguaje natural generada por un LLM y desplegada en una app interactiva con Streamlit.",
    image: `${import.meta.env.BASE_URL}cover_tfm.png`,
    links: [
      {
        label: "GitHub Repositorio",
        href: "https://github.com/FineArtAuthentication/TFM",
      },
      {
        label: "PDF Trabajo Completo",
        href: `${import.meta.env.BASE_URL}TFM.pdf`,
      },
    ],
    category: "tech",
  },
  {
    id: "tfg-emociones",
    title: "Clasificación de Emociones mediante Aprendizaje Automático",
    role: "TFG · NLP · ML/DL",
    year: 2024,
    tags: ["Python", "NLP", "ML", "DL", "SVM", "Random Forest", "Naive Bayes", "RNN", "LSTM", "Transformers", "XLM-Roberta"],
    blurb:
      "Trabajo Fin de Grado centrado en la clasificación automática de emociones en textos cortos de redes sociales. Marco teórico de IA y aplicación práctica en Python con modelos clásicos y Transformers.",
    image: `${import.meta.env.BASE_URL}cover_tfg.png`,
    links: [
      { label: "GitHub", href: "https://github.com/lauraarodriguez11/TFG_clasificacion_emociones" },
      { label: "PDF TFG", href: "https://github.com/lauraarodriguez11/TFG_clasificacion_emociones/blob/main/TFG-Laura-Rodriguez-Ropero_signed.pdf" },
    ],
    category: "tech",
  },
  {
    id: "ucm-01",
    title: "Creación de una Base de Datos",
    role: "SQL · Modelado de Datos",
    year: 2024,
    tags: ["MySQL", "Modelo E-R", "SQL Scripts", "Triggers", "Vistas", "SQL"],
    blurb: "Diseño e implementación de base de datos relacional para eventos culturales con restricciones, vistas y triggers.",
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
    blurb: "Interacción con catálogo en MongoDB mediante queries de agregación y análisis en JS y Python.",
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
    blurb: "Análisis inferencial y contraste de hipótesis con test t sobre datos craneométricos.",
    image: `${import.meta.env.BASE_URL}cover3.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/3" }],
    category: "tech",
  },
  {
    id: "ucm-04",
    title: "Proyecto de Programación con Python",
    role: "Python · Programación Estructurada",
    year: 2024,
    tags: ["Python", "Pandas", "PEP-8", "Pruebas Unitarias", "Automatización", "MapReduce"],
    blurb: "Estructuración de código, pruebas unitarias y script independiente con MapReduce.",
    image: `${import.meta.env.BASE_URL}cover4.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/4" }],
    category: "tech",
  },
  {
    id: "ucm-05",
    title: "Análisis Financiero de Easy Loans",
    role: "Business Intelligence · Visualización",
    year: 2025,
    tags: ["Tableau", "Business Intelligence", "Dashboards", "Data Visualization", "KPIs"],
    blurb: "Dashboard ejecutivo en Tableau con KPIs accionables sobre calidad crediticia.",
    image: `${import.meta.env.BASE_URL}cover5.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/5" }],
    category: "tech",
  },
  {
    id: "ucm-06",
    title: "Modelos de Regresión Lineal y Logística",
    role: "Python · Estadística Predictiva",
    year: 2025,
    tags: ["Python", "Pandas", "Scikit-learn", "Regresión Lineal", "Regresión Logística", "ML"],
    blurb: "Construcción y optimización de modelos lineales y logísticos con selección de variables.",
    image: `${import.meta.env.BASE_URL}cover6.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/6" }],
    category: "tech",
  },
  {
    id: "ucm-07",
    title: "Series Temporales de Temperaturas Oceánicas",
    role: "Python · Series Temporales",
    year: 2025,
    tags: ["Python", "Pandas", "Statsmodels", "ARIMA", "Holt-Winters", "ML"],
    blurb: "Modelización estacional con ARIMA/Auto-ARIMA y suavizado exponencial de Holt.",
    image: `${import.meta.env.BASE_URL}cover7.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/7" }],
    category: "tech",
  },
  {
    id: "ucm-08",
    title: "ACP y Clustering",
    role: "Python · Reducción de Dimensionalidad",
    year: 2025,
    tags: ["Python", "Seaborn", "Scikit-learn", "PCA", "K-Means", "Clustering Jerárquico", "ML"],
    blurb: "PCA multivariado y clustering comparado mediante método del codo y Silhouette Score.",
    image: `${import.meta.env.BASE_URL}cover8.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/8" }],
    category: "tech",
  },
  {
    id: "ucm-09",
    title: "RandomForest y XGBoost",
    role: "Python · Modelos Ensemble",
    year: 2025,
    tags: ["Python", "Scikit-learn", "XGBoost", "Random Forest", "GridSearchCV", "ML"],
    blurb: "Modelos ensemble optimizados con GridSearchCV y análisis de importancia de variables.",
    image: `${import.meta.env.BASE_URL}cover9.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/9" }],
    category: "tech",
  },
  {
    id: "ucm-10",
    title: "Modelización Predictiva End2End",
    role: "Python · Pipelines Scikit-learn",
    year: 2025,
    tags: ["Python", "Scikit-learn", "Pipelines", "Preprocesamiento", "ML"],
    blurb: "Pipelines integrales con transformadores custom y benchmarking con validación cruzada.",
    image: `${import.meta.env.BASE_URL}cover10.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/10" }],
    category: "tech",
  },
  {
    id: "ucm-11",
    title: "Deep Learning: Densas y Convolucionales",
    role: "Python · Deep Learning",
    year: 2025,
    tags: ["Python", "TensorFlow", "Keras", "CNN", "DL"],
    blurb: "Modelos densos y convolucionales en Keras para visión artificial y regresión.",
    image: `${import.meta.env.BASE_URL}cover11.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/11" }],
    category: "tech",
  },
  {
    id: "ucm-12",
    title: "Predicción de Temperaturas con RNN",
    role: "Python · Redes Recurrentes",
    year: 2025,
    tags: ["Python", "TensorFlow", "Keras", "RNN", "DL"],
    blurb: "Redes neuronales recurrentes para series temporales multietapa.",
    image: `${import.meta.env.BASE_URL}cover12.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/12" }],
    category: "tech",
  },
  {
    id: "ucm-13",
    title: "Fine-Tuning en NLP: Clasificación y QA",
    role: "Python · NLP · Transformers",
    year: 2025,
    tags: ["Python", "Transformers", "Hugging Face", "Fine-Tuning", "DL"],
    blurb: "Fine-tuning con arquitecturas preentrenadas para tareas de NLP.",
    image: `${import.meta.env.BASE_URL}cover13.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/13" }],
    category: "tech",
  },
  {
    id: "ucm-14",
    title: "Análisis de Préstamos con PySpark",
    role: "Big Data · PySpark",
    year: 2025,
    tags: ["Python", "PySpark", "Databricks", "Big Data", "Spark", "ML"],
    blurb: "Procesamiento a gran escala de micropréstamos en entorno Databricks.",
    image: `${import.meta.env.BASE_URL}cover14.png`,
    links: [{ label: "GitHub", href: "https://github.com/lauraarodriguez11/master_ucm/tree/main/trabajos/14" }],
    category: "tech",
  },
  {
    id: "correos-logs-json",
    title: "Librería de logging en JSON para RPA",
    role: "UiPath · RPA",
    year: 2025,
    tags: ["UiPath", "JSON", "RPA", "Logs"],
    blurb: "Librería modular en UiPath para logs JSON y observabilidad de robots en producción.",
    image: `${import.meta.env.BASE_URL}correos.png`,
    links: [],
    category: "tech",
  },
  {
    id: "correos-n8n-make",
    title: "Orquestación experimental con n8n y Make",
    role: "Automatización",
    year: 2025,
    tags: ["n8n", "Make", "Automatización", "RPA"],
    blurb: "Flujos de integración y orquestación híbrida con UiPath.",
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
    blurb: "Modelado de nodos y relaciones en entornos de laboratorio.",
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
    blurb: "Resolución de incidencias y producción colaborando con equipos técnicos y de negocio.",
    image: `${import.meta.env.BASE_URL}correos.png`,
    links: [],
    category: "tech",
  },
  {
    id: "greenwalk-awards",
    title: "GreenWalk Awards V Edición",
    role: "Convocatoria de Moda Sostenible · Candidatura Oficial",
    year: 2026,
    tags: ["Moda Sostenible", "Upcycling", "Biomateriales", "Fashion Film", "Dirección Creativa", "Illustrator", "InDesign", "Photoshop"],
    blurb:
      "Candidatura presentada a la 5ª Edición de los GreenWalk Awards. Proyecto integral que aúna patronaje zero-waste, deconstrucción textil de sacos de arpillera y desarrollo de biomateriales moldeados. Incluye la memoria técnica completa en PDF, el lookbook editorial oficial, fashion film y documentación audiovisual del proceso en taller.",
    image: `${import.meta.env.BASE_URL}greenwalk_cover.png`,
    gallery: [
      `${import.meta.env.BASE_URL}greenwalk_lb_1.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_2.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_3.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_4.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_5.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_6.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_7.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_8.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_9.jpg`,
      `${import.meta.env.BASE_URL}greenwalk_lb_10.jpg`,
    ],
    pdf: `${import.meta.env.BASE_URL}entrega_final_greenwalk_compressed.pdf`,
    links: [
      {
        label: "Ver Fashion Film",
        href: "https://www.youtube.com", // Sustituye por tu enlace cuando lo tengas
      },
      {
        label: "Vídeo del Proceso",
        href: "https://www.youtube.com", // Sustituye por tu enlace cuando lo tengas
      },
    ],
    category: "art",
  },
  {
    id: "balteus",
    title: "Balteus — Hebillas Modulares",
    role: "Colaboración · Accesorios & Producto",
    year: 2025,
    tags: ["Accesorios", "Modular", "Prototipado", "Illustrator"],
    blurb:
      "Colaboración con la marca Balteus en el diseño de una colección de hebillas modulares. Exploración formal, optimización de anclajes y dibujo técnico para producción.",
    image: `${import.meta.env.BASE_URL}balteus.webp`,
    gallery: [
      `${import.meta.env.BASE_URL}FT_BALTEUS1.png`,
      `${import.meta.env.BASE_URL}FT_BALTEUS2.png`,
      `${import.meta.env.BASE_URL}FT_BALTEUS3.png`,
      `${import.meta.env.BASE_URL}FT_BALTEUS4.png`,
      `${import.meta.env.BASE_URL}FT_BALTEUS5.png`,
    ],
    links: [],
    category: "art",
  },
  {
    id: "yute-culture",
    title: "Yute Culture — Colección Cápsula",
    role: "Dirección Creativa · Concepto & Superficies",
    year: 2026,
    tags: ["Diseño de Moda", "Patronaje", "Confección"],
    blurb:
      "Colección cápsula nacida de la deconstrucción del saco de patatas tradicional en yute y el juego conceptual 'yute' / 'youth'. Tensión entre aspereza rural y estructura urbana, integrando desarrollo de estampados propios (rapports continuos de inspiración folclórica) y dirección de arte.",
    image: `${import.meta.env.BASE_URL}Lineup.png`,
    gallery: [
      `${import.meta.env.BASE_URL}Moodboard.png`,
    ],
    links: [],
    category: "art",
  },
  {
    id: "yute-culture-look-verde",
    title: "Yute Culture — Look Modular Verde",
    role: "Patronaje Modular · Confección · Editorial",
    year: 2026,
    tags: ["Diseño de Moda", "Patronaje", "Patronaje Modular", "Confección", "Fotografía", "Photoshop"],
    blurb:
      "Pieza superior y cuello construidos en dos partes independientes que admiten múltiples configuraciones de estilismo, alterando la silueta en torno al cuerpo. Dirección creativa y diseño: Ura Wenyers. Fotografía: Kerlyn Micaela Cueva y Santiago Yáñez. Modelos: David Rapado y Ura Wenyers. Estilismo: Santiago Yáñez. Asistencia: David Rapado y Mariam Davtyan.",
    image: `${import.meta.env.BASE_URL}yute_verde_cover.PNG`,
    galleries: [
      {
        title: "Female",
        images: [
          `${import.meta.env.BASE_URL}yute_verde_ed_1.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_2.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_3.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_4.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_5.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_6.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_7.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_8.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_9.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_ed_10.PNG`,
        ],
      },
      {
        title: "Male",
        images: [
          `${import.meta.env.BASE_URL}yute_verde_det_1.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_det_2.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_det_3.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_det_4.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_det_5.PNG`,
          `${import.meta.env.BASE_URL}yute_verde_det_6.PNG`,
        ],
      },
    ],
    links: [],
    category: "art",
  },
  {
    id: "yute-culture-look-arpillera",
    title: "Yute Culture — Look Estructural Arpillera",
    role: "Patronaje Estructural · Confección Artesanal",
    year: 2026,
    tags: ["Diseño de Moda", "Patronaje", "Confección", "Fotografía", "Photoshop"],
    blurb:
      "Exploración volumétrica sobre yute rígido. Top de tirantes con panel trasero acordonado combinado con pantalón ancho que integra sobrefalda abullonada tipo globo. La densidad del tejido sostiene el volumen arquitectónico de la silueta. Dirección creativa y diseño: Ura Wenyers. Fotografía: Ura Wenyers. Modelo: Lucía Fenoll.",
    image: `${import.meta.env.BASE_URL}yute_arpillera_cover.PNG`,
    galleries: [
      {
        title: "V01",
        images: [
          `${import.meta.env.BASE_URL}yute_arp_ed_1.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_ed_2.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_ed_3.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_ed_4.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_ed_5.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_ed_6.PNG`,
        ],
      },
      {
        title: "V02",
        images: [
          `${import.meta.env.BASE_URL}yute_arp_mas.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_det_1.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_det_2.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_det_3.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_det_4.PNG`,
          `${import.meta.env.BASE_URL}yute_arp_det_5.PNG`,
        ],
      },
    ],
    links: [],
    category: "art",
  },
  {
    id: "manemane-capsule",
    title: "Cápsula MANÉMANÉ Fall 26 — Colección",
    role: "Diseño de Colección · Serie Conceptual",
    year: 2026,
    tags: ["Diseño de Moda"],
    blurb:
      "Propuesta de colección de 10 looks articulada a partir de los códigos conceptuales de Miguel Becer tras su presentación en MBFWM. Desarrollo formal en torno a la ligereza, la deconstrucción y el movimiento a través de la serie de figurines 'Levedad'.",
    image: `${import.meta.env.BASE_URL}Levedad.png`,
    gallery: [
      `${import.meta.env.BASE_URL}Levedad.png`,
    ],
    links: [],
    category: "art",
  },
  {
    id: "manemane-fall26",
    title: "MANÉMANÉ Fall 26 — Pantalón con Aletas",
    role: "Confección en Satén · Patronaje Sastre",
    year: 2026,
    tags: ["Diseño de Moda", "Confección", "Patronaje", "Fotografía"],
    blurb:
      "Pieza central de la cápsula MANÉMANÉ. Confección artesanal de pantalón sastre con aletas y volantes laterales ondulantes integrados en satén bicolor, explorando el volumen escultórico en movimiento.",
    image: `${import.meta.env.BASE_URL}manemane_aletas_1.png`,
    links: [],
    category: "art",
  },
  {
    id: "utopia",
    title: "Utopía — La Piel Especular",
    role: "Investigación Conceptual · Tatuaje sobre Cuero",
    year: 2026,
    tags: ["Diseño de Moda", "Investigación Textil", "Tatuaje sobre Cuero", "Dirección Creativa"],
    blurb:
      "Propuesta de utopía especulativa basada en un nuevo sistema de habitabilidad humana y comunicación radical. Se plantea una sociedad futura donde la mentira y el aislamiento emocional han sido erradicados: los individuos definen su identidad y subconsciente a través de su piel. Mediante patrones simétricos inspirados en las manchas proyectivas del Test de Rorschach, el cuerpo se convierte en un espejo psicológico para el observador. El proyecto abarca la exploración del límite material (terciopelo y linóleo), la experimentación gráfica con acuarela por transferencia directa, la digitalización y análisis óptico interactivo, y la ejecución física final mediante máquina de tatuar y micropunteado sobre cuero.",
    image: `${import.meta.env.BASE_URL}utopia_cover.png`,
    interactivePdf: "utopia_compressed.pdf",
    links: [],
    category: "art",
  },
  {
    id: "re-chulos",
    title: "Re-chulos — Premio al Mejor Proyecto de Upcycling",
    role: "Upcycling · Confección · Moda Sostenible",
    year: 2026,
    tags: ["Pasarela", "Upcycling", "Moda Sostenible", "Confección", "Patronaje"],
    blurb:
      "Primer premio en el certamen 'Re-Chulos' de San Isidro (Madrid) organizado por moda-re-. Reinterpretación del traje castizo madrileño confeccionado al 100% con tres prendas de segunda mano y textiles recuperados, desfilado en pasarela abierta. Incluye entrevista en la revista Circoolar de moda-re-.",
    image: `${import.meta.env.BASE_URL}RECH.jpeg`,
    gallery: [
      `${import.meta.env.BASE_URL}RECH0.jpeg`,
      `${import.meta.env.BASE_URL}RECH1.jpeg`,
      `${import.meta.env.BASE_URL}RECH2.jpeg`,
      `${import.meta.env.BASE_URL}RECH3.jpeg`,
    ],
    links: [
      {
        label: "Entrevista en Circoolar Mag (moda-re-)",
        href: "https://modare.org/magazine/circular/re-chulos-desfile-moda-circular-san-isidro/",
      },
    ],
    category: "art",
  },
  {
    id: "blazer-deconstruccion",
    title: "Deconstrucción de Blazer & Moulage Digital",
    role: "Moulage · Edición Digital · Patronaje",
    year: 2026,
    tags: ["Photoshop", "Diseño de Moda", "Moulage"],
    blurb:
      "Co-diseño junto a Santiago Yáñez. Moulage espontáneo con blazers sobre maniquí y su posterior traslación al formato digital mediante manipulación fotográfica.",
    image: `${import.meta.env.BASE_URL}blazer.png`,
    gallery: [],
    links: [],
    category: "art",
  },
];

function useDebouncedValue(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

// Hook de PDF reutilizable para calcular imágenes y ratio exacto
function usePDFImages(pdfFilename = "PORTFOLIO_compressed.pdf") {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      if (!pdfFilename) {
        setLoading(false);
        return;
      }
      const candidates = [
        `${import.meta.env.BASE_URL}${pdfFilename}`,
        `${import.meta.env.BASE_URL}${pdfFilename.toUpperCase()}`,
        `${import.meta.env.BASE_URL}PORTFOLIO_compressed.pdf`,
      ];

      for (const url of candidates) {
        try {
          const loadingTask = pdfjsLib.getDocument({
            url,
            cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
            cMapPacked: true,
          });
          const pdf = await loadingTask.promise;
          const out = [];

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });
            if (i === 1 && viewport.width && viewport.height) {
              setAspectRatio(viewport.width / viewport.height);
            }
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: ctx, viewport }).promise;
            out.push(canvas.toDataURL("image/webp", 0.95));
          }

          if (!cancelled && out.length > 0) {
            setImages(out);
            setLoading(false);
            return;
          }
        } catch {
          // Continúa buscando candidatos
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [pdfFilename]);

  return { images, loading, aspectRatio };
}

// Componente para renderizar visores PDF continuos interactivos
function PDFViewerContinuous({ filename, altTitle }) {
  const { images, loading, aspectRatio } = usePDFImages(filename);

  return (
    <div
      className="border rounded-2xl bg-white shadow-sm overflow-hidden w-full relative"
      style={{
        aspectRatio: aspectRatio ? `${aspectRatio}` : "16/9",
        maxHeight: "75vh",
      }}
    >
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400 bg-white">
          <Loader2 className="size-6 animate-spin" />
          <span className="text-xs uppercase tracking-wider">Cargando {altTitle || "documento"}...</span>
        </div>
      ) : images.length > 0 ? (
        <div
          className="w-full h-full overflow-y-auto scroll-smooth snap-y snap-mandatory focus:outline-none"
          tabIndex={0}
        >
          {images.map((src, index) => (
            <div
              key={`pdf-page-${index}`}
              className="w-full h-full snap-start snap-always flex items-center justify-center bg-white select-none p-0 overflow-hidden"
            >
              <img
                src={src}
                alt={`Página ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none block"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-zinc-400 bg-white">
          No se ha podido cargar el archivo PDF ({filename}). Comprueba que el archivo se encuentre en la carpeta public.
        </div>
      )}
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

  // Estado para imagen/vídeo activo en el modal
  const [activeMedia, setActiveMedia] = useState({ type: "image", url: "" });

  useEffect(() => {
    if (active) {
      const firstGalleryImg = active.galleries?.[0]?.images?.[0];
      const defaultImg = active.image || firstGalleryImg || (active.gallery && active.gallery[0]) || "";
      setActiveMedia({ type: "image", url: defaultImg });
    }
  }, [active]);

  // Título dinámico en pestaña
  useEffect(() => {
    if (view === "home") document.title = "URA WENYERS · Archive";
    else if (view === "tech") document.title = "URA WENYERS · Data & AI";
    else if (view === "art") document.title = "URA WENYERS · Atelier";
  }, [view]);

  // Selección de categorías por pestaña
  const activeCategories = useMemo(() => {
    return view === "art" ? CATEGORIES_ART : CATEGORIES_TECH;
  }, [view]);

  const CATEGORY_NAMES = useMemo(() => activeCategories.map((c) => c.name), [activeCategories]);
  const dq = useDebouncedValue(q, 250);

  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    setTag("Todas");
    setCategory("Todas");
  }, [view]);

  const filtered = useMemo(() => {
    const norm = (s) => s.toLowerCase();
    const source = view === "home" ? items : items.filter((p) => p.category === view);
    const currentCat = activeCategories.find((c) => c.name === category);
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
  }, [dq, tag, sort, items, view, category, activeCategories]);

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
              className={`h-10 px-4 text-xs font-semibold uppercase tracking-wider ${
                view === "tech" ? "bg-black text-white" : "hover:bg-[hsl(214.3_31.8%_95%)]"
              }`}
            >
              Data &amp; AI
            </button>
            <div className="w-px self-stretch bg-black/80" aria-hidden />
            <button
              onClick={() => {
                setView("art");
              }}
              className={`h-10 px-4 text-xs font-semibold uppercase tracking-wider ${
                view === "art" ? "bg-black text-white" : "hover:bg-[hsl(214.3_31.8%_95%)]"
              }`}
            >
              Atelier
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
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-2">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight"
        >
          {view === "home" && "Ura Wenyers · Dossier"}
          {view === "tech" && "Data Science & Machine Learning"}
          {view === "art" && "Atelier · Moda & Artesanía Técnica"}
        </motion.h1>
        <p className="mt-3 w-full text-[hsl(215_16%_40%)]">
          {view === "home" && <>Creative Technologist | Data Scientist with a Passion for Fashion.</>}
          {view === "tech" && <>Desarrollo de modelos predictivos, interpretabilidad (XAI) y automatización de procesos complejos.</>}
          {view === "art" && <>Construcción técnica, experimentación textil con biomateriales, upcycling y colecciones modulares.</>}
        </p>
      </section>

      {/* === ATELIER: VISOR DE DIAPOSITIVAS ANTES DE LAS SUGGESTED TAGS === */}
      {view === "art" && (
        <section className="max-w-5xl mx-auto px-6 pt-4 pb-4">
          <PDFViewerContinuous filename="PORTFOLIO_compressed.pdf" altTitle="Portfolio" />
        </section>
      )}

      {/* SUGGESTED TAGS */}
      {view !== "home" && (
        <section className="max-w-6xl mx-auto px-6 pt-2 pb-4">
          <div className="flex flex-wrap gap-2">
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
        </section>
      )}

      {/* HOME: CV secciones */}
      {view === "home" && (
        <section className="max-w-6xl mx-auto px-4 py-0 space-y-6">
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
              <div className="font-medium mr-4">Colaboración de diseño - Balteus</div>
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

          <div className="rounded-2xl border p-4 bg-white/70">
            <h2 className="text-lg font-semibold mb-2">Idiomas</h2>
            <ul className="text-sm list-none space-y-1">
              <li><strong>Español:</strong> Nativo</li>
              <li><strong>Inglés:</strong> B2 (Cambridge)</li>
              <li><strong>Francés:</strong> B1 (DELF-EOI)</li>
            </ul>
          </div>

          <div className="rounded-2xl border p-4 bg-white/70">
            <h2 className="text-lg font-semibold mb-2">Descargas</h2>
            <div className="flex flex-wrap gap-2">
              <a href={`${import.meta.env.BASE_URL}CV_mt.pdf`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]" target="_blank" rel="noreferrer"><FileText className="size-4" /> CV (PDF)</a>
              <a href={`${import.meta.env.BASE_URL}CV_mh.pdf`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]" target="_blank" rel="noreferrer"><FileText className="size-4" /> CV in English (PDF)</a>
              <a href={`${import.meta.env.BASE_URL}CV_mx.pdf`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]" target="_blank" rel="noreferrer"><FileText className="size-4" /> CV híbrido (PDF)</a>
              <a href={`${import.meta.env.BASE_URL}PORTFOLIO_compressed.pdf`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)]" target="_blank" rel="noreferrer"><FileText className="size-4" /> Portfolio Moda (PDF)</a>
            </div>
          </div>
        </section>
      )}

      {/* SEARCH BAR + CATEGORÍAS (Para Data & AI y para Atelier) */}
      {view !== "home" && (
        <section className="max-w-6xl mx-auto px-4 pb-2">
          <div className="border rounded-2xl p-4 flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_auto] items-stretch md:items-center bg-white/70">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[hsl(215_16%_40%)]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={view === "art" ? "Buscar por proyecto, técnica o disciplina..." : "Buscar por título, rol o tecnología..."}
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

      {/* GRID PROYECTOS */}
      {view !== "home" && (
        <section id="projects" className="max-w-6xl mx-auto px-4 py-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <p className="text-[hsl(215_16%_40%)]">No se han encontrado proyectos.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((p) => {
                  const totalFotos = p.galleries
                    ? p.galleries.reduce((acc, g) => acc + (g.images?.length || 0), 0)
                    : p.gallery?.length || 0;

                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                    >
                      <article
                        onClick={() => {
                          setActive(p);
                          setOpen(true);
                        }}
                        className="group aspect-square overflow-hidden rounded-2xl border hover:shadow-xl transition-shadow cursor-pointer bg-white/70 flex flex-col"
                      >
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

                          <div className="absolute bottom-2 right-2 flex gap-1 items-center">
                            {p.interactivePdf && (
                              <div className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                <FileText className="size-3" /> PDF Dossier
                              </div>
                            )}
                            {p.videos && p.videos.length > 0 && (
                              <div className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                <VideoIcon className="size-3" /> {p.videos.length} vídeo{p.videos.length > 1 ? "s" : ""}
                              </div>
                            )}
                            {totalFotos > 1 && (
                              <div className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                <ImageIcon className="size-3" /> {totalFotos} fotos
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="h-[55%] p-4 pb-3 grid grid-rows-[auto_auto_1fr_auto] gap-2 min-h-0">
                          <h3
                            className={`font-semibold leading-tight ${
                              p.title.length > 38 ? "text-base line-clamp-3" : "text-lg line-clamp-2"
                            }`}
                          >
                            {p.title}
                          </h3>
                          <div className="text-xs text-[hsl(215_16%_40%)] flex items-center justify-between gap-2 mt-1 flex-none min-w-0">
                            <span className="truncate flex-1 min-w-0">{p.role}</span>
                            <span className="shrink-0 font-medium">{p.year}</span>
                          </div>

                          <p className="mt-2 text-sm text-[hsl(215_16%_28%)] line-clamp-3 flex-none">
                            {p.blurb}
                          </p>

                          <div className="flex flex-wrap gap-1.5 items-center -mb-1">
                            {(p.tags || []).map((t) => {
                              const isActive = tag === t;
                              return (
                                <button
                                  key={t}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTag(isActive ? "Todas" : t);
                                    scrollToProjects();
                                  }}
                                  className={`rounded-2xl border px-2.5 py-0.5 text-xs ${
                                    isActive ? "bg-black text-white" : "bg-white hover:shadow"
                                  }`}
                                >
                                  {t}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* MODAL DETALLES MULTIMEDIA (PDF INTERACTIVO, VÍDEOS, GALERÍAS) */}
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
                <div className="p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
                  <div>
                    <h2 id="project-title" className="text-xl font-semibold">{active.title}</h2>
                    <div className="text-xs text-[hsl(215_16%_40%)] flex gap-2 mt-1">
                      <span>{active.role}</span>
                      <span>•</span>
                      <span>{active.year}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto space-y-4">
                  {/* Visor interactivo si el proyecto es un Dossier PDF (como Utopía) */}
                  {active.interactivePdf ? (
                    <div className="w-full pt-1">
                      <PDFViewerContinuous filename={active.interactivePdf} altTitle={active.title} />
                    </div>
                  ) : (
                    /* Visor estándar para Imagen o Vídeo */
                    <div className="rounded-xl overflow-hidden ring-1 ring-[hsl(214.3_31.8%_91.4%)] bg-zinc-50 flex items-center justify-center p-1">
                      {activeMedia.type === "video" ? (
                        <video
                          key={activeMedia.url}
                          controls
                          autoPlay
                          className="w-full h-auto max-h-[52vh] rounded-lg shadow-sm bg-black"
                        >
                          <source src={activeMedia.url} type="video/mp4" />
                          Tu navegador no soporta el reproductor de vídeo.
                        </video>
                      ) : (
                        activeMedia.url && (
                          <img
                            src={activeMedia.url}
                            alt={active.title}
                            className="w-full h-auto max-h-[52vh] object-contain mx-auto rounded-lg shadow-sm"
                            loading="lazy"
                          />
                        )
                      )}
                    </div>
                  )}

                  {/* Sección de Vídeos si existen */}
                  {active.videos && active.videos.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 block border-b pb-1">
                        Contenido Audiovisual
                      </span>
                      <div className="flex gap-2">
                        {active.videos.map((vid, vIdx) => {
                          const isPlaying = activeMedia.type === "video" && activeMedia.url === vid.url;
                          return (
                            <button
                              key={vIdx}
                              onClick={() => setActiveMedia({ type: "video", url: vid.url })}
                              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                                isPlaying
                                  ? "bg-black text-white border-black shadow-md"
                                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200"
                              }`}
                            >
                              <Play className="size-3.5 fill-current" />
                              {vid.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Múltiples Galerías divididas por títulos */}
                  {active.galleries && active.galleries.length > 0 && (
                    <div className="space-y-4 pt-1">
                      {active.galleries.map((sec, secIdx) => (
                        <div key={secIdx} className="space-y-2">
                          <div className="flex items-center justify-between border-b pb-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                              {sec.title}
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {sec.images.length} fotos
                            </span>
                          </div>

                          <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
                            {sec.images.map((imgUrl, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() => setActiveMedia({ type: "image", url: imgUrl })}
                                className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                  activeMedia.type === "image" && activeMedia.url === imgUrl
                                    ? "border-black scale-95 shadow-md ring-2 ring-black/10"
                                    : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                              >
                                <img
                                  src={imgUrl}
                                  alt={`${sec.title} ${imgIdx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Galería simple (si no es PDF interactivo) */}
                  {!active.interactivePdf && !active.galleries && active.gallery && active.gallery.length > 1 && (
                    <div>
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                        {active.id === "greenwalk-awards" ? "Lookbook Editorial" : "Galería del proyecto"}
                      </span>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {active.gallery.map((imgUrl, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveMedia({ type: "image", url: imgUrl })}
                            className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              activeMedia.type === "image" && activeMedia.url === imgUrl
                                ? "border-black scale-95 shadow-md"
                                : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-sm leading-relaxed text-zinc-800">{active.blurb}</p>

                  {/* Enlace para ver/descargar PDF si existe y no es ya interactivo */}
                  {active.pdf && (
                    <div className="pt-2">
                      <a
                        href={active.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900 text-white px-3.5 py-2 text-xs font-medium hover:bg-black transition-colors"
                      >
                        <FileText className="size-4" /> {active.id === "greenwalk-awards" ? "Ver Entrega Final (PDF)" : "Ver dossier completo (PDF)"}
                      </a>
                    </div>
                  )}

                  {(active.tags?.length ?? 0) > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
                      {active.tags.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setOpen(false);
                            setTag(t);
                            scrollToProjects();
                          }}
                          className="rounded-xl border px-2.5 py-0.5 text-xs bg-white hover:shadow"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between gap-4 border-t border-zinc-100">
                    <div className="flex flex-wrap gap-2">
                      {(active.links?.length ?? 0) > 0 &&
                        active.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-[hsl(214.3_31.8%_95%)] text-xs"
                          >
                            <ExternalLink className="size-3.5" />
                            {l.label}
                          </a>
                        ))}
                    </div>

                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-2xl border px-4 py-2 hover:bg-[hsl(214.3_31.8%_95%)] text-xs font-medium ml-auto"
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
            <div className="font-semibold tracking-tight">Ura Wenyers</div>
            <div className="text-sm text-[hsl(215_16%_40%)]">Atelier &amp; Data Studio · Madrid</div>
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