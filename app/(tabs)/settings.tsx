import { useSettings } from "@/hooks/(tabs)/settings/useSettings";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Settings() {
  const { actions, data, status } = useSettings();
  const { handleLimitChange, handleSave } = actions;
  const { limit } = data;
  const { isError, isPending } = status;

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginHorizontal: 4,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 15,
                marginTop: 10,
              }}
            >
              API Request Limit:
            </Text>
            <TextInput
              placeholder="Enter number between 1-20"
              keyboardType="number-pad"
              onChangeText={(val) => handleLimitChange(val)}
              value={limit.toString()}
              style={{
                backgroundColor: "white",
                borderRadius: 4,
                marginBottom: 8,
                fontSize: 16,
              }}
            />
            {isError && (
              <Text
                style={{ color: "red", fontWeight: "900", fontStyle: "italic" }}
              >
                Error: Limit must be between 1 and 20!
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "black",
              width: 150,
              paddingVertical: 20,
              borderRadius: 8,
              alignSelf: "center",
              marginVertical: 20,
            }}
            onPress={() => handleSave()}
            disabled={isPending}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
