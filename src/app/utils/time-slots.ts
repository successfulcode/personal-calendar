export const generateTimeSlots = (initialTime='00:00', step=15) => {
  const [initialHour, initialMinute] = initialTime.split(':').map(Number),
    timeOptions = [],
    intervalsPerHour = 60 / step,
    totalIntervals = 24 * intervalsPerHour; 

  for (let interval = 0; interval < totalIntervals; interval++) {
    const hour = Math.floor(interval / intervalsPerHour),
      minute = (interval % intervalsPerHour) * 15;

    if (hour < initialHour || (hour === initialHour && minute < initialMinute)) {
      continue;
    }

    const formattedHour = hour.toString().padStart(2, '0'),
      formattedMinute = minute.toString().padStart(2, '0');

    timeOptions.push(`${formattedHour}:${formattedMinute}`);
  }

  return timeOptions;
};