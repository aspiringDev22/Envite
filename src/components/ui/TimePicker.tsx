"use client";

import { useState, useRef, useEffect } from "react";

export function TimePickerPopover() {
  const [selected, setSelected] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour < 12 ? 'AM' : 'PM';
      const minuteStr = minute.toString().padStart(2, '0');
      const hourStr = displayHour.toString().padStart(2, '0');
      timeOptions.push(`${hourStr}:${minuteStr} ${period}`);
    }
  }

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

  const setCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const roundedMinute = minute < 15 ? 0 : minute < 45 ? 30 : 0;
    const adjustedHour = minute >= 45 ? hour + 1 : hour;
    
    const displayHour = adjustedHour === 0 ? 12 : adjustedHour > 12 ? adjustedHour - 12 : adjustedHour;
    const period = adjustedHour < 12 ? 'AM' : 'PM';
    const timeString = `${displayHour.toString().padStart(2, '0')}:${roundedMinute.toString().padStart(2, '0')} ${period}`;
    
    setSelected(timeString);
    setOpen(false);
  };

  return (
    <div className="relative inline-block bg-[#212121] outline-none w-[40%]" ref={containerRef}>
      <button
        type="button"
         className="btn btn-soft bg-[#373737] border w-full justify-start rounded-lg btn-lg text-left normal-case hover:bg-transparent hover:border-white font-normal focus:outline-none transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <div className="flex items-center justify-between w-full">
          <span className={`${selected ? 'text-base-content' : 'text-base-content/60'}`}>
            {selected || "00:00"}
          </span>
          <svg 
            className={`w-4 h-4 text-base-content/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
            className="rounded-lg border border-base-300 bg-[#212121] shadow-xl animate-in fade-in-0 zoom-in-95 duration-200 w-full max-w-xs"
            role="dialog"
            aria-label="Time picker"
          >
            <div className="max-h-64 overflow-y-auto p-2">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`w-full px-3 py-2 text-sm text-left rounded-md transition-colors duration-150 ${
                    selected === time
                      ? 'bg-primary text-primary-content font-semibold'
                      : 'hover:bg-base-200 text-base-content'
                  }`}
                  onClick={() => {
                    setSelected(time);
                    setOpen(false);
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-600 p-3 flex gap-2">
              <button
                type="button"
                className="flex-1 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-150"
                onClick={setCurrentTime}
              >
                Now
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