export type StorageKey = "auth";
type StorageType = "local" | "session";

const createStorage = (type: StorageType) => {
  const storageObject = type === "local" ? localStorage : sessionStorage;

  return {
    get(key: StorageKey): string | null {
      return storageObject.getItem(key);
    },

    set(key: StorageKey, value: string): void {
      storageObject.setItem(key, value);
    },

    remove(key: StorageKey): void {
      storageObject.removeItem(key);
    },

    clearInterval(): void {
      storageObject.clear();
    },
  };
};

const storage = {
  local: createStorage("local"),
  session: createStorage("session"),
};

export default storage;
