import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from 'features/landing/home/reducer';
import authReducer from 'reducers/auth';
import chatReducer from 'reducers/chat';
import loginPopUpReducer from 'reducers/login';
import loginSignUpPromptPopupReducer from 'reducers/loginSignUpPromptPopup';
import signupPopUpReducer from 'reducers/signup';
import taskReducer from '../../features/technician/dashboard/reducer';
import codeReducer from '../../features/technician/code/reducer';
import coverReducer from '../../features/technician/cover/reducer';
import blogReducer from '../../features/technician/blog/reducer';
import noteReducer from '../../features/technician/notes/reducer';
import sidebarReducer from '../../layouts/private/sidebar/reducer';
import dasboardReducer from '../../features/user/reducer';
import userArticalReducer from '../../features/user/profile/reducer';
import TecnhicianProjectsReducer from '../../features/technician/profile/reducer';
import newsfeedReducer from '../../features/user/news-feed/reducer';
import notificationReducer from '../../features/user/dashboard/notifications/reducer';
import creatProjectReducer from '@features/user/project/create/reducer';
import editProjectReducer from '@features/user/product/edit/reducer';
import projectsReducer from '../../features/user/projects/reducer';
import teamReducer from 'features/landing/about/teamReducer';
import jobReducer from 'features/landing/about/jobReducer';
import blogSingleReducer from 'features/landing/blog/single/reducer';
import contactUsReducer from 'features/landing/contact/reducer';
import myIdeezaReducer from '../../components/organisms/my-ideeza/reducer';
import productCommentsReducer from '@organisms/single-product-comments/reducer';
import projectCommentsReducer from '@organisms/single-project-comments/reducer';
import partCommentsReducer from '@features/user/parts/part-details/singlePartComments/reducer';
import planCartReducer from 'features/user/dashboard/user-payment/reducer';

import logger from 'redux-logger';

export const appReducers = combineReducers({
	auth: authReducer,
	chat: chatReducer,
	counter: counterReducer,
	task: taskReducer,
	code: codeReducer,
	cover: coverReducer,
	sidebar: sidebarReducer,
	blog: blogReducer,
	userProfile: userArticalReducer,
	dashboard: dasboardReducer,
	notification: notificationReducer,
	loginPopUp: loginPopUpReducer,
	signupPopUp: signupPopUpReducer,
	loginSignUpPromptPopup: loginSignUpPromptPopupReducer,
	notes: noteReducer,
	newsFeed: newsfeedReducer,
	technicianProject: TecnhicianProjectsReducer,
	createProject: creatProjectReducer,
	editProject: editProjectReducer,
	projects: projectsReducer,
	team: teamReducer,
	jobs: jobReducer,
	blogSingle: blogSingleReducer,
	contactUs: contactUsReducer,
	myIdeeza: myIdeezaReducer,
	productComments: productCommentsReducer,
	projectComments: projectCommentsReducer,
	partComments: partCommentsReducer,
	planCart: planCartReducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: appReducers,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(logger),
	});
};

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
