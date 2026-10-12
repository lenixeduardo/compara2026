import { candidatos, origemCores, type Categoria, type CandidateId, type Proposta } from "../data/propostas";
import { fontes } from "../data/fontes";
import { cn } from "../utils/cn";
import { useState } from "react";
import { FileText, ChevronRight, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import TopicIcon from "./TopicIcon";

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const safe = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safe})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.trim().toLowerCase() ? (
          <mark key={i} className="rounded bg-yellow-200 px-0.5 text-yellow-950">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function RefList({ refs }: { refs: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fontes</span>
      {refs.map((r) => {
        const f = fontes[r];
        if (!f) return null;
        return (
          <a
            key={r}
            href={f.url}
            target="_blank"
            rel="noreferrer"
            title={`${f.veiculo} — ${f.titulo} (${f.data})`}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-white hover:text-slate-900"
          >
            {f.veiculo}
            <ArrowUpRight size={12} aria-hidden="true" className="shrink-0 text-slate-500" />
          </a>
        );
      })}
    </div>
  );
}

function PropostaCard({ p, id, query, anchor }: { p: Proposta; id: CandidateId; query: string; anchor: string }) {
  const c = candidatos[id];
  return (
    <li id={anchor} className="group relative scroll-mt-24 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300">
      <div className="flex items-start gap-3">
        <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", c.classes.bullet)} />
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold leading-snug text-slate-900">
            <Highlight text={p.titulo} query={query} />
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            <Highlight text={p.texto} query={query} />
          </p>
          <span
            className={cn(
              "mt-3 inline-block rounded-md border px-2 py-0.5 text-[11px] font-semibold",
              origemCores[p.origem],
            )}
          >
            {p.origem}
          </span>
          {p.alerta && (
            <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[12px] leading-relaxed text-amber-900">
              <strong>Ressalva:</strong> {p.alerta}
            </p>
          )}
          <RefList refs={p.refs} />
        </div>
      </div>
    </li>
  );
}

function Coluna({ id, cat, query }: { id: CandidateId; cat: Categoria; query: string }) {
  const c = candidatos[id];
  return <section className={`candidate-column candidate-${id}`}>
    <header className="candidate-profile"><div className={`candidate-portrait portrait-${id}`} role="img" aria-label={`Retrato ilustrado de ${c.nome}`}/><div><h3>{c.nome}</h3><p>Resumo da proposta disponível<br className="desktop-break"/> na fonte oficial.</p><div className="candidate-accent"/></div></header>
    <details className="proposal-disclosure" open={query.trim() ? true : undefined}>
      <summary><span className="document-icon"><FileText aria-hidden="true"/></span><span><strong>{cat.nome}</strong><span>Resumo da proposta disponível na fonte oficial{ id === 'lula' ? ' do candidato' : ''}.</span></span><ChevronRight aria-hidden="true"/></summary>
      <ul className="proposal-list">{cat.propostas[id].map((p,index)=><PropostaCard key={p.titulo} p={p} id={id} query={query} anchor={`proposta-${cat.id}-${id}-${index}`}/>)}</ul>
    </details>
  </section>;
}

export default function CategoryPanel({ cat, query }: { cat: Categoria; query: string }) {
  const [sideBySide, setSideBySide] = useState(true);
  return (
    <article id={cat.id} className="scroll-mt-24">
      <header className="topic-heading"><div className="topic-title"><TopicIcon id={cat.id}/><div><h2>{cat.nome}</h2><p>Veja o que cada candidato apresenta sobre {cat.nome.toLowerCase()} em seus materiais oficiais.</p></div></div><button className="comparison-toggle" role="switch" aria-checked={sideBySide} onClick={()=>setSideBySide(!sideBySide)}><ArrowLeftRight aria-hidden="true"/><span>Comparação lado a lado</span><span className="switch-track"><span/></span></button></header>

      <div className={`candidate-comparison ${sideBySide ? "side-by-side" : "stacked"}`}>
        <Coluna id="lula" cat={cat} query={query} />
        <Coluna id="flavio" cat={cat} query={query} />
      </div>

      {cat.lacunas.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-300 bg-slate-100 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
             O que os planos não dizem
          </h3>
          <ul className="mt-3 space-y-3">
            {cat.lacunas.map((l,index) => (
              <li key={l.texto} id={`lacuna-${cat.id}-${index}`} className="scroll-mt-24">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-bold",
                      candidatos[l.candidato].classes.chip,
                    )}
                  >
                    {candidatos[l.candidato].nome}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{l.texto}</p>
                <RefList refs={l.refs} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
