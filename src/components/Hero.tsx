import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Hero() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);
  return <div className="hero-frame" id="inicio">
    <header className="site-header"><div className="site-header-inner">
      <a className="wordmark brand-link" href="#inicio" aria-label="Compara2026, início"><img className="brand-logo" src="/branding/compara2026-logo.png" alt="Compara2026" width={2172} height={724} fetchPriority="high" /></a>
      <nav className="top-links" aria-label="Navegação principal"><a href="#inicio">Início</a><a href="#comparador">Comparar propostas</a><a href="#ocorrencias">Registros eleitorais</a><a href="#fontes">Fontes</a></nav>
      <button ref={menuButton} className="menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>{open && <nav id="mobile-menu" className="mobile-menu" aria-label="Menu mobile">{[['#inicio','Início'],['#comparador','Comparar propostas'],['#falas-recentes','Falas e entrevistas'],['#ocorrencias','Registros eleitorais'],['#vinculos-documentados','Jair, Abin e Banco Master'],['#historico-flavio','Gabinete, chocolates e imóveis'],['#atuacao-legislativa','Projetos de Flávio'],['#projetos-lula','Projetos do governo Lula'],['#conquistas-lula','Conquistas de Lula'],['#metodologia','Como funciona'],['#fontes','Fontes']].map(([href,label])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>}</header>
    <section className="hero-section"><div className="hero-layout">
      <div className="hero-copy"><p className="eyebrow">ELEIÇÕES 2026</p><h1>Compare propostas.<br/><span>Forme sua opinião.</span></h1><p className="hero-lead">Dois candidatos. Os mesmos temas.<br/>Fontes para conferir.</p></div>
      <div className="hero-visual"><img src="/congresso-hero.jpg" alt="Congresso Nacional ao pôr do sol. Informação para um debate mais qualificado em 2026." fetchPriority="high"/></div>
    </div></section>
  </div>;
}
