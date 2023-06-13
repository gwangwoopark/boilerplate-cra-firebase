import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { classNames } from "../libs/utility";

interface InputProps {
  title: string;
  type?: string;
  fieldError?: FieldError;
  registeredData: UseFormRegisterReturn<any>;
}

export default function Input({
  title,
  type,
  fieldError,
  registeredData,
}: InputProps) {
  return (
    <div className="space-y-1 sm:space-y-2">
      <div className="flex justify-between">
        <label
          htmlFor={registeredData.name}
          className="block text-sm font-medium sm:leading-6 text-gray-900 pl-0.5"
        >
          {title}
        </label>
        <div className="text-sm font-medium leading-6 text-red-500">
          {fieldError && <div>{fieldError.message}</div>}
        </div>
      </div>
      <div>
        <input
          {...registeredData}
          type={type}
          className={classNames(
            "block w-full px-1.5 py-1.5 rounded-md shadow-sm border border-1 border-slate-400 focus:border-slate-500 ring-inset focus:ring-1 focus:ring-slate-500 outline-none text-gray-900 text-sm sm:leading-6",
            !fieldError ? "ring-0" : "border-red-500"
          )}
        />
      </div>
    </div>
  );
}
