import { useEffect, useState } from "react";
import { adaptOpenMeteoDaily } from "../lib/weatherAdapter";

const WEATHER_BASE = import.meta.env.VITE_WEATHER_BASE_URL || "https://api.open-meteo.com";

export default function WeatherWidget({ copy, locale, location }) {
  const [status, setStatus] = useState("loading");
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadForecast() {
      try {
        setStatus("loading");
        const url =
          `${WEATHER_BASE}/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}` +
          "&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather request failed");
        const data = await response.json();
        const normalized = adaptOpenMeteoDaily(data, locale);
        if (!active) return;
        setForecast(normalized);
        setStatus("ready");
      } catch {
        if (!active) return;
        setStatus("error");
      }
    }

    loadForecast();
    return () => {
      active = false;
    };
  }, [locale, location.latitude, location.longitude]);

  return (
    <section className="rounded-[2rem] bg-white p-7 shadow-card sm:p-10">
      <h2 className="font-display text-4xl text-ink sm:text-5xl">{copy.title}</h2>
      <p className="mt-2 text-[18px] text-ink/85 sm:text-[19px]">{location.name}</p>

      {status === "loading" ? (
        <p className="mt-5 text-[18px] text-ink/85 sm:text-[19px]">{copy.loading}</p>
      ) : null}

      {status === "error" ? (
        <p className="mt-5 rounded-2xl bg-canvas-100 p-4 text-[18px] text-ink/90 sm:text-[19px]">
          {copy.error}
        </p>
      ) : null}

      {status === "ready" ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {forecast.map((day) => (
            <article key={day.date} className="rounded-3xl border border-canvas-100 bg-canvas-50 p-4">
              <p className="text-[14px] font-semibold uppercase tracking-wide text-ink/70">
                {new Date(day.date).toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <p className="mt-3 text-[18px] font-semibold text-ink">{day.condition}</p>
              <p className="mt-2 text-[15px] text-ink/80">
                {copy.dayMin}: {day.min}°C
              </p>
              <p className="text-[15px] text-ink/80">
                {copy.dayMax}: {day.max}°C
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
