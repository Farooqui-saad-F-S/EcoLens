import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import BackgroundDecor from './components/layout/BackgroundDecor.jsx'

import Home from './pages/Home.jsx'
import AirQuality from './pages/AirQuality.jsx'
import WaterQuality from './pages/WaterQuality.jsx'
import DataInsights from './pages/DataInsights.jsx'
import AwarenessHub from './pages/AwarenessHub.jsx'
import InteractiveQA from './pages/InteractiveQA.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col font-body text-white">
      <BackgroundDecor />
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-cyan-accent px-4 py-2 text-sm font-semibold text-[#07111f] shadow-glow transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/air-quality" element={<AirQuality />} />
          <Route path="/water-quality" element={<WaterQuality />} />
          <Route path="/data-insights" element={<DataInsights />} />
          <Route path="/awareness-hub" element={<AwarenessHub />} />
          <Route path="/qa" element={<InteractiveQA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}
