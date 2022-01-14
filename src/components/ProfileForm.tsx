import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, DatePicker, Form, Input, Button, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useFormik } from "formik";

import { cloneJson, getInitialValues } from "src/utils/helper";
import {
  DATE_FORMAT,
  formFieldsSchema,
  FORM_FIELDS,
  ProfileFormSchema,
} from "src/utils/constants";
import { APP_ROUTES, LOCAL_STORAGE_KEYS } from "src/utils/enums";
import { setItem } from "src/utils/cache";

import styles from "src/styles/ProfileForm.module.css";
import moment from "moment";
import Loader from "src/ui-core/Loader";

interface currentyCompanySchema {
  index: number;
  value: boolean;
}

interface errorsSchema {
  [key: string]: string;
}

interface touchedSchema {
  [key: string]: boolean;
}

const getFormattedFieldKey = (index: number, name: string) => {
  return "workExperience_" + index + "_" + name;
};

const validate = (values: ProfileFormSchema) => {
  const errors: errorsSchema = {};
  if (!values.firstName) {
    errors.firstName = "Missing first name";
  }
  if (!values.lastName) {
    errors.lastName = "Missing last name";
  }
  if (!values.email) {
    errors.email = "Missing email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (values.skills?.length === 0) {
    errors.skills = "Atleast one skill is required";
  }
  if (values.workExperience?.length) {
    values.workExperience.forEach((item, index) => {
      if (!item.companyName) {
        errors[getFormattedFieldKey(index, "companyName")] =
          "Missing company name";
      }
      if (!item.title) {
        errors[getFormattedFieldKey(index, "title")] = "Missing role / title";
      }
      if (!item.from) {
        errors[getFormattedFieldKey(index, "from")] = "Missing start date";
      }
      if (!item.currentCompany) {
        if (!item.to) {
          errors[getFormattedFieldKey(index, "to")] = "Missing end date";
        } else {
          const diff = moment(item.to).diff(moment(item.from), "hours");
          if (diff && !Number.isNaN(diff) && diff <= 0) {
            errors[getFormattedFieldKey(index, "to")] =
              "End date should be older than start date";
          }
        }
      }
    });
  }
  return errors;
};

const FormItem = Form.Item;

const ProfileForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = getInitialValues();
  const [currentCompany, setCurrentCompany] =
    useState<currentyCompanySchema | null>(() => {
      const index = initialValues.workExperience.findIndex(
        (item) => item.currentCompany !== undefined
      );
      if (index !== -1) {
        return {
          index,
          value: true,
        };
      }
      return null;
    });
  const formik = useFormik({
    initialValues,
    initialErrors: {} as errorsSchema,
    initialTouched: {} as touchedSchema,
    validate,
    onSubmit,
  });
  const errors = formik.errors as errorsSchema;
  const touched = formik.touched as touchedSchema;

  function onSubmit(values: ProfileFormSchema) {
    setItem(LOCAL_STORAGE_KEYS.PROFILE_DATA, JSON.stringify(values));
    setLoading(true);
    setTimeout(() => {
      navigate(APP_ROUTES.VIEW_PROFILE);
      setLoading(false);
    }, 1500);
  }

  const handleChange = (
    value: string | moment.Moment | null,
    name: string,
    index: number
  ) => {
    const values = formik.values;
    if (!values.workExperience[index]) {
      values.workExperience[index] = {
        companyName: "",
        description: "",
        from: null,
        title: "",
        to: null,
      };
    }
    values.workExperience[index][name] = value;
    formik.setValues(values);
  };

  const handleCheckboxClick = (index: number) => {
    const updatedCurrentCompany = currentCompany
      ? null
      : { index, value: true };
    setCurrentCompany(updatedCurrentCompany);
    const updatedValues: ProfileFormSchema = cloneJson(formik.values);
    updatedValues.workExperience[index].currentCompany = updatedCurrentCompany
      ? true
      : undefined;
    updatedValues.workExperience[index].to = null;
    formik.setValues(updatedValues);
  };

  const handleRemove = (index: number) => {
    const values = formik.values;
    values.workExperience = values.workExperience.filter((_, i) => i !== index);
    formik.setValues(values);
  };

  const handleAdd = (index: number) => {
    const values = formik.values;
    if (!values.workExperience[index]) {
      values.workExperience[index] = {
        companyName: "",
        description: "",
        from: null,
        title: "",
        to: null,
      };
    }
    formik.setValues({ ...values });
  };

  const renderFields = (field: formFieldsSchema) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            mode="tags"
            onBlur={formik.handleBlur}
            open={false}
            style={{ width: "100%" }}
            placeholder="Skills"
            value={(formik.values as any)[field.name]}
            onChange={(values) => formik.setFieldValue(field.name, values)}
          />
        );
      default:
        return (
          <Input
            onChange={formik.handleChange}
            value={(formik.values as unknown as errorsSchema)[field.name]}
            placeholder={field.placeholder}
            onBlur={formik.handleBlur}
          />
        );
    }
  };

  const disabledDate = (date: moment.Moment) => {
    let disable = false;
    if (date > moment()) {
      disable = true;
    }
    formik.values.workExperience.forEach((item) => {
      if (item.from && date > moment(item.from)) {
        if (item.currentCompany) {
          disable = true;
        }
        if (item.to && date <= moment(item.to)) {
          disable = true;
        }
      }
    });
    return disable;
  };

  return (
    <>
      {loading && <Loader />}
      <Form
        layout="vertical"
        className={styles.profileForm}
        initialValues={initialValues}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >
        {FORM_FIELDS.map((field) => (
          <FormItem
            key={field.name}
            className={styles.formItem}
            label={field.label}
            name={[field.name]}
            rules={[{ required: field.required, message: field.message }]}
            help={touched[field.name] && errors[field.name]}
            validateStatus={
              touched[field.name] && errors[field.name] ? "error" : "success"
            }
          >
            {renderFields(field)}
          </FormItem>
        ))}
        <Form.List name="workExperience">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    className={styles.workExperience}
                    align="baseline"
                  >
                    <FormItem
                      {...restField}
                      className={styles.formItem}
                      label="Company"
                      name={[name, "companyName"]}
                      rules={[
                        { required: true, message: "Missing company name" },
                      ]}
                      help={
                        touched[getFormattedFieldKey(name, "companyName")] &&
                        errors[getFormattedFieldKey(name, "companyName")]
                      }
                      validateStatus={
                        touched[getFormattedFieldKey(name, "companyName")] &&
                        errors[getFormattedFieldKey(name, "companyName")]
                          ? "error"
                          : "success"
                      }
                    >
                      <Input
                        onChange={(e) =>
                          handleChange(e.target.value, "companyName", name)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.workExperience[name]?.companyName}
                        placeholder="Company Name"
                      />
                    </FormItem>
                    <FormItem
                      {...restField}
                      className={styles.formItem}
                      label="Role or Title"
                      name={[name, "title"]}
                      rules={[
                        { required: true, message: "Missing title / role" },
                      ]}
                      help={
                        touched[getFormattedFieldKey(name, "title")] &&
                        errors[getFormattedFieldKey(name, "title")]
                      }
                      validateStatus={
                        touched[getFormattedFieldKey(name, "title")] &&
                        errors[getFormattedFieldKey(name, "title")]
                          ? "error"
                          : "success"
                      }
                    >
                      <Input
                        onChange={(e) =>
                          handleChange(e.target.value, "title", name)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.workExperience[name]?.title}
                        placeholder="Title or Role"
                      />
                    </FormItem>
                    <FormItem
                      {...restField}
                      className={styles.formItem}
                      label="From"
                      name={[name, "from"]}
                      rules={[
                        { required: true, message: "Missing Start Date" },
                      ]}
                      help={
                        touched[getFormattedFieldKey(name, "from")] &&
                        errors[getFormattedFieldKey(name, "from")]
                      }
                      validateStatus={
                        touched[getFormattedFieldKey(name, "from")] &&
                        errors[getFormattedFieldKey(name, "from")]
                          ? "error"
                          : "success"
                      }
                    >
                      <DatePicker
                        format={DATE_FORMAT}
                        disabledDate={disabledDate}
                        value={formik.values.workExperience[name]?.from}
                        onBlur={formik.handleBlur}
                        onChange={(value) => handleChange(value, "from", name)}
                      />
                    </FormItem>
                    <FormItem
                      {...restField}
                      className={styles.formItem}
                      label="To"
                      name={[name, "to"]}
                      rules={[
                        {
                          required: name !== currentCompany?.index,
                          message: "Missing End Date",
                        },
                      ]}
                      help={
                        touched[getFormattedFieldKey(name, "to")] &&
                        errors[getFormattedFieldKey(name, "to")]
                      }
                      validateStatus={
                        touched[getFormattedFieldKey(name, "to")] &&
                        errors[getFormattedFieldKey(name, "to")]
                          ? "error"
                          : "success"
                      }
                    >
                      <DatePicker
                        disabled={name === currentCompany?.index}
                        format={DATE_FORMAT}
                        disabledDate={disabledDate}
                        value={formik.values.workExperience[name]?.to}
                        onBlur={formik.handleBlur}
                        onChange={(value) => handleChange(value, "to", name)}
                      />
                    </FormItem>
                    {(!currentCompany || currentCompany.index === name) && (
                      <FormItem
                        {...restField}
                        className={styles.formItem}
                        label="Currently Working"
                        name={[name, "currentlyWorking"]}
                      >
                        <Checkbox
                          checked={currentCompany?.value === true}
                          onChange={() => handleCheckboxClick(name)}
                        />
                      </FormItem>
                    )}
                    <FormItem
                      {...restField}
                      className={styles.formItem}
                      name={[name, "description"]}
                      label="Description"
                    >
                      <Input.TextArea
                        onChange={(e) =>
                          handleChange(e.target.value, "description", name)
                        }
                        onBlur={formik.handleBlur}
                        maxLength={300}
                        value={formik.values.workExperience[name]?.description}
                      />
                    </FormItem>
                    <MinusCircleOutlined
                      className={styles.removeBtn}
                      onClick={() => {
                        remove(name);
                        handleRemove(name);
                      }}
                    />
                  </Space>
                ))}
                <FormItem>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      handleAdd(fields.length);
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Work experience
                  </Button>
                </FormItem>
              </>
            );
          }}
        </Form.List>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </>
  );
};
export default ProfileForm;
