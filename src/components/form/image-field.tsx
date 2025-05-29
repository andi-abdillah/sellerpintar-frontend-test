import { Label } from "../ui/label";
import FileInput from "../ui/file-input";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { ACCEPTED_FILE_TYPES } from "@/schema/article.schema";

interface ImageInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  imageUrl: string;
}

const ImageInputField = <T extends FieldValues>({
  control,
  name,
  label = "Thumbnail",
  imageUrl,
}: ImageInputFieldProps<T>) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <FileInput
              id={name}
              name={field.name}
              accept={ACCEPTED_FILE_TYPES.join(", ")}
              imageUrl={imageUrl}
              handleFileChange={(e) => field.onChange(e.target.files)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default ImageInputField;
