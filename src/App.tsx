import { useEffect, useLayoutEffect, useMemo, useState, type MouseEvent } from "react";
import { categorias } from "./data/propostas";
import { categoryForHash } from "./data/referenceTargets";
import { cn } from "./utils/cn";
import Hero from "./components/Hero";
import ElectoralRecords from "./components/ElectoralRecords";
import RecentStatements from "./components/RecentStatements";
import HistoricalRecords from "./components/HistoricalRecords";
import LulaLegislativeRecord from "./components/LulaLegislativeRecord";
import LulaAchievements from "./components/LulaAchievements";
import LegislativeRecord from "./components/LegislativeRecord";
import DocumentedConnections from "./components/DocumentedConnections";
import Overview from "./components/Overview";
import TopicIcon from "./components/TopicIcon";
import { Settings, ChevronDown, Search, ArrowLeft, ArrowRight } from "lucide-react";
import CategoryPanel from "./components/CategoryPanel";
import Bibliografia from "./components/Bibliografia";
import Footer from "./components/Footer";

const sections = [
  { id: "comparador", label: "Propostas" },
  { id: "falas-recentes", label: "Falas e entrevistas" },
  { id: "ocorrencias", label: "Registros eleitorais" },
  { id: "vinculos-documentados", label: "Jair e Banco Master" },
  { id: "historico-flavio", label: "Histórico de Flávio" },
  { id: "atuacao-legislativa", label: "Projetos de Flávio" },
  { id: "projetos-lula", label: "Projetos de Lula" },
  { id: "conquistas-lula", label: "Conquistas de Lula" },
  { id: "fontes", label: "Fontes" },
];
function sectionForHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (id.startsWith("fala-")) return "falas-recentes";
  if (id.startsWith("vinculo-")) return "vinculos-documentados";
  if (id.startsWith("historico-")) return "historico-flavio";
  return sections.some(section => section.id === id) ? id : "comparador";
}

export default function App() {
  const [section, setSection] = useState(() => sectionForHash(window.location.hash));
  const [navRequest, setNavRequest] = useState({ hash: window.location.hash, revision: 0 });
  const applyHash = (hash: string) => {
    setSection(sectionForHash(hash));
    const category = categoryForHash(hash);
    if (category) {
      setAtiva(category);
      setQuery("");
    }
    setNavRequest(previous => ({ hash, revision: previous.revision + 1 }));
  };
  useEffect(() => {
    const syncHash = () => applyHash(window.location.hash);
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);
  useLayoutEffect(() => {
    if (!navRequest.hash) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(navRequest.hash.slice(1)));
      if (!target) return;
      target.closest("details")?.setAttribute("open", "");
      const toolbar = document.querySelector<HTMLElement>(".category-nav");
      const toolbarIsSticky = toolbar && getComputedStyle(toolbar).position === "sticky";
      const inset = target.closest("#comparador") && toolbarIsSticky ? toolbar.offsetHeight + 20 : 20;
      const top = target.getBoundingClientRect().top + window.scrollY - inset;
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [navRequest]);
  useEffect(() => {
    const tab = document.getElementById(`section-tab-${section}`);
    const container = tab?.parentElement;
    if (!tab || !container) return;
    const left = tab.offsetLeft - container.offsetLeft;
    if (left < container.scrollLeft) container.scrollTo({ left, behavior: "instant" });
    else if (left + tab.offsetWidth > container.scrollLeft + container.clientWidth) container.scrollTo({ left: left + tab.offsetWidth - container.clientWidth, behavior: "instant" });
  }, [section]);
  const handleInternalLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || !destination.hash) return;
    event.preventDefault();
    if (window.location.hash !== destination.hash) window.history.pushState(null, "", destination.hash);
    applyHash(destination.hash);
  };
  const chooseSection = (id: string) => {
    setSection(id);
    setNavRequest(previous => ({ hash: "", revision: previous.revision + 1 }));
    window.history.pushState(null, "", `#${id}`);
  };

  const [ativa, setAtiva] = useState<string>(() => categoryForHash(window.location.hash) ?? "educacao");
  const [query, setQuery] = useState("");

  const buscando = query.trim().length > 1;

  const resultados = useMemo(() => {
    if (!buscando) return [];
    const q = query.trim().toLowerCase();
    return categorias.filter((c) => {
      const blob = [
        c.nome,
        c.resumo,
        c.perguntaChave,
        ...c.propostas.lula.flatMap((p) => [p.titulo, p.texto]),
        ...c.propostas.flavio.flatMap((p) => [p.titulo, p.texto]),
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [query, buscando]);

  const selecionar = (id: string) => {
    setQuery("");
    setAtiva(id);
    chooseSection("comparador");
    requestAnimationFrame(() => {
      document.getElementById("comparador")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const catAtiva = categorias.find((c) => c.id === ativa) ?? categorias[0];

  return (
    <div className="app-shell min-h-screen bg-slate-50 font-sans text-slate-900 antialiased" onClick={handleInternalLink}>
      <Hero />
      <nav className="section-navigation" aria-label="Assuntos do site">
        <div className="section-navigation-inner">
          <p className="section-navigation-label">Escolha um assunto</p>
          <div className="section-tabs" role="tablist" aria-label="Seções">
            {sections.map((item, index) => <button key={item.id} id={`section-tab-${item.id}`} role="tab" aria-selected={section === item.id} aria-controls={`section-panel-${item.id}`} tabIndex={section === item.id ? 0 : -1} className={cn("section-tab", section === item.id && "is-active")} onClick={() => chooseSection(item.id)} onKeyDown={event => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % sections.length;
              else if (event.key === "ArrowLeft") next = (index - 1 + sections.length) % sections.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = sections.length - 1;
              else return;
              event.preventDefault();
              chooseSection(sections[next].id);
              document.getElementById(`section-tab-${sections[next].id}`)?.focus();
            }}>{item.label}</button>)}
          </div>
        </div>
      </nav>
      <div id="section-panel-comparador" role="tabpanel" aria-labelledby="section-tab-comparador" hidden={section !== "comparador"}>

      

      <div id="comparador" className="scroll-mt-24">
        {/* Barra de navegação por categoria */}
        <div className="category-nav sticky top-0 z-30">
          <div className="mx-auto max-w-6xl px-4">
            <div className="topic-toolbar">
              <div className="topic-tabs">
                {categorias.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setQuery("");
                      setAtiva(c.id);
                    }}
                    aria-pressed={!buscando && ativa === c.id}
                    className={cn("topic-tab", !buscando && ativa === c.id && "is-active")}
                  >
                    <TopicIcon id={c.id} variant={!buscando && ativa === c.id ? "branco" : "preto"}/>
                    {c.nome}
                  </button>
                ))}
              </div>
              <a
                href="#fontes"
                className="hidden shrink-0 rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-900 hover:text-white md:block"
              >
                <img src="/icons/documento-preto.svg" width={16} height={16} alt="" className="mr-1 inline-block"/> Fontes
              </a>
              <div className="desktop-topic-search relative hidden shrink-0 sm:block">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Buscar propostas por tema"
                  placeholder="Buscar tema..."
                  className="w-52 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
                <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
            <div className="mobile-topic-search pb-3 sm:hidden">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar propostas por tema"
                placeholder="Buscar tema (ex.: creche, imposto, Amazônia)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-slate-400 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-6xl px-4 py-10 comparador-main">
          {buscando ? (
            <div className="space-y-16">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-bold text-slate-900">
                  {resultados.length} área{resultados.length === 1 ? "" : "s"} com "{query.trim()}"
                </h2>
                <button
                  onClick={() => setQuery("")}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  limpar busca
                </button>
              </div>
              {resultados.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                  Nenhuma proposta encontrada. Tente termos como "SUS", "creche", "imposto", "escola" ou "Amazônia".
                </p>
              ) : (
                resultados.map((c) => <CategoryPanel key={c.id} cat={c} query={query} />)
              )}
            </div>
          ) : (
            <CategoryPanel cat={catAtiva} query="" />
          )}

          {!buscando && (
            <nav className="mt-12 flex items-center justify-between gap-3 border-t border-slate-200 pt-6">
              {(() => {
                const i = categorias.findIndex((c) => c.id === catAtiva.id);
                const prev = categorias[(i - 1 + categorias.length) % categorias.length];
                const next = categorias[(i + 1) % categorias.length];
                return (
                  <>
                    <button
                      onClick={() => selecionar(prev.id)}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm transition hover:border-slate-300 hover:shadow-sm"
                    >
                      <ArrowLeft size={18} aria-hidden="true" className="shrink-0 text-slate-500" />
                      <span>
                        <span className="block text-[11px] font-semibold uppercase text-slate-400">Anterior</span>
                        <span className="font-bold text-slate-800">
                          {prev.nome}
                        </span>
                      </span>
                    </button>
                    <button
                      onClick={() => selecionar(next.id)}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm transition hover:border-slate-300 hover:shadow-sm"
                    >
                      <span>
                        <span className="block text-[11px] font-semibold uppercase text-slate-400">Próxima</span>
                        <span className="font-bold text-slate-800">
                          {next.nome}
                        </span>
                      </span>
                      <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-slate-500" />
                    </button>
                  </>
                );
              })()}
            </nav>
          )}
        </main>
      </div>

      <section id="metodologia" className="methodology"><details><summary><Settings aria-hidden="true"/><span>Como funciona a comparação?</span><ChevronDown aria-hidden="true"/></summary><p className="method-note">Este comparativo sintetiza documentos públicos e reportagens. O conteúdo não passou por verificação independente integral; confira as referências e os períodos indicados em cada registro.</p><Overview onSelect={selecionar}/></details></section>
      </div>
      {sections.slice(1).map(item => <div key={item.id} id={`section-panel-${item.id}`} role="tabpanel" aria-labelledby={`section-tab-${item.id}`} hidden={section !== item.id}>
        {item.id === "falas-recentes" && <RecentStatements />}
        {item.id === "ocorrencias" && <ElectoralRecords />}
        {item.id === "vinculos-documentados" && <DocumentedConnections />}
        {item.id === "historico-flavio" && <HistoricalRecords />}
        {item.id === "atuacao-legislativa" && <LegislativeRecord />}
        {item.id === "projetos-lula" && <LulaLegislativeRecord />}
        {item.id === "conquistas-lula" && <LulaAchievements />}
        {item.id === "fontes" && <Bibliografia />}
      </div>)}
      <Footer />
    </div>
  );
}
