"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

type Props = {
  value?: Date | undefined;                
  onChange?: (d?: Date | undefined) => void;
  id?: string;
  placeholder?: string;
};

export function DatePickerPopover({ value, onChange, id, placeholder = "Select a date" }: Props) {
  const [selected, setSelected] = useState<Date | undefined>(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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


  const handleSelect = (date?: Date) => {
    setSelected(date);
    if (onChange) onChange(date);
    setOpen(false);
  };

  return (
    <div className="relative inline-block bg-[#212121] outline-none w-[77%]" ref={containerRef}>
      <button
        type="button"
        id={id}
        className="btn btn-soft bg-[#373737] border w-full justify-start rounded-lg btn-lg text-left normal-case hover:bg-transparent hover:border-white font-normal focus:outline-none transition-all duration-200"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <div className="flex items-center justify-between w-full">
          <span className={`${selected ? "text-base-content" : "text-base-content/60"}`}>
            {selected ? format(selected, "EEE - MMM d, yyyy") : placeholder}
          </span>
          <svg
            className={`w-4 h-4 text-base-content/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
          <div className="rounded-lg border-1 border-white/20 bg-[#262626]/98 shadow-xl animate-in fade-in-0 zoom-in-95 duration-200" role="dialog" aria-label="Date picker">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              disabled={{ before: new Date() }}
              className="p-4"
              modifiersClassNames={{
                selected: "bg-[#4D4D4D] text-primary-content font-semibold rounded-md shadow-sm",
                today: "border-1 border-[#4D4D4D] rounded-lg font-semibold",
              }}
              classNames={{
                head_cell: "text-base-content/70 font-medium text-lg w-10 h-10",
                cell: "w-10 h-10 text-center text-lg relative",
                button: "w-full h-full hover:bg-base-200 rounded-md transition-colors duration-150 font-medium hover:bg-[#4D4D4D]",
                nav_button: "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
                nav_button_previous: "text-gray-200 hover:text-white hover:bg-white/10",
                nav_button_next: "text-gray-200 hover:text-white hover:bg-white/10",
                caption: "flex justify-center items-center py-2",
                caption_label: "text-lg font-semibold text-base-content",
                table: "w-full border-collapse",
                head: "border-b border-base-300",
                head_row: "mb-2",
                row: "mt-1",
              }}
              // components={{
              //   NavIcon: ({ dir, ...props }: any) =>
              //     dir === "prev" ? <MdChevronLeft {...props} className="w-5 h-5 text-white" /> : <MdOutlineChevronRight {...props} className="w-5 h-5 text-white" />,
              // } as any}
            />
          </div>
        </div>
      )}
    </div>
  );
}
