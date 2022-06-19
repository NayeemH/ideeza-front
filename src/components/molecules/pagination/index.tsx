// import IconButton from "@atoms/icon-button";
import Label from '@atoms/label';
import CustomPagination from '@molecules/custom-pagination';
import React from 'react';

type IProps = {
	mainClass: string;
	pager: any;
	handlePage: (e: any, value: number) => void;
	loading?: boolean;
	articlePerPage?: number;
};

function Pagination({ mainClass, pager, handlePage, articlePerPage = 10 }: IProps) {
	return (
		<div
			className={`w-full flex-col items-center md:flex-row md:justify-between font-proxima-nova md:items-start flex space-x-2 gap-[15px] md:gap-0 ${mainClass}`}
		>
			<Label
				value={`Showing ${(pager?.page - 1) * articlePerPage + 1} - ${
					pager?.page === pager?.count ? pager?.totalBlogs : articlePerPage * pager?.page
				} of ${pager?.totalBlogs}`}
				// value={`Showing ${(currentPage - 1) * perPage + 1} - ${currentPage === pageCount ? totalBlogs : perPage * currentPage
				// 	} of ${totalBlogs}`}
				classes={{
					root: 'text-md md:text-lg text-[#787878]  tracking-tight',
				}}
			/>
			<div>
				{/* <HiOutlineChevronDoubleLeft /> */}

				{pager?.count && (
					<CustomPagination
						count={pager?.count}
						handleChange={handlePage}
						showFirstButton
						showLastButton
					/>
				)}
				{/* <MdDoubleArrow /> */}
			</div>
			{/* <input
        value={pager?.page || "0"}
        className="w-10 text-priamry rounded-md border border-solid border-gray-160 bg-gray-200 px-2 py-[2px]  font-semibold text-md md:text-lg"
        // inputProps="text-current bg-gray-200 h-4 -ml-3 font-semibold text-lg md:text-xl font-lato p-2 rounded border border-solid border-gray-160"
      />
      <Label
        value={`of ${pager?.count}`}
        classes={{
          root: "tracking-tight text-lg md:text-xl font-san text-gray-700 pr-1",
        }}
      />
      <IconButton
        loading={loading}
        count={pager?.count}
        page={pager?.page}
        handlePage={handlePage}
        pager={pager}
      /> */}
		</div>
	);
}

export default Pagination;
