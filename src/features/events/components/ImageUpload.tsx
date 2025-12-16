"use client";

import React, { useCallback, useRef, useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import DeviceUpload from "./DeviceUpload";
import BrowseUpload from "./BrowseUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <div className="img-container w-full flex justify-center w-[400px] h-[400px] border-1 border border-[#62748E] bg-50 rounded-lg relative">
        <img
          src={
            preview ??
            "https://images.pexels.com/photos/1639813/pexels-photo-1639813.jpeg"
          }
          className="rounded-lg object-cover p-3 w-full h-full"
          alt=""
        />
        <div>
          <Dialog>
            <DialogTrigger>
              <Button
                type="button"
                className="rounded-full absolute bottom-3 right-3 bg-black/40 text-white hover:bg-black/80 transition text-lg p-[4px]"
              >
                <MdOutlineInsertPhoto size={32} />
              </Button>
            </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <Tabs defaultValue="device" className="w-full">
                    <TabsList className="mt-3">
                      <TabsTrigger value="device">
                        Upload from Device
                      </TabsTrigger>
                      <TabsTrigger value="browse">
                        Browse Remote Images
                      </TabsTrigger>
                    </TabsList>
                  <TabsContent value="device">
                    <DeviceUpload
                      openFilePicker={openFilePicker}
                      handleFileChange={handleFileChange}
                      fileInputRef={fileInputRef}
                    />
                  </TabsContent>
                  <TabsContent value="browse">
                    <BrowseUpload confirmRemote={confirmRemote} />
                  </TabsContent>
                </Tabs>
                <DialogDescription>
                  Make changes to your picture here
                </DialogDescription>
              </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
