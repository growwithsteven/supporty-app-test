import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

interface TimePickerProps {
  label: string
  value: string | null
  onChange: (value: string | null) => void
}

const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange }) => {
  const [isAM, setIsAM] = useState(true)

  const handleClear = () => {
    onChange(null)
  }

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hours = e.target.value
    const minutes = value?.split(':')[1] || '00'
    if (hours && minutes) {
      onChange(`${isAM ? hours : (parseInt(hours) + 12) % 24}:${minutes}`)
    } else if (!hours && !minutes) {
      onChange(null)
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const minutes = e.target.value
    const hours = value?.split(':')[0] || '00'
    if (hours && minutes) {
      onChange(`${isAM ? hours : (parseInt(hours) + 12) % 24}:${minutes}`)
    } else if (!hours && !minutes) {
      onChange(null)
    }
  }

  const toggleAMPM = () => {
    setIsAM(!isAM)
    if (value) {
      const [hours, minutes] = value.split(':')
      const newHours = isAM ? parseInt(hours) % 12 : (parseInt(hours) + 12) % 24
      onChange(`${newHours}:${minutes}`)
    }
  }

  return (
    <div className="mt-4">
      <label className="flex flex-col items-start">
        <p className="text-xs text-gray-400">{label}</p>
        <div className="flex gap-2">
          <select
            value={value?.split(':')[0] || ''}
            onChange={handleHoursChange}
            className="input input-bordered"
          >
            <option
              value=""
              disabled
            >
              Select hours
            </option>
            {Array.from({ length: 12 }, (_, i) => (
              <option
                key={i}
                value={i}
              >
                {i === 0 ? 12 : i}
              </option>
            ))}
          </select>
          <select
            value={value?.split(':')[1] || ''}
            onChange={handleMinutesChange}
            className="input input-bordered"
          >
            <option
              value=""
              disabled
            >
              Select minutes
            </option>
            {Array.from({ length: 4 }, (_, i) => (
              <option
                key={i}
                value={i * 15}
              >
                {i * 15}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleAMPM}
              className="btn btn-ghost"
            >
              {isAM ? 'AM' : 'PM'}
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
  )
}

export default TimePicker
