"use client";

import React, { useCallback, useRef, useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import DeviceUpload from "./DeviceUpload";
import BrowseUpload from "./BrowseUpload";

export default function ImageUpload({
  onSelect,
  initialImage,
}: {
  onSelect?: (
    result: { type: "file"; file: File } | { type: "remote"; url: string }
  ) => void;
  initialImage?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage ?? null);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const photo = e.target.files?.[0] ?? null;
      setFile(photo);
      if (photo) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(String(reader.result));
        };
        reader.readAsDataURL(photo);
        const el = document.getElementById(
          "my_modal_7"
        ) as HTMLInputElement | null;
        if (el) el.checked = false;
      } else {
        setPreview(null);
      }
    },
    []
  );

  const confirmRemote = useCallback(
    (url: string) => {
      setPreview(url);
      onSelect?.({ type: "remote", url });
    },
    [onSelect]
  );

  const openFilePicker = useCallback(() => fileInputRef.current?.click(), []);

  return (
    <div className="banner w-[30%] flex flex-col items-center justify-center">
      <div className="img-container w-full flex justify-center w-[400px] h-[400px] border-2 border border-white bg-[#212121] rounded-lg relative">
        <img
          src={
            preview ??
            "https://images.pexels.com/photos/1639813/pexels-photo-1639813.jpeg"
          }
          className="rounded-lg object-cover p-2 w-full h-full"
          alt=""
        />
        <div>
          <label
            htmlFor="my_modal_7"
            className="btn btn-circle absolute bottom-3 right-3 bg-black/60 text-white hover:bg-black/80 transition"
          >
            <MdOutlineInsertPhoto size={24} />
          </label>
        </div>
      </div>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Upload or choose image"
      >
        <div className="modal-box bg-[#2D2E2C] border border-white/40 text-white max-w-lg py-8 h-[400px]">
          <div className="tabs tabs-border pl-0 h-full">
            <DeviceUpload
              openFilePicker={openFilePicker}
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
            <BrowseUpload confirmRemote={confirmRemote} />
          </div>

          <label
            htmlFor="my_modal_7"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            role="button"
          >
            ✕
          </label>
        </div>

        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
}
