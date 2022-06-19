import { IRoom } from '@models/chat';
import { createContext, useContext } from 'react';

export interface IContextData {
	room: IRoom;
}

interface IProps {
	children: any;
	data: IContextData;
}

const MessageContext = createContext<IContextData | null>(null);
function MessageProvider({ children, data }: IProps) {
	return <MessageContext.Provider value={data}>{children}</MessageContext.Provider>;
}

function useMessageState() {
	const context = useContext(MessageContext);
	if (context === undefined) {
		throw new Error('useMessageState must be used within a MessageProvider');
	}
	return context;
}

export { MessageProvider, useMessageState };
