import MagnetLines from './MagnetLines'
import './CaseBackdrop.css'

export default function CaseBackdrop() {
  return (
    <div className="case-backdrop" aria-hidden="true">
      <div className="case-radar">
        <MagnetLines rows={7} columns={7} containerSize="min(42vw, 440px)" lineColor="rgba(17, 24, 39, 0.24)" lineWidth="2px" lineHeight="30px" />
      </div>
      <div className="case-folder one">JD TRACE</div>
      <div className="case-folder two">RESUME SIGNAL</div>
      <div className="case-folder three">ATS / 087</div>
      <div className="case-scanline" />
    </div>
  )
}
