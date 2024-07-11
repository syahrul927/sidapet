import { FormControl, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Trash2, UploadIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";
import { Button, buttonVariants } from "../../button";
import { Label } from "../../label";
import { cn } from "~/lib/utils";
export default function AutoFormFile({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
  field,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const [file, setFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
        setFileName(file.name);
        field.onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveClick = () => {
    setFile(null);
  };

  return (
    <FormItem>
      {showLabel && (
        <AutoFormLabel
          label={fieldConfigItem?.label || label}
          isRequired={isRequired}
        />
      )}
      {!file && (
        <FormControl>
          <div>
            <Input
              type="file"
              {...fieldPropsWithoutShowLabel}
              id="filePicker01"
              onChange={handleFileChange}
              value={""}
              className="hidden"
            />
            <Label
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              htmlFor="filePicker01"
            >
              Upload &nbsp;
              <UploadIcon size={12} />
            </Label>
          </div>
        </FormControl>
      )}
      {file && (
        <div className="flex h-[40px] w-full flex-row items-center justify-between space-x-2 rounded-sm border bg-accent p-2 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white dark:text-black dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0">
          <p>{fileName}</p>
          <button onClick={handleRemoveClick} aria-label="Remove image">
            <Trash2 size={16} />
          </button>
        </div>
      )}
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
