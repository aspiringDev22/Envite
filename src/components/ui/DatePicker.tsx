"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

export function DatePickerPopover() {
  const [selected, setSelected] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="relative inline-block bg-[#212121] outline-none w-[80%]" ref={containerRef}>
      <button
        type="button"
        className="btn btn-soft bg-[#373737] border w-full justify-start rounded-lg btn-lg text-left normal-case hover:bg-transparent hover:border-white font-normal focus:outline-none transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <div className="flex items-center justify-between w-full">
          <span className={`${selected ? 'text-base-content' : 'text-base-content/60'}`}>
            {selected ? format(selected, "EEEE, MMMM d, yyyy") : "Select a date"}
          </span>
          <svg 
            className={`w-4 h-4 text-base-content/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-max">
          <div 
            className="rounded-lg border border-base-300 bg-[#212121] shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
            role="dialog"
            aria-label="Date picker"
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(date) => {
                setSelected(date);
                setOpen(false);
              }}
              className="p-4"
              modifiersClassNames={{
                selected: "bg-primary text-primary-content font-semibold rounded-md shadow-sm",
                today: "border-2 border-primary rounded-md font-semibold",
              }}
              classNames={{
                head_cell: "text-base-content/70 font-medium text-sm w-10 h-10",
                cell: "w-10 h-10 text-center text-sm relative",
                button: "w-full h-full hover:bg-base-200 rounded-md transition-colors duration-150 font-medium",
                nav_button: "btn btn-ghost btn-sm",
                nav_button_previous: "hover:bg-base-200",
                nav_button_next: "hover:bg-base-200",
                caption: "flex justify-center items-center py-2",
                caption_label: "text-lg font-semibold text-base-content",
                table: "w-full border-collapse",
                head: "border-b border-base-300",
                head_row: "mb-2",
                row: "mt-1",
              }}
            />
            
            <div className="border-t border-gray-600 p-3 flex gap-2">
              <button
                type="button"
                className="flex-1 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-150"
                onClick={() => {
                  setSelected(new Date());
                  setOpen(false);
                }}
              >
                Today
              </button>
              <button
                type="button"
                className="flex-1 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-150"
                onClick={() => {
                  setSelected(undefined);
                  setOpen(false);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}