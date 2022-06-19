import { ICodeBlock } from '@models/code';
import { createSlice } from '@reduxjs/toolkit';

import type { AppState } from 'app/store';

export interface sidebarState {
	block: ICodeBlock[];
	currentTabMenu: 'Menu' | 'Customize';
	openBlockMenu: string;
	customizeMenu: 'none' | 'blockly' | 'electronics' | 'cover' | 'packages' | 'product';
	selected_block_data: {
		id: any;
		block_type: any;
	};

	selected_three_d_script: any;

	package: {
		edit?: {
			id: string | number;
			name: string;
		} | null;
		addPackageOpen: boolean;
		selected_module_type: 'BODY' | 'LEG' | '';
		selected_module_is_visible: boolean;
		selected_image_svg: string;
		selected_three_d_script: string;

		selected_modules: {
			body: any;
			leg: any;
		};

		sidebar_selected_package_type: 'leg' | 'body';
		sidebar_selected_package_mode: 'private' | 'public';

		newModule: {
			isSucceed: boolean;
			type: 'BODY' | 'LEG';
			visible: boolean;
		};
		newPackageFamily: number | null;
	};
}

const initialState: sidebarState = {
	block: [],

	currentTabMenu: 'Menu',
	openBlockMenu: '',
	customizeMenu: 'none',

	selected_block_data: {
		id: '',
		block_type: '',
	},

	selected_three_d_script: {},

	package: {
		edit: null,
		addPackageOpen: false,
		selected_module_type: '',
		selected_module_is_visible: true,
		selected_image_svg: '',
		selected_three_d_script: '',

		selected_modules: {
			body: null,
			leg: null,
		},

		sidebar_selected_package_type: 'body',
		sidebar_selected_package_mode: 'public',

		newModule: {
			isSucceed: false,
			type: 'BODY',
			visible: false,
		},
		newPackageFamily: null,
	},
};

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		resetState: (state) => {
			state.block = [];
		},
		setCurrentTabMenu: (state, { payload }) => void (state.currentTabMenu = payload),
		setOpenBlockMenu: (state, { payload }) => void (state.openBlockMenu = payload),
		setCustomizeMenu: (state, { payload }) => void (state.customizeMenu = payload),
		setBlockData: (state, { payload }) => void (state.selected_block_data = payload),
		setSidebarSelectedPackageType: (state, { payload }) =>
			void (state.package.sidebar_selected_package_type = payload),
		setSidebarSelectedPackageMode: (state, { payload }) =>
			void (state.package.sidebar_selected_package_mode = payload),

		setBlock: (state, { payload }) => void (state.block = payload),
		setSelectedThreeDScript: (state, { payload }) =>
			void (state.selected_three_d_script = payload),

		setPackage: (state, { payload }) =>
			void (state.package = {
				...state.package,
				...payload,
			}),
		setNewModule: (state, { payload }) => {
			state.package.newModule = payload;
		},
		setNewPackageFamily: (state, { payload }) => {
			state.package.newPackageFamily = payload;
		},
	},
});

export const {
	setBlockData,
	setPackage,
	setNewModule,
	setNewPackageFamily,
	setCurrentTabMenu,
	setOpenBlockMenu,
	setCustomizeMenu,
	setBlock,
	setSelectedThreeDScript,
	resetState,
	setSidebarSelectedPackageType,
	setSidebarSelectedPackageMode,
} = sidebarSlice.actions;

// Get a value from the state
export const selectTasks = (state: AppState) => state.sidebar;

export default sidebarSlice.reducer;
