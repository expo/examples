import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export const secureStorage = createMMKV({
  id: "secure-storage",
  encryptionKey: "hunter2",
  encryptionType: "AES-256",
});
