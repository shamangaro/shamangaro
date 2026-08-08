"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MOROCCAN_CITIES } from "./config";

interface WatchesCityComboboxProps {
  value: string;
  onChange: (city: string) => void;
  error?: string;
  inputClassName?: string;
}

export function WatchesCityCombobox({
  value,
  onChange,
  error,
  inputClassName,
}: WatchesCityComboboxProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const filtered = MOROCCAN_CITIES.filter((city) =>
    city.includes(query.trim())
  );

  const pick = (city: string) => {
    onChange(city);
    setQuery(city);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <input
        id="watches-city"
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (!e.target.value.trim()) onChange("");
        }}
        onFocus={() => setOpen(true)}
        className={cn(inputClassName, !value && "text-[#888]")}
        placeholder="اختاري المدينة"
        autoComplete="address-level2"
      />
      {open && filtered.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-2xl border border-[#D8E8DC] bg-white py-1 shadow-lg"
        >
          {filtered.map((city) => (
            <li key={city} role="option" aria-selected={value === city}>
              <button
                type="button"
                className={cn(
                  "w-full px-4 py-2.5 text-start text-sm transition hover:bg-[#FAF7F2]",
                  value === city && "bg-[#FAF7F2] font-semibold text-[#1A5C42]"
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(city)}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
