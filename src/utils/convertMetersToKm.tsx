export default function convertMetersToKm(measureInMeters: number): string {
  const measureInKm = measureInMeters / 1000;
  return `${measureInKm.toFixed(0)}km`;
}
