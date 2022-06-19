import React, { Component } from 'react';
import BlocklyContext from '../BlocklyContext';
import styles from '../styles/Home.module.css';

export default class CustomToolbox extends Component {
	static contextType = BlocklyContext;

	generateSVG = (data) => {
		const buff = Buffer.from(data);
		return buff.toString('base64');
	};

	handleClick = async (type) => {
		console.log('type', type);
		if (this.props.componentRouteToolbox) {
			const block = `<block type="${type}" x="200" y="200"></block>`;
			await this.context.setAddedBlock(`<block type="${type}" x="200" y="200"></block>`);
			console.log('addblock: ', block, 'check ', this.context);
		}
	};

	render() {
		console.log('fromToolbox: ', this.props.blockSvgList);
		return (
			<div className={styles.customToolbox}>
				{this.props.createdRoute &&
					this.context.blockSvgList.map(({ svg, type }, index) => (
						<img
							key={index}
							onClick={() => this.handleClick(type)}
							src={`data:image/svg+xml;base64,${this.generateSVG(
								svg.replace(/&nbsp;/g, ' ')
							)}`}
							alt=""
						/>
					))}
				{this.props.componentRouteToolbox &&
					this.props.blockSvgList.map(({ svg, type }, index) => (
						<img
							key={index}
							onClick={() => this.handleClick(type)}
							src={`data:image/svg+xml;base64,${this.generateSVG(
								svg.replace(/&nbsp;/g, ' ')
							)}`}
							alt=""
						/>
					))}
			</div>
		);
	}
}
