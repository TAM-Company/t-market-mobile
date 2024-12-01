import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "red", fontSize: 100, fontWeight: "bold" }}>
        TAM
      </Text>
	  <Text>Simple app</Text>
    </View>
  );
}
