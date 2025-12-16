"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-day-picker/style.css";
import { EventSchema } from "@/lib/schemas/event.schema";
import toast from "react-hot-toast";
import ImageUpload from "@/features/events/components/ImageUpload";
import InputForm from "@/features/events/components/InputForm";

type FormValues = z.infer<typeof EventSchema>;

export default function CreateEventPage() {
  const {
    handleSubmit,
    // formState: { errors, isSubmitting },
    reset,
    setFocus,
    // control,
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

  const onSubmit = () => {
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
        <ImageUpload />
        <InputForm />
      </form>
    </div>
  );
}
