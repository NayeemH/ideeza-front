import Head from 'next/head';

interface CommonMetaProps {
	title?: string;
	type?: string;
	image?: string;
	imageWidth?: string;
	imageHeight?: string;
	url?: string;
	description?: string;
}

export default function CommonMeta({
	title = 'IDEEZA | AI Based SAAS',
	type = '',
	image = '',
	imageWidth = '',
	imageHeight = '',
	url = '',
	description = 'IDEEZA is an end-to-end hardware product development platform.Enables anyone to generate a new product from a simple description for free and within minutes by using automatic and AI processes.',
}: CommonMetaProps) {
	return (
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
			<meta
				property="og:title"
				content={title}
			/>
			<meta
				property="og:type"
				content={`${type}`}
			/>
			<meta
				property="og:image"
				content={image}
			/>
			<meta
				property="og:image:width"
				content={`${imageWidth}`}
			/>
			<meta
				property="og:image:height"
				content={`${imageHeight}`}
			/>
			<meta
				property="og:url"
				content={url}
			/>
			<meta
				property="og:description"
				content={description}
			/>
			<meta
				name="msapplication-TileColor"
				content="#ffffff"
			/>
			<meta
				name="theme-color"
				content="#ff00c7"
			/>

			{/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/icon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/icon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/icon/favicon-16x16.png"
      /> */}
			{/* <link rel="manifest" href="/images/icon/site.webmanifest" /> */}
			{/* <link
        rel="mask-icon"
        href="/images/icon/safari-pinned-tab.svg"
        color="#ff00c7"
      /> */}

			<link
				rel="icon"
				href="/favicon.ico"
			/>
			{/* <link rel="stylesheet" href="/path/to/react-joyride/lib/react-joyride-compiled.css" type="text/css"/> */}
		</Head>
	);
}
