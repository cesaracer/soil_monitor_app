import { useHome } from "@/hooks/(tabs)/home/useHome";
import { ReactNode } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Home() {
  const { actions, data, status } = useHome();
  const { handleFetch } = actions;
  const { soilMeasurements } = data;
  const { isSuccess, isPending } = status;

  const soilData = soilMeasurements?.soilData;
  const soilMoistureData = soilMeasurements?.soilMoistureData!;
  const soilTemperatureData = soilMeasurements?.soilTemperatureData!;
  const labels = soilMeasurements?.labels!;
  const limit = soilMeasurements?.limit!;

  if (!isPending && isSuccess) {
    return (
      <ScrollView>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Moisture</Text>
          <LineChart
            data={{
              labels,
              datasets: soilMoistureData,
            }}
            width={Dimensions.get("window").width - 10} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "#c2f6ff",
              backgroundGradientFrom: "#00b8e6",
              backgroundGradientTo: "#105fcc",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#c2f6ff",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Temperature</Text>
          <LineChart
            data={{
              labels,
              datasets: soilTemperatureData,
            }}
            yAxisSuffix=" °F"
            width={Dimensions.get("window").width - 10} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#696158",
              backgroundGradientTo: "#473a29",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#696158",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: 8,
              marginLeft: 8,
            }}
          >
            Recent {limit ? limit : 10} Measurement(s)
          </Text>
          {soilData.map(
            (dataItem: {
              _id: string;
              temperature: number;
              moisture: number;
              date: ReactNode;
            }) => {
              const measurement = dataItem;
              return (
                <View
                  key={measurement._id}
                  style={{ backgroundColor: "white", padding: 4, margin: 2 }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Temperature </Text>
                    <Text>{measurement.temperature}°F</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Soil Moisture </Text>
                    <Text>{measurement.moisture}</Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text>{measurement.date}</Text>
                  </View>
                </View>
              );
            }
          )}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "green",
            width: 150,
            paddingVertical: 20,
            borderRadius: 8,
            alignSelf: "center",
            marginVertical: 20,
          }}
          onPress={() => handleFetch()}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Refresh</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else if (isPending) {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Text>
          <ActivityIndicator size={90} />;
        </Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            width: 150,
            paddingVertical: 20,
            borderRadius: 8,
          }}
          onPress={() => handleFetch()}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Retrieve Data
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
