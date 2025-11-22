import { Calendar as CalendarIcon, ExternalLink } from "lucide-react";

const CalendarSection = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthNames = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  const month = monthNames[currentDate.getMonth()];

  // Eventos de ejemplo (esto debería venir de una API en el futuro)
  const events = [
    { time: "08:00-10:00", title: "Reunión Mónica", hasJoinButton: false },
    { time: "11:00-12:00", title: "Status equipo", hasJoinButton: true },
    { time: "15:00-15:30", title: "Feedback", hasJoinButton: false },
    { time: "17:00-18:00", title: "Status equipo", hasJoinButton: false },
    { time: "19:00-20:00", title: "Gimnasio", hasJoinButton: false },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-white">Calendario</h3>
      </div>
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-start gap-6">
          {/* Fecha grande a la izquierda */}
          <div className="flex flex-col">
            <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wide">
              {month}
            </div>
            <div className="text-4xl md:text-6xl font-bold text-white leading-none mt-1">
              {day}
            </div>
          </div>

          {/* Lista de eventos a la derecha */}
          <div className="flex-1 space-y-1">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-start gap-4 py-1"
              >
                <div className="text-xs md:text-sm text-gray-400">{event.time}</div>
                  <div
                    className={`text-xs md:text-sm text-white ${
                      index === 0 ? "opacity-50" : ""
                    }`}
                  >
                    {event.title}
                  </div>
                {event.hasJoinButton && (
                  <button className="md:block hidden px-6 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-2xl transition-colors">
                    Unirse
                  </button>
                )}
                {event.hasJoinButton && (
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block md:hidden text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
