import Blockly from 'blockly';
import 'blockly/javascript';

Blockly.Blocks['generate_mixed_color'] = {
	init: function () {
		this.appendDummyInput()
			.appendField('Mixed Two Colours')
			.appendField(new Blockly.FieldColour('#ff0000'), 'ColorOne')
			.appendField(new Blockly.FieldColour('#000099'), 'ColorTwo');
		this.setColour('#001155');
		this.setTooltip('');
		this.setHelpUrl('');
	},
};

Blockly.JavaScript['generate_mixed_color'] = function (block) {
	var colour_colorone = block.getFieldValue('ColorOne');
	var colour_colortwo = block.getFieldValue('ColorTwo');
	// TODO: Assemble JavaScript into code variable.
	var code = `this.mixedColor('${colour_colorone}', '${colour_colortwo}');\n`;
	return code;
};

Blockly.Blocks['generate_math_result'] = {
	init: function () {
		this.appendDummyInput()
			.appendField('Calculate')
			.appendField(new Blockly.FieldNumber(1), 'first_number')
			.appendField(
				new Blockly.FieldDropdown([
					['+', '+'],
					['-', '-'],
					['x', '*'],
					['/', '/'],
				]),
				'operation'
			)
			.appendField(new Blockly.FieldNumber(1), 'second_number');
		this.setColour(100);
		this.setTooltip('');
		this.setHelpUrl('');
	},
};

Blockly.JavaScript['generate_math_result'] = function (block) {
	var number_first_number = block.getFieldValue('first_number');
	var dropdown_operation = block.getFieldValue('operation');
	var number_second_number = block.getFieldValue('second_number');
	var code = `this.calculate('${number_first_number}','${dropdown_operation}','${number_second_number}');\n`;
	return code;
};
