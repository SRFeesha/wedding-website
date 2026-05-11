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
      deadline: "Per favore rispondi entro il 1° giugno 2026",
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
        a: [
          "Piazza Armerina vale già da sola il viaggio: un bellissimo borgo medievale nel cuore della Sicilia, a 700 metri sul livello del mare. La location si trova a circa 5km dal centro e a 1h30 da Catania. Vi consigliamo di arrivare il giorno prima per esplorare il borgo con calma.",
          "Purtroppo non possiamo aiutare direttamente con il trasporto, ma potete unirvi al gruppo WhatsApp degli ospiti o contattarci direttamente se avete difficoltà a raggiungere il posto — troveremo una soluzione.",
        ],
        ctas: [
          { label: "Apri Google Maps", url: mapsUrl },
          { label: "Unisciti al gruppo WhatsApp", url: "#" },
        ],
      },
      {
        q: "Dove dormire",
        a: [
          "Stiamo lavorando per ottenere tariffe agevolate con alcuni hotel nelle vicinanze, vi faremo sapere!",
          "Piazza Armerina è piena di bei B&B, Airbnb e hotel se siete alla ricerca di altre opzioni.",
        ],
      },
      {
        q: "Programma",
        items: [
          "La cerimonia inizierà intorno alle 15:00",
          "Seguiranno aperitivo e cena all'aperto (speriamo 🤞)",
          "La festa finirà intorno alle 2:00",
        ],
      },
      {
        q: "Resta aggiornato",
        a: [
          "Abbiamo aperto un canale WhatsApp per condividere aggiornamenti con tutti — vi consigliamo di iscrivervi per non perdervi niente!",
          "Abbiamo anche creato un gruppo per gli ospiti dove potete chiacchierare, trovare compagnia per il viaggio e organizzarvi insieme.",
        ],
        ctas: [
          { label: "Segui il canale", url: "#" },
          { label: "Unisciti al gruppo", url: "#" },
        ],
      },
      {
        q: "Dresscode",
        items: [
          "Eleganti, ma senza perdere di vista il vostro stile",
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
      deadline: "Please respond by June 1, 2026",
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
        a: [
          "Piazza Armerina is worth the trip on its own: it's a beautiful medieval borgo in the heart of Sicily sitting at 700 metres above sea level. The venue is around 5km from the town centre and about 1h30 from Catania. We recommend arriving the day before to explore the town at your own pace.",
          "Unfortunately we can't help with transportation directly, but feel free to join the guest WhatsApp group or reach us directly if you're having trouble reaching the location — we'll find a solution.",
        ],
        ctas: [
          { label: "Open in Google Maps", url: mapsUrl },
          { label: "Join the WhatsApp group", url: "#" },
        ],
      },
      {
        q: "Where to stay",
        a: [
          "We're working on preferential rates with nearby hotels and will share details soon.",
          "Piazza Armerina is full of nice Airbnbs and hotels if you're looking for other options.",
        ],
      },
      {
        q: "The plan",
        items: [
          "The ceremony will start around 3:00 p.m.",
          "There will be an aperitivo and a dinner outside (hopefully 🤞)",
          "The party will wrap up around 2:00 a.m.",
        ],
      },
      {
        q: "Stay updated",
        a: [
          "We created a WhatsApp channel to share updates with everyone — we suggest you all subscribe so you don't miss anything!",
          "We also opened a guest group where you can chat with each other, find travel companions, and sort things out together.",
        ],
        ctas: [
          { label: "Follow the channel", url: "#" },
          { label: "Join the group", url: "#" },
        ],
      },
      {
        q: "Dresscode",
        items: [
          "Dress elegantly, but make it yours",
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
