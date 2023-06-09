import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MessageAlert from './components/MessageAlert/MessageAlert';
import NotFound from './components/NotFound/NotFound';
import Home from './container/Home/Home';
import Results from './container/Results/Results';
import { rootTheme } from './theme';
import { fetchAppConfig } from './utils/api/api';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				errorElement: <NotFound />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: 'results/studyInstanceUid/:studyInstanceUid',
						element: <Results />,
					},
					{
						path: '*',
						element: <NotFound />,
					},
				],
			},
		],
	},
]);

fetchAppConfig().then(() => {
	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<React.StrictMode>
			<ThemeProvider theme={rootTheme}>
				<CssBaseline />
				<RecoilRoot>
					<RouterProvider router={router} />
					<MessageAlert />
				</RecoilRoot>
			</ThemeProvider>
		</React.StrictMode>,
	);
});
