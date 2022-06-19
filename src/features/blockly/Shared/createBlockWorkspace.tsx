import React, { useState, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';
import Blockly from 'blockly';
import { BlocklyGenerator } from '@features/blockly/BlocklyUtils/BlocklyGenerator';
// import BlocklyComponentWorkspace from '@features/blockly/Components/BlocklyComponentWorkspace';
// import CustomBlockly from '@features/blockly/Components/CustomBlockly';
// import BlocklyContext from '@features/blockly/BlocklyContext';
import { prepareBlockXml } from '../BlocklyUtils/blocklyFunctions';
import { useAppSelector } from 'app/hooks';
import CreatedBlockList from '@features/blockly/fetchData/CreatedBlockList.json';
import BlocklyPartWorkspace from '../Components/BlocklyPartWorkspace';

interface ICreateBlockWorkSpace {
	xmlData?: any;
	blockParameters?: any;
	editorScript?: any;
	onChangeXml?(xmlString: any, partBlocks: any[], blockCode: any): void;
	// onChangeXmlData?(xmlString: any, blockType?: any): void;
	onChangeSvgData?(svgString: any): void;
	resetCode?: boolean;
	setResetCode?: any;
}

const CreateBlockWorkSpace: React.FC<ICreateBlockWorkSpace> = (props) => {
	const [blockType, setBlockType] = useState(uuidv1().toString());
	// const blocklyContext: any = useContext(BlocklyContext);
	// const toolboxContents = blocklyContext?.toolboxContents;

	const [blockParameters, setblockParameters] = useState({
		firstname: '',
		blockColor: '#ff24c7',
		inputInline: false,
		setOutput: false,
		prevConnector: false,
		nextConnector: false,
		addstatementInput: false,
		addInput1: false,
		addInput1Name: '',
		addInput2: false,
		addInput2Name: '',
	});

	const [initialXML, setInitialXML] = useState(
		`<xml xmlns="https://developers.google.com/blockly/xml"><block type="${blockType}" x="200" y="200"></block></xml>`
	);

	const selectedBlock = useAppSelector((state) => state.sidebar.block);
	const [blockCode, setBlockCode] = useState('');
	const [addedBlock, setAddedBlock] = useState('');
	const [partBlocks, setPartBlocks] = useState<any[]>([
		{
			blockType: blockType.toString(),
			blockParameters: {
				...blockParameters,
			},
		},
	]);

	// const fetchBlocks = (blockList: any[] = []) => {
	// 	const blocks = blockList.length > 0 ? blockList : CreatedBlockList;
	// 	blocks.forEach(({ blockType, blockParameters }) => {
	// 		BlocklyGenerator({ blockType, ...blockParameters });
	// 	});
	// };

	const reFresh = (blockParameters: any, blockType: string) => {
		// console.log('blockParameters', blockParameters);
		// console.log('blockType', blockType.toString());
		BlocklyGenerator({
			blockType,
			...blockParameters,
		});
		// fetchBlocks();
	};

	const fetchAllEdtorScriptBlocks = (blocks: any[], type: string) => {
		blocks.forEach((block: any) => {
			// if (block?.blockType) {
			if (type !== 'builtInPart' && block?.blockParameters !== undefined) {
				BlocklyGenerator({
					blockType: block?.blockType,
					...block?.blockParameters,
				});

				// reFresh(block?.blockParameters, block?.blockType);
			}
			const partBlockIndex = partBlocks.findIndex((pb) => pb?.blockType === block?.blockType);
			if (partBlockIndex === -1) {
				setPartBlocks((prev) => [
					...prev,
					{
						blockType: block?.blockType,
						blockParameters: block?.blockParameters,
					},
				]);
			}
			// }
		});
		// console.log("partBlocks: ", partBlocks)
	};

	const {
		firstname,
		blockColor,
		inputInline,
		setOutput,
		prevConnector,
		nextConnector,
		addstatementInput,
		addInput1,
		addInput1Name,
		addInput2,
		addInput2Name,
	} = blockParameters;

	const blocklyGeneratorData = {
		blockType,
		blockColor,
		firstname,
		inputInline,
		setOutput,
		prevConnector,
		nextConnector,
		addstatementInput,
		addInput1,
		addInput1Name,
		addInput2,
		addInput2Name,
	};

	const generateSvg = async () => {
		// const newToolboxContents = [...toolboxContents];
		// newToolboxContents.push({
		// 	kind: 'block',
		// 	type: blockType,
		// });
		// await blocklyContext.setToolboxContents(newToolboxContents);

		const workspaceList: any = Blockly.Workspace.getAll();
		const createdBlock = workspaceList[workspaceList.length - 3].getAllBlocks()[0];
		const newSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.2" width="${
			createdBlock?.width
		}" height="${createdBlock?.height}" viewBox="0 0 ${createdBlock?.width} ${
			createdBlock?.height
		}"><style>     
        .blocklyPathLight {
          fill: none;
          stroke-linecap: round;
          stroke-width: 1;
        }
        .blocklyText {
          fill: #fff;
        }
        .blocklyEditableText > rect {
          fill: #fff;
          fill-opacity: .6;
          stroke: none;
        }    
        .blocklyDropdownText {
          fill: #000;
        }
		.blocklyIconGroup {
          fill: blue;
        }
        .blocklyIconSymbol {
          fill: #fff;
        }
      </style>${createdBlock?.getSvgRoot().innerHTML}</svg>`;

		if (props.onChangeSvgData) {
			props.onChangeSvgData(newSVG);
		}
	};

	useEffect(() => {
		// console.log('selectedBlock: ', selectedBlock);
		if (selectedBlock && selectedBlock.length > 0) {
			const blockData: any = selectedBlock[selectedBlock.length - 1];

			if (blockData?.editor_script) {
				const blockObject = JSON.parse(blockData?.editor_script);

				if (
					blockObject?.xmlData &&
					blockObject?.blocks &&
					blockObject?.blocks?.length > 0
				) {
					// console.log('blockObject: ', blockObject);
					fetchAllEdtorScriptBlocks(blockObject?.blocks, blockObject?.type);
					setAddedBlock(prepareBlockXml(blockObject?.xmlData));
				}
			}
		}
	}, [selectedBlock]);

	// useEffect(() => {
	// 	if (props.editorScript) {
	// 		const editorScriptParsed = JSON.parse(props.editorScript);
	// 		if (editorScriptParsed && editorScriptParsed?.partBlocks) {
	// 			setPartBlocks((prev) => [...prev, ...editorScriptParsed?.partBlocks]);
	// 			// fetchBlocks(editorScriptParsed?.partBlocks);
	// 			fetchAllEdtorScriptBlocks(editorScriptParsed?.partBlocks, "component")

	// 			if (editorScriptParsed && editorScriptParsed?.xmlData) {
	// 				console.log('xml Data: ', editorScriptParsed.xmlData);
	// 				setInitialXML(editorScriptParsed?.xmlData);
	// 			}
	// 		}
	// 	}
	// }, [props.editorScript]);

	useEffect(() => {
		BlocklyGenerator(blocklyGeneratorData);
		const newpartBlocks = [...partBlocks];
		newpartBlocks[0].blockParameters = blockParameters;
		setPartBlocks(newpartBlocks);
		// console.log("check partblock Params: ", partBlocks);
		// const xmlData =
		// 	'<xml xmlns="https://developers.google.com/blockly/xml"><block type="' +
		// 	blockType +
		// 	'" x="200" y="200"></block></xml>';

		// setInitialXML(xmlData);
	}, [blockParameters]);

	useEffect(() => {
		setblockParameters({
			...blockParameters,
			...props.blockParameters,
		});
	}, [props.blockParameters]);

	useEffect(() => {
		if (props.resetCode) {
			setAddedBlock('');
			props.setResetCode(false);
		}
	}, [props.resetCode]);

	// useEffect(() => {
	// 	setInitialXML(props.xmlData)
	// }, [props.xmlData])

	useEffect(() => {
		partBlocks.forEach((partBlock) => {
			reFresh(partBlock?.blockParameters, partBlock?.blockType);
			// BlocklyGenerator({
			// 	...blocklyGeneratorData,
			// 	blockType
		});
		// return () => {
	}, []);

	const onChangeAddedBlock = () => {
		setAddedBlock('');
	};

	return (
		<>
			<BlocklyPartWorkspace
				toolboxContents={[]}
				initialXML={initialXML}
				addedBlock={addedBlock}
				onChangeAddedBlock={onChangeAddedBlock}
				onChangeXml={(xmlString: any) => {
					// console.log('xmlString', xmlString);
					// console.log('blockParameters', props.blockParameters);
					// if (props.onChangeXmlData) {
					// 	/* const block_type = (
					// 		blockType.length > 0 ? blockType[0] : blockType
					// 	); */
					// 	props.onChangeXmlData(xmlString, getBlockType(xmlString));
					// }
					if (props.onChangeXml) {
						props.onChangeXml(xmlString, partBlocks, blockCode);
					}

					setTimeout(() => {
						generateSvg();
					}, 20);
				}}
				blockParameters={blockParameters}
				onChangeBlockCode={(blockCode: any) => setBlockCode(blockCode)}
			/>
		</>
	);
};

export default CreateBlockWorkSpace;
