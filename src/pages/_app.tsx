import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import '../../styles/globals.css';
import '../../styles/coverThreejs.css';
import '../../styles/coverToolbar.css';
import type { AppProps } from 'next/app';
import store from 'app/store';
import { createTheme, ThemeProvider } from '@mui/material';
import { themes } from 'utils/theme';
import { SessionProvider } from 'next-auth/react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from 'utils/createEmotionCache';
import { ToastContainer } from 'react-toastify';
const clientSideEmotionCache = createEmotionCache();
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { hotjar } from 'react-hotjar';
import { useRouter } from 'next/router';
import { GA_TRACKING_ID } from 'lib/gtag';
import { ContextProvider } from '@features/blockly/BlocklyContext';
import NextNProgress from 'nextjs-progressbar';

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}
function MyApp({
	Component,
	pageProps: { session, ...pageProps },
	emotionCache = clientSideEmotionCache,
}: MyAppProps) {
	const theme = createTheme(themes);
	const queryClientRef: any = useRef();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}
	const router = useRouter();

	const [blocklyCode, setBlocklyCode] = useState('');
	const [addedBlock, setAddedBlock] = useState('');
	const [blockSvgList, setBlockSvgList] = useState([]);
	const [integratedXML, setIntegratedXML] = useState('');
	const [toolboxContents, setToolboxContents] = useState([
		// {
		//   kind: "block",
		//   type: "controls_whileUntil",
		//   blockxml: '<block type="controls_whileUntil"></block>',
		// },
		// {
		//   kind: "block",
		//   type: "controls_repeat_ext",
		// },
	]);

	useEffect(() => {
		// my code goes here
	}, [blocklyCode]);

	const setCode = (blocklyCode: any) => setBlocklyCode(blocklyCode);

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			// gtag.pageview(url);
			window.gtag('config', GA_TRACKING_ID, {
				page_path: url,
			});
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	useEffect(() => {
		hotjar.initialize(
			Number(process.env.NEXT_PUBLIC_HOTJAR_HJID),
			Number(process.env.NEXT_PUBLIC_HOTJAR_HJSV)
		);
	}, []);

	return (
		<>
			<NextNProgress color="#ff09d0" />
			<QueryClientProvider client={queryClientRef.current}>
				<CacheProvider value={emotionCache}>
					<Provider store={store}>
						<SessionProvider session={session}>
							<ThemeProvider theme={theme}>
								<CssBaseline />

								<ContextProvider
									value={
										{
											integratedXML,
											setIntegratedXML,
											setCode,
											addedBlock,
											setAddedBlock,
											toolboxContents,
											setToolboxContents,
											blockSvgList,
											setBlockSvgList,
										} as any
									}
								>
									<Component {...pageProps} />
								</ContextProvider>
								<ToastContainer />
							</ThemeProvider>
						</SessionProvider>
					</Provider>
				</CacheProvider>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
