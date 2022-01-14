# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

1. What was your approach for this project? Did it change as you developed the app further?
   My approach was to create three routes:
   1. Create profile route ('/create-profile'): Only visible when user has not saved his/her profile data, user can save data on local storage,
   2. Edit profile route ('/edit-profile'): Enables user to edit his profile data, only visible when user has saved his/her profile data,
   3. View profile route ('/view-profile'): User can view his/her profile, only visible when user has saved his/her profile data,
      The goal was to create a single reusable form component component that can be used to saved and edit user profile data, the approach did not changed
      much as app progresses further.
2. What were the challenges you faced?
   There were two challenges that I faced while developing the app:
   1. First one was dealing with the new react-router version6, my previous working experience were with v5 so it was difficult for me to adjust to v6
      but as things progressed further I was able to get the hang of it and was able to acheive the desired results.
   2. Combining formik with antd for managing validation was also challenging for me because I have worked with formik before but had not dealt with antd
      forms before so combining the validations of formik with antd took some efforts but I was able to manage it
3. How differently will you do if you had a couple of more days to complete the assignment? What if you have one full month?
   Currently I have created a single profile form and managed formik validations using useFormik custom hooks, by manually updating the field errors. If I had a couple of more days then I would have used the Form, Field and FieldArray component of Formik and would have combined it with antd fields similar
   to this example sandbox https://codesandbox.io/s/4x47oznvvx.
