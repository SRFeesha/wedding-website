import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import RSVPForm from "./components/RSVPForm";
import { content, defaultLocale } from "./content/content";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${defaultLocale}`} replace />} />
        <Route path="/it" element={<App locale="it" />} />
        <Route path="/en" element={<App locale="en" />} />
        <Route path="/rsvp" element={<RSVPForm copy={content[defaultLocale]} />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>,
);
