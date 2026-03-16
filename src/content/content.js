export const defaultLocale = "it"
export const locales = ["it", "en"]

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Tenuta+Savoca+Piazza+Armerina"

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
]

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
    locationDescription:
      "La tenuta si trova nell'entroterra siciliano, nei pressi di Piazza Armerina. Il posto si trova a circa 600m di altitudine — la sera fa freschino!",
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
      transportLabel: "Come pensi di arrivare?",
      transportOptions: [
        {
          value: "bus",
          label: "Con il bus",
          sublabel: "Partenza da Catania la domenica mattina",
        },
        { value: "car", label: "In macchina", sublabel: "Ci arrangiamo noi" },
        {
          value: "unsure",
          label: "Non lo so ancora",
          sublabel: "Lo decido più avanti",
        },
      ],
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
      messageLabel: "Note",
      messagePlaceholder:
        "Hai qualcosa da dire a Sarai e Ben? Questo è il posto giusto.",
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
    },
    copyIban: "Copia IBAN",
    copiedIban: "Copiato!",
    giftsTitle: "Regali",
    giftsBody:
      "Non ci servono cose — la casa è già piena. Il regalo più bello è la vostra presenza. Se volete contribuire al nostro viaggio di nozze, ecco l'IBAN:",
    faqTitle: "Domande frequenti",
    faqList: [
      {
        q: "Come arrivare alla location",
        items: [
          "Se arrivate in macchina, nessun problema: trovate il link di Google Maps qui sotto e lui vi guiderà fino a noi (1.30h).",
          "Se invece preferite godervi la giornata senza pensare alla guida, stiamo organizzando un bus che partirà da Catania la domenica mattina per portarvi alla location. Stiamo valutando di organizzare il rientro il lunedì da Piazza Armerina, invece che la notte stessa dell'evento, così da poter festeggiare tutti con più tranquillità. Aggiorneremo presto questa sezione.",
        ],
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
    locationDescription:
      "The estate sits in the Sicilian hinterland, near Piazza Armerina, at around 600m altitude — evenings can be quite chilly!",
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
      transportLabel: "How are you planning to get to the wedding location?",
      transportOptions: [
        {
          value: "bus",
          label: "By bus",
          sublabel: "Departing from Catania on Sunday morning",
        },
        { value: "car", label: "By car", sublabel: "We'll sort ourselves out" },
        {
          value: "unsure",
          label: "Not sure yet",
          sublabel: "I'll decide later",
        },
      ],
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
      messageLabel: "Notes",
      messagePlaceholder:
        "Got something to tell Sarai & Ben? This is the place.",
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
    },
    copyIban: "Copy IBAN",
    copiedIban: "Copied!",
    giftsTitle: "Gifts",
    giftsBody:
      "We don't need things — the house is already full. Your presence is the greatest gift. If you'd like to contribute to our honeymoon, here's the IBAN:",
    faqTitle: "Frequently asked questions",
    faqList: [
      {
        q: "Getting to the venue",
        items: [
          "If you're driving, no problem — find the Google Maps link below and it'll guide you straight to us (approx. 1h 30).",
          "If you'd rather enjoy the day without worrying about driving, we're organising a bus from Catania on Sunday morning. We're also looking into arranging the return trip on Monday from Piazza Armerina, rather than the same night, so everyone can celebrate without rushing. We'll update this section soon.",
        ],
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
}
