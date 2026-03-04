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
    siteTitle: "Sara e Ben si sposano",
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
        "Location: Tenuta Savoca, vicino Piazza Armerina.",
        "Aeroporto consigliato: Catania (CTA).",
        "Sabato è previsto il bus organizzato da Catania.",
      ],
    },
    faqTitle: "FAQ",
    faqList: [
      {
        q: "Cosa portare?",
        a: "Look elegante ma comodo, più una giacca leggera per la sera.",
      },
      {
        q: "Cerimonia e cena sono nello stesso punto?",
        a: "No. Cerimonia nel bosco, cena in un'altra area della tenuta.",
      },
      {
        q: "Quando conviene arrivare?",
        a: "Meglio arrivare il sabato o comunque con margine su CTA.",
      },
    ],
  },
  en: {
    siteTitle: "Sara & Ben are getting married",
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
        "Venue: Tenuta Savoca, near Piazza Armerina.",
        "Recommended airport: Catania (CTA).",
        "On Saturday, we run an organized bus from Catania.",
      ],
    },
    faqTitle: "FAQ",
    faqList: [
      {
        q: "What should I bring?",
        a: "Elegant but comfortable outfit, plus a light jacket for the evening.",
      },
      {
        q: "Are ceremony and dinner in the same spot?",
        a: "No. Ceremony is in the woods, dinner is in another area of the estate.",
      },
      {
        q: "When should I arrive?",
        a: "Best to arrive on Saturday or with buffer time at CTA.",
      },
    ],
  },
};
