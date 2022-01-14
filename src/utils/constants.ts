interface WorkExperienceData {
  [key: string]: boolean | moment.Moment | null | string | undefined;
  companyName: string;
  title: string;
  from: moment.Moment | null;
  to: moment.Moment | null;
  description: string;
  currentCompany?: boolean;
}

export interface ProfileFormSchema {
  email: string;
  firstName: string;
  lastName: string;
  tagLine: string;
  skills: string[];
  workExperience: WorkExperienceData[];
}

export interface formFieldsSchema {
  name: string;
  label: string;
  message: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}

export const PROFILE_DATA: ProfileFormSchema = {
  email: "",
  firstName: "",
  lastName: "",
  tagLine: "",
  skills: [],
  workExperience: [],
};

export const DATE_FORMAT = "YYYY-MM-DD";

export const FORM_FIELDS: formFieldsSchema[] = [
  {
    name: "firstName",
    label: "First Name",
    message: "Missing first name",
    placeholder: "First Name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    message: "Missing last name",
    placeholder: "Last Name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    message: "Missing email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "tagLine",
    label: "Tag Line",
    message: "Missing tag line",
    placeholder: "Tag Line",
    required: true,
  },
  {
    name: "skills",
    label: "Skills",
    message: "One skill required",
    placeholder: "Skills",
    required: true,
    type: "select",
  },
];
