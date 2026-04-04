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
        q: "Come arrivare e dove dormire",
        a: [
          "Piazza Armerina vale già da sola il viaggio: un bellissimo borgo medievale nel cuore della Sicilia, a 700 metri sul livello del mare. La location si trova a circa 5km dal centro e a 1h30 da Catania. Vi consigliamo di arrivare il giorno prima per esplorare il borgo con calma.",
          "Stiamo lavorando per ottenere tariffe agevolate con alcuni hotel nelle vicinanze, vi faremo sapere!",
        ],
        cta: { label: "Apri Google Maps", url: mapsUrl },
      },
      {
        q: "Programma",
        a: "Vi aspettiamo nel primo pomeriggio, maggiori dettagli in arrivo!",
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
        q: "Getting there & where to stay",
        a: [
          "Piazza Armerina is worth the trip on its own: it's a beautiful medieval borgo in the heart of Sicily sitting at 700 metres above sea level. The venue is around 5km from the town centre and about 1h30 from Catania. We recommend arriving the day before to explore the town at your own pace.",
          "We're working on preferential rates with nearby hotels and will share details soon.",
        ],
        cta: { label: "Open in Google Maps", url: mapsUrl },
      },
      {
        q: "The plan",
        a: "We'll see you in the early afternoon, stay tuned for more!",
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
        q: "Gifts",
        a: "Having you there means everything. If you'd like to make a gift, here's our bank account:",
        iban: true,
      },
    ],
  },
}
