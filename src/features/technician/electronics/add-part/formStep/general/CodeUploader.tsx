import { UseFormReturn } from 'react-hook-form';
// import { IoIosClose } from "react-icons/io";

export default function CodeUploader({ method }: { method: UseFormReturn<any, object> }) {
	const { register, getValues } = method;
	// const {
	//   register,
	//   setValue,
	//   getValues,
	//   watch,
	//   // control,
	//   // formState: { errors },
	// } = useForm({
	//   // defaultValues: {
	//   //   // code: [{ language: "", file: "" }],
	//   // },
	// });
	// const { fields, append, remove } = useFieldArray({
	//   control,
	//   name: "code",
	// });
	const { file } = getValues();

	return (
		<div className="w-full pr-[30px]">
			{/* <hr /> */}
			<div className="bg-white ">
				<div className="mb-4 pb-4 flex items-center gap-[45px]">
					<label className="text-[#666666] text-base 2xl:text-xl">Language Type</label>
					<div className="flex flex-1 mt-2 items-center">
						<div>
							<select
								{...register(`language`, {
									required: 'Select Language',
								})}
								className="pl-[20px] py-[12px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select 2xl:w-[300px]"
							>
								<option value="">Choose script language</option>
								<option value="c++">C++</option>
								<option value="JavaScript">JavaScript</option>
							</select>
						</div>

						<div>
							<label className="flex gap-4 ml-4 cursor-pointer py-2">
								<span>{file && Array.from(file).flatMap((v: any) => v.name)}</span>
								<>
									<input
										{...register(`file`, {
											required: 'Select file',
										})}
										// onChange={(e) => setValue(`file`, e.target.files)}
										type="file"
										accept=".cpp,.js"
										hidden
									/>
									<img
										src="/images/icon/upload-icon.svg"
										alt="icon"
									/>
								</>
							</label>
						</div>
					</div>
				</div>
				{/* {fields.map((field, index) => (
          <div className="mb-4 border-b pb-4" key={field.id}>
            <label className="text-[#666666] text-base 2xl:text-xl">
              Language Type
            </label>
            <div className="flex flex-1 mt-2">
              <select
                {...register(`code.${index}.language` as const, {
                  required: true,
                })}
                className="form-select flex-1"
              >
                <option value="">Choose script language</option>
                <option value="c++">C++</option>
                <option value="JavaScript">JavaScript</option>
              </select>
              <label className="flex gap-4 ml-4 cursor-pointer py-2">
                <span>
                  {code[index].file &&
                    Array.from(code[index].file).flatMap((v: any) => v.name)}
                </span>
                {code[index].file ? (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600"
                  >
                    <IoIosClose size="30" />
                  </button>
                ) : (
                  <>
                    <input
                      onChange={(e) =>
                        setValue(`code.${index}.file`, e.target.files)
                      }
                      type="file"
                      accept=".zip,.rar,.7zip"
                      hidden
                    />
                    <img src="/images/icon/upload-icon.svg" alt="icon" />
                  </>
                )}
              </label>
            </div>
          </div>
        ))} */}
				{/* <button
          type="button"
          onClick={() =>
            append({
              language: "",
              file: "",
            })
          }
          className="w-full transform-none py-3 rounded-none text-md text-primary tracking-tight font-sans"
        >
          + Add new
        </button> */}
			</div>
		</div>
	);
}
