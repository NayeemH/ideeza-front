const TabIconLabel = (props: any) => {
	const { iconImage, title } = props;

	return (
		<span className="flex items-center">
			<img
				src={iconImage || '/images/icon/p-general.svg'}
				alt="icon"
			/>
			{title && <span className="ml-2 capitalize text-[18px]">{title}</span>}
		</span>
	);
};

export default TabIconLabel;
