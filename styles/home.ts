import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbe6",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fce3b1",
    padding: 15,
    marginBottom: 20,
  },
  logo: {
    width: 160,
    height: 50,
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: COLORS.grey,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  verticalBar: {
    width: 1,
    height: 28,
    backgroundColor: "#ccc",
    marginEnd: 10,
    marginStart: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 30, // Space between categories
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    color: COLORS.infodark,
  },

  productList: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  // Product-specific styles:
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
    borderColor: "#f0f0f0",
  },
  productInfo: {
    marginTop: 6,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 6,
  },
  productWeight: {
    fontSize: 14,
    color: "#555", // Optional: a lighter color for the weight text
  },
  priceAndWeightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Ensures it takes full width
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  emptyImage: {
    width: 280,
    height: 280,
    marginBottom: 20,
  },

  emptyText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 8,
  },

  subText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 24,
  },

  searchButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
