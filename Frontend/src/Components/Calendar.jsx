/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ profesorId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [registros, setRegistros] = useState({});
  const [viewMode, setViewMode] = useState("week"); // "week" or "month"

  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie"];
  const hours = Array.from({ length: 17 }, (_, i) => `${i + 6}:00`);
  console.log("Horas:", hours);
  const loadRegistros = async () => {
    try {
      const date = new Date(selectedDate);
      const offset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() - offset);
      const formattedDate = date.toISOString().split("T")[0];
      const response = await axios.get(
        "http://localhost:3000/api/registrosSemana",
        {
          params: {
            Profesor_ID: profesorId,
            Dia: formattedDate.toString(),
          },
        }
      );

      console.log("Registros respuesta:", response);
      const registrosMap = {};
      response.data.forEach((registro) => {
        const { dia, hora, tarde } = registro;
        const dateKey = dia.split("T")[0]; // Extract YYYY-MM-DD
        const timeKey = hora.substring(0, 5); // Ensure "HH:MM" format

        if (!registrosMap[dateKey]) registrosMap[dateKey] = {};
        registrosMap[dateKey][timeKey] = tarde;
      });

      setRegistros(registrosMap);
      console.log("Registros:", registrosMap);
    } catch (error) {
      console.error("Error fetching registros:", error);
    }
  };

  useEffect(() => {
    loadRegistros();
  }, [selectedDate]);

  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + offset); // Ajustar a Lunes

    return Array.from({ length: 5 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const weekDates = getWeekDates(selectedDate);
  console.log(weekDates);

  const getCellClass = (date, hour) => {
    const formattedDate = date.toISOString().split("T")[0];
    console.log("Fecha Celda:", formattedDate);
    if (registros[formattedDate]?.[hour]) {
      const registro = registros[formattedDate][hour];
      return registro.tarde ? "bg-red-500" : "bg-green-500";
    }
    return "";
  };

  return (
    <section className="relative bg-stone-50 py-4">
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
              <div className="grid grid-cols-6 border-t border-gray-200 sticky top-0 left-0 w-full">
                <div className="p-3.5 flex items-center justify-center text-sm font-medium text-gray-900">
                  Horas
                </div>
                {weekDates.map((date, index) => (
                  <div
                    key={index}
                    className="p-3.5 flex items-center justify-center text-sm font-medium text-gray-900"
                  >
                    {`${daysOfWeek[index]} ${date.getDate()}`}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-6 sm:grid w-full overflow-x-auto overflow-y-scroll h-[60vh]">
                {hours.map((hour, hourIndex) => (
                  <React.Fragment key={hourIndex}>
                    <div className="h-14 lg:h-20 p-0.5 md:p-3.5 border-t border-r border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-400">
                      {hour}
                    </div>
                    {weekDates.map((date, dayIndex) => (
                      <div
                        key={dayIndex}
                        id={date.toString() + hour}
                        className={`h-14 lg:h-20 p-0.5 md:p-3.5 border-t border-r border-gray-200 transition-all hover:bg-stone-100 ${getCellClass(
                          date,
                          hour
                        )}`}
                      ></div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {viewMode === "month" && (
            <div>
              <div className="grid grid-cols-7 border-t border-gray-200 sticky top-0 left-0 w-full">
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(
                  (day, index) => (
                    <div
                      key={index}
                      className="p-3.5 flex items-center justify-center text-sm font-medium text-gray-900"
                    >
                      {day}
                    </div>
                  )
                )}
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
