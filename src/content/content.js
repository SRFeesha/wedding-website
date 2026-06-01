export const defaultLocale = "it"
export const locales = ["it", "en"]

const mapsUrl = "https://maps.app.goo.gl/efKxntkWJ2yPQznZ8"

export const content = {
  it: {
    heroEyebrow: "Siete invitati a festeggiare il matrimonio di",
    dateLabel: "Domenica 27 settembre 2026",
    locationEyebrow: "Dove",
    mapsUrl,
    rsvp: {
      title: "RSVP",
      deadline: "Per favore rispondi entro il 31 luglio 2026",
      namePlaceholder: "Nome completo",
      nameLabel: "Nome completo",
      guestLabel: "Ospite",
      attendanceLabel: "Verrai al matrimonio?",
      attendanceYes: "Ci sarò!",
      attendanceNo: "Non posso",
      dietaryLabel: "Preferenze alimentari",
      dietaryOptions: [
        "Mangio tutto",
        "Vegetariano",
        "Vegano",
        "Senza glutine",
        "Lascia una nota (allergie, intolleranze, altro)",
      ],
      dietaryNoteLabel: "Nota",
      dietaryNotePlaceholder:
        "Es. intolleranza al lattosio, allergia alle noci…",
      addGuestLabel: "Aggiungi un'altra persona",
      removeGuestLabel: "Rimuovi",
      ageGroupLabel: "Fascia d'età",
      ageGroupOptions: [
        {
          value: "adult",
          label: "Adulto",
          sublabel: "12+ anni · Tavolo principale, menu completo",
        },
        {
          value: "kid",
          label: "Bambino",
          sublabel: "2–12 anni · Spazio giochi, animazione e menu dedicato",
        },
        {
          value: "baby",
          label: "Bimbo",
          sublabel: "0–2 anni · Viene, è piccolo, è adorabile",
        },
      ],
      babySeatingLabel: "Dove preferisci che stia il bimbo?",
      babySeatingOptions: [
        {
          value: "table",
          label: "Con me al tavolo",
          sublabel: "Aggiungiamo una sedia extra e un seggiolino",
        },
        {
          value: "nanny",
          label: "Nello spazio bimbi",
          sublabel: "Ci pensiamo noi — c'è una tata dedicata",
        },
      ],
      messageLabel: "Messaggio per gli sposi",
      messagePlaceholder:
        "Hai qualcosa da dire a Sara e Ben? Questo è il posto giusto.",
      dietaryOtherValue: "Lascia una nota (allergie, intolleranze, altro)",
      submitLabel: "Invia",
      submittingLabel: "Invio…",
      successAttending: "Non vediamo l'ora di vederti in Sicilia!",
      successDecline: "Ci mancherai ❤️",
      successAttendingBody:
        "Abbiamo creato un gruppo WhatsApp con gli altri ospiti — ottimo per organizzare i viaggi, trovare compagnia per il tragitto o semplicemente presentarsi prima del grande giorno. Se hai bisogno di aiuto con l'alloggio o per arrivare, scrivici pure.",
      successDeclineBody: null,
      errorMsg: "Qualcosa è andato storto. Riprova o contattaci direttamente.",
      validationName: "Per favore inserisci il tuo nome.",
      validationAttendance: "Per favore facci sapere se ci sarai.",
      validationGuestName: "Per favore inserisci il nome dell'ospite.",
      validationSummaryTitle: "Prima di inviare, controlla questi campi:",
    },
    addToCalendarLabel: "Aggiungi al calendario",
    calEventTitle: "🌋💍 Matrimonio Sara & Ben",
    calEventDescription:
      "Il giorno del matrimonio di Sara & Ben — Tenuta Savoca, Piazza Armerina.",
    calEventLocation: "Tenuta Savoca, Piazza Armerina, Sicilia, Italia",
    ibanLabel: "IBAN",
    copyIban: "Copia IBAN",
    copiedIban: "Copiato!",
    beneficiaryLabel: "Beneficiari",
    beneficiaryName: "Beniamino Marini & Sara Tavakoli Fard",
    ibanNumber: "DE71 1001 0178 1814 7799 50",
    faqTitle: "Info",
    faqList: [
      {
        q: "Come arrivare",
        blocks: [
          { type: "text", value: "Piazza Armerina vale già da sola il viaggio: un bellissimo borgo medievale nel cuore della Sicilia, a 700 metri sul livello del mare. La location si trova a circa 5km dal centro, a 1h30 da Catania e a 2h30 da Palermo. Vi consigliamo di arrivare il giorno prima per esplorare il borgo con calma." },
          { type: "text", value: "Potete anche arrivare in autobus — mi raccomando però il giorno prima ;) Le fermate sono a pochi minuti a piedi dal G.H. Hotel: SAIS Autolinee (da Palermo) e Etna Trasporti (da Catania)." },
          { type: "text", value: "Se avete difficoltà a raggiungere il posto scriveteci — troveremo una soluzione insieme" },
        ],
        ctas: [
          { label: "Apri Google Maps", url: mapsUrl },
        ],
      },
      {
        q: "Dove dormire",
        blocks: [
          { type: "text", parts: ["Abbiamo tariffe agevolate con il ", { text: "G.H. Hotel", href: "https://maps.app.goo.gl/HG99EGFef7Co1pT76" }, " — un posto tranquillo, a pochi minuti a piedi dalla fermata del bus. I prezzi confermati sono:"] },
          { type: "list", items: ["Singola: €50", "DUS (doppia uso singola): €55", "Matrimoniale/Doppia: €70", "Tripla: €90", "Quadrupla: €100"] },
          { type: "text", value: "Per ottenere la tariffa agevolata, scrivete una email al G.H. Hotel specificando che è per il matrimonio “LaMuse”." },
          { type: "text", value: "Per gli ospiti del G.H. Hotel ci sarà una navetta dalla Tenuta Savoca all'hotel a fine serata." },
          { type: "spacer" },
          { type: "text", value: "Se volete dormire direttamente alla Tenuta Savoca, ci sono alcune camere disponibili in struttura:" },
          { type: "list", items: ["Doppia: €140", "Tripla: €190", "Quadrupla: €225"] },
          { type: "text", value: "Per prenotare scriveteci direttamente: possiamo coordinare con la struttura. Se ci sono camere libere, può essere anche una scelta last minute." },
          { type: "text", value: "Se preferite organizzarvi in autonomia, Piazza Armerina ha tanti bei B&B, Airbnb e hotel tra cui scegliere." },
        ],
      },
      {
        q: "Programma",
        blocks: [
          { type: "list", items: ["La cerimonia inizierà intorno alle 15:00", "Seguiranno aperitivo e cena all'aperto (speriamo 🤞)", "La festa finirà intorno alle 2:00"] },
          { type: "text", parts: ["Presto altri aggiornamenti. Restate in contatto tramite il ", { text: "gruppo WhatsApp", href: "https://chat.whatsapp.com/HKQWLGYdniv8btV1Utv03y?mode=gi_t" }, "."] },
        ],
      },
      {
        q: "Resta aggiornato",
        a: [
          "Unitevi al gruppo WhatsApp per restare aggiornati su tutto quello che riguarda il matrimonio. Solo gli admin possono scrivere, quindi niente spam — solo le informazioni che vi servono davvero. Vi consigliamo di unirvi per non perdervi niente.",
        ],
        ctas: [
          { label: "Unisciti al gruppo WhatsApp", url: "https://chat.whatsapp.com/HKQWLGYdniv8btV1Utv03y?mode=gi_t" },
        ],
      },
      {
        q: "Dresscode",
        items: [
          { parts: ["Eleganti, ma ", { text: "Patagonia", strikethrough: true }, " senza perdere di vista il vostro stile"] },
          "I toni caldi e terrosi si sposano perfettamente con la stagione e il luogo",
          "Il prato potrebbe mettere a dura prova i tacchi a spillo. Pensateci bene prima di essere temerari",
          "Le serate di settembre in Sicilia possono sorprendere. Una giacchettina leggera non guasta",
          "Il bianco è della sposa :)",
        ],
      },
      {
        q: "Posso portare un ospite?",
        a: "Per questioni di capienza, possiamo ospitare solo le persone che abbiamo invitato personalmente. È una questione di numeri, non di quanto vi vogliamo bene. Grazie per la comprensione.",
      },
      {
        q: "Regali",
        a: "Il regalo più bello è poter condividere questo importante momento con voi. Se tuttavia desiderate farci un dono, ecco i nostri dettagli:",
        iban: true,
      },
    ],
  },
  en: {
    heroEyebrow: "You are invited to celebrate the wedding of",
    dateLabel: "Sunday, September 27, 2026",
    locationEyebrow: "Where",
    locationSubtitle: "Piazza Armerina, Sicily",
    mapsUrl,
    rsvp: {
      title: "RSVP",
      deadline: "Please respond by July 31, 2026",
      namePlaceholder: "Full name",
      nameLabel: "Full name",
      guestLabel: "Guest",
      attendanceLabel: "Will you be joining us?",
      attendanceYes: "I'll be there",
      attendanceNo: "Can't make it",
      dietaryLabel: "Dietary preferences",
      dietaryOptions: [
        "I eat everything",
        "Vegetarian",
        "Vegan",
        "Gluten-free",
        "Leave a note (allergies, intolerances, other)",
      ],
      dietaryNoteLabel: "Note",
      dietaryNotePlaceholder: "E.g. lactose intolerant, nut allergy…",
      addGuestLabel: "Add another person",
      removeGuestLabel: "Remove",
      ageGroupLabel: "Age group",
      ageGroupOptions: [
        {
          value: "adult",
          label: "Adult",
          sublabel: "12+ · Main tables, full menu",
        },
        {
          value: "kid",
          label: "Kid",
          sublabel: "2–12 · Play space, activities & special menu",
        },
        {
          value: "baby",
          label: "Baby",
          sublabel: "0–2 · Just here to be cute",
        },
      ],
      babySeatingLabel: "Where would you like baby to be?",
      babySeatingOptions: [
        {
          value: "table",
          label: "At the table with me",
          sublabel: "We'll add an extra chair and a highchair",
        },
        {
          value: "nanny",
          label: "In the baby space",
          sublabel: "We'll take care of them — there's a dedicated nanny",
        },
      ],
      messageLabel: "Message for the grooms",
      messagePlaceholder:
        "Got something to tell Sara & Ben? This is the place.",
      dietaryOtherValue: "Leave a note (allergies, intolerances, other)",
      submitLabel: "Send",
      submittingLabel: "Sending…",
      successAttending: "We can't wait to see you in Sicily!",
      successDecline: "We'll miss you ❤️",
      successAttendingBody:
        "We've set up a WhatsApp group with the other guests — great for coordinating travel, finding company for the journey, or just saying hello before the big day. If you need any help with accommodation or getting there, don't hesitate to reach out.",
      successDeclineBody: "",
      errorMsg:
        "Something went wrong. Please try again or contact us directly.",
      validationName: "Please enter your name.",
      validationAttendance: "Please let us know if you'll be joining us.",
      validationGuestName: "Please enter the guest's name.",
      validationSummaryTitle: "Please review the following before sending:",
    },
    addToCalendarLabel: "Add to calendar",
    calEventTitle: "🌋💍 Sara & Ben Wedding",
    calEventDescription:
      "Sara & Ben's wedding day — Tenuta Savoca, Piazza Armerina.",
    calEventLocation: "Tenuta Savoca, Piazza Armerina, Sicily, Italy",
    ibanLabel: "IBAN",
    copyIban: "Copy IBAN",
    copiedIban: "Copied!",
    beneficiaryLabel: "Beneficiary",
    beneficiaryName: "Beniamino Marini & Sara Tavakoli Fard",
    ibanNumber: "DE71 1001 0178 1814 7799 50",
    faqTitle: "The details",
    faqList: [
      {
        q: "Getting there",
        blocks: [
          { type: "text", value: "Piazza Armerina is worth the trip on its own: it's a beautiful medieval borgo in the heart of Sicily sitting at 700 metres above sea level. The venue is around 5km from the town centre, about 1h30 from Catania and 2h30 from Palermo. We recommend arriving the day before to explore the town at your own pace." },
          { type: "text", value: "You can also get to Piazza Armerina by bus — just make sure to arrive the day before, lol. The stops are a short walk from the G.H. Hotel: SAIS Autolinee (from Palermo) and Etna Trasporti (from Catania)." },
          { type: "text", value: "If you're having trouble getting there, just reach out — we'll figure something out together ;)" },
        ],
        ctas: [
          { label: "Open in Google Maps", url: mapsUrl },
        ],
      },
      {
        q: "Where to stay",
        blocks: [
          { type: "text", parts: ["We have preferential rates at ", { text: "G.H. Hotel", href: "https://maps.app.goo.gl/HG99EGFef7Co1pT76" }, " — a relaxed, no-fuss spot a short walk from the bus stop. Confirmed prices are:"] },
          { type: "list", items: ["Single: €50", "DUS (single occupancy double): €55", "Double: €70", "Triple: €90", "Quad: €100"] },
          { type: "text", value: "To get this preferential rate, you'll need to send an email to the G.H. Hotel mentioning that it's for the 'matrimonio LaMuse'." },
          { type: "text", value: "G.H. Hotel guests will have a shuttle from Tenuta Savoca back to the hotel at the end of the evening." },
          { type: "spacer" },
          { type: "text", value: "If you'd like to stay at Tenuta Savoca itself, there are also a few rooms available on site:" },
          { type: "list", items: ["Double: €140", "Triple: €190", "Quad: €225"] },
          { type: "text", value: "To book, just get in touch with us directly — we'll coordinate with the venue. If rooms are still available, it can even be a last-minute decision." },
          { type: "text", value: "If you'd rather sort your own accommodation, Piazza Armerina has plenty of nice Airbnbs and hotels to choose from." },
        ],
      },
      {
        q: "The plan",
        blocks: [
          { type: "list", items: ["The ceremony will start around 3:00 p.m.", "There will be an aperitivo and a dinner outside (hopefully 🤞)", "The party will wrap up around 2:00 a.m."] },
          { type: "text", parts: ["More updates soon — stay in touch via the ", { text: "WhatsApp group", href: "https://chat.whatsapp.com/HKQWLGYdniv8btV1Utv03y?mode=gi_t" }, "."] },
        ],
      },
      {
        q: "Stay updated",
        a: [
          "Join our WhatsApp group to stay up to date with everything wedding-related. Only the admins can post, so no spam — just the information you actually need. We recommend joining so you don't miss a thing.",
        ],
        ctas: [
          { label: "Join the WhatsApp group", url: "https://chat.whatsapp.com/HKQWLGYdniv8btV1Utv03y?mode=gi_t" },
        ],
      },
      {
        q: "Dresscode",
        items: [
          { parts: ["Dress elegantly, but ", { text: "Patagonia", strikethrough: true }, " make it yours"] },
          "Warm, earthy tones fit the season and the location beautifully",
          "Grass and stilettos don't mix well — heels are absolutely fine",
          "Pack a light jacket. September evenings in Sicily can surprise you",
          "White is for the bride :)",
        ],
      },
      {
        q: "Can I bring a guest?",
        a: "Due to limited capacity, we are only able to accommodate the guests mentioned at the moment we invited you. It's a capacity thing, not a reflection of how much we love you. Thank you for understanding.",
      },
      {
        q: "Gifts",
        a: "Having you there means everything. If you'd like to make a gift, here's our bank account:",
        iban: true,
      },
    ],
  },
}
