import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import ManagementTableHeader from '@organisms/management-table-header';
import Table from '@organisms/table';
import React, { useState, useEffect } from 'react';

function Certifications() {
	//   const itemsPerPage = 10;

	const [auth, setAuth] = useState(false);
	const [search, setSearch] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [pager, setPager] = useState({});
	//   const [allCertificationData, setAllCertificationData] = useState([]);
	const [certificateName, setCertificateName] = useState('');
	const [yearEstablished, setYearEstablished] = useState('');
	//   const [userId, setUserId] = useState("");

	//   const state = useAppSelector((state) => state?.auth);

	//   const certificationData = useSelector(
	//     ({ getCertificateReducer }) => getCertificateReducer?.certificationData
	//   );
	//   const certificateCount = useSelector(
	//     ({ getCertificateReducer }) => getCertificateReducer?.count
	//   );
	//   const loader = useSelector(
	//     ({ getCertificateReducer }) => getCertificateReducer?.loader
	//   );
	//   const isCertificateAdded = useSelector(
	//     ({ certificationReducer }) => certificationReducer?.isCertificateAdded
	//   );

	const handleNameChange = (e: any) => {
		setCertificateName(e.target.value);
	};

	const handleYearEstablishChange = (e: any) => {
		setYearEstablished(e.target.value);
	};

	const handleAddCertifications = () => {
		// dispatch(
		//   onCertificationAdd({
		//     type: 0,
		//     name: certificateName,
		//     year: parseDateStrToISO(yearEstablished),
		//     user: userId,
		//   })
		// );
		SetPopup(!popup);
	};

	const handleSearch = (e: any) => setSearch(e.target.value);
	const handlePage = (e: any) => {
		setPageNumber(e);
		// return dispatch(onCertificationGet({ page: e, search }));
	};

	//   useEffect(() => {
	//     setAuth(state); //state doesn't have authenticated property
	//     setUserId(state);
	//   }, [state]);

	useEffect(() => {
		if (auth) {
			setPageNumber(1);
			//   dispatch(onCertificationGet({ search, itemsPerPage, pageNumber }));
		}
	}, [search, auth]);

	//   useEffect(() => {
	//     setLoading(loader);
	//   }, [loader]);

	//   useEffect(() => {
	//     if (certificationData) {
	//       setAllCertificationData(certificationData);
	//     }
	//   }, [certificationData]);

	//   useEffect(() => {
	//     setPager({
	//       ...pager,
	//       count:
	//         certificateCount > itemsPerPage
	//           ? Math.ceil(certificateCount / itemsPerPage)
	//           : 1,
	//     });
	//   }, []);

	//   useEffect(() => {
	//     if (isCertificateAdded) {
	//       setPageNumber(1);
	//       dispatch(onCertificationGet({ search, itemsPerPage, pageNumber }));
	//     }
	//   }, [isCertificateAdded]);
	/*useEffect(() => {
    setPager(
      {
        ...pager,
        page,
      },
      [page]
    );
  });*/
	const [popup, SetPopup] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	return (
		<div className="pt-4">
			<Label
				value="Certifications"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				<ManagementTableHeader
					onClick={toggleOpen}
					handleSearch={handleSearch}
					iconClass="hidden"
					btnValue="Add new cert"
					btnClass="hidden"
					containerClass="flex md:flex-row flex-col items-center justify-between md:px-4 p-4 space-y-3 md:space-y-0"
				/>
				{/* <CertificationsTable loading={loading} data={allCertificationData} /> */}
				{/* <CertificationsTable data={[1, 2, 3, 4, 5, 6, 7]} /> */}
				<Table />
				<Pagination
					pager={pager}
					handlePage={handlePage}
					mainClass="pt-6 pb-12"
				/>
			</div>
			{/* <AddCertificationsPopup
        open={popup}
        toggleOpen={toggleOpen}
        handleAddCertifications={handleAddCertifications}
        handleNameChange={handleNameChange}
        handleYearEstablishChange={handleYearEstablishChange}
      /> */}
		</div>
	);
}

export default Certifications;
