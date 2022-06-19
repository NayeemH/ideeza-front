export const blocklyConfig = {
	type: 'user_block',
	message0: '%1 is equal to %2 do %3',
	args0: [
		{
			type: 'field_variable',
			name: 'NAME',
			variable: 'item',
		},
		{
			type: 'input_value',
			name: 'LIST',
			check: 'Number',
		},
		{
			type: 'input_statement',
			name: 'DO',
		},
	],
	// output: null,
	// previousStatement: null, // output & previousStatement can't use at a time
	// nextStatement: null,
	// colour: 120,
};

export const toolboxCategoriesContent = [
	{
		kind: 'category',
		name: 'Control',
		colour: '#ff24c7',
		contents: [
			{
				kind: 'block',
				type: 'controls_if',
				blockxml:
					'<block type="controls_if"></block><block type="controls_whileUntil"></block>',
			},
			{
				kind: 'block',
				type: 'controls_for',
				blockxml: '<block type="controls_for">',
			},
			{
				kind: 'block',
				type: 'controls_forEach',
				blockxml: '<block type="controls_forEach"></block>',
			},
			{
				kind: 'block',
				type: 'controls_whileUntil',
				blockxml: '<block type="controls_whileUntil"></block>',
			},
			{
				kind: 'block',
				type: 'controls_repeat_ext',
			},
			{
				kind: 'block',
				type: 'controls_flow_statements',
			},
		],
	},
	{
		kind: 'category',
		name: 'Logic',
		colour: '#ff24c7',
		contents: [
			{
				kind: 'block',
				type: 'logic_compare',
			},
			{
				kind: 'block',
				type: 'logic_operation',
			},
			{
				kind: 'block',
				type: 'logic_negate',
			},
			{
				kind: 'block',
				type: 'logic_boolean',
			},
			{
				kind: 'block',
				type: 'logic_null',
			},
			{
				kind: 'block',
				type: 'logic_ternary',
			},
		],
	},
	{
		kind: 'category',
		name: 'Math',
		colour: '#ff24c7',
		contents: [
			{
				kind: 'block',
				type: 'math_number',
			},
			{
				kind: 'block',
				type: 'math_arithmetic',
			},
			{
				kind: 'block',
				type: 'math_single',
			},
			{
				kind: 'block',
				type: 'math_trig',
			},
			{
				kind: 'block',
				type: 'math_constant',
			},
			{
				kind: 'block',
				type: 'math_number_property',
			},
			{
				kind: 'block',
				type: 'math_round',
			},
			{
				kind: 'block',
				type: 'math_modulo',
			},
			{
				kind: 'block',
				type: 'math_on_list',
			},
			{
				kind: 'block',
				type: 'math_constrain',
			},
			{
				kind: 'block',
				type: 'math_random_int',
			},
			{
				kind: 'block',
				type: 'math_random_float',
			},
		],
	},
	{
		kind: 'category',
		name: 'Text',
		colour: '#ff24c7',
		contents: [
			{
				kind: 'block',
				type: 'text',
			},
			{
				kind: 'block',
				type: 'text_join',
			},
			{
				kind: 'block',
				type: 'text_append',
			},
			{
				kind: 'block',
				type: 'text_length',
			},
			{
				kind: 'block',
				type: 'text_isEmpty',
			},
			{
				kind: 'block',
				type: 'text_indexOf',
			},
			{
				kind: 'block',
				type: 'text_charAt',
			},
			{
				kind: 'block',
				type: 'text_getSubstring',
			},
			{
				kind: 'block',
				type: 'text_changeCase',
			},
			{
				kind: 'block',
				type: 'text_trim',
			},
			{
				kind: 'block',
				type: 'text_print',
			},
			{
				kind: 'block',
				type: 'text_prompt_ext',
			},
		],
	},
	//   {
	//     kind: "category",
	//     name: "Custom",
	//     colour: "#ff24c7",
	//     contents: [
	//       {
	//         kind: "block",
	//         type: "new_boundary_function",
	//       },
	//       {
	//         kind: "block",
	//         type: "return",
	//       },
	//     ],
	//   },
	{
		kind: 'category',
		name: 'User',
		colour: '#ff24c7',
		contents: [
			{
				kind: 'block',
				type: 'user_block',
			},
		],
	},
];
