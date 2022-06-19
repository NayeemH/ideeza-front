import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import ManagementTableHeader from '@organisms/management-table-header';
import Table from '@organisms/table';
import React, { useState } from 'react';

function ShippingMethod() {
	//   const dispatch = useDispatch();
	//   const [auth, setAuth] = useState(false);
	//   const [loading, setLoading] = useState([]);
	//   const [Allmethoddata, setmethoddata] = useState([]);
	//   const state = useSelector((state) => state?.Auth?.authenticated);
	//   const Alldata = useSelector(
	//     ({ shippingMethodReducer }) => shippingMethodReducer?.methoddata
	//   );
	//   const loader = useSelector(
	//     ({ shippingMethodReducer }) => shippingMethodReducer?.loader
	//   );
	//   const [shippingMethodName, setShippingMethodName] = useState("");
	//   const [shippingMethodDesc, setShippingMethodDesc] = useState("");

	//   const handleShippingMethodName = (e: any) => {
	//     setShippingMethodName(e.target.value);
	//   };

	//   const handleShippingMethodDesc = (e: any) => {
	//     setShippingMethodDesc(e.target.value);
	//   };

	//   useEffect(() => {
	//     setAuth(state);
	//   }, [state]);

	//   useEffect(() => {
	//     if (auth) dispatch(onMethodGet());
	//   }, [auth]);

	//   useEffect(() => {
	//     setLoading(loader);
	//   }, [loader]);

	//   useEffect(() => {
	//     if (Alldata) {
	//       setmethoddata(Alldata);
	//     }
	//   }, [Alldata]);
	const [popup, SetPopup] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	const handleAddNewShippingMethod = () => {
		// dispatch(
		//   addShippingMethodAction({
		//     name: shippingMethodName,
		//     description: shippingMethodDesc,
		//   })
		// );
		toggleOpen();
	};
	return (
		<div className="pt-4">
			<Label
				value="Shipping Method"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				<ManagementTableHeader
					onClick={toggleOpen}
					iconClass="-mr-3 border p-2"
					btnValue="Add new +"
					sortClass="hidden"
					btnClass="hidden"
					containerClass="flex md:flex-row flex-col items-center justify-between md:px-4 p-4 space-y-3 md:space-y-0"
				/>
				{/* <ShippingTable loading={loading} data={Allmethoddata} /> */}
				{/* <ShippingTable data={[1, 2, 3, 4, 5, 6, 7]} /> */}
				<Table />
				<Pagination
					pager={10}
					handlePage={() => {
						('');
					}}
					mainClass="pt-6 pb-12"
				/>
			</div>
			{/* <AddShippingPopup
        open={popup}
        toggleOpen={toggleOpen}
        handleAdd={handleAddNewShippingMethod}
        shippingMethodName={shippingMethodName}
        shippingMethodDesc={shippingMethodDesc}
        handleShippingMethodName={handleShippingMethodName}
        handleShippingMethodDesc={handleShippingMethodDesc}
      /> */}
		</div>
	);
}

export default ShippingMethod;
