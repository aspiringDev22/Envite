'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { EventSchema } from '@/lib/schemas/event.schema';

type FormValues = z.infer<typeof EventSchema>;

export default function CreateEventPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: undefined,           
      singleDayEvent: true,
      startTime: '',
      endTime: '',
      mapUrl: '',
      slug: '',
      location: '',
    },
    mode: 'onSubmit',
  });

  




  const onSubmit = (data: FormValues) => {
    // You now have fully validated, correctly typed data:
    // - date is a Date object (thanks to valueAsDate)
    // - startTime/endTime are ISO-like datetime strings from <input type="datetime-local">
    console.log('validated payload →', data);
    // TODO: send to your API
    // await fetch('/api/events', { method: 'POST', body: JSON.stringify(data) })
    reset();
  };

  // Optional: react to "singleDayEvent" toggling
  const singleDayEvent = watch('singleDayEvent');

  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-6">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex justify-around gap-[6rem]">
        <div className="banner">

      <h1 className="text-2xl text-left align-self-start font-semibold">Create Event</h1>
      <img src="https://picsum.photos/seed/picsum/500/400" className='rounded-lg' alt="" />
        </div>
        <div className="event-inputs">
 <div className="form-control">
    <input
  type="text"
  placeholder="Enter Title"
  className="w-full bg-transparent border-none outline-none focus:ring-0 input-xl h-[52px]"
  {...register('title')}
/>


          {errors.title && (
            <p className="text-error text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            placeholder="What's this event about?"
            className="textarea textarea-bordered textarea-xl"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-error text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label">Date</label>
          <input
            type="date"
            className="input input-bordered"
            {...register('date', { valueAsDate: true })}
          />
          {errors.date && (
            <p className="text-error text-sm">{errors.date.message as string}</p>
          )}
        </div>

        {/* Single Day Event */}
        <div className="form-control">
          <label className="cursor-pointer label justify-start gap-3">
            <input
              type="checkbox"
              className="checkbox"
              {...register('singleDayEvent')}
            />
            <span className="label-text">Single day event</span>
          </label>
          {errors.singleDayEvent && (
            <p className="text-error text-sm">{errors.singleDayEvent.message as string}</p>
          )}
        </div>

        {/* Start time */}
        <div className="form-control">
          <label className="label">Start (date & time)</label>
          <input
            type="datetime-local"
            className="input input-bordered"
            placeholder="YYYY-MM-DDTHH:MM"
            {...register('startTime')}
          />
          {errors.startTime && (
            <p className="text-error text-sm">{errors.startTime.message}</p>
          )}
        </div>

        {/* End time (optional) */}
        <div className="form-control">
          <label className="label">End (date & time)</label>
          <input
            type="datetime-local"
            className="input input-bordered"
            placeholder="YYYY-MM-DDTHH:MM"
            {...register('endTime')}
            disabled={singleDayEvent === false ? false : false} // keep enabled; you can auto-calc if you want
          />
          {errors.endTime && (
            <p className="text-error text-sm">{errors.endTime.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">Location</label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Venue / City"
            {...register('location')}
          />
          {errors.location && (
            <p className="text-error text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Map URL (optional) */}
        <div className="form-control">
          <label className="label">Map URL</label>
          <input
            type="url"
            className="input input-bordered"
            placeholder="https://maps.google.com/…"
            {...register('mapUrl')}
          />
          {errors.mapUrl && (
            <p className="text-error text-sm">{errors.mapUrl.message}</p>
          )}
        </div>

        {/* Slug (optional; server will generate final) */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Page details (optional)</legend>

          <label className="label">Slug</label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="my-awesome-event"
            {...register('slug')}
          />
          {errors.slug && (
            <p className="text-error text-sm">{errors.slug.message}</p>
          )}
        </fieldset>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating…' : 'Create Event'}
        </button>

        </div>
             </form>
    </div>
  );
}
