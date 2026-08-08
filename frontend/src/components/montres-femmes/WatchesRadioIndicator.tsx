import { cn } from "@/lib/utils";



export function WatchesRadioIndicator({

  selected,

  className,

}: {

  selected: boolean;

  className?: string;

}) {

  return (

    <span

      className={cn(

        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",

        selected

          ? "border-[#B8924A] bg-[#B8924A] shadow-[0_0_0_3px_rgba(184,146,74,0.25)]"

          : "border-[#A8C9B4] bg-white",

        className

      )}

      aria-hidden

    >

      {selected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}

    </span>

  );

}