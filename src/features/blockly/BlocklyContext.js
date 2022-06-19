import { createContext } from 'react';

const BlocklyContext = createContext(true);

export const ContextProvider = BlocklyContext.Provider;
export const ContextConsumer = BlocklyContext.Consumer;

export default BlocklyContext;
