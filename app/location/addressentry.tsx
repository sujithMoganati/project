import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function AddressEntryScreen() {
  const [houseInfo, setHouseInfo] = useState("");
  const [apartmentInfo, setApartmentInfo] = useState("");
  const [directions, setDirections] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const tags = ["Home", "Work", "Friends and Family", "Other"];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.locationTitle}>📍 Unikili</Text>
        <Text style={styles.locationSubtitle}>
          Unikili, Andhra Pradesh 521326, India
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            A detailed address will help our Delivery Partner reach your
            doorstep easily
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="HOUSE / FLAT / BLOCK NO."
          value={houseInfo}
          onChangeText={setHouseInfo}
        />

        <TextInput
          style={styles.input}
          placeholder="APARTMENT / ROAD / AREA (RECOMMENDED)"
          value={apartmentInfo}
          onChangeText={setApartmentInfo}
        />

        <Text style={styles.optionalLabel}>DIRECTIONS TO REACH (OPTIONAL)</Text>

        <View style={styles.voiceInputRow}>
          <Text style={styles.voiceText}>Tap to record voice directions</Text>
          <MaterialIcons name="keyboard-voice" size={24} color="gray" />
        </View>

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="e.g. Ring the bell on the red gate"
          value={directions}
          onChangeText={setDirections}
          multiline
          maxLength={200}
        />

        <Text style={styles.saveAsLabel}>SAVE AS</Text>
        <View style={styles.tagContainer}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                selectedTag === tag && styles.selectedTag,
              ]}
              onPress={() => setSelectedTag(tag)}
            >
              {tag === "Home" && (
                <FontAwesome
                  name="home"
                  size={16}
                  color="black"
                  style={styles.icon}
                />
              )}
              {tag === "Work" && (
                <MaterialIcons
                  name="work"
                  size={16}
                  color="black"
                  style={styles.icon}
                />
              )}
              {tag === "Friends and Family" && (
                <FontAwesome
                  name="users"
                  size={16}
                  color="black"
                  style={styles.icon}
                />
              )}
              {tag === "Other" && (
                <FontAwesome
                  name="map-marker"
                  size={16}
                  color="black"
                  style={styles.icon}
                />
              )}
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>ENTER HOUSE / FLAT / BLOCK NO.</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#FFF6E5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    color: "#9E6700",
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 16,
  },
  optionalLabel: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  voiceInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  voiceText: {
    flex: 1,
    color: "#333",
    fontSize: 14,
  },
  saveAsLabel: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTag: {
    backgroundColor: "#fce3b1",
    borderColor: "#eab676",
  },
  tagText: {
    marginLeft: 6,
    fontSize: 13,
  },
  icon: {
    marginRight: 4,
  },
  submitButton: {
    backgroundColor: "#fce3b1",
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  submitText: {
    fontWeight: "bold",
    color: "#000",
  },
});
