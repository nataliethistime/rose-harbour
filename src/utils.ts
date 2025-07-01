export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 60 / 60);
  const minutes = (seconds / 60) % 60;

  return `${hours} ${hours === 1 ? 'hour' : 'hours'} and ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
};
