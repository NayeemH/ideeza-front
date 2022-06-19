import React, { useEffect, useState } from 'react';
import Blockly from 'blockly';
// import CreatedBlockList from '@features/blockly/fetchData/CreatedBlockList.json';
import { BlocklyGenerator } from '@features/blockly/BlocklyUtils/BlocklyGenerator';
import BlocklyComponentWorkspace from '@features/blockly/Components/BlocklyComponentWorkspace';
import { prepareBlockXml } from '@features/blockly/BlocklyUtils/blocklyFunctions';
import { useAppSelector } from 'app/hooks';

interface ICreateComponentWorkspaceProps {
	type?: 'componentCreate';
	xmlData?: any;
	editorScript?: any;
	onChangeXml?(xmlString: any, partBlocks: any[], blockCode: any): void;
	onChangeSvgData?(svgString: any): void;
	resetCode?: boolean;
	setResetCode?: any;
}

export default function CreateComponentWorkspace(props: ICreateComponentWorkspaceProps) {
	const [initialXml, setInitialXml] = useState();
	// '<xml xmlns="https://developers.google.com/blockly/xml"><block type="4a15ccb-ca21-cda-65a4-e5ca8f772b5f" x="450" y="150"><field name="name"></field></block></xml>'

	const selectedBlock = useAppSelector((state) => state.sidebar.block);
	const [addedBlock, setAddedBlock] = useState('');
	const [blockCode, setBlockCode] = useState('');

	const [partBlocks, setPartBlocks] = useState<any[]>([
		// {
		// 	blockType: '4a15ccb-ca21-cda-65a4-e5ca8f772b5f',
		// 	blockParameters: {
		// 		firstname: '',
		// 		blockColor: '#00c7a6',
		// 		inputInline: true,
		// 		setOutput: false,
		// 		prevConnector: true,
		// 		nextConnector: true,
		// 		addstatementInput: true,
		// 		addInput1: true,
		// 		addInput1Name: 'Value',
		// 		addInput2: true,
		// 		addInput2Name: 'Another Value',
		// 	},
		// },
	]);

	// const fetchBlocks = (blockList: any[] = []) => {
	// 	const blocks = blockList.length > 0 ? blockList : CreatedBlockList;

	// 	blocks.forEach(({ blockType, blockParameters }) => {
	// 		BlocklyGenerator({ blockType, ...blockParameters });
	// 	});
	// };

	const reFresh = (blockParameters: any, blockType: string) => {
		// console.log('blockParameters', blockParameters);
		// console.log('blockType', blockType);
		BlocklyGenerator({
			/* "firstname": "",
			"blockColor": "#6a5acd",
			"inputInline": false,
			"setOutput": false,
			"prevConnector": false,
			"nextConnector": false,
			"addstatementInput": false,
			"addInput1": false,
			"addInput1Name": "",
			"addInput2": false,
			"addInput2Name": "",
			"blockType": blockType, */

			/*  "firstname": "Test",
			"blockColor": "#85d534",
			"inputInline": true,
			"setOutput": true,
			"prevConnector": true,
			"nextConnector": true,
			"addstatementInput": true,
			"addInput1": true,
			"addInput1Name": "Block",
			"addInput2": false,
			"addInput2Name": "Block 2",
			"addAnotherInputValue": "11", */
			blockType,
			...blockParameters,
		});

		// fetchBlocks();
	};

	/* const typeListForIntegratedBlocks = (integratedXMLString: string) => {
		let xmlDoc = new DOMParser().parseFromString(
			integratedXMLString,
			"text/xml"
		);
		let blockList = xmlDoc.getElementsByTagName("block");
		let blockTypes = [];
		for (let block of blockList) {
			blockTypes.push(block.getAttribute("type"));
		}
		console.log("blocktypes: ", [...new Set(blockTypes)]);
		console.log("xml: ", integratedXMLString);
		return [...new Set(blockTypes)];
	}; */

	// const fetchAllEdtorScriptBlocks = (blocks: any[], type: String) => {
	// 	blocks.forEach((block: any) => {
	// 		if (block?.blockType) {
	// 			if (type !== 'builtInPart') {
	// 				if (block?.blockParameters !== undefined) {
	// 					BlocklyGenerator({
	// 						blockType: block?.blockType,
	// 						...block?.blockParameters,
	// 					});
	// 				}
	// 				// reFresh(block?.blockParameters, block?.blockType);
	// 			}
	// 			const partBlockIndex = partBlocks.findIndex(
	// 				(pb) => pb?.blockType === block?.blockType
	// 			);
	// 			if (partBlockIndex === -1) {
	// 				setPartBlocks((prev) => [
	// 					...prev,
	// 					{
	// 						blockType: block?.blockType,
	// 						blockParameters: block?.blockParameters,
	// 					},
	// 				]);
	// 			}
	// 		}
	// 	});
	// };

	const fetchAllEdtorScriptBlocks = (blocks: any[], type: string) => {
		blocks.forEach((block: any) => {
			// if (block?.blockType) {
			if (type !== 'builtInPart' && block?.blockParameters !== undefined) {
				// console.log("run generate blockly function", block)
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

	useEffect(() => {
		if (selectedBlock && selectedBlock.length > 0) {
			const blockData: any = selectedBlock[selectedBlock.length - 1];

			if (blockData?.editor_script) {
				const blockObject = JSON.parse(blockData?.editor_script);
				// console.log('blockObject', blockObject);

				if (
					blockObject?.xmlData &&
					blockObject?.blocks &&
					blockObject?.blocks?.length > 0
				) {
					// console.log('run these two functions', blockObject);
					fetchAllEdtorScriptBlocks(blockObject?.blocks, blockObject?.type);
					setAddedBlock(prepareBlockXml(blockObject?.xmlData));
				}
			}
		}
	}, [selectedBlock]);

	useEffect(() => {
		if (props.editorScript) {
			const editorScriptParsed = JSON.parse(props.editorScript);
			if (editorScriptParsed && editorScriptParsed?.partBlocks) {
				// eslint-disable-next-line no-unsafe-optional-chaining
				setPartBlocks((prev) => [...prev, ...editorScriptParsed?.partBlocks]);
				// fetchBlocks(editorScriptParsed?.partBlocks);
				fetchAllEdtorScriptBlocks(editorScriptParsed?.partBlocks, 'component');
			}
			if (editorScriptParsed && editorScriptParsed?.xmlData) {
				// console.log('xml Data: ', editorScriptParsed.xmlData);
				setInitialXml(editorScriptParsed?.xmlData);
			}
		}
		// console.log('editorScriptProps: ', props.editorScript);
	}, [props.editorScript]);

	useEffect(() => {
		if (props.resetCode) {
			setAddedBlock('');
			props.setResetCode(false);
		}
	}, [props.resetCode]);

	// useEffect(() => {
	// 	setInitialXml(props.xmlData)
	// }, [props.xmlData])

	useEffect(() => {
		partBlocks.forEach((partBlock) => {
			reFresh(partBlock?.blockParameters, partBlock?.blockType);
			// reFresh(partBlock, 'fa39cbe0-c304-11ec-826b-57a2d8e9d544');
		});
		// console.log("mainworkspace", Blockly);
	}, []);

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

	const onChangeAddedBlock = () => {
		setAddedBlock('');
	};

	return (
		<>
			<BlocklyComponentWorkspace
				toolboxContents={[]}
				initialXML={initialXml}
				addedBlock={addedBlock}
				onChangeAddedBlock={onChangeAddedBlock}
				onChangeXml={(xml: any) => {
					// console.clear();
					// console.log('NEW XML', xml);
					if (props.onChangeXml) {
						props.onChangeXml(xml, partBlocks, blockCode);
					}
					setTimeout(() => {
						generateSvg();
					}, 20);
				}}
				onChangeBlockCode={(blockCode: any) => setBlockCode(blockCode)}
			/>
			{/* <button onClick={() => {
                setAddedBlock(prepareBlockXml(`<xml xmlns="https://developers.google.com/blockly/xml"><block type="fa39cbe0-c304-11ec-826b-57a2d8e9d544,function () { [native code] }" id="_V2H^Hy9h|.j,5FYft-$" x="200" y="200"><field name="name">Test</field></block></xml>`));
            }}>Click to add new block</button> */}
		</>
	);
}
