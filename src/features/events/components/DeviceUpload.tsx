import { Input } from "@/components/ui/Input";
import { MdOutlineInsertPhoto } from "react-icons/md";

export default function DeviceUpload({
  openFilePicker,
  fileInputRef,
  handleFileChange,
}: any) {
  return (
    <>
    <div className="h-70 flex flex-col justify-center items-center">
      <div
        className="w-sm my-4 max-w-lg h-[260px] border-2 border-dashed rounded-md flex items-center justify-center text-center cursor-pointer"
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
      <Input
        id="picture"
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      </div>
    </>
  );
}

//  <div className="modal-box bg-[#2D2E2C] border border-white/40 text-white max-w-lg py-8 h-[400px]">
//         <div className="tabs tabs-border pl-0 h-full">
//           <DeviceUpload
//             openFilePicker={openFilePicker}
//             handleFileChange={handleFileChange}
//             fileInputRef={fileInputRef}
//           />
//           <BrowseUpload confirmRemote={confirmRemote} />
//         </div>

//         <label
//           htmlFor="my_modal_7"
//           className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//           role="button"
//         >
//           ✕
//         </label>
//       </div>

//       <label className="modal-backdrop" htmlFor="my_modal_7">
//         Close
//       </label>
