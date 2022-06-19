// import { AnyAction, Reducer } from "@reduxjs/toolkit";
import React from 'react';
// import { injectReducer } from "./index";

export function withReducer<T>() {
	//reducer: Reducer<any, AnyAction>
	return (WrappedComponent: React.ComponentType<T>) => {
		// Creating the inner component. The calculated Props type here is the where the magic happens.
		const ComponentWithReducer = (props: T) => {
			// Fetch the props you want to inject. This could be done with context instead.
			// injectReducer(reducer);
			// props comes afterwards so the can override the default ones.
			return <WrappedComponent {...(props as T)} />;
		};

		return ComponentWithReducer;
	};
}
