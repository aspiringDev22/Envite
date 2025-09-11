import { MdOutlineInsertPhoto } from "react-icons/md";

export default function DeviceUpload({ openFilePicker, fileInputRef, handleFileChange }: any) {
  return (
    <>
      <input
        type="radio"
        name="my_tabs_2"
        className="tab text-lg font-semibold"
        aria-label="Upload"
        defaultChecked
      />
      <div className="tab-content border-base-300 bg-[#212121] p-[15%]">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
            <div
              className="w-sm max-w-lg h-[160px] border-2 border-dashed rounded-md flex items-center justify-center text-center cursor-pointer"
              onClick={openFilePicker}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && openFilePicker()
              }
            >
              <div>
                <MdOutlineInsertPhoto size={36} className="mx-auto mb-2" />
                <div className="text-sm text-[#cfcfcf]">
                  Click to choose a file or drag & drop
                </div>
                <div className="text-xs text-[#9b9b9b]">PNG, JPG — max 5MB</div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
}
