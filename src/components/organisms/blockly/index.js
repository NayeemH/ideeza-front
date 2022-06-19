import 'blockly/javascript_compressed';
import { BlocklyWorkspace } from 'react-blockly';
import Blockly from 'blockly';
import { useEffect, useState } from 'react';
import { blocklyConfig, toolboxCategoriesContent } from './constent';
import { useAppSelector } from 'app/hooks';
import PropTypes from 'prop-types';

export default function CustomBlockly({
	xmlCode,
	jsCode,
	svgCode,
	initialBlock,
	type, // type is 'part' or 'component'
}) {
	const blocklyState = useAppSelector((state) => state.code.blocklyConfig);
	const selectedBlock = useAppSelector((state) => state.sidebar.block);
	const [blocklyKey, setBlocklyKey] = useState(0);
	const [xml, setXml] = useState(initialBlock);

	// useEffect(() => {
	//   console.log("here calls xml", xml);
	// }, [xml]);

	// const blockName = (function customBlockName() {
	//   if (blocklyState?.name) {
	//     return blocklyState.name.toLowerCase().replace(" ", "_");
	//   } else {
	//     return "user_block";
	//   }
	// })();

	Blockly.Blocks['user_block'] = {
		init: function () {
			this.jsonInit(blocklyConfig);
			if (blocklyState?.input_variable_name) {
				this.appendValueInput('NAME')
					.setCheck(null)
					.appendField(
						new Blockly.FieldVariable(blocklyState?.input_variable_name),
						'NAME'
					);
			}

			if (blocklyState?.is_output && !blocklyState?.previous_connector) {
				this.setOutput(true);
			}
			if (blocklyState?.previous_connector) {
				this.setPreviousStatement(true);
			}
			if (blocklyState?.next_connector) {
				this.setNextStatement(true);
			}
			if (blocklyState?.input_inline) {
				this.setInputsInline(true);
			}
			if (blocklyState?.statement) {
				this.appendStatementInput('DO').appendField('do');
			}

			if (blocklyState?.append_dummy_input) {
				this.appendDummyInput()
					.appendField('for each')
					.appendField(blocklyState?.append_dummy_input)
					.appendField(new Blockly.FieldVariable());
			}
			if (blocklyState?.append_value_input_type) {
				this.appendValueInput('LIST')
					.setCheck('Array')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(blocklyState?.append_value_input_name);
			}
			this.setColour(blocklyState?.color ?? '#ff25c7');
		},
	};

	Blockly.JavaScript['user_block'] = function (block) {
		var variable_name = Blockly.JavaScript.nameDB_.getName(
			block.getFieldValue('NAME'),
			Blockly.VARIABLE_CATEGORY_NAME
		);
		var value_list = Blockly.JavaScript.valueToCode(
			block,
			'LIST',
			Blockly.JavaScript.ORDER_ATOMIC
		);
		var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
		var code = 'if(' + variable_name + ' ===  ' + value_list + ') {\n' + statements_do + '} \n';
		return code;
	};

	const toolboxCategories = {
		kind: 'categoryToolbox',
		contents: toolboxCategoriesContent, // blocklyState?.color ?? "#ff24c7"
	};
	const workspaceDidChange = (workspace) => {
		const code = Blockly.JavaScript.workspaceToCode(workspace);
		jsCode(code);
		var blocks = workspace.getAllBlocks();

		for (let block of blocks) {
			let svgRoot = block.getSvgRoot();
			// console.log(svgRoot);
			try {
				var bbox = document.getElementsByClassName('blocklyBlockCanvas')[0].getBBox();
				svgCode(
					`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${+bbox.width}" height="${+bbox.height}" viewBox="0 0 ${+bbox.width} ${
						bbox.height
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
      </style>
     ${svgRoot.innerHTML}</svg>`
				);
			} catch (e) {
				e;
			}
			// svgRoot.setAttribute("id", block.data);
		}
	};

	const onBlocklyInject = () => {
		// return
		// (workspace)
		// Blockly.Xml.appendDomToWorkspace(xml, Blockly.workspace);
		// const ToolBox = new BlockContainer.Toolbox(workspace);
		// const ToolBoxItem = new BlockContainer.ToolboxItem(
		//   toolboxCategories,
		//   ToolBox
		// );
		// const BLOCKSVG = new BlockContainer.BlockSvg(workspace);
		// var xml = BlockContainer.Xml.workspaceToDom(workspace);
		// var xml_text = BlockContainer.Xml.domToPrettyText(xml);
		// console.log(xml_text);
		// console.log(BLOCKSVG);
		// console.log(workspace.blockDB_);
	};
	useEffect(() => {
		// if (blocklyState?.color) {
		//   setColor(blocklyState?.color);
		// }
		BlocklyRefresh();
	}, [blocklyState]);

	useEffect(() => {
		xmlCode(xml);
	}, [xml]);

	const BlocklyRefresh = () => {
		setBlocklyKey(Math.random());
	};

	const replaceXML = (xmlstring) => {
		let str = xmlstring;
		let a = new RegExp('</xml>', 'g');

		if (str) {
			str = str?.replace(a, '');
			let find = '<xml xmlns="https://developers.google.com/blockly/xml">';
			let b = new RegExp(find, 'g');
			str = str.replace(b, '');

			find = '<xml xmlns="http://www.w3.org/1999/xhtml">';
			b = new RegExp(find, 'g');
			str = str.replace(b, '');
		}

		return str;
	};

	useEffect(() => {
		if (selectedBlock) {
			const __blocks =
				type === 'part' && selectedBlock.length > 0
					? new Array(1).fill(selectedBlock[selectedBlock.length - 1])
					: selectedBlock;

			const blocks = __blocks.map((item) => replaceXML(item.editor_script));
			const combineBlocks = `<xml xmlns="https://developers.google.com/blockly/xml">${blocks.join()}</xml>`;

			setXml(
				Array.isArray(selectedBlock) && selectedBlock.length > 0
					? combineBlocks
					: initialBlock
			);
		}
		BlocklyRefresh();
	}, [selectedBlock]);
	return (
		<>
			<BlocklyWorkspace
				key={blocklyKey}
				toolboxConfiguration={toolboxCategories}
				initialXml={xml}
				className="fill-height"
				workspaceConfiguration={{
					grid: {
						spacing: 20,
						length: 3,
						colour: '#ccc',
						snap: true,
					},
					zoom: {
						controls: true,
						startScale: 0.9,
						maxScale: 3,
						minScale: 0.3,
						scaleSpeed: 1.2,
					},
				}}
				onWorkspaceChange={workspaceDidChange}
				onXmlChange={(xml) => {
					// setXml(xml);

					xmlCode(xml);
				}}
				onInject={onBlocklyInject}
			/>
		</>
	);
}

CustomBlockly.propTypes = {
	type: PropTypes.oneOf(['part', 'component']),
};
