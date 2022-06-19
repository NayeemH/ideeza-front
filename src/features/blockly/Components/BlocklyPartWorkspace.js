import React, { Component } from 'react';
import Blockly from 'blockly';
import '@features/blockly/BlocklyUtils/customBlock';
import BlocklyContext from '@features/blockly/BlocklyContext';
import dynamic from 'next/dynamic';

const BlocklyWorkspace = dynamic(
	() => import('react-blockly').then((module) => module.BlocklyWorkspace),
	{
		ssr: false,
	}
);

export default class BlocklyPartWorkspace extends Component {
	static contextType = BlocklyContext;

	state = {
		initialXML: this.props.initialXML,
		toolboxCategories: {
			kind: 'categoryToolbox',
			cssConfig: {
				container: 'toolboxCss',
			},
			contents: [],
		},
		blockKey: 0,
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.blockParameters !== undefined &&
			JSON.stringify(prevProps.blockParameters) !== JSON.stringify(this.props.blockParameters)
		) {
			// console.log("run para change")
			// const initialXML = this.props.initialXML;
			// this.setState({ initialXML });
			this.reload();
		}
		if (prevProps.initialXML !== this.props.initialXML) {
			const initialXML = this.props.initialXML;
			this.setState({ initialXML });
			this.reload();
		}
		if (this.props.addedBlock !== '') {
			const xml = this.state.initialXML
				.replace('<xml xmlns="https://developers.google.com/blockly/xml">', '')
				.replace('</xml>', '');
			var initialXML =
				'<xml xmlns="https://developers.google.com/blockly/xml">' +
				xml +
				this.props.addedBlock +
				'</xml>';
			const adjustAddedBlock = this.HandleNotToOverlapBlocks(initialXML);
			initialXML =
				'<xml xmlns="https://developers.google.com/blockly/xml">' +
				xml +
				adjustAddedBlock +
				'</xml>';
			this.props.onChangeAddedBlock();
			this.setState({ initialXML });
			// console.log('xml after adding: ', initialXML);
			// console.log("addedblock: ", this.props.addedBlock)
			this.reload();
		}
	}

	HandleNotToOverlapBlocks = (integratedXMLString) => {
		var xmlDoc = new DOMParser().parseFromString(integratedXMLString, 'text/xml');
		var blockTagList = xmlDoc.childNodes[0].childNodes;
		var NewBlockTag = blockTagList[blockTagList.length - 1];
		var xPosition = parseInt(blockTagList[blockTagList.length - 1].getAttribute('x'));
		var yPosition = parseInt(blockTagList[blockTagList.length - 1].getAttribute('y'));
		for (var i = 0; i <= blockTagList.length - 2; i++) {
			if (
				xPosition === parseInt(blockTagList[i].getAttribute('x')) &&
				yPosition === parseInt(blockTagList[i].getAttribute('y'))
			) {
				xPosition += 5;
				yPosition += 5;
			}
		}
		NewBlockTag.setAttribute('x', xPosition);
		NewBlockTag.setAttribute('y', yPosition);
		return NewBlockTag.outerHTML;
	};

	reload = () => {
		let blockKey = 0;
		do {
			blockKey = Math.random();
		} while (blockKey === this.state.blockKey);
		this.setState({ blockKey });
	};

	workspaceDidChange = (workspace) => {
		const code = Blockly.JavaScript.workspaceToCode(workspace);
		this.context.setCode(code);
		this.props.onChangeBlockCode(code);
		const block = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace))
			.replace('<xml xmlns="https://developers.google.com/blockly/xml">', '')
			.replace('</xml>', '');
	};

	handleXMLChange = async (data) => {
		this.setState({ initialXML: data });
		const block = data
			.replace('<xml xmlns="https://developers.google.com/blockly/xml">', '')
			.replace('</xml>', '');
		//console.log("XML: ", data);
		if (this.props.onChangeXml && typeof this.props.onChangeXml === 'function') {
			this.props.onChangeXml(data);
		}
		await this.context.setIntegratedXML(data);
	};

	render() {
		// console.log('initial XML: 	', this.state.initialXML);
		return (
			<BlocklyWorkspace
				key={this.state.blockKey}
				className="blockly-workspace"
				// you can use whatever classes are appropriate for your app's CSS
				toolboxConfiguration={this.state.toolboxCategories} // this must be a JSON toolbox definition
				workspaceConfiguration={{
					grid: {
						spacing: 20,
						length: 3,
						colour: '#ccc',
						snap: true,
					},
					trashcan: true,
					zoom: {
						controls: true,
						startScale: 0.9,
						maxScale: 3,
						minScale: 0.3,
						scaleSpeed: 1.2,
					},
				}}
				initialXml={this.state.initialXML}
				onXmlChange={this.handleXMLChange}
				onWorkspaceChange={this.workspaceDidChange}
			/>
		);
	}
}
