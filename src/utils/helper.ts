import { getItem } from "./cache";
import { PROFILE_DATA, ProfileFormSchema } from "./constants";
import { LOCAL_STORAGE_KEYS } from "./enums";
import moment from "moment";

export const cloneJson = (object: any) => {
  try {
    return JSON.parse(JSON.stringify(object));
  } catch (error) {
    return {};
  }
};

export const extractJson = (key: string) => {
  const obj = getItem(key);
  if (!obj) return null;
  try {
    return JSON.parse(obj);
  } catch (error) {
    return null;
  }
};

export const getInitialValues = (): ProfileFormSchema => {
  const savedValues: ProfileFormSchema = extractJson(
    LOCAL_STORAGE_KEYS.PROFILE_DATA
  );
  if (savedValues) {
    savedValues.workExperience = savedValues.workExperience.map((item) => ({
      ...item,
      from: moment(item.from),
      to: item.currentCompany ? null : moment(item.to),
    }));
  }
  const initialValues = savedValues || cloneJson(PROFILE_DATA);
  return initialValues;
};
