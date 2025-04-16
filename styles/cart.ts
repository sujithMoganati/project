import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme"; // adjust this import if needed

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff3e0",
    paddingTop: 20,
  },
  addressList: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: COLORS.info,
    marginTop: 8,
    textAlign: "center",
  },
  searchButton: {
    backgroundColor: COLORS.primary, // You can customize the button color
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cartList: {
    paddingBottom: 10,
  },
  quantityAndRemoveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    padding: 4,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginHorizontal: 4,
  },
  qtyButtonText: {
    fontSize: 14,
    color: "#333",
  },
  productQuantity: {
    fontSize: 16,
    color: "#5f5fd4",
    marginHorizontal: 6,
    marginBottom: 2,
    verticalAlign: "middle",
  },
  removeButton: {
    marginLeft: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#e3f9fa",
    borderColor: COLORS.grey,
    borderWidth: 0.3,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  productImage: {
    width: 60,
    height: 60,
    borderColor: COLORS.grey,
    borderWidth: 0.4,
    borderRadius: 8,
    marginRight: 10,
  },
  noImageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.infodark,
    lineHeight: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    flexWrap: "wrap",
  },
  shopName: {
    fontSize: 12,
    color: "#5f5fd4",
    marginVertical: 2,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.infodark,
    flex: 1,
    textAlign: "center",
  },
  productDiscount: {
    fontSize: 12,
    color: "#5f5fd4",
    flex: 1,
    textAlign: "right",
  },
  cartSummary: {
    padding: 15,
    backgroundColor: "#ffffff",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalDiscount: {
    fontSize: 16,
    color: "#FF6347",
    marginVertical: 5,
  },
  buyButton: {
    marginTop: 15,
    backgroundColor: "#5f5fd4",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyImage: {
    width: 260,
    height: 260,
    alignSelf: "center",
  },
  addressSection: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 24,
    backgroundColor: "#f0f4fd", // very soft blue background
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  addressHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e3a8a", // deep blue header
    marginBottom: 18,
    textAlign: "left",
  },
  addressItemContainer: {
    marginBottom: 12,
  },
  addressItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb", // light gray border for clean design
  },
  selectedAddress: {
    borderColor: "#3b82f6", // vibrant blue for selected address border
    backgroundColor: "#e0f2fe", // light blue background for selected address
    shadowOpacity: 0.2, // a little more pronounced shadow for selection
    shadowRadius: 6,
    elevation: 4,
  },
  addressText: {
    fontSize: 16,
    color: "#1e293b", // dark gray for text for readability
    fontWeight: "500",
  },
});
