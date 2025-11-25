export function getLocalDateTimeISOString(): string {
  const now = new Date();

  // Get individual date and time components
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

  // Get timezone offset in minutes and convert to +/-HH:MM format
  const timezoneOffsetMinutes = -now.getTimezoneOffset(); // getTimezoneOffset returns negative for positive offsets
  const offsetSign = timezoneOffsetMinutes >= 0 ? '+' : '-';
  const offsetHours = Math.floor(Math.abs(timezoneOffsetMinutes) / 60).toString().padStart(2, '0');
  const offsetMinutes = (Math.abs(timezoneOffsetMinutes) % 60).toString().padStart(2, '0');
  const timezoneOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`;

  // Construct the ISO 8601 string with local timezone offset
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffset}`;
}