import React from 'react';
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
import CheckboxAtom from '@atoms/checkbox';
import Button from '@atoms/button';
import { FormControlLabel } from '@mui/material';
// import Link from "next/link";
import Modal from '@atoms/modal';
import { useRouter } from 'next/router';
// import Button from "@mui/material/Button";

// const style = {
//   position: "absolute" as 'absolute',
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   //   width: 1400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
interface CookiePreferenceProps {
	openCookie: boolean;
	handleClose: () => void;
	handleApprove: () => void;
	checked: boolean;
	onChangeCheckbox: any;
}

const CookiePreference: React.FC<CookiePreferenceProps> = (props) => {
	const { openCookie, handleClose, handleApprove, checked, onChangeCheckbox } = props;
	const router = useRouter();
	return (
		<div>
			<Modal
				width="xl"
				className={{ paper: 'p-[50px] rounded-[16px]' }}
				close={handleClose}
				content={
					<div className="">
						<h5 className="font-semibold text-xl xl:text-[24px] text-[#333333] leading-[41px]">
							We value your privacy
						</h5>
						<p className="text-[16px] xl:text-[20px] text-[#787878] leading-[34px] pt-[20px] pb-[35px]">
							We (Ideeza) and certain third parties use cookies on “Ideeza.com”. The
							details regarding the types of cookies, their purpose and the third
							parties involved are described below and in our Cookie Notice. Please
							click on “Approve” to consent to our usage of cookies as described in
							the Cookie Notice in order to have the best possible experience on our
							websites. You can also set your preferences or reject cookies (except
							for strictly necessary cookies).{' '}
							<span
								className="text-primary underline cursor-pointer "
								onClick={() => {
									router.push('/agreement');
									handleClose();
								}}
							>
								Cookie notice and further details
							</span>{' '}
						</p>
						<div className="flex justify-between items-center">
							<h5 className="font-semibold text-xl xl:text-[20px]">
								Cookie preferences
							</h5>
							<div className="flex items-center 2xl:pb-[55px]">
								<FormControlLabel
									className="items-center mt-2"
									control={
										<CheckboxAtom
											onChange={onChangeCheckbox}
											checked={checked}
											className="ml-[-10px]"
											color="primary"
										/>
									}
									label={
										<p className=" text-base xl:text-[20px]">
											Strictly necessary cookies
										</p>
									}
								/>
							</div>
						</div>

						<div className="flex justify-center md:justify-start">
							<div className="flex gap-3">
								<Button
									value="Approve"
									className="text-white text-base 2xl:text-xl shadow-none rounded-[6px] bg-primary capitalize py-[15px] px-[30px]"
									color="primary"
									onClick={handleApprove}
								/>
								<Button
									value="Decilne"
									className="text-base 2xl:text-xl shadow-none rounded-[6px] capitalize py-[15px] px-[30px] text-gray-500 bg-[#E6E6E6]"
									color="primary"
									onClick={handleClose}
								/>
							</div>
						</div>
					</div>
				}
				open={openCookie}
			/>
			{/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCookie}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openCookie}>
          <Box sx={style} className="custom-cookie-pre">
            <div className="py-[10px] 2xl:py-[50px] px-0 xl:px-[30px]">
              <h5 className="font-semibold text-xl xl:text-[30px]">
                We value your privacy
              </h5>
              <p className="text-base xl:text-[20px] py-[10px] xl:py-[30px]">
                We (Ideeza) and certain third parties use cookies on
                “Ideeza.com”. The details regarding the types of cookies, their
                purpose and the third parties involved are described below and
                in our Cookie Notice. Please click on “Approve” to consent to
                our usage of cookies as described in the Cookie Notice in order
                to have the best possible experience on our websites. You can
                also set your preferences or reject cookies (except for strictly
                necessary cookies).{" "}
                <Link href="/agreement">
                  <a className="text-primary cursor-pointer underline">
                    Cookie notice and further details
                  </a>
                </Link>
              </p>
              <h5 className="font-semibold text-xl xl:text-[30px]">
                Cookie preferences
              </h5>
              <div className="flex items-center 2xl:pb-[55px]">
                <FormControlLabel
                  className="items-center mt-2"
                  control={
                    <CheckboxAtom
                      onChange={onChangeCheckbox}
                      checked={checked}
                      className="ml-[-10px]"
                      color="primary"
                    />
                  }
                  label={
                    <p className=" text-base xl:text-[20px]">
                      Strictly necessary cookies
                    </p>
                  }
                />
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="flex gap-3">
                  <Button
                    value="Approve"
                    className="text-white text-base 2xl:text-xl shadow-none rounded-[10px] bg-primary uppercase px-5 py-2 xl:px-16 xl:py-2.5"
                    color="primary"
                    onClick={handleApprove}
                  />
                  <Button
                    value="Decilne"
                    className="text-base 2xl:text-xl shadow-none rounded-[10px] border border-solid border-gray-500 bg-white uppercase px-5 py-2 xl:px-16 xl:py-2.5 text-gray-500"
                    color="primary"
                    onClick={handleClose}
                  />
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal> */}
		</div>
	);
};

export default CookiePreference;
