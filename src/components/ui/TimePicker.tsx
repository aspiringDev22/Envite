"use client";

import { useState, useRef, useEffect } from "react";

type Props = {
  value?: string; 
  onChange?: (v?: string) => void; 
  placeholder?: string;
};

export function TimePickerPopover({ value, onChange, placeholder = "00:00" }: Props) {
  const [selected, setSelected] = useState<string | undefined>(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const timeOptions: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour < 12 ? "AM" : "PM";
      const minuteStr = minute.toString().padStart(2, "0");
      const hourStr = displayHour.toString().padStart(2, "0");
      timeOptions.push(`${hourStr}:${minuteStr} ${period}`);
    }
  }

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const handleSelect = (time: string) => {
    setSelected(time);
    if (onChange) onChange(time);
    setOpen(false);
  };

  return (
    <div className="relative inline-block bg-[#f9f9f9] outline-none w-[44%]" ref={containerRef}>
      <button
        type="button"
        className="bg-[#fafafa] text-[#62748E] border w-full justify-start rounded-lg px-4 py-2 text-left normal-case font-normal  transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <div className="flex items-center justify-between w-full">
          <span className={`text-[1rem] ${selected ? "text-base-content" : "text-base-content/60"}`}>
            {selected || placeholder}
          </span>
          <svg
            className={`w-4 h-4 text-base-content/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 left-0 right-0">
          <div
            className="rounded-lg border-1 border-[#62748E]/20 bg-[#fafafa]/100 shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
            role="dialog"
            aria-label="Time picker"
          >
            <div className="max-h-64 overflow-y-auto p-2">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`w-full px-3 mt-1 py-2 text-[#62748E] text-sm text-left rounded-md cursor-pointer transition-colors duration-150 ${
                    selected === time
                      ? "bg-[#efefef] text-primary-content font-semibold"
                      : "hover:bg-[#efefef] text-base-content"
                  }`}
                  onClick={() => handleSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
