# TODO: Sync Git and Link Backend-Frontend Efficiently

## Tasks
- [x] Pull latest changes from main branch to incorporate partner's merged work
- [x] Apply stashed changes (vite.config.js modifications and TODO.md)
- [x] Update frontend/src/api.js to use relative '/api' paths for efficient proxy integration
- [x] Commit all changes (including api.js update and TODO.md)
- [x] Push Frontend/Pascal branch to make work visible to partner
- [ ] Test integration: Run backend server and frontend dev server, verify API calls work without CORS issues

## Previous TODO: Integrate Formik and Yup in React Frontend

## Completed Tasks
- [x] Install formik and yup dependencies in frontend/package.json
- [x] Update frontend/src/components/Taskform.jsx to use Formik and Yup for task form validation and submission
- [x] Create frontend/src/components/Signuplist.jsx as a signup form using Formik and Yup

## Followup Steps
- [ ] Run `npm run dev` in frontend/ to start the development server and test the forms
- [ ] Verify form validation works (e.g., required fields, email format, password matching)
- [ ] Test form submissions (mock alerts for now, integrate with api.js later if needed)
- [ ] Check for any console errors or build issues
- [ ] If used in pages, ensure imports are correct (e.g., in AddTaskpage.jsx or SignupsPage.jsx)
