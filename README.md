# AI-901 Quiz Web (versione mobile)

Pagina HTML unica e autosufficiente (nessuna connessione internet richiesta dopo l'apertura, nessuna installazione) che replica in versione ridotta il simulatore AI-901 desktop, pensata per essere usata da smartphone Android tramite l'app OneDrive.

**File:** `AI901-Quiz-Web.html` — apri semplicemente questo file con un browser (Chrome, ecc.) da telefono: dato che si trova in questa cartella sincronizzata con OneDrive, basta aprirlo dall'app OneDrive su Android (tocca il file → "Apri con" → browser) oppure scaricarlo sul telefono e aprirlo dai File.

## Cosa include

- Tutte le 484 domande correnti di `Data/questions.json` dell'app desktop (incorporate direttamente nel file, quindi funziona anche offline).
- Testo della domanda e delle risposte mostrato **sempre in inglese e italiano insieme**, senza bisogno di premere un pulsante di traduzione.
- Due modalità, selezionabili nella schermata iniziale:
  - **Allenamento** — dopo ogni risposta vedi subito se è corretta e la spiegazione (con link "Fonte:" alla documentazione Microsoft Learn).
  - **Simulazione** — nessun riscontro durante il test; risposte, punteggio e spiegazioni compaiono solo alla fine.
- Scelta del numero di domande (10/30/50/70/100), estratte casualmente ad ogni test dal totale disponibile.
- Domande a scelta singola e a scelta multipla (checkbox + pulsante "Conferma risposta"), gestite come nell'app desktop.
- Pulsante "Termina" per chiudere il test in anticipo (le domande senza risposta contano come errate).
- Punteggio finale in scala 0-1000 con soglia di superamento a 700, come nell'app desktop (`Data/settings.json`).
- Schermata "Rivedi risposte" con ogni domanda, la tua risposta, quella corretta e la spiegazione.
- **Storico risultati** (dalla Home): stessi dati dell'app desktop (data/ora, domande, corrette, errate, punteggio, durata, media per risposta, esito) più le statistiche aggregate (test effettuati, miglior punteggio, punteggio medio, % superati). Salvato in `localStorage`, quindi persiste tra una sessione e l'altra sullo stesso browser/dispositivo (non sincronizzato altrove). Un test terminato in anticipo con "Termina" NON viene salvato nello storico, stessa regola dell'app desktop.
- **Ripasso mirato** delle domande sbagliate (dalla Home, pulsante "Domande in ripasso" e pulsante "Solo ripasso" accanto al numero di domande): le domande sbagliate vengono riproposte con probabilità 4 volte maggiore nei test successivi, finché non vengono risposte correttamente 5 volte di fila. Stato salvato in `localStorage`. Il pulsante "Solo ripasso" avvia subito un test con tutte le domande attualmente in ripasso, nella modalità selezionata.

- **Scaricabile e installabile per l'uso offline** (pulsanti in fondo alla Home):
  - "Scarica questa pagina" genera e scarica subito una copia identica e funzionante del file (utile per avere una copia locale sul telefono, oltre a quella già sincronizzata via OneDrive).
  - "Installa come app" (visibile solo su Android/Chrome quando la pagina è aperta dall'URL online, non dal file locale) installa la pagina come una vera app con icona propria, senza barra del browser, e con una cache che la rende disponibile offline anche riaprendola da zero (tramite un service worker: file `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` in questa stessa cartella). Su iPhone/iOS si usa invece "Condividi" → "Aggiungi alla schermata Home" dal menu di Safari (l'icona personalizzata funziona comunque, il prompt automatico "Installa come app" no perché iOS non supporta quell'API).

## Cosa NON include (limiti noti di questa versione rapida)

- Nessuna immagine oltre a quella già presente nel dataset (una sola domanda ne ha una, incorporata automaticamente).
- Storico e ripasso usano solo `localStorage` del browser (non `sessionStorage`, e non un account/cloud): sono legati al dispositivo e al browser con cui si usa la pagina. Cambiare browser, usare la modalità privata, o cancellare i dati di navigazione del sito azzera storico e progresso di ripasso. Nessun limite artificiale sul numero di risultati salvati (il limite pratico è la quota di `localStorage` del browser, tipicamente 5-10 MB, sufficiente per molte migliaia di test).
- L'icona "vera" personalizzata e la cache offline via service worker funzionano solo aprendo la pagina dall'**URL online** (es. GitHub Pages, servito via https). Aprendo il file locale (da OneDrive o scaricato) l'eventuale scorciatoia in schermata Home resta quella generica del browser — ma lì l'offline funziona comunque banalmente, perché il file è già tutto sul telefono.

## File di questa cartella

- `AI901-Quiz-Web.html` — la pagina del quiz (unico file necessario per aprirla come file locale).
- `README.md` — questo file.
- `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — usati solo quando la pagina è servita online (es. GitHub Pages) per abilitare l'installazione come app con icona propria e la cache offline. Se pubblichi di nuovo la pagina online (es. dopo un aggiornamento), ricordati di caricare anche questi 5 file oltre all'HTML, altrimenti l'installazione "come app" non funziona (la pagina normale continua comunque a funzionare).

## Come aggiornarla in futuro

Questo file è una **fotografia** delle domande al momento della generazione (ultimo aggiornamento: 03/09/2026, 484 domande). Se in futuro vengono aggiunte nuove domande in `Data/questions.json` dell'app desktop, questo file HTML non si aggiorna da solo: va rigenerato (basta richiedere una nuova generazione, il procedimento è lo stesso già usato — nessuna modifica viene fatta all'app desktop né al suo `questions.json` in questo processo, il file HTML resta un progetto completamente separato in questa cartella).
