import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageList, resources } from "./modules/i18next";
import { changeLanguage } from "i18next";

export default function App() {
  const { t } = useTranslation();
  const [isLngSwitchActive, setIsSwitchActive] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={isLngSwitchActive}
        onRequestClose={() => setIsSwitchActive(false)}
      >
        <View style={styles.languagesList}>
          <FlatList
            data={Object.keys(resources)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => {
                  changeLanguage(item);
                  setIsSwitchActive(false);
                }}
              >
                <Text style={styles.lngName}>
                  {LanguageList[item].nativeName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Text style={styles.text}>{t("fact")}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsSwitchActive(true)}
      >
        <Text style={styles.buttonText}>{t("change-language")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191266",
  },
  button: {
    backgroundColor: "#6258e8",
    padding: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    marginBottom: 100,
    fontSize: 18,
    color: "white",
  },
  languagesList: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#6258e8",
  },

  languageButton: {
    padding: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: "white",
  },
});
