import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export function useHome() {
  const {
    data,
    isError,
    isSuccess,
    isPending,
    mutate: limitFetch,
    error,
  } = useMutation({
    mutationKey: ["soil_data_fetch"],
    mutationFn: async () => {
      const limitStr: string | null = await AsyncStorage.getItem("api-limit");
      const limit = limitStr ? Number(JSON.parse(limitStr)) : 10;

      const res = await axios.get(`base-uri/data-records?limit=${limit}`);

      const labels: string[] = [];
      const soilTemperatureData: number[] = [];
      const soilMoistureData: number[] = [];

      const soilData = res.data;

      soilData.forEach(
        (
          dataItem: { moisture: number; temperature: number; date: string },
          index: number
        ) => {
          const moisture = dataItem.moisture ? dataItem.moisture : 0;
          const temperature = dataItem.temperature ? dataItem.temperature : 0;

          labels.push((index + 1).toString());
          soilMoistureData.push(moisture);
          soilTemperatureData.push(temperature);
        }
      );

      return {
        soilData,
        soilTemperatureData: [{ data: soilTemperatureData.reverse() }],
        soilMoistureData: [{ data: soilMoistureData.reverse() }],
        labels,
        limit,
      };
    },
  });

  useEffect(() => {
    limitFetch();
  }, []);

  return {
    actions: {
      handleFetch: limitFetch,
    },
    data: {
      soilMeasurements: data,
      error,
    },
    status: {
      isError,
      isPending,
      isSuccess,
    },
  };
}
