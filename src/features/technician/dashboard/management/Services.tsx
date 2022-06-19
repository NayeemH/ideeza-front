import React from 'react';
import Table from '@organisms/table';
import Label from '@atoms/label';
import ManagementTableHeader from '@organisms/management-table-header';
import Pagination from '@molecules/pagination';

function Services() {
	//   const [loading, setLoading] = useState(false);
	//   const [popup, SetPopup] = useState(false);
	//   const [auth, setAuth] = useState(false);
	//   const [page, setPage] = useState(1);
	//   const [pager, setPager] = useState({});
	//   const [search, setSearch] = useState("");
	//   const [serviceValue, setServiceValue] = useState("");
	//   //   const dispatch = useDispatch();
	//   //   const state = useSelector((state) => state?.Auth?.authenticated);
	//   //   const getAllServiceData = (payload) => dispatch(onService(payload));
	//   const [allServiceData, setAllServiceData] = useState([]);
	//   const [totalDataCount, setTotalDataCount] = useState(0);
	//   const ServiceData = useSelector(
	//     ({ serviceDataReducer }) => serviceDataReducer
	//   );
	//   const addServiceResponse = useSelector(
	//     ({ serviceDataReducer }) => serviceDataReducer.add_service_message
	//   );
	//   const loader = useSelector(
	//     ({ serviceDataReducer }) => serviceDataReducer?.loader
	//   );

	//   const toggleOpen = () => SetPopup(!popup);

	const handlePage = () => {
		// setPage(e);
		// getAllServiceData({
		//   page: e,
		//   search,
		//   page_size: ITEMS_PER_PAGE,
		// });
	};

	//   const handleAddServiceAction = (e) => {
	//     const payload = {
	//       name: serviceValue,
	//       detail: "",
	//     };
	//     dispatch(addService(payload));
	//   };

	//   const handleOnChange = (e) => {
	//     setServiceValue(e.target.value);
	//   };

	//   useEffect(() => {
	//     setAuth(state);
	//   }, [state]);

	//   useEffect(() => {
	//     if (auth) {
	//       getAllServiceData({
	//         page: 1,
	//         search,
	//         page_size: ITEMS_PER_PAGE,
	//       });
	//     }
	//   }, [auth]);

	//   useEffect(() => {
	//     setPage(1);
	//     getAllServiceData({
	//       page: 1,
	//       search,
	//       page_size: ITEMS_PER_PAGE,
	//     });
	//   }, [search]);

	//   useEffect(() => {
	//     setLoading(loader);
	//   }, [loader]);

	//   useEffect(() => {
	//     setPager({
	//       ...pager,
	//       count:
	//         totalDataCount > ITEMS_PER_PAGE
	//           ? Math.ceil(totalDataCount / ITEMS_PER_PAGE)
	//           : 1,
	//     });
	//   }, [allServiceData]);

	//   useEffect(() => {
	//     setPager({
	//       ...pager,
	//       page,
	//     });
	//   }, [page]);

	//   useEffect(() => {
	//     if (ServiceData) {
	//       setTotalDataCount(ServiceData?.data?.count);
	//       setAllServiceData(ServiceData?.data?.results);
	//     }
	//   }, [ServiceData]);

	//   useEffect(() => {
	//     if (addServiceResponse) {
	//       toggleOpen();
	//       getAllServiceData();
	//     }
	//   }, [addServiceResponse]);

	return (
		<div className="pt-4">
			<Label
				value="Services"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				<ManagementTableHeader
					//   onClick={toggleOpen}
					iconClass="hidden"
					btnValue="Add new service"
					btnClass="hidden"
					containerClass="flex md:flex-row flex-col items-center justify-between md:px-4 p-4 space-y-3 md:space-y-0"
				/>
				{/* <ServicesTable
          // loading={loading}
          // data={
          //   Array.isArray(allServiceData) && allServiceData.length
          //     ? allServiceData
          //     : []
          // }
          data={[1, 2, 3, 4, 5, 6, 7]}
        /> */}
				<Table />
				<Pagination
					pager={10}
					handlePage={handlePage}
					mainClass="pt-6 pb-12"
				/>
			</div>
			{/* <AddServicesPopup
        open={popup}
        toggleOpen={toggleOpen}
        handleAddServiceAction={handleAddServiceAction}
        handleOnChange={handleOnChange}
        serviceValue={serviceValue}
      /> */}
		</div>
	);
}

export default Services;
