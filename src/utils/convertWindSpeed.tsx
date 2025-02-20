export default function convertWindSpeed(speedInMeterSecond: number): string {
  const speedInKilometersPerHour = speedInMeterSecond * 3.6;
  return `${speedInKilometersPerHour.toFixed(0)}km`;
}
