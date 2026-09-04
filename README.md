# AI-901 Quiz Web (versione mobile)

Pagina HTML autosufficiente (nessuna connessione internet richiesta dopo l'apertura, nessuna installazione) che replica in versione ridotta il simulatore AI-901 desktop, pensata per essere usata da smartphone Android tramite l'app OneDrive.

**File principale:** `AI901-Quiz-Web.html` — apri semplicemente questo file (insieme agli altri file di questa cartella, che deve restare sincronizzata) con un browser (Chrome, ecc.) da telefono: dato che si trova in questa cartella sincronizzata con OneDrive, basta aprirlo dall'app OneDrive su Android (tocca il file → "Apri con" → browser) oppure scaricare l'intera cartella sul telefono e aprirlo dai File.

## Architettura a 3 file (dalla versione del 03/09/2026)

Per poter adattare il quiz ad altre certificazioni senza toccare il motore della pagina, i contenuti sono ora divisi in 3 file, che devono sempre restare nella stessa cartella:

- **`AI901-Quiz-Web.html`** — il "motore": logica del quiz, grafica, storico, ripasso, download offline, installazione come app. Non contiene più domande o dati fissi della certificazione: NON va modificato per cambiare certificazione.
- **`exam-config.js`** — dati fissi della certificazione (nome, sottotitolo, codice esame, punteggio minimo/massimo, numeri di domande selezionabili, nota sul dataset mostrata in fondo alla Home).
- **`exam-questions.js`** — tutte le domande, risposte, spiegazioni ed eventuali immagini (incorporate come base64 nello stesso file).

**Per adattare la pagina a un'altra certificazione basta sostituire il contenuto di questi ultimi 2 file**, mantenendo la struttura JavaScript che hanno ora (vedi sotto). L'HTML principale li carica con due tag `<script src="exam-config.js">` e `<script src="exam-questions.js">` all'inizio della pagina, quindi funziona anche da file locale (OneDrive) e non solo online.

### Struttura di `exam-config.js`

```js
const SETTINGS = {
  "passingScore": 700,              // punteggio minimo per superare (scala 0-maxScore)
  "maxScore": 1000,                 // punteggio massimo
  "availableQuestionCounts": [10, 30, 50, 70, 100],  // scelte proposte nella Home

  "certificationName": "AI-901 Exam Simulator",       // titolo mostrato in alto e nel tab del browser
  "certificationSubtitle": "Microsoft Azure AI Fundamentals · versione web",  // sottotitolo sotto il titolo
  "examCode": "AI-901",             // non ancora mostrato in pagina, riservato per usi futuri

  "datasetNote": "generato il 01/09/2026, aggiornato il 03/09/2026"  // testo libero mostrato in fondo alla Home dopo il conteggio domande
};
```

### Struttura di `exam-questions.js`

```js
const QUESTIONS = [ /* array di oggetti domanda, stesso schema già usato: testo IT/EN, opzioni IT/EN, risposta/e corretta/e, spiegazione IT/EN, eventuale link "Fonte:", eventuale riferimento a un'immagine */ ];
const IMAGES = { /* mappa "nomeImmagine": "data:image/...;base64,..." per le domande che referenziano un'immagine */ };
```

Lo schema interno delle domande non è cambiato rispetto alla versione precedente (stesso formato usato finora per le 484 domande AI-901): per una nuova certificazione basta generare un file con lo stesso schema ma contenuti diversi.

**Nota:** l'icona e il nome dell'app installata (vedi sezione PWA più sotto) restano fissi in `manifest.webmanifest` e nei file icona — quelli, a differenza dei 2 file dati, vanno modificati a mano per ogni nuova certificazione se si vuole un'icona/nome diversi.

## Cosa include

- Tutte le 484 domande correnti (in `exam-questions.js`), quindi funziona anche offline.
- Testo della domanda e delle risposte mostrato **sempre in inglese e italiano insieme**, senza bisogno di premere un pulsante di traduzione.
- **Selettore lingua principale** (bottoni 🇮🇹 Italiano / 🇬🇧 English in alto): sceglie quale delle due lingue viene mostrata più grande e in evidenza in domande, risposte e spiegazioni (l'altra resta visibile ma più piccola e attenuata). La scelta è salvata in `localStorage` (`ai901_primary_lang`) e viene ricordata alle visite successive.
- **Controllo dimensione testo** (bottoni "A−" / "A+" in alto): ingrandisce o rimpicciolisce tutti i caratteri della pagina in 5 passi. La scelta è salvata in `localStorage` (`ai901_font_scale`) e viene ricordata alle visite successive.
- Due modalità, selezionabili nella schermata iniziale:
  - **Allenamento** — dopo ogni risposta vedi subito se è corretta e la spiegazione (con link "Fonte:" alla documentazione Microsoft Learn).
  - **Simulazione** — nessun riscontro durante il test; risposte, punteggio e spiegazioni compaiono solo alla fine.
- Scelta del numero di domande (10/30/50/70/100), estratte casualmente ad ogni test dal totale disponibile.
- Domande a scelta singola e a scelta multipla (checkbox + pulsante "Conferma risposta"), gestite come nell'app desktop.
- Pulsante "Termina" per chiudere il test in anticipo (le domande senza risposta contano come errate).
- Punteggio finale in scala 0-1000 con soglia di superamento a 700 (configurabile in `exam-config.js`).
- Schermata "Rivedi risposte" con ogni domanda, la tua risposta, quella corretta e la spiegazione.
- **Storico risultati** (dalla Home), ora in formato **tabella** (con scorrimento orizzontale su schermi stretti): data/ora, domande, corrette, errate, punteggio, durata, media per risposta, esito, più le statistiche aggregate (test effettuati, miglior punteggio, punteggio medio, % superati). Salvato in `localStorage`, quindi persiste tra una sessione e l'altra sullo stesso browser/dispositivo (non sincronizzato altrove). Un test terminato in anticipo con "Termina" NON viene salvato nello storico.
- **Ripasso mirato** delle domande sbagliate (dalla Home, pulsante "Domande in ripasso" e pulsante "Solo ripasso" accanto al numero di domande): le domande sbagliate vengono riproposte con probabilità 4 volte maggiore nei test successivi, finché non vengono risposte correttamente 5 volte di fila. Stato salvato in `localStorage`. Il pulsante "Solo ripasso" avvia subito un test con tutte le domande attualmente in ripasso, nella modalità selezionata.
- **Responsive**: la pagina, la barra dei pulsanti in alto e la tabella dello storico si adattano a schermi stretti (telefono in verticale) senza scorrimento orizzontale indesiderato della pagina.
- **Scaricabile e installabile per l'uso offline** (pulsanti in fondo alla Home):
  - "Scarica questa pagina" genera e scarica subito una copia identica e funzionante del file, **completamente autosufficiente** (i dati di `exam-config.js`/`exam-questions.js` vengono incorporati automaticamente nel file scaricato, che quindi funziona da solo anche separato dal resto della cartella).
  - "Installa come app" (visibile solo su Android/Chrome quando la pagina è aperta dall'URL online, non dal file locale) installa la pagina come una vera app con icona propria, senza barra del browser, e con una cache che la rende disponibile offline anche riaprendola da zero (tramite un service worker: file `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` in questa stessa cartella). Su iPhone/iOS si usa invece "Condividi" → "Aggiungi alla schermata Home" dal menu di Safari (l'icona personalizzata funziona comunque, il prompt automatico "Installa come app" no perché iOS non supporta quell'API).

## Cosa NON include (limiti noti di questa versione rapida)

- Il selettore di lingua principale cambia solo l'enfasi visiva (dimensione/peso) di domande, risposte e spiegazioni: il resto dell'interfaccia (titoli, pulsanti, schermate, Storico, Ripasso) resta sempre in italiano.
- Nessuna immagine oltre a quella già presente nel dataset (una sola domanda ne ha una, incorporata automaticamente).
- Storico e ripasso usano solo `localStorage` del browser (non `sessionStorage`, e non un account/cloud): sono legati al dispositivo e al browser con cui si usa la pagina. Cambiare browser, usare la modalità privata, o cancellare i dati di navigazione del sito azzera storico, progresso di ripasso, lingua principale e dimensione testo scelte. Nessun limite artificiale sul numero di risultati salvati (il limite pratico è la quota di `localStorage` del browser, tipicamente 5-10 MB, sufficiente per molte migliaia di test).
- L'icona "vera" personalizzata e la cache offline via service worker funzionano solo aprendo la pagina dall'**URL online** (es. GitHub Pages, servito via https). Aprendo il file locale (da OneDrive o scaricato) l'eventuale scorciatoia in schermata Home resta quella generica del browser — ma lì l'offline funziona comunque banalmente, perché tutti i file sono già sul telefono.

## File di questa cartella

- `AI901-Quiz-Web.html` — il motore del quiz (grafica, logica, storico, ripasso, download, installazione). Da solo non basta: servono anche i 2 file dati qui sotto nella stessa cartella.
- `exam-config.js` — dati fissi della certificazione (titolo, punteggi, numeri di domande, nota dataset). Modificalo per adattare la pagina a un'altra certificazione.
- `exam-questions.js` — domande, risposte, spiegazioni e immagini. Modificalo per adattare la pagina a un'altra certificazione.
- `README.md` — questo file.
- `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — usati solo quando la pagina è servita online (es. GitHub Pages) per abilitare l'installazione come app con icona propria e la cache offline. Se pubblichi di nuovo la pagina online (es. dopo un aggiornamento), ricordati di caricare anche questi file oltre a `AI901-Quiz-Web.html`, `exam-config.js` ed `exam-questions.js`, altrimenti l'installazione "come app" non funziona (la pagina normale continua comunque a funzionare). Nota tecnica: `sw.js` elenca esplicitamente i file da mettere in cache (incluso i 2 file dati) — se in futuro si aggiungono altri file da servire offline via PWA, vanno aggiunti anche lì.

## Come aggiornarla in futuro

Il contenuto di `exam-questions.js` è una **fotografia** delle domande al momento della generazione (ultimo aggiornamento: 03/09/2026, 484 domande). Se in futuro vengono aggiunte nuove domande in `Data/questions.json` dell'app desktop, questo file non si aggiorna da solo: va rigenerato (basta richiedere una nuova generazione, il procedimento è lo stesso già usato — nessuna modifica viene fatta all'app desktop né al suo `questions.json` in questo processo, questa cartella resta un progetto completamente separato). `AI901-Quiz-Web.html` invece non ha più bisogno di essere rigenerato per un semplice aggiornamento delle domande: basta sostituire `exam-questions.js` (e, se necessario, `exam-config.js`).
