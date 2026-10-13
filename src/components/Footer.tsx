import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-lg font-bold text-white">Nota metodológica</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              <li>
                <strong className="text-white">De onde vem cada informação.</strong> A base são os dois planos de
                governo registrados no TSE: “Diretrizes para o Programa de Transformação do Brasil” (Lula, 84 páginas,
                registrado em 7/8/2026) e “Para o Brasil Vencer o Atraso: Diretrizes do Plano de Governo 2027-2030”
                (Flávio Bolsonaro, 76 páginas, divulgado em 13/8/2026). Quando a posição não está no plano, o item é
                etiquetado como <em>declaração de campanha</em>, <em>atuação no Senado</em> ou <em>ação de governo</em>.
              </li>
              <li>
                <strong className="text-white">Cada proposta tem link.</strong> Os botões cinzas abaixo de cada item
                abrem a fonte original. Quando um dado aparece em apenas um veículo ou depende de interpretação de
                contexto, isso está sinalizado em um bloco amarelo de <em>ressalva</em>.
              </li>
              <li>
                <strong className="text-white">O que não está detalhado.</strong> A seção “O que os planos não dizem”
                identifica temas não especificados nos documentos consultados, sem presumir a posição do candidato.
              </li>
              <li>
                <strong className="text-white">Textos são sínteses, não citações.</strong> Resumimos trechos extensos.
                As aspas marcam expressões literais apuradas pelas fontes. Para o texto integral, leia os PDFs.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Checar na origem</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["TSE — DivulgaCandContas", "https://divulgacandcontas.tse.jus.br"],
                [
                  "Plano de governo de Lula (PDF)",
                  "https://static.poder360.com.br/uploads/2026/08/Programa-Governo-LULA-2026.pdf",
                ],
                [
                  "Plano de governo de Flávio Bolsonaro",
                  "https://planodegoverno2026.com.br/candidatos/presidente/flavio-bolsonaro/",
                ],
                ["Senado Federal — atividade parlamentar", "https://www25.senado.leg.br/web/atividade"],
                ["Portal gov.br — programas federais", "https://www.gov.br"],
              ].map(([nome, url]) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-1.5 text-slate-300 underline decoration-slate-600 underline-offset-4 transition hover:text-white"
                  >
                    {nome} <ArrowUpRight size={14} aria-hidden="true" className="shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
          <strong className="text-amber-200">Aviso:</strong> material informativo e independente, sem vínculo com
          partidos, campanhas ou órgãos públicos. O objetivo é organizar o debate público — não indicar voto nem
          substituir a leitura dos documentos oficiais. Posições podem mudar ao longo da campanha.
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Compara2026 · material informativo · referências e recortes temporais identificados em cada seção.
        </p>
      </div>
    </footer>
  );
}
