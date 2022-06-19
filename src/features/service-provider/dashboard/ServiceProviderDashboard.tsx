import React from 'react';
import Calendar from '@atoms/date-picker';
import Label from '@atoms/label';
import Analytics from '@features/technician/dashboard/analytics';
import { Grid } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { greeting } from 'utils/utils';
import NotesList from '@features/technician/dashboard/notes';

import GenericTable from '@organisms/generic-table';

const ServiceProviderDashboard = () => {
	// const [tableData, setTableData] = useState<ITableData[]>();
	const userData = useAppSelector((state) => state?.auth?.userData);

	return (
		<div className="">
			<Analytics
				greeting={greeting(userData?.first_name ?? '')}
				messages={{ title: 'Messages', count: userData?.messages_count }}
				articles={{ title: 'Articles', count: userData?.blogs_count }}
				tasks={{ title: 'Open Tasks', count: userData?.open_tasks_count }}
				score={{ title: 'My Score', count: userData?.score }}
			/>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
					md={9}
				>
					<Label
						value="Task Management"
						classes={{
							root: `text-primary font-sans font-bold text-2xl py-3`,
						}}
					/>
					<div className="rounded-md shadow-lg bg-white">
						<div className="lg:-mx-0.5">
							<GenericTable />
						</div>
					</div>
				</Grid>
				<Grid
					item
					xs={12}
					md={3}
				>
					<div className="md:mt-14 shadow-full mb-3 rounded bg-white overflow-x-auto">
						<Calendar />
					</div>
					{/*  */}
					<div className="bg-white shadow-full  rounded-t">
						<Label
							value="3rd march"
							classes={{
								root: `text-white font-bold font-sans bg-primary rounded text-center text-base w-full py-2`,
							}}
						/>
						{[
							<NotesList
								key={1}
								title={'there is no title'}
								desc={'read some description'}
								// deleteNote={() => hendleDeleteNote(item.id)}
							/>,
							<NotesList
								key={1}
								title={'there is no title'}
								desc={'read some description'}
								// deleteNote={() => hendleDeleteNote(item.id)}
							/>,
							<NotesList
								key={1}
								title={'there is no title'}
								desc={'read some description'}
								// deleteNote={() => hendleDeleteNote(item.id)}
							/>,
							<NotesList
								key={1}
								title={'there is no title'}
								desc={'read some description'}
								// deleteNote={() => hendleDeleteNote(item.id)}
							/>,
						]}
						{/* {notes &&
              notes.map((item: INote) => {
                return (
                  <NotesList
                    key={item.id}
                    title={item?.title}
                    desc={item?.description}
                    // deleteNote={() => hendleDeleteNote(item.id)}
                  />
                );
              })} */}
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default ServiceProviderDashboard;
