import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Control, FieldValues, Path } from "react-hook-form";

interface PasswordFieldProps<T extends FieldValues> {
  label: string;
  id: string;
  placeholder: string;
  control: Control<T>;
  name: Path<T>;
}

const PasswordField = <T extends FieldValues>({
  label,
  id,
  placeholder,
  control,
  name,
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="relative">
            <FormControl>
              <Input
                id={id}
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                autoComplete={name}
                className="pr-10"
                {...field}
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PasswordField;
