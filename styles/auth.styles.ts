import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/theme"; // Ensure your theme colors are correct

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: COLORS.white,
  },
  brandSection: {
    height: 300,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  logo: {
    width: width * 0.9,
    height: 300,
    resizeMode: "contain",
  },
  loginSection: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 10,
    alignItems: "center", // Center content horizontally
  },
  googleButton: {
    width: width - 50,
    flexDirection: "row",
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.white,
    textAlign: "center", // Center text
  },
  logText: {
    fontSize: 10,
    color: COLORS.grey,
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "900",
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
});
