import { useEffect, useRef } from 'react';
import type { ClinicalScene } from '../data/departments';
import './ClinicalIllustration.css';

function Clinician({ clipboard = false }: { clipboard?: boolean }) {
  return <>
    <circle cx="65" cy="59" r="12" />
    <path d="M65 71V128L48 165M65 128L82 165M65 86L44 107L51 125" />
    <path className="care-art-soft" d="M61 76V91M55 84H68" />
    <g className="care-art-arm" style={{ transformOrigin: '65px 86px' }}>
      <path d={clipboard ? 'M65 86L87 105L107 96' : 'M65 86L91 105L126 109'} />
      {clipboard && <><rect x="97" y="81" width="22" height="31" rx="3" className="care-art-paper" /><path className="care-art-soft" d="M103 90H113M103 97H112M103 104H109" /></>}
    </g>
  </>;
}

function SeatedPatient({ child = false, abdomen = false }: { child?: boolean; abdomen?: boolean }) {
  return <g transform={child ? 'translate(44 48) scale(.73)' : undefined}>
    <circle cx="176" cy="71" r="12" />
    <path d="M176 83V132H205V164M176 132L166 165M176 96L153 112" />
    <path className="care-art-soft" d="M164 139H214M209 139V169M167 139V169" />
    {abdomen ? <path d="M176 97L190 116L178 121" /> : <g className="care-art-wave" style={{ transformOrigin: '176px 96px' }}><path d="M176 96L198 103L208 83M204 83L208 88L214 85" /></g>}
  </g>;
}

function ScanScene({ ctg = false }: { ctg?: boolean }) {
  return <>
    <Clinician />
    <path className="care-art-soft" d="M107 139H225M116 139V169M217 139V169" />
    <circle cx="201" cy="106" r="10" />
    <path d="M192 115L170 124Q151 101 138 124L125 130H107M170 124L190 132H221" />
    <rect x="132" y="43" width="47" height="37" rx="4" />
    <path d="M155 80V96M143 96H168M133 67C118 67 129 105 139 114" />
    {ctg ? <g className="care-art-light"><path d="M140 55H145L149 50L154 61L159 54H169M140 69Q147 60 153 69T169 69" /></g>
      : <g className="care-art-light"><path d="M140 71L155 50L171 71ZM149 67Q156 56 163 67" /></g>}
    {ctg && <path className="care-art-soft" d="M155 118V127M164 119V127" />}
  </>;
}

function Scene({ variant }: { variant: ClinicalScene }) {
  if (variant === 'gynecology') return <><Clinician clipboard /><SeatedPatient abdomen /><path className="care-art-soft" d="M162 56Q176 44 190 57" /></>;
  if (variant === 'maternity' || variant === 'ultrasound' || variant === 'ctg') return <ScanScene ctg={variant === 'ctg'} />;
  if (variant === 'pediatrics') return <>
    <Clinician /><SeatedPatient child />
    <path className="care-art-soft" d="M62 76Q52 95 65 100Q77 100 72 80M65 100C69 119 126 135 155 119" />
    <circle cx="156" cy="119" r="4" className="care-art-paper" />
  </>;
  if (variant === 'dermatology') return <>
    <Clinician /><SeatedPatient abdomen />
    <g className="care-art-light"><circle cx="138" cy="100" r="12" /><path d="M130 109L122 119M136 95H140M135 100H141" /></g>
    <path className="care-art-soft" d="M207 38V69M195 43L207 38L218 43M203 69H211" />
  </>;
  if (variant === 'orthopedics' || variant === 'physiotherapy') return <>
    <Clinician clipboard={variant === 'orthopedics'} />
    <circle cx="176" cy="65" r="12" />
    <path d="M176 77L169 122L184 164M169 122L137 133L123 157M176 88L153 110" />
    <g className="care-art-arm" style={{ transformOrigin: '176px 88px' }}><path d="M176 88L197 105L217 83" /></g>
    <path className="care-art-soft" d="M151 130H184M179 130V169M156 130V169" />
    {variant === 'physiotherapy' ? <path className="care-art-soft" d="M217 61V168M217 80H230M217 107H230M217 134H230" /> : <g className="care-art-light"><circle cx="138" cy="133" r="9" /></g>}
  </>;
  if (variant === 'labour') return <>
    <Clinician clipboard />
    <path className="care-art-soft" d="M134 144H223M143 144V169M215 144V169M211 131V102" />
    <circle cx="179" cy="66" r="12" />
    <path d="M179 78L166 122L181 164M166 122L160 163M179 91L161 105L176 115M179 93L198 109L181 118" />
    <g className="care-art-cradle" style={{ transformOrigin: '180px 110px' }}><circle cx="158" cy="101" r="6" /><path d="M163 105Q183 99 192 114Q180 126 164 109Z" /></g>
  </>;
  if (variant === 'laboratory') return <>
    <Clinician />
    <path className="care-art-soft" d="M106 133H228M115 133V169M218 133V169" />
    <g className="care-art-arm" style={{ transformOrigin: '123px 95px' }}><path d="M126 88V116M121 88H131M125 117V121" /></g>
    <path d="M120 123V129Q120 133 126 133Q132 133 132 129V123M117 123H135M158 127H205M172 127L181 110M184 73L193 79L174 108L166 103ZM192 87Q215 99 201 120M187 120H204" />
  </>;
  if (variant === 'pharmacy') return <>
    <Clinician /><SeatedPatient abdomen />
    <path className="care-art-soft" d="M101 125H231M112 125V169M219 125V169M123 51H222" />
    <rect x="129" y="34" width="15" height="17" rx="2" /><path d="M132 30H141M133 30V34M140 30V34" />
    <rect x="159" y="28" width="21" height="23" rx="2" /><path className="care-art-soft" d="M169 34V44M164 39H174" />
    <g className="care-art-light"><path className="care-art-paper" d="M126 100H146V121H126ZM131 100V95Q136 89 141 95V100" /></g>
  </>;
  if (variant === 'ecg' || variant === 'emergency') return <>
    <Clinician />
    <path className="care-art-soft" d="M108 137H225M117 137V168M217 137V168" />
    <circle cx="203" cy="110" r="10" /><path d="M193 120H137L125 130H108M156 121L172 129H219" />
    <rect x="129" y="40" width="60" height="39" rx="4" /><path d="M158 79V95M146 95H171" />
    <g className="care-art-light"><path d="M137 60H146L151 53L157 69L164 48L170 60H181" /></g>
    {variant === 'emergency' && <path className="care-art-soft" d="M215 46V64M206 55H224" />}
  </>;
  return <><Clinician clipboard={variant === 'gastroenterology'} /><SeatedPatient abdomen={variant === 'gastroenterology'} />
    {variant === 'consultation' && <><path className="care-art-soft" d="M62 76Q52 95 65 100Q77 100 72 80M65 100C73 124 116 132 151 112" /><circle cx="153" cy="112" r="4" className="care-art-paper" /></>}
  </>;
}

export default function ClinicalIllustration({ variant }: { variant: ClinicalScene }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { element.dataset.running = String(entry.isIntersecting && !document.hidden); });
    const sync = () => { element.dataset.running = String(!document.hidden && element.getBoundingClientRect().bottom > 0 && element.getBoundingClientRect().top < innerHeight); };
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <div ref={ref} className="clinical-art" aria-hidden="true">
    <svg viewBox="0 0 260 210" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className="care-art-soft" d="M26 170H235" />
      <Scene variant={variant} />
    </svg>
  </div>;
}
