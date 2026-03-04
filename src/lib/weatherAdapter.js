const WEATHER_CODE_MAP = {
  0: { it: "Sereno", en: "Clear" },
  1: { it: "Poco nuvoloso", en: "Mainly clear" },
  2: { it: "Parzialmente nuvoloso", en: "Partly cloudy" },
  3: { it: "Nuvoloso", en: "Overcast" },
  45: { it: "Nebbia", en: "Fog" },
  48: { it: "Nebbia intensa", en: "Depositing rime fog" },
  51: { it: "Pioviggine leggera", en: "Light drizzle" },
  53: { it: "Pioviggine", en: "Drizzle" },
  55: { it: "Pioviggine intensa", en: "Dense drizzle" },
  61: { it: "Pioggia leggera", en: "Light rain" },
  63: { it: "Pioggia", en: "Rain" },
  65: { it: "Pioggia intensa", en: "Heavy rain" },
  71: { it: "Neve leggera", en: "Light snow" },
  80: { it: "Rovesci leggeri", en: "Light showers" },
  81: { it: "Rovesci", en: "Showers" },
  82: { it: "Rovesci intensi", en: "Heavy showers" },
  95: { it: "Temporale", en: "Thunderstorm" },
};

function toCondition(code, locale) {
  return WEATHER_CODE_MAP[code]?.[locale] ?? (locale === "it" ? "Variabile" : "Variable");
}

export function adaptOpenMeteoDaily(payload, locale = "it") {
  if (!payload?.daily?.time) return [];

  const { time, temperature_2m_min: min, temperature_2m_max: max, weathercode } = payload.daily;

  return time.map((date, index) => ({
    date,
    min: Math.round(min[index]),
    max: Math.round(max[index]),
    condition: toCondition(weathercode[index], locale),
  }));
}
