import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { listaFontes, type TipoFonte } from "../data/fontes";
import { categorias } from "../data/propostas";
import { cn } from "../utils/cn";
import { referenceTargets } from "../data/referenceTargets";

const tipoCor: Record<TipoFonte, string> = {
  "Documento oficial": "bg-emerald-100 text-emerald-800 border-emerald-200",
  Jornalismo: "bg-sky-100 text-sky-800 border-sky-200",
  "Levantamento setorial": "bg-violet-100 text-violet-800 border-violet-200",
};

const filtros: ("Todas" | TipoFonte)[] = ["Todas", "Documento oficial", "Jornalismo", "Levantamento setorial"];

export default function Bibliografia() {
  const [filtro, setFiltro] = useState<"Todas" | TipoFonte>("Todas");

  // Conta em quantos itens do site cada fonte é usada.
  const uso = useMemo(() => {
    const mapa: Record<string, number> = {};
    for (const cat of categorias) {
      const todos = [...cat.propostas.lula, ...cat.propostas.flavio];
      for (const p of todos) for (const r of p.refs) mapa[r] = (mapa[r] ?? 0) + 1;
      for (const l of cat.lacunas) for (const r of l.refs) mapa[r] = (mapa[r] ?? 0) + 1;
    }
    return mapa;
  }, []);

  const lista = listaFontes
    .filter((f) => filtro === "Todas" || f.tipo === filtro)
    .sort((a, b) => (uso[b.id] ?? 0) - (uso[a.id] ?? 0));

  return (
    <section id="fontes" className="scroll-mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          Bibliografia completa <span className="text-slate-300">·</span>{" "}
          <span className="text-slate-400">{listaFontes.length} fontes</span>
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Toda informação do site remete a pelo menos uma destas referências. Os dois documentos-base são os planos de
          governo registrados na Justiça Eleitoral; o restante são reportagens e levantamentos setoriais que leram,
          cotejaram e checaram esses documentos. Clique no título de uma referência para ir ao assunto no Compara. Em “Assuntos relacionados”, escolha a proposta específica. O botão “Abrir fonte original” abre o documento externo.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                filtro === f
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {lista.map((f) => (
            <li key={f.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <a
                href={referenceTargets[f.id]?.[0] ? `#${referenceTargets[f.id][0].id}` : f.url}
                className="flex gap-3 rounded-md transition hover:text-red-700"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{f.veiculo}</span>
                    <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-semibold", tipoCor[f.tipo])}>
                      {f.tipo}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">{f.data}</span>
                    {uso[f.id] ? (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                        usada {uso[f.id]}×
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-slate-600">{f.titulo}</span>
                  <span className="mt-1.5 block break-all text-[11px] text-slate-500">{f.url}</span>
                </span>
              </a>
              {referenceTargets[f.id]?.length > 0 && <details className="record-detail">
                <summary>Assuntos relacionados ({referenceTargets[f.id].length})</summary>
                <ul className="mt-3 space-y-3">{referenceTargets[f.id].map(target => <li key={target.id}><a className="text-sm underline underline-offset-4 hover:text-red-700" href={`#${target.id}`}>{target.label}</a></li>)}</ul>
              </details>}
              <a href={f.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-400">Abrir fonte original <ArrowUpRight size={14} aria-hidden="true" className="ml-1 shrink-0" /></a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
