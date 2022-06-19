import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from 'utils/createEmotionCache';
import { themes } from 'utils/theme';
import { GA_TRACKING_ID } from 'lib/gtag';

export default function MyDocument(props: any) {
	return (
		<Html>
			<Head>
				<meta
					name="theme-color"
					content={themes.palette.primary.main}
				/>
				<link
					rel="shortcut icon"
					href="/static/favicon.ico"
				/>

				{/* Inject MUI styles first to match with the prepend: true configuration. */}
				{(props as any).emotionStyleTags}
				{/* fonts */}
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Open+Sans:ital,wght@0,300;0,500;0,600;0,700;1,300&family=Poppins:wght@300;400;500&display=swap"
					rel="stylesheet"
				></link>
				{/* react-joy-ride css added */}
				{/* <link
          rel="stylesheet"
          href="/path/to/react-joyride/lib/react-joyride-compiled.css"
          type="text/css"
        ></link> */}
				<link
					href="https://fonts.cdnfonts.com/css/proxima-nova-2"
					rel="stylesheet"
				></link>

				{/* Global Site Tag (gtag.js) - Google Analytics */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
					}}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

// export default class MyDocument extends Document {
//     render() {
//         return (
//             <Html lang="en">
//                 <Head>
//                     {/* PWA primary color */}
//                     <meta
//                         name="theme-color"
//                         content={themes.palette.primary.main}
//                     />
//                     <link rel="shortcut icon" href="/static/favicon.ico" />

//                     {/* Inject MUI styles first to match with the prepend: true configuration. */}
//                     {(this.props as any).emotionStyleTags}
//                 </Head>
//                 <body>
//                     <Main />
//                     <NextScript />
//                 </body>
//             </Html>
//         )
//     }
// }

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: any): Promise<any> => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	const originalRenderPage = ctx.renderPage;

	// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
	// However, be aware that it can have global side effects.
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) =>
				function EnhanceApp(props: any) {
					return (
						<App
							emotionCache={cache}
							{...props}
						/>
					);
				},
		});

	const initialProps = await (Document as any).getInitialProps(ctx);
	// This is important. It prevents emotion to render invalid HTML.
	// See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags,
	};
};
