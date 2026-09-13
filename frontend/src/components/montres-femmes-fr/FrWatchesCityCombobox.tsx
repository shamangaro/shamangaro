"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FR_CITY_OPTIONS, FR_COPY } from "./copy";

interface FrWatchesCityComboboxProps {
  value: string;
  onChange: (city: string) => void;
  error?: string;
  inputClassName?: string;
}

export function FrWatchesCityCombobox({
  value,
  onChange,
  error,
  inputClassName,
}: FrWatchesCityComboboxProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = FR_CITY_OPTIONS.find((city) => city.value === value);
  const [query, setQuery] = useState(selected?.label ?? value);

  useEffect(() => {
    const match = FR_CITY_OPTIONS.find((city) => city.value === value);
    setQuery(match?.label ?? value);
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

  const needle = query.trim().toLowerCase();
  const filtered = FR_CITY_OPTIONS.filter((city) => {
    if (!needle) return true;
    return (
      city.label.toLowerCase().includes(needle) || city.value.includes(query.trim())
    );
  });

  const pick = (cityValue: string, label: string) => {
    onChange(cityValue);
    setQuery(label);
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
        placeholder={FR_COPY.cityPlaceholder}
        autoComplete="address-level2"
      />
      {open && filtered.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-2xl border border-[#D8E8DC] bg-white py-1 shadow-lg"
        >
          {filtered.map((city) => (
            <li key={city.value} role="option" aria-selected={value === city.value}>
              <button
                type="button"
                className={cn(
                  "w-full px-4 py-2.5 text-start text-sm transition hover:bg-[#FAF7F2]",
                  value === city.value && "bg-[#FAF7F2] font-semibold text-[#134A35]"
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(city.value, city.label)}
              >
                {city.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
