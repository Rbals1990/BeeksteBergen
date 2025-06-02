import { useState, useEffect } from "react";

function App() {
  const [timeLeft, setTimeLeft] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  // Functie om de juiste achtergrondafbeelding te bepalen
  const getBackgroundImage = () => {
    const now = new Date();
    const amsterdamTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
    );
    const hours = amsterdamTime.getHours();

    if (hours >= 7 && hours < 16) {
      return "overdag.png";
    } else if (hours >= 16 && hours < 21) {
      return "avond.png";
    } else {
      return "nacht.png";
    }
  };

  // Functie om de juiste achtergrondkleur te bepalen
  const getBackgroundColor = () => {
    const now = new Date();
    const amsterdamTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
    );
    const hours = amsterdamTime.getHours();

    if (hours >= 7 && hours < 16) {
      return "#402610"; // Bruin voor overdag
    } else if (hours >= 16 && hours < 21) {
      return "#A60F0F"; // Rood voor avond
    } else {
      return "#031326"; // Donkerblauw voor nacht
    }
  };

  useEffect(() => {
    // Stel de achtergrond in bij het laden
    const updateBackground = () => {
      setBackgroundImage(getBackgroundImage());
      setBackgroundColor(getBackgroundColor());
    };

    updateBackground();

    // Update de achtergrond elke minuut
    const backgroundInterval = setInterval(updateBackground, 60000);

    // Countdown logica
    const targetDate = new Date("2025-10-13T10:00+02:00");
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ weeks, days, hours, minutes, seconds });
      } else {
        setTimeLeft({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(backgroundInterval);
    };
  }, []);

  const isVacationTime =
    timeLeft.weeks === 0 &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-400/30 via-purple-500/30 to-pink-500/30 flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: backgroundColor,
      }}
    >
      <div className="text-center text-white max-w-4xl w-full">
        {isVacationTime ? (
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold animate-pulse">
              🎉 VAKANTIE! 🎉
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Geniet van jullie welverdiende vakantie!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-8">
              Beekse Bergen Countdown
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20">
                <div className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2">
                  {timeLeft.weeks}
                </div>
                <div className="text-sm md:text-lg lg:text-xl font-semibold opacity-90">
                  {timeLeft.weeks === 1 ? "Week" : "Weken"}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20">
                <div className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2">
                  {timeLeft.days}
                </div>
                <div className="text-sm md:text-lg lg:text-xl font-semibold opacity-90">
                  {timeLeft.days === 1 ? "Dag" : "Dagen"}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20">
                <div className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2">
                  {timeLeft.hours}
                </div>
                <div className="text-sm md:text-lg lg:text-xl font-semibold opacity-90">
                  {timeLeft.hours === 1 ? "Uur" : "Uren"}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20">
                <div className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2">
                  {timeLeft.minutes}
                </div>
                <div className="text-sm md:text-lg lg:text-xl font-semibold opacity-90">
                  {timeLeft.minutes === 1 ? "Minuut" : "Minuten"}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20">
                <div className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 transition-all duration-300">
                  {timeLeft.seconds}
                </div>
                <div className="text-sm md:text-lg lg:text-xl font-semibold opacity-90">
                  {timeLeft.seconds === 1 ? "Seconde" : "Seconden"}
                </div>
              </div>
            </div>

            <div className="mt-8 text-lg md:text-xl lg:text-2xl font-semibold opacity-90">
              🐆 🦁 Tot de vakantie begint! 🦒 🐅
            </div>

            <div className="text-sm md:text-base lg:text-lg opacity-90">
              13 oktober 2025 om 10:00
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
