import react, { useEffect, useState } from 'react';
import { BlocklyGenerator } from '../BlocklyUtils/BlocklyGenerator';
import CustomBlockly from './CustomBlockly';
import CreatedBlockList from '../fetchData/CreatedBlockList.json';

const MyBlocklyWorkspace = (props) => {
	const [blockSvgList, setBlockSvgList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchBlocks = () => {
		var blockSvgList = [];

		CreatedBlockList.forEach(({ type, svg, createBlockParameters }) => {
			BlocklyGenerator({ blockType: type, ...createBlockParameters });
			blockSvgList = [...blockSvgList, { type, svg }];
		});

		setBlockSvgList(blockSvgList);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchBlocks();
	}, []);

	return (
		<CustomBlockly
			initialXML={props.xmlData}
			onChangeXml={props.onChangeXml}
		/>
	);
};

export default MyBlocklyWorkspace;
