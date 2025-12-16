import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-day-picker/style.css";
import { EventSchema } from "@/lib/schemas/event.schema";
import { DatePickerPopover } from "@/components/ui/DatePicker";
import { TimePickerPopover } from "@/components/ui/TimePicker";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormValues = z.infer<typeof EventSchema>;

export default function InputForm() {
  const {
    register,
    formState: { errors, isSubmitting },
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

  return (
    <div className="event-inputs w-[40%] pl-[5rem]">
      <div className="flex w-full flex-col gap-4">
        <div className="form-control w-100">
          <Input
            type="text"
            spellCheck={false}
            placeholder="Enter Title"
            className="
    w-full text-[#62748E] bg-transparent shadow-none !border-none !outline-none
    h-[5rem] p-0
    !text-[2.5rem] !leading-[1.1] !font-[500]   !ring-0
        focus:!border-0
        focus:!outline-none
        focus:!shadow-none
        focus:!ring-0
        focus-visible:!border-0
        focus-visible:!outline-none
        focus-visible:!ring-0
        focus-visible:!ring-offset-0
  "
          />
        </div>

        <ul className="list rounded-box w-100">
          <li className="list-row pl-0 py-0 mt-0 flex justify-between items-center gap-4">
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

        <div className="form-control flex flex-col w-100 mt-1">
          <Input
            type="text"
            className="w-full h-12 p-2 !text-lg leading-tight rounded-lg  font-medium shadow-none focus:ring-0 focus:outline-none"
            placeholder="Add Event Location"
            {...register("location")}
            aria-invalid={errors.location ? "true" : "false"}
          />
        </div>

        <div className="form-control flex flex-col w-100 mt-1">
          <Input
            type="url"
             className="w-full h-12 p-2 !text-lg leading-tight rounded-lg  font-medium shadow-none  focus:ring-0 focus:outline-none"
            placeholder="https://maps.google.com/…"
            {...register("mapUrl")}
            aria-invalid={errors.mapUrl ? "true" : "false"}
          />
        </div>

        <div className="form-control w-100 mt-1">
          <Textarea
            placeholder="What's the event about?"
            className="w-full h-12 p-2 !text-lg leading-tight rounded-lg font-medium shadow-none resize-none textarea-bordered  focus:border-[#d3d3d3] focus:ring-0 focus:outline-none"
            {...register("description")}
            aria-invalid={errors.description ? "true" : "false"}
          />
        </div>

        <div className="form-control mt-1 w-100">
          <Button
            type="submit"
            size="lg"
            className="w-full py-4 rounded-md active:scale-95 transition-transform"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating…" : "Create Event"}
          </Button>
        </div>
      </div>
    </div>
  );
}
