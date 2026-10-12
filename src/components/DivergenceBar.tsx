import { cn } from "../utils/cn";

const rotulos: Record<number, string> = {
  1: "Muito próximos",
  2: "Próximos",
  3: "Divergência moderada",
  4: "Divergência alta",
  5: "Divergência máxima",
};

export default function DivergenceBar({ nivel, compact = false }: { nivel: number; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", compact && "gap-1.5")}>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={cn(
              "rounded-sm transition-all",
              compact ? "h-1.5 w-4" : "h-2 w-6",
              i <= nivel
                ? nivel >= 5
                  ? "bg-rose-500"
                  : nivel >= 4
                    ? "bg-orange-500"
                    : nivel >= 3
                      ? "bg-amber-400"
                      : "bg-emerald-500"
                : "bg-slate-200",
            )}
          />
        ))}
      </div>
      <span className={cn("font-semibold text-slate-500", compact ? "text-[11px]" : "text-xs")}>{rotulos[nivel]}</span>
    </div>
  );
}
