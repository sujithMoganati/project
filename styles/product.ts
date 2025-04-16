import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme"; // Ensure you have a COLORS file with color definitions

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fce3b1", // Soft background for the header
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10, // White background for the quantity buttons
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: "#ffdf6d", // Light yellow background for quantity buttons
    marginBottom: 20,
  },

  quantityButton: {
    backgroundColor: "#ff7f50", // Coral color for the quantity buttons
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  addToCartButton: {
    backgroundColor: "#3498db", // Blue color for the 'Add to Cart' button
    paddingVertical: 10,
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 12,
    paddingHorizontal: 16,
  },

  addToCartButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#fffbe6", // Gradient background from coral to light yellow
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: "center",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // Soft white background for loading state
  },

  productImage: {
    width: "80%",
    height: 250,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#f0c14b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },

  productName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#34495e", // Darker color for product name to ensure visibility
    marginBottom: 2,
    textAlign: "center",
    lineHeight: 38,
  },

  productDescription: {
    fontSize: 16,
    color: "#7f8c8d", // Light grey description
    marginBottom: 12,
    lineHeight: 22,
    textAlign: "justify",
    paddingHorizontal: 4,
  },

  priceContainer: {
    flexDirection: "row", // Aligning price and weight horizontally
    justifyContent: "space-between", // Ensure space between price and weight
    alignItems: "center", // Vertically center the elements
    width: "100%",
    marginBottom: 8,
  },

  priceLabel: {
    fontSize: 18,
    color: "#e74c3c", // Red color for original price (strikethrough)
    textDecorationLine: "line-through", // Optional strike-through for original price
  },

  discountedPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2ecc71", // Green for discounted price
  },

  productPrice: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3498db", // Blue for price
  },

  productWeight: {
    fontSize: 17,
    color: "#34495e", // Grey color for weight
    marginLeft: 20, // Adds space between price and weight
  },

  shopInfoContainer: {
    marginTop: 32,
    backgroundColor: "#fff", // White background for shop info
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e", // Dark color for shop name
    marginBottom: 6,
  },

  shopAddress: {
    fontSize: 15,
    color: "#7f8c8d", // Grey color for shop address
    lineHeight: 22,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    margin: 20,
    borderRadius: 12,
    backgroundColor: "#fce4e4", // Soft red background for error
    borderColor: "#f5bcbc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  errorText: {
    fontSize: 18,
    color: "#b00020", // Red color for error text
    fontWeight: "600",
    textAlign: "center",
  },
  storeInfoSection: {
    backgroundColor: "#fff3e0", // Light warm background
    padding: 16,
    marginTop: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffd180",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: "100%",
  },

  storeHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e65100",
    marginBottom: 10,
  },

  storeImage: {
    width: "100%",
    height: 160,
    borderRadius: 14,
    marginBottom: 12,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#ffcc80",
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 10,
  },

  storeAddressText: {
    fontSize: 15.5,
    color: "#4e342e",
    lineHeight: 22,
    flex: 1,
  },

  shopDescriptionTitle: {
    fontSize: 16.5,
    fontWeight: "bold",
    color: "#d84315",
    marginTop: 10,
    marginBottom: 6,
  },

  shopDescription: {
    fontSize: 15,
    lineHeight: 23,
    color: "#5d4037",
    textAlign: "justify",
  },
});
