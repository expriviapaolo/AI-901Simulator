// ============================================================================
// FILE DI CONFIGURAZIONE DELLA CERTIFICAZIONE
// ============================================================================
// Per adattare questa pagina a un'altra certificazione, modifica SOLO questo
// file e "exam-questions.js" (che contiene le domande). Non serve toccare
// AI901-Quiz-Web.html.
// ============================================================================
const SETTINGS = {
  "passingScore": 700,
  "maxScore": 1000,
  "availableQuestionCounts": [10, 30, 50, 70, 100],

  "certificationName": "AI-901 Exam Simulator",
  "certificationSubtitle": "Microsoft Azure AI Fundamentals \u00b7 versione web",
  "examCode": "AI-901",

  // Testo mostrato in fondo alla Home, dopo il conteggio automatico delle domande
  // (es. "484 domande disponibili \u00b7 <datasetNote>"). Aggiornalo quando cambi il dataset.
  "datasetNote": "generato il 01/09/2026, aggiornato il 17/09/2026",

  // Consiglio di studio mostrato in Home in una card sotto "Il tuo percorso".
  // Facoltativo: se "studyTip" viene rimosso o lasciato null, la card non viene mostrata.
  // "items" \u00e8 un elenco di associazioni "termine -> significato" mostrate come lista puntata.
  "studyTip": {
    "title": "Consiglio di studio",
    "intro": "Se impari ad associare rapidamente:",
    "items": [
      { "term": "Vision", "meaning": "immagini" },
      { "term": "Speech", "meaning": "audio" },
      { "term": "Language", "meaning": "testo" },
      { "term": "Content Understanding", "meaning": "documenti" },
      { "term": "OpenAI", "meaning": "generazione contenuti" },
      { "term": "RAG/Grounding", "meaning": "risposte basate su documenti" }
    ],
    "conclusion": "hai gi\u00e0 eliminato gran parte delle risposte sbagliate."
  }
};

