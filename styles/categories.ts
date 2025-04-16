import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbe6", // Keeping the original background color
  },

  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fce3b1", // Keeping the original header color
  },

  logo: {
    width: 200,
    height: 50,
  },

  categoryTitle: {
    fontSize: 22, // Slightly larger for better emphasis
    fontWeight: "700", // Stronger weight for more impact
    marginBottom: 12, // More space for visual balance
    paddingHorizontal: 15,
    color: COLORS.infodark,
    textTransform: "uppercase", // Optional: for a more stylish look
  },

  horizontalList: {
    paddingLeft: 15,
    paddingRight: 10,
  },

  priceAndWeightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Ensures it takes full width
  },

  productWeight: {
    fontSize: 14,
    color: "#555", // Optional: a lighter color for the weight text
  },

  // Product-specific styles only:
  productCard: {
    backgroundColor: "#c2edfc",
    borderRadius: 20,
    marginRight: 16,
    padding: 12,
    width: 150,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginBottom: 16,
  },

  productImage: {
    width: "100%",
    height: 125,
    borderRadius: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0", // Soft border around the image
  },

  productInfo: {
    marginTop: 6,
  },

  productName: {
    fontSize: 16, // Larger product name for emphasis
    fontWeight: "600",
    color: "#333",
  },

  productPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 6,
  },

  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
