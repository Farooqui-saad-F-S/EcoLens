# EcoLens

Air & Water Quality Awareness — a data visualization mini project built with
React, Vite, Tailwind CSS, React Router, Lucide React, and Recharts.

## Status: Complete CEP Mini Project

EcoLens currently includes:

- Real city search and air-quality data from Open-Meteo
- AQI status, pollutant readings, and responsive Recharts visualizations
- Interactive educational water-quality parameter sliders
- Plain-language Data Insights chart explanations
- Air and water pollution awareness content
- Expandable Q&A cards and a seven-question knowledge activity
- Responsive glassmorphism UI with keyboard and mobile accessibility basics

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    layout/
      Navbar.jsx           Responsive top navigation + mobile menu
      Footer.jsx            Simple site footer
      PageContainer.jsx     Shared page wrapper (eyebrow/title/subtitle + spacing)
      BackgroundDecor.jsx   Ambient blurred gradient background
    ui/
      GlassCard.jsx         Reusable glass-panel card
    airquality/             Air search, AQI, pollutants, and charts
    waterquality/           Water parameter cards and sliders
    insights/               Explained data visualizations
    awareness/              Expandable pollution-learning sections
    qa/                     Q&A cards and knowledge activity
  pages/
    Home.jsx
    AirQuality.jsx
    WaterQuality.jsx
    DataInsights.jsx
    AwarenessHub.jsx
    InteractiveQA.jsx
    NotFound.jsx
  App.jsx
  main.jsx
  index.css
```
