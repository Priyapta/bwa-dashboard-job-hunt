import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type customUploadProps = {
  form: any;
  name: string;
};
function CustomUpload({ form, name }: customUploadProps) {
  const [previewImg, setPreviewImg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      form.setValue(name, e.target.files[0]);
    }
  };

  const handleUploadFile = () => {
    inputRef.current?.click();
  };

  //   useEffect(() => {
  //     async function getImage() {
  //       const urlImg = await supabaseGetpublicURL(
  //         form.getValues(name),
  //         "company"
  //       );
  //       setPreviewImg(urlImg);
  //     }
  //     if (form.getValues(name) !== "") {
  //       getImage();
  //     }
  //   }, []);
  return (
    <div className="inline-flex items-center gap-8">
      <div>
        {previewImg !== "" && (
          <Image width={120} height={120} src={previewImg} alt={previewImg} />
        )}
      </div>
      <div
        className="py-6 px-19 border-2 cursor-pointer border-bluePrimary border-dashed w-max rounded-sm"
        onClick={handleUploadFile}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-bluePrimary mx-auto mb-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25" />
        </svg>
        <div className="text-center">
          <span className="text-bluePrimary font-medium">Click to replace</span>{" "}
          <span className="text-gray-500"> or drag and drop</span>
        </div>
        <div className="text-gray-600 text-sm">
          PNG, JPG, JPEG (max. 400 x 400 px)
        </div>
        <Input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
    </div>
  );
}

export default CustomUpload;
