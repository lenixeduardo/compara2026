import { ArrowRight } from "lucide-react";
import { categorias, origemCores, type Origem } from "../data/propostas";
import { cn } from "../utils/cn";
import TopicIcon from "./TopicIcon";

const origens: { nome: Origem; desc: string }[] = [
  { nome: "Plano de governo (TSE)", desc: "Consta do programa registrado na Justiça Eleitoral." },
  { nome: "Declaração de campanha", desc: "Fala em sabatina, live, entrevista, evento ou vídeo de campanha." },
  { nome: "Atuação no Senado", desc: "Voto registrado ou projeto apresentado no mandato parlamentar." },
  { nome: "Ação de governo", desc: "Programa, MP ou lei já em execução pelo Executivo federal." },
];

export default function Overview({ onSelect }: { onSelect: (id: string) => void }) {
  const totalItens = categorias.reduce((total, categoria) => total + categoria.propostas.lula.length + categoria.propostas.flavio.length, 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Temas do comparativo</h2>
          <p className="mt-2 text-sm text-slate-600">
            Consulte os registros de cada candidato organizados por assunto, com as fontes correspondentes.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {categorias.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelect(c.id)}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition-colors hover:border-slate-300"
              >
                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-lg")}>
                  <TopicIcon id={c.id} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-900">{c.nome}</span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {c.propostas.lula.length + c.propostas.flavio.length} itens documentados
                  </span>
                </span>
                <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Escopo da comparação</p>
            <p className="mt-2 text-5xl font-black">
              {categorias.length} <span className="text-xl text-slate-400">temas</span>
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {totalItens} itens apresentados por tema e candidato. A organização não atribui notas ou classificações aos candidatos.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Como ler as etiquetas</p>
            <ul className="mt-3 space-y-2.5">
              {origens.map((f) => (
                <li key={f.nome}>
                  <span className={cn("inline-block rounded-md border px-2 py-0.5 text-[11px] font-semibold", origemCores[f.nome])}>
                    {f.nome}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{f.desc}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-500">
              Cada item apresenta links para consultar as fontes em uma nova aba.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
