"use client";
import { FormControl, FormItem, FormMessage } from "~/components/ui/form";
import { TimePicker } from "../../datetime-picker";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { type AutoFormInputComponentProps } from "../types";

export default function AutoFormDateTime({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <FormItem>
      <AutoFormLabel
        label={fieldConfigItem?.label || label}
        isRequired={isRequired}
      />
      <FormControl>
        <div className="flex">
          <TimePicker
            hourCycle={24}
            date={field.value}
            setDate={field.onChange}
            {...fieldProps}
          />
        </div>
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />

      <FormMessage />
    </FormItem>
  );
}
