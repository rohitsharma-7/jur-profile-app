import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { ProfileFormSchema } from "src/utils/constants";
import { APP_ROUTES, LOCAL_STORAGE_KEYS } from "src/utils/enums";
import { extractJson } from "src/utils/helper";

import styles from "src/styles/ViewProfile.module.css";

const ViewProfile = () => {
  const userData: ProfileFormSchema = extractJson(
    LOCAL_STORAGE_KEYS.PROFILE_DATA
  );
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Button
        onClick={() => navigate(APP_ROUTES.EDIT_PROFILE)}
        className={styles.editBtn}
        type="text"
        icon={<EditOutlined />}
        size={"middle"}
      />
      <div className={styles.headerWrapper}>
        <h1 className={styles.bold}>
          {userData.firstName + " " + userData.lastName}
        </h1>
        <span>{userData.tagLine}</span>
      </div>
      <span>{userData.email}</span>
      <div className={styles.skillsBlock}>
        <h4 className={styles.bold}>Skills</h4>
        {userData.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      <div className={styles.workExperience}>
        {userData.workExperience.map((item, index) => (
          <div key={`exp-${index}`}>
            <p>
              <span className={styles.bold}>Company:</span>
              <span>{item.companyName}</span>
            </p>
            <p>
              <span className={styles.bold}>Description:</span>
              <span>{item.description || "NA"}</span>
            </p>
            <p>
              <span className={styles.bold}>Role:</span>
              <span>{item.title}</span>
            </p>
            {item.from && (
              <p>
                <span className={styles.bold}>Duration:</span>
                <span>{` ${moment(item.from).format("MMM-YY")} ${
                  item.to ? "to " + moment(item.to).format("MMM-YY") : "onwards"
                }`}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProfile;
