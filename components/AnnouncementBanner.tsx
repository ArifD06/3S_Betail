const message = "📢 Information importante : après paiement, merci de récupérer votre mouton dans les 24h. Au-delà, 1.500 FCFA de frais de garde par jour seront facturés."

export default function AnnouncementBanner() {
  return (
    <div className="bg-[#2C1A00] text-white overflow-hidden py-2.5">
      <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 25s linear infinite' }}>
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{ whiteSpace: 'nowrap' }} className="text-sm font-medium px-12 text-[#F5D9A0]">
            {message}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); } 
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
