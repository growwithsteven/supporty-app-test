import { ContactReqPayload, Message, MessageType } from "@/types/message";
import { assert } from "@toss/assert";
import { CONTACT_FORM_TEXT } from "../../../_constants/contact-form";
import { useForm } from "react-hook-form";
import OutputMessage from "../output-message";
import { FaCheck } from "react-icons/fa6";
import { isEmptyStringOrNil } from "@/lib/string";
import { cn } from "@/lib/cn";

interface Props extends Pick<Message, "type" | "payload" | "created_at"> {
  onSubmit: (payload: ContactReqPayload) => void;
}

export function ContactReq({ type, payload, created_at, onSubmit }: Props) {
  assert(type === MessageType.contact_req && payload != null);

  const { register, handleSubmit, formState } = useForm<ContactReqPayload>({
    defaultValues: payload,
  });

  const disabled = !formState.isDirty || !formState.isValid;
  const saved =
    formState.isSubmitted ||
    !isEmptyStringOrNil(payload.phoneNumber) ||
    !isEmptyStringOrNil(payload.email);

  return (
    <div className="flex flex-col gap-3">
      <OutputMessage sendAt={new Date(created_at)}>
        {CONTACT_FORM_TEXT}
      </OutputMessage>
      <form
        className="flex flex-col items-center w-4/5 bg-base-100 border border-gray-500 rounded-xl p-4 ml-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-gray-200">Phone Number</span>
          </div>
          <input
            type="tel"
            className="w-full p-3 rounded-lg border border-gray-500 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={saved}
            placeholder="Enter details"
            {...register("phoneNumber")}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-gray-200">Email</span>
          </div>
          <input
            type="email"
            disabled={saved}
            className="w-full p-3 rounded-lg border border-gray-500 text-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            placeholder="Enter details"
            {...register("email")}
          />
        </label>
        <button
          type="submit"
          className={cn(
            "flex items-center justify-center gap-1",
            "py-2 rounded-lg text-gray-white bg-blue-500 cursor-pointer",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "w-full mt-4 mb-2 transition-all duration-300",
            saved && "!opacity-70",
          )}
          disabled={disabled || saved}
        >
          {saved && <FaCheck className="mr-2" />}
          Save{saved && "d"}
        </button>
        <p className="text-xs text-gray-300">
          {saved
            ? "We will contact you soon :)"
            : "Enter more than 1 contact information"}
        </p>
      </form>
    </div>
  );
}
