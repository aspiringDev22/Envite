"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { EventSchema } from "@/lib/schemas/event.schema";
import { DatePickerPopover } from "@/components/ui/DatePicker";
import { TimePickerPopover } from "@/components/ui/TimePicker";

type FormValues = z.infer<typeof EventSchema>;

export default function CreateEventPage() {
  const [startDate, setStartDate] = React.useState<Date>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      singleDayEvent: true,
      startTime: "",
      endTime: "",
      mapUrl: "",
      slug: "",
      location: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    // You now have fully validated, correctly typed data:
    // - date is a Date object (thanks to valueAsDate)
    // - startTime/endTime are ISO-like datetime strings from <input type="datetime-local">
    console.log("validated payload →", data);
    // TODO: send to your API
    // await fetch('/api/events', { method: 'POST', body: JSON.stringify(data) })
    reset();
  };

  // Optional: react to "singleDayEvent" toggling
  const singleDayEvent = watch("singleDayEvent");

  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex justify-around gap-[6rem]"
      >
        <div className="banner">
          <h1 className="text-2xl text-left align-self-start font-semibold">
            Create Event
          </h1>
          <img
            src="https://picsum.photos/seed/picsum/500/400"
            className="rounded-lg"
            alt=""
          />
        </div>
        <div className="event-inputs flex flex-col gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Enter Title"
              className="w-full bg-transparent border-none outline-none focus:ring-0 input-xl h-[52px]"
              {...register("title")}
            />

            {errors.title && (
              <p className="text-error text-sm">{errors.title.message}</p>
            )}
          </div>
          {/* Start time */}
          <ul className="list rounded-box">
            <li className="list-row pl-0 py-0 flex justify-between items-center gap-4">
              <div className="form-control flex gap-3 w-full">
                <DatePickerPopover />
                <TimePickerPopover />
                {errors.startTime && (
                  <p className="text-error text-sm">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
            </li>
            <li className="list-row pl-0 py-0 mt-2 flex justify-between items-center gap-4">
              <div className="form-control flex gap-3 w-full">
                <DatePickerPopover />
                <TimePickerPopover />
                {errors.startTime && (
                  <p className="text-error text-sm">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
            </li>
          </ul>
          {/* End time (optional) */}
          {/* <ul className="list rounded-box">
            <li className="list-row pl-0 flex justify-between items-center gap-4">
              <div className="form-control flex gap-3 w-full">
                <DatePickerPopover />
                <TimePickerPopover />
                {errors.startTime && (
                  <p className="text-error text-sm">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
            </li>
          </ul> */}
          {/* Location */}
          <div className="form-control mt-4">
            <label className="label">Location</label>
            <input
              type="text"
              className="input input-bordered bg-[#212121] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
              placeholder="Venue / City"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-error text-sm">{errors.location.message}</p>
            )}
          </div>
          {/* Map URL (optional) */}
          <div className="form-control mt-4">
            <label className="label">Map URL (optional)</label>
            <input
              type="url"
              className="input input-bordered bg-[#212121] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
              placeholder="https://maps.google.com/…"
              {...register("mapUrl")}
            />
            {errors.mapUrl && (
              <p className="text-error text-sm">{errors.mapUrl.message}</p>
            )}
          </div>
          {/* Description */}
          <div className="form-control mt-4">
            <label className="label">Description</label>
            <textarea
              placeholder="What's this event about?"
              className="textarea textarea-bordered textarea-xl bg-[#212121] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-error text-sm">{errors.description.message}</p>
            )}
          </div>
          {/* Slug (optional; server will generate final) */}
          {/* <fieldset className="fieldset bg-[#212121] border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend">Page details (optional)</legend>

            <label className="label">Slug</label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="my-awesome-event"
              {...register("slug")}
            />
            {errors.slug && (
              <p className="text-error text-sm">{errors.slug.message}</p>
            )}
          </fieldset> */}
          <div className="form-control mt-4 w-full">
          <button
            type="submit"
            className="btn  btn-soft px-4 mt-4 text-white bg-gradient-to-r from-dark to-dark btn-xl rounded-md active:scale-95 transition-transform"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating…" : "Create Event"}
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}
