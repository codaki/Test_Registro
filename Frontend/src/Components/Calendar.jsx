/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ profesorId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [registros, setRegistros] = useState({});
  const [viewMode, setViewMode] = useState("week"); // "week" or "month"

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 17 }, (_, i) => `${i + 6}:00`);

  const loadRegistros = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      console.log("Formatted date:", formattedDate);
      console.log(profesorId);
      const response = await axios.get(
        "http://localhost:3000/api/registrosDia",
        {
          params: {
            Profesor_ID: profesorId,
            Dia: formattedDate,
          },
        }
      );

      console.log("Registros respuesta:", response);
      const registrosMap = {};
      response.data.forEach((registro) => {
        const { Dia, Hora, Tarde } = registro;
        if (!registrosMap[Dia]) registrosMap[Dia] = {};
        registrosMap[Dia][Hora] = Tarde;
      });

      setRegistros(registrosMap);
    } catch (error) {
      console.error("Error fetching registros:", error);
    }
  };

  useEffect(() => {
    loadRegistros();
  }, [selectedDate]);

  // Calculate the start and end of the week for the selected date
  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Set to Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const weekDates = getWeekDates(selectedDate);

  const getCellClass = (date, hour) => {
    console.log(date, hour);
    const formattedDate = date.toISOString().split("T")[0];
    console.log("Formatted date:", formattedDate);
    console.log(registros["2025-01-13"]);
    // console.log(registros[formattedDate]);
    // console.log(registros[formattedDate][hour]);
    if (registros[formattedDate] && registros[formattedDate][hour]) {
      return "bg-green-500";
    }
    return "";
  };

  return (
    <section className="relative bg-stone-50 py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 overflow-x-auto">
        <div className="flex flex-col md:flex-row max-md:gap-3 items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="py-2 px-4 border border-gray-300 rounded-lg"
            />
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="py-2 px-4 border border-gray-300 rounded-lg"
            >
              <option value="week">Week View</option>
              <option value="month">Month View</option>
            </select>
          </div>

          <button className="py-2.5 pr-7 pl-5 bg-indigo-600 rounded-xl flex items-center gap-2 text-base font-semibold text-white transition-all duration-300 hover:bg-indigo-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 5V15M15 10H5"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              ></path>
            </svg>
            New Activity
          </button>
        </div>

        <div className="relative">
          {viewMode === "week" && (
            <div>
              <div className="grid grid-cols-7 border-t border-gray-200 sticky top-0 left-0 w-full">
                {weekDates.map((date, index) => (
                  <div
                    key={index}
                    className="p-3.5 flex items-center justify-center text-sm font-medium text-gray-900"
                  >
                    {`${daysOfWeek[date.getDay()]} ${date.getDate()}`}
                  </div>
                ))}
              </div>
              <div className="hidden grid-cols-7 sm:grid w-full overflow-x-auto">
                {hours.map((hour, hourIndex) => (
                  <React.Fragment key={hourIndex}>
                    {weekDates.map((date, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`h-32 lg:h-28 p-0.5 md:p-3.5 border-t border-r border-gray-200 transition-all hover:bg-stone-100 ${getCellClass(
                          date,
                          hour
                        )}`}
                      >
                        {dayIndex === 0 && (
                          <span className="text-xs font-semibold text-gray-400">
                            {hour}
                          </span>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {viewMode === "month" && (
            <div>
              <div className="grid grid-cols-7 border-t border-gray-200 sticky top-0 left-0 w-full">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={index}
                    className="p-3.5 flex items-center justify-center text-sm font-medium text-gray-900"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 border-t border-gray-200">
                {Array.from({ length: 30 }, (_, i) => {
                  const date = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    i + 1
                  );
                  return (
                    <div
                      key={i}
                      className={`h-20 p-3.5 border-t border-r border-gray-200 transition-all hover:bg-stone-100`}
                    >
                      <span className="text-xs font-semibold text-gray-900">
                        {date.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
