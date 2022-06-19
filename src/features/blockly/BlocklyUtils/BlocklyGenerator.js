import Blockly from 'blockly';
import 'blockly/javascript';

export const BlocklyGenerator = ({
	blockType,
	blockColor,
	firstname,
	inputInline = false,
	setOutput = false,
	prevConnector = false,
	nextConnector = false,
	addstatementInput = false,
	addInput1 = false,
	addInput1Name,
	addInput2 = false,
	addInput2Name,
} = {}) => {
	Blockly.Blocks[blockType] = {
		init: function () {
			this.appendValueInput('Input1')
				// .appendField(new Blockly.FieldVariable("firstname"), "name")
				.appendField(new Blockly.FieldDropdown([[`${firstname}`, firstname]]), 'name')
				.appendField('is equal to');
			this.appendStatementInput('statement').setCheck(null).appendField('do');
			if (addInput1)
				this.appendValueInput('Input2')
					.setCheck(null)
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(addInput1Name);
			if (addstatementInput)
				this.appendStatementInput('statement2').setCheck(null).appendField('do');
			if (addInput2)
				this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(addInput2Name);
			this.setInputsInline(inputInline);
			this.setPreviousStatement(prevConnector, null);
			this.setNextStatement(nextConnector, null);
			this.setOutput(setOutput, null);
			this.setColour(blockColor);
			this.setTooltip('');
			this.setHelpUrl('');
		},
	};

	Blockly.JavaScript[blockType] = function (block) {
		var variable_name = block.getFieldValue('name');
		// var variable_name = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
		var value_input1 = Blockly.JavaScript.valueToCode(
			block,
			'Input1',
			Blockly.JavaScript.ORDER_ATOMIC
		);
		var statements_statement = Blockly.JavaScript.statementToCode(block, 'statement');
		// var value_input2 = Blockly.JavaScript.valueToCode(block, 'Input2', Blockly.JavaScript.ORDER_ATOMIC);
		var code = `
		if(${variable_name} === ${value_input1}) {
			${statements_statement}
		}
		`;
		return code;
	};
};
