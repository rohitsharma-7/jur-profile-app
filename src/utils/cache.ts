export const getItem = (key: string) => localStorage.getItem(key);

export const setItem = (key: string, obj: any) => {
  if (typeof obj === "string") {
    localStorage.setItem(key, obj);
  } else {
    localStorage.setItem(key, JSON.stringify(obj));
  }
};

export const removeItem = (key: string) => localStorage.removeItem(key);
