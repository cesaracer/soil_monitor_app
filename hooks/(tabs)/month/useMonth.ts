import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useMonth() {
  const {
    data: soilMeasurements,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ["month-fetch"],
    queryFn: async () => {
      const date = new Date();
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const year = date.getFullYear();

      const res = await axios.get(
        `base-uri/data-records?date=${month}-${year}`
      );

      const soilTemperatureData: number[] = [];
      const soilMoistureData: number[] = [];

      const soilData = res.data;

      soilData.forEach(
        (dataItem: { moisture: number; temperature: number; date: string }) => {
          const moisture = dataItem.moisture ? dataItem.moisture : 0;
          const temperature = dataItem.temperature ? dataItem.temperature : 0;

          soilMoistureData.push(moisture);
          soilTemperatureData.push(temperature);
        }
      );

      return {
        soilData,
        soilTemperatureData: [{ data: soilTemperatureData.reverse() }],
        soilMoistureData: [{ data: soilMoistureData.reverse() }],
      };
    },
  });
  return {
    actions: {},
    data: {
      soilMeasurements,
    },
    status: {
      isPending,
      isSuccess,
    },
  };
}
