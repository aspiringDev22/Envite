"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-day-picker/style.css";
import { EventSchema } from "@/lib/schemas/event.schema";
import { DatePickerPopover } from "@/components/ui/DatePicker";
import { TimePickerPopover } from "@/components/ui/TimePicker";
import { MdOutlineInsertPhoto } from "react-icons/md";
import toast from "react-hot-toast";

type FormValues = z.infer<typeof EventSchema>;

export default function CreateEventPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setFocus,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      startTime: undefined,
      endTime: undefined,
      mapUrl: "",
      location: undefined,
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    reset();
  };

  const onError = (errs: any) => {
    const keys = Object.keys(errs || {});
    if (keys.length === 0) return;
    const firstKey = keys[0];
    try {
      setFocus(firstKey as any);
    } catch {}

    if (keys.length === 1) {
      const m = errs[firstKey]?.message ?? "Please fill the required field";
      toast.error(String(m), { duration: 3000, icon: "⚠️" });
    } else {
      toast.error("Please complete all required fields", {
        duration: 3000,
        icon: "⚠️",
      });
    }

    console.warn("validation errors", errs);
  };

  return (
    <div className="flex flex-col justify-between items-center p-6 space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="space-y-4 flex w-full justify-center gap-[6rem]"
        noValidate
      >
        <div className="banner w-[30%] flex flex-col items-center justify-center">
          <div className="img-container w-full flex justify-center w-[400px] h-[400px] border-2 border border-white bg-[#212121] rounded-lg relative">
            <img
              src="https://images.pexels.com/photos/1639813/pexels-photo-1639813.jpeg"
              className="rounded-lg object-cover p-2 w-full h-full"
              alt=""
            />
            <div>
              <button
                type="button"
                className="btn btn-circle absolute bottom-3 right-3 bg-black/60 text-white hover:bg-black/80 transition"
              >
                <MdOutlineInsertPhoto size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="event-inputs w-[40%] pl-[5rem]">
          <div className="flex w-full flex-col gap-4">
            <div className="form-control w-96">
              <input
                type="text"
                placeholder="Enter Title"
                className="w-full h-[52px] bg-transparent border-none outline-none focus:ring-0 input-[xl] text-4xl font-bold text-white"
                {...register("title")}
                aria-invalid={errors.title ? "true" : "false"}
              />
            </div>

            <ul className="list rounded-box w-100">
              <li className="list-row pl-0 py-0 mt-2 flex justify-between items-center gap-4">
                <div className="form-control flex gap-3 w-full">
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePickerPopover
                        value={field.value}
                        onChange={(d) => field.onChange(d)}
                        placeholder="Start date"
                      />
                    )}
                  />
                   <Controller
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                      <TimePickerPopover
                        value={field.value}
                        onChange={(d) => field.onChange(d)}
                        placeholder="00:00"
                      />
                    )}
                  />
                </div>
              </li>
              <li className="list-row pl-0 py-0 mt-2 flex justify-between items-center gap-4">
                <div className="form-control flex gap-3 w-full">
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <DatePickerPopover
                        value={field.value}
                        onChange={(d) => field.onChange(d)}
                        placeholder="End date"
                      />
                    )}
                  />
                   <Controller
                    control={control}
                    name="endTime"
                    render={({ field }) => (
                      <TimePickerPopover
                        value={field.value}
                        onChange={(d) => field.onChange(d)}
                        placeholder="00:00"
                      />
                    )}
                  />
                </div>
              </li>
            </ul>

            <div className="form-control flex flex-col w-96 mt-1">
              <label className="label text-lg text-[#d3d3d3]">Location</label>
              <input
                type="text"
                className="w-full input input-lg rounded-lg input-bordered font-semibold bg-[#373737] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
                placeholder="Venue / City"
                {...register("location")}
                aria-invalid={errors.location ? "true" : "false"}
              />
            </div>

            <div className="form-control flex flex-col w-96 mt-1">
              <label className="label text-lg text-[#d3d3d3]">
                Map URL (optional)
              </label>
              <input
                type="url"
                className="w-full input input-lg rounded-lg input-bordered bg-[#373737] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
                placeholder="https://maps.google.com/…"
                {...register("mapUrl")}
                aria-invalid={errors.mapUrl ? "true" : "false"}
              />
            </div>

            <div className="form-control w-96 mt-1">
              <label className="label text-lg text-[#d3d3d3]">
                Description
              </label>
              <textarea
                placeholder="What's the event about?"
                className="w-full rounded-lg font-semibold textarea resize-none textarea-bordered textarea-xl bg-[#373737] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
                {...register("description")}
                aria-invalid={errors.description ? "true" : "false"}
              />
            </div>

            <div className="form-control mt-1 w-96">
              <button
                type="submit"
                className="w-full btn btn-soft px-4 text-dark bg-[#ECECEC] btn-xl rounded-md active:scale-95 transition-transform"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating…" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
