import { useState, useEffect } from "react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

interface FileInputProps {
  id: string;
  name: string;
  accept: string;
  value?: File | null;
  imageUrl?: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatFileSize = (size: number): string => {
  if (size === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

const FileInput = ({
  id,
  name,
  accept,
  value,
  imageUrl,
  handleFileChange,
}: FileInputProps) => {
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string }>({
    name: "",
    size: "0 Bytes",
  });
  const [preview, setPreview] = useState<string | null>(imageUrl || null);

  useEffect(() => {
    if (!value) {
      setFileInfo({ name: "", size: "0 Bytes" });
      setPreview(imageUrl || null);
    }
  }, [value, imageUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInfo({ name: file.name, size: formatFileSize(file.size) });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }

    handleFileChange(e);
  };

  const handleRemove = () => {
    setPreview(null);
    setFileInfo({ name: "", size: "0 Bytes" });

    const emptyEvent = {
      target: { files: null } as unknown as HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>;
    handleFileChange(emptyEvent);
  };

  return (
    <label
      htmlFor={id}
      className="flex h-36 w-full max-w-48 cursor-pointer flex-col items-center justify-center p-2 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary/10 overflow-hidden"
    >
      {preview ? (
        <div className="flex flex-col items-center gap-1">
          <div className="relative h-28 w-44 rounded-md overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="flex items-center gap-2 text-xs underline">
            <span className="text-primary">Change</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove();
              }}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5 text-center text-xs text-slate-500">
          <ImagePlus size={20} />
          <p className="underline">Click to select a file</p>
          <p>Supported file types: e.g. JPG, PNG</p>
          {fileInfo.name && (
            <div className="mt-2 text-xs text-slate-600">
              <p>{fileInfo.name}</p>
              <p>{fileInfo.size}</p>
            </div>
          )}
        </div>
      )}

      <input
        id={id}
        type="file"
        name={name}
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
};

export default FileInput;
