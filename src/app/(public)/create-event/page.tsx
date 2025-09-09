"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-day-picker/style.css";
import { EventSchema } from "@/lib/schemas/event.schema";
import { DatePickerPopover } from "@/components/ui/DatePicker";
import { TimePickerPopover } from "@/components/ui/TimePicker";
import { MdOutlineInsertPhoto } from "react-icons/md";

type FormValues = z.infer<typeof EventSchema>;

export default function CreateEventPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
  // const singleDayEvent = watch("singleDayEvent");

  return (
    <div className="flex flex-col justify-between items-center p-6 space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex w-full justify-center gap-[6rem]"
      >
        <div className="banner w-[30%] flex flex-col items-center justify-center">
          <div className="img-container w-full flex justify-center w-[400px] h-[400px] border-2 border border-white bg-[#212121] rounded-lg relative">
          <img
            src="https://images.pexels.com/photos/1639813/pexels-photo-1639813.jpeg"
            className="rounded-lg object-cover p-2 w-full h-full"
            alt=""
          />
          <div>
            <button className="btn btn-circle absolute bottom-3 right-3 bg-black/60 text-white  hover:bg-black/80 transition"> <MdOutlineInsertPhoto size={24} /> </button>
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
            />
            {errors.title && (
              <p className="text-error text-sm">{errors.title.message}</p>
            )}
          </div>
          {/* Start time */}
          <ul className="list rounded-box w-100">
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
          {/* Location */}
          <div className="form-control flex flex-col w-96 mt-1">
            <label className="label text-lg text-[#d3d3d3]">Location</label>
            <input
              type="text"
              className="w-full input input-lg rounded-lg input-bordered font-semibold bg-[#373737] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
              placeholder="Venue / City"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-error text-sm">{errors.location.message}</p>
            )}
          </div>
          {/* Map URL (optional) */}
          <div className="form-control flex flex-col w-96 mt-1">
            <label className="label text-lg text-[#d3d3d3]">Map URL (optional)</label>
            <input
              type="url"
              className="w-full input input-lg rounded-lg input-bordered bg-[#373737] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
              placeholder="https://maps.google.com/…"
              {...register("mapUrl")}
            />
            {errors.mapUrl && (
              <p className="text-error text-sm">{errors.mapUrl.message}</p>
            )}
          </div>
          {/* Description */}
          <div className="form-control w-96 mt-1">
            <label className="label text-lg text-[#d3d3d3]">Description</label>
            <textarea
              placeholder="What's the event about?"
              className="w-full rounded-lg font-semibold textarea resize-none textarea-bordered textarea-xl bg-[#373737] focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-error text-sm">{errors.description.message}</p>
            )}
          </div>
          <div className="form-control mt-1 w-96">
          <button
            type="submit"
            className="w-full btn  btn-soft px-4  text-dark bg-[#ECECEC] btn-xl rounded-md active:scale-95 transition-transform"
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
