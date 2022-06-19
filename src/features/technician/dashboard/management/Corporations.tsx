import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import ManagementTableHeader from '@organisms/management-table-header';
import Table from '@organisms/table';
import React, { useState, useEffect } from 'react';

function Corporations() {
	//   const dispatch = useDispatch();

	//   const [loading, setLoading] = useState(false);
	//   const [AllCorporationdata, setCorporationdata] = useState([]);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [pager, setPager] = useState({});
	const [popup, SetPopup] = useState(false);
	const [urlValue, setUrlValue] = useState('');
	const [corporationName, setCorporationName] = useState('');
	const [attachment, setAttachment] = useState([]);

	//   const Alldata = useSelector(
	//     ({ corporationReducer }) => corporationReducer?.corporationdata
	//   );
	//   const loader = useSelector(
	//     ({ corporationReducer }) => corporationReducer?.loader
	//   );
	//   const totaldata = useSelector(
	//     ({ corporationReducer }) => corporationReducer?.count
	//   );
	//   const corporationAdded = useSelector(
	//     ({ corporationReducer }) => corporationReducer.corporation_added_message
	//   );

	const handleNameChange = (e: any) => setCorporationName(e.target.value);

	const handleURLChange = (e: any) => setUrlValue(e.target.value);

	const handleAddCorporation = async (data: any) => {
		//Dispatch action to handle add coporation
		if (data) {
			const formData = new FormData();
			formData.append('type', '0');
			formData.append('name', corporationName);
			formData.append('attachment_url', urlValue);
			if (typeof attachment[0] !== 'undefined') {
				formData.append('attachment', attachment[0]);
			}
			//   dispatch(addCorporationAction(formData));
		}
	};

	//   const handleSearch = (e) => setSearch(e.target.value);

	const addAttachment = (e: any) => {
		if (e) {
			const data = attachment;
			// data.push(e);
			return setAttachment(data);
		}
		return;
	};

	const deleteAttachment = (e: any) => setAttachment((state) => state.filter((v, k) => k !== e));

	const handlePage = (e: any) => {
		setPage(e);
		// return dispatch(onCorporationGet({ page: e, search }));
	};

	const toggleOpen = () => SetPopup(!popup);

	useEffect(() => {
		setPage(1);
		// dispatch(onCorporationGet({ search, itemsPerPage: ITEMS_PER_PAGE }));
	}, [search]);

	//   useEffect(() => {
	//     setLoading(loader);
	//   }, [loader]);

	//   useEffect(() => {
	//     if (Alldata) {
	//       setCorporationdata(Alldata);
	//     }
	//   }, [Alldata]);

	//   useEffect(() => {
	//     setPager({
	//       ...pager,
	//       count:
	//         totaldata > ITEMS_PER_PAGE ? Math.ceil(totaldata / ITEMS_PER_PAGE) : 1,
	//     });
	//   }, [totaldata]);

	useEffect(() => {
		setPager({
			...pager,
			page,
		});
	}, [page]);

	//   useEffect(() => {
	//     if (corporationAdded === "Added Successfully!") {
	//       toggleOpen();
	//     }
	//   }, [corporationAdded]);

	return (
		<div className="pt-4">
			<Label
				value="Corporations"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				<ManagementTableHeader
					onClick={toggleOpen}
					iconClass="hidden"
					btnValue="Add new corp"
					btnClass="hidden"
					containerClass="flex md:flex-row flex-col items-center justify-between md:px-4 p-4 space-y-3 md:space-y-0"
				/>
				{/* <CorporationsTable loading={loading} data={AllCorporationdata} /> */}
				{/* <CorporationsTable data={[1, 2, 3, 4, 5, 6, 7]} /> */}
				<Table />
				<Pagination
					pager={pager}
					handlePage={handlePage}
					mainClass="pt-6 pb-12"
				/>
			</div>
			{/* <AddCorporationPopup
        open={popup}
        toggleOpen={toggleOpen}
        handleNameChange={handleNameChange}
        handleAddCorporation={handleAddCorporation}
        corporationName={corporationName}
        handleURLChange={handleURLChange}
        urlValue={urlValue}
        add={addAttachment}
        deleted={deleteAttachment}
      /> */}
		</div>
	);
}

export default Corporations;
