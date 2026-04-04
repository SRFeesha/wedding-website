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
    faqTitle: "Domande frequenti",
    faqList: [
      {
        q: "Come arrivare alla location",
        a: "Se venite in macchina, seguite il link Google Maps qui sotto. Sono circa 1h 30 da Catania. Se preferite non pensarci, stiamo organizzando un bus da Catania domenica mattina, e stiamo valutando il rientro da Piazza Armerina il lunedì, così nessuno dovrà andar via di fretta. Maggiori dettagli a breve!",
        cta: { label: "Apri Google Maps", url: mapsUrl },
      },
      {
        q: "Programma della serata",
        a: "È una cena! Si comincia intorno alle 15:00. Maggiori dettagli a seguire!",
      },
      {
        q: "Dresscode",
        a: "Vestiti con eleganza, ma sii te stesso. Tieni a mente che c'è del prato, quindi forse lascia i tacchi a spillo a casa. Le serate di settembre si fanno fresche, quindi una giacchina leggera non guasta. Per ispirazione sui colori, dai un'occhiata al nostro moodboard.",
        cta: { label: "Moodboard →", url: "#" },
      },
      {
        q: "Dove dormire",
        a: "Purtroppo non siamo in grado di offrire alloggio in loco. Vi consigliamo di pernottare la sera prima a Catania e la notte del matrimonio a Piazza Armerina — entrambe bellissime, vale la pena esplorarle. Stiamo lavorando per ottenere tariffe agevolate con alcuni hotel nelle vicinanze, vi faremo sapere!",
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
    faqTitle: "Frequently asked questions",
    faqList: [
      {
        q: "Getting to the venue",
        a: "If you're driving, just follow the Google Maps link below. It's about 1h 30 from Catania. If you'd rather leave the driving to someone else, we're organising a bus from Catania on Sunday morning, and we're looking into a return trip from Piazza Armerina on Monday so nobody has to rush off. More details soon!",
        cta: { label: "Open Google Maps", url: mapsUrl },
      },
      {
        q: "Programme",
        a: "It's an evening dinner celebration — things will get started around 3pm. More details to follow!",
      },
      {
        q: "Dresscode",
        a: "Dress elegantly, but be yourself. Just keep in mind there's grass, so maybe leave the stilettos at home. September evenings can get chilly, so a light jacket is a good idea. For colour inspiration, check out our moodboard.",
        cta: { label: "Moodboard →", url: "#" },
      },
      {
        q: "Where to stay",
        a: "Unfortunately we're not able to offer accommodation on-site. We recommend spending the night before in Catania and the wedding night in Piazza Armerina — both are beautiful spots worth exploring. We're working on preferential rates with some nearby hotels, so stay tuned for updates!",
      },
      {
        q: "Gifts",
        a: "Having you there means everything. If you'd like to give us something, here's our bank account:",
        iban: true,
      },
    ],
  },
}
