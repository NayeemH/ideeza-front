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

export default class CustomBlockly extends Component {
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
			this.props.createBlockParameters !== undefined &&
			JSON.stringify(prevProps.createBlockParameters) !==
				JSON.stringify(this.props.createBlockParameters)
		) {
			const initialXML = this.props.initialXML;
			this.setState({ initialXML });
			this.reload();
		}
		if (prevProps.initialXML !== this.props.initialXML) {
			const initialXML = this.props.initialXML;
			this.setState({ initialXML });
			this.reload();
		}
		if (this.context.addedBlock !== '') {
			const xml = this.state.initialXML
				.replace('<xml xmlns="https://developers.google.com/blockly/xml">', '')
				.replace('</xml>', '');
			const initialXML =
				'<xml xmlns="https://developers.google.com/blockly/xml">' +
				xml +
				this.context.addedBlock +
				'</xml>';
			console.log('didupdate: ', this.context.addedBlock);
			console.log('xml: ', initialXML);
			this.setState({ initialXML });
			this.context.setAddedBlock('');
			// console.log("xml: ", this.state.initialXML);
			this.reload();
		}
	}

	reload = () => {
		let blockKey = 0;
		do {
			blockKey = Math.random();
		} while (blockKey === this.state.blockKey);
		this.setState({ blockKey: Math.random() });
	};

	workspaceDidChange = (workspace) => {
		const code = Blockly.JavaScript.workspaceToCode(workspace);
		this.context.setCode(code);
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
		await this.context.setIntegratedXML(data);

		if (this.props.onChangeXml && typeof this.props.onChangeXml === 'function') {
			this.props.onChangeXml(data);
		}
	};

	render() {
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
