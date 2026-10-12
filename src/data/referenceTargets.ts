import { candidatos, categorias } from "./propostas";

export function categoryForHash(hash: string) {
  const id = hash.replace(/^#/, "");
  return categorias.find(cat => id === cat.id || id.startsWith(`proposta-${cat.id}-`) || id.startsWith(`lacuna-${cat.id}-`))?.id;
}

export const referenceTargets: Record<string, { id: string; label: string }[]> = {};
for (const cat of categorias) {
  for (const candidate of ["lula", "flavio"] as const) {
    cat.propostas[candidate].forEach((proposal, index) => {
      for (const ref of proposal.refs) {
        (referenceTargets[ref] ??= []).push({ id: `proposta-${cat.id}-${candidate}-${index}`, label: `${cat.nome} · ${candidatos[candidate].nome} · ${proposal.titulo}` });
      }
    });
  }
  cat.lacunas.forEach((gap, index) => {
    for (const ref of gap.refs) {
      (referenceTargets[ref] ??= []).push({ id: `lacuna-${cat.id}-${index}`, label: `${cat.nome} · ${candidatos[gap.candidato].nome} · O que os planos não dizem` });
    }
  });
}
