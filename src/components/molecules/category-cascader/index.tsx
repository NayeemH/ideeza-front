import React from 'react';
// import "rsuite/dist/rsuite.css";
import { Cascader } from 'rsuite';
// interface DataItemType {
//   /** The value of the option corresponds to the `valueKey` in the data. **/
//   value: string;

//   /** The content displayed by the option corresponds to the `labelKey` in the data. **/
//   label?: React.ReactNode;

//   /**
//    * The data of the child option corresponds to the `childrenKey` in the data.
//    * Properties owned by tree structure components, such as TreePicker, Cascader.
//    */
//   children?: DataItemType[];

//   /**
//    * Properties of grouping functional components, such as CheckPicker, InputPicker
//    */
//   groupBy?: string;

//   /**
//    * The children under the current node are loading.
//    * Used for components that have cascading relationships and lazy loading of children. E.g. Cascader, MultiCascader
//    */
//   loading?: boolean;
// }
// [];

const CategoryCascader: React.FC<any> = ({ options, selected }) => {
	return (
		<div
			style={{
				display: 'block',
				width: '100%',
			}}
		>
			<Cascader
				style={{ width: '100%', fontSize: 25 }}
				placeholder="Select Category"
				data={options}
				searchable={false}
				parentSelectable
				onSelect={selected}
				// size="lg"
			/>
		</div>
	);
};

export default CategoryCascader;
