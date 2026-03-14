export const defaultLocale = "it";
export const locales = ["it", "en"];

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Tenuta+Savoca+Piazza+Armerina";

const moodboardImages = [
  {
    url: "https://i.pinimg.com/736x/cd/6b/68/cd6b68ae1476fb6f560d4efb258c122f.jpg",
    alt: "Warm autumn bouquet inspiration.",
  },
  {
    url: "https://i.pinimg.com/736x/af/6a/13/af6a139901c63aa4736be5c944877c5a.jpg",
    alt: "Textile and floral woodland setup inspiration.",
  },
  {
    url: "https://i.pinimg.com/736x/33/83/7d/33837da0b6aba3c478adba829e096766.jpg",
    alt: "Rustic floral entrance inspiration.",
  },
  {
    url: "https://i.pinimg.com/736x/4d/16/eb/4d16eb5c845e2260d04e9ac7997c0c94.jpg",
    alt: "Golden floral detail inspiration.",
  },
];

export const content = {
  it: {
    siteTitle: "Sara & Ben",
    dateLabel: "Domenica 27 settembre 2026",
    locationLabel: "Tenuta Savoca, Piazza Armerina",
    mapsLabel: "Apri Google Maps",
    mapsUrl,
    moodImages: moodboardImages,
    bento: {
      programTitle: "Programma",
      programIntro: "Orari indicativi per capire il ritmo della giornata.",
      schedule: [
        "1:30 Partenza bus da Catania",
        "3:00 Arrivo a Tenuta Savoca",
        "3:30 Cerimonia",
        "4:00 Accoglienza (Bosco)",
        "5:30 Aperitivo",
        "8:00 Cena",
        "9:30 Taglio torta e general frolicking",
        "11:00 Rave",
        "02:00 😴",
        "10:00 Navetta hotel ogni 30 min",
        "15:00 (Lunedì 28) Bus verso Catania",
      ],
      locationTitle: "Location e come raggiungerlo",
      locationLines: [
        "Vicino a Piazza Armerina",
        "Aeroporto consigliato: Catania (CTA)",
      ],
    },
    locationDescription: "La tenuta si trova nell'entroterra siciliano, nei pressi di Piazza Armerina. Il posto si trova a circa 600m di altitudine — la sera fa freschino!",
    rsvp: {
      title: "RSVP",
      deadline: "Per favore rispondi entro il 1° giugno 2026.",
      namePlaceholder: "Nome completo",
      attendanceLabel: "Verrai al matrimonio?",
      attendanceYes: "Accetto con gioia",
      attendanceNo: "Declino con dispiacere",
      dietaryLabel: "Preferenze alimentari",
      dietaryOptions: ["Mangio tutto", "Vegetariano", "Vegano", "Senza glutine", "Altro (vedi nota)"],
      messageLabel: "Vuoi lasciare una nota? :)",
      submitLabel: "Invia",
      submittingLabel: "Invio…",
      successAttending: "Ci vediamo in Sicilia.",
      successDecline: "Ci mancherai.",
      successAttendingBody: "La tua risposta è stata ricevuta. Seguiranno maggiori dettagli.",
      successDeclineBody: "Grazie per avercelo fatto sapere. Ti penseremo.",
      errorMsg: "Qualcosa è andato storto. Riprova o contattaci direttamente.",
      validationName: "Per favore inserisci il tuo nome.",
      validationAttendance: "Per favore facci sapere se ci sarai.",
    },
    copyIban: "Copia IBAN",
    copiedIban: "Copiato!",
    giftsTitle: "Regali",
    giftsBody: "Non ci servono cose — la casa è già piena. Il regalo più bello è la vostra presenza. Se volete contribuire al nostro viaggio di nozze, ecco l'IBAN:",
    faqTitle: "Domande frequenti",
    faqList: [
      {
        q: "Come arrivare alla location",
        a: "Domenica mattina (orario da confermare) partirà un bus (organizzato da noi) che da Catania vi porterà alla location del matrimonio (durata: circa 1h 30). Ritorno previsto Lunedì verso le 15. Tutti gli orari sono indicativi.",
      },
      {
        q: "Programma della serata",
        a: "Sarà a cena! Inizio stimato per le 15. Seguiranno maggiori dettagli.",
      },
      {
        q: "Dresscode?",
        items: [
          "Eleganti, stare comodi, sentirvi voi stessi.",
          "Occhio ai tacchi a spillo.",
          "Portare una giacchettina per la sera che potrebbe fare freschetto.",
          "Per ispirazione, ecco una moodboard.",
        ],
      },
      {
        q: "Dove dormire",
        items: [
          "Purtroppo non possiamo offrire il soggiorno.",
          "Vi consigliamo di pernottare la notte prima a Catania e la notte delle nozze invece a Piazza Armerina. Siamo in contatto con alcuni hotel per prezzi favorevoli. Seguiranno aggiornamenti.",
        ],
      },
    ],
  },
  en: {
    siteTitle: "Sara & Ben",
    dateLabel: "Sunday, September 27, 2026",
    locationLabel: "Tenuta Savoca, Piazza Armerina",
    mapsLabel: "Open Google Maps",
    mapsUrl,
    moodImages: moodboardImages,
    bento: {
      programTitle: "Timetable",
      programIntro: "Approximate times to guide the flow of the day.",
      schedule: [
        "1:30 Bus departure from Catania",
        "3:00 Arrival at Tenuta Savoca",
        "3:30 Ceremony",
        "4:00 Welcome (Woods)",
        "5:30 Aperitivo",
        "8:00 Dinner",
        "9:30 Cake cutting and general frolicking",
        "11:00 Rave",
        "02:00 😴",
        "10:00 Hotel shuttle every 30 min",
        "15:00 (Monday 28) Bus to Catania",
      ],
      locationTitle: "Location and how to reach it",
      locationLines: [
        "Near Piazza Armerina",
        "Recommended airport: Catania (CTA)",
      ],
    },
    locationDescription: "The estate sits in the Sicilian hinterland, near Piazza Armerina, at around 600m altitude — evenings can be quite chilly!",
    rsvp: {
      title: "RSVP",
      deadline: "Please respond by June 1, 2026.",
      namePlaceholder: "Full name",
      attendanceLabel: "Will you be joining us?",
      attendanceYes: "Joyfully accepts",
      attendanceNo: "Regretfully declines",
      dietaryLabel: "Dietary preferences",
      dietaryOptions: ["I eat everything", "Vegetarian", "Vegan", "Gluten-free", "Other (see note)"],
      messageLabel: "Want to leave a note? :)",
      submitLabel: "Send",
      submittingLabel: "Sending…",
      successAttending: "See you in Sicily.",
      successDecline: "We'll miss you.",
      successAttendingBody: "Your RSVP has been received. More details to follow.",
      successDeclineBody: "Thank you for letting us know. We'll be thinking of you.",
      errorMsg: "Something went wrong. Please try again or contact us directly.",
      validationName: "Please enter your name.",
      validationAttendance: "Please let us know if you'll be joining us.",
    },
    copyIban: "Copy IBAN",
    copiedIban: "Copied!",
    giftsTitle: "Gifts",
    giftsBody: "We don't need things — the house is already full. Your presence is the greatest gift. If you'd like to contribute to our honeymoon, here's the IBAN:",
    faqTitle: "Frequently asked questions",
    faqList: [
      {
        q: "Getting to the venue",
        a: "On Sunday morning (time TBC) a bus organised by us will depart from Catania to the wedding venue (approx. 1h 30). Return on Monday around 15:00. All times are approximate.",
      },
      {
        q: "Programme",
        a: "It's a dinner! Estimated start around 15:00. More details to follow.",
      },
      {
        q: "Dresscode?",
        items: [
          "Elegant but comfortable, be yourselves.",
          "Watch out for stilettos on the grass.",
          "Bring a light jacket for the evening — it might get chilly.",
          "For inspiration, here's a moodboard.",
        ],
      },
      {
        q: "Where to stay",
        items: [
          "Unfortunately we're unable to offer accommodation.",
          "We recommend staying the night before in Catania and the wedding night in Piazza Armerina. We're in touch with some hotels for preferential rates. Updates to follow.",
        ],
      },
    ],
  },
};
