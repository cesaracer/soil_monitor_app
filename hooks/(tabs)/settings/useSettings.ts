import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

export function useSettings() {
  const [limit, setLimit] = useState<string>("0");

  const { isError, isPending, mutate } = useMutation({
    mutationKey: ["save-limit"],
    mutationFn: async () => {
      if (Number(limit) < 1 || Number(limit) > 20) {
        throw RangeError("Limit has to be between 1 - 20");
      }

      await AsyncStorage.setItem("api-limit", JSON.stringify(limit));
      handleNotify();
    },
  });

  function handleLimitChange(val: string) {
    setLimit(val);
  }

  const handleInitialFetch = useCallback(async () => {
    const limitStr = await AsyncStorage.getItem("api-limit");

    if (limitStr) {
      setLimit(JSON.parse(limitStr!));
    }
  }, []);

  function handleNotify() {
    ToastAndroid.show("New API limit saved!", 2);
  }

  useEffect(() => {
    handleInitialFetch();
  }, []);

  return {
    actions: {
      handleLimitChange,
      handleSave: mutate,
    },
    data: {
      limit,
    },
    status: {
      isError,
      isPending,
    },
  };
}
