import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  id: string;
  placeholder: string;
  control: Control<T>;
  name: Path<T>;
}

const InputField = <T extends FieldValues>({
  label,
  id,
  placeholder,
  control,
  name,
}: InputFieldProps<T>) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              id={id}
              placeholder={placeholder}
              autoComplete={name}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default InputField;
