import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface TimePickerProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange }) => {
  const handleClear = () => {
    onChange(null);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hours = e.target.value;
    const minutes = value?.split(":")[1] || "00";

    if (hours && minutes) {
      onChange(`${hours}:${minutes.toString().padStart(2, "0")}`);
    } else if (!hours && !minutes) {
      onChange(null);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const minutes = e.target.value;
    const hours = value?.split(":")[0] || "00";
    if (hours && minutes) {
      onChange(`${hours}:${minutes.toString().padStart(2, "0")}`);
    } else if (!hours && !minutes) {
      onChange(null);
    }
  };

  const currentHours = value != null ? parseInt(value.split(":")[0]) : null;
  const currentMinutes = value != null ? parseInt(value.split(":")[1]) : null;
  const amType = currentHours == null ? null : currentHours < 12 ? "AM" : "PM";

  const toggleAmpm = () => {
    if (amType == null || currentHours == null || currentMinutes == null)
      return;

    onChange(
      `${amType === "AM" ? (currentHours + 12) % 24 : currentHours - 12}:${currentMinutes}`,
    );
  };

  return (
    <div className="mt-4">
      <label className="flex flex-col items-start">
        <p className="text-xs text-gray-400">{label}</p>
        <div className="flex gap-2">
          <select
            value={currentHours != null ? (currentHours % 12)?.toString() : ""}
            onChange={handleHoursChange}
            className="input input-bordered"
          >
            <option value="" disabled>
              Select hours
            </option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {i === 0 ? 12 : i}
              </option>
            ))}
          </select>
          <select
            value={currentMinutes != null ? currentMinutes.toString() : ""}
            onChange={handleMinutesChange}
            className="input input-bordered"
          >
            <option value="" disabled>
              Select minutes
            </option>
            {Array.from({ length: 4 }, (_, i) => (
              <option key={i} value={i * 15}>
                {i * 15}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleAmpm}
              className="btn btn-ghost"
              disabled={amType == null}
            >
              {amType}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-ghost"
              aria-label="Clear time"
              disabled={!value}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default TimePicker;
