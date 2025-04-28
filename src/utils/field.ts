export const createDuration = (duration: number): string[] => {
  const results = [];
  for (let i = 0; i <= 24; i++) {
    results.push(`${i}:00`);
    if (duration === 30 && i < 24) {
      results.push(`${i}:30`);
    }
  }
  return results;
};
