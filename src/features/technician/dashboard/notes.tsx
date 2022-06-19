import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiPencilFill } from 'react-icons/ri';

function NotesList(props: any) {
	const { deleteNote, title, desc, editNotes, id } = props;
	return (
		<div
			className="flex justify-between items-centerbg-white p-2 my-2 text-gray-900 hover:bg-[#441184]
    hover:text-white
    two-level-wrapper transition duration-100 ease-in-out border-b-2 lg:border-none"
		>
			<div>
				<p>{title.length > 40 ? title.slice(0, 40) + '...' : title}</p>
				<p>{desc.length > 50 ? desc.slice(0, 50) + '...' : desc}</p>
			</div>
			<div className="flex space-x-2 items-center">
				<RiPencilFill
					onClick={() => editNotes(id)}
					className="cursor-pointer hover:scale-110 text-md"
				/>
				<button onClick={deleteNote}>
					<IoMdClose className="cursor-pointer hover:scale-110 text-lg" />
				</button>
			</div>
		</div>
	);
}

export default NotesList;
