// import Modal from "../global/modal-launcher";
// import AyButton from "../myUi/AyButton";
// import { Image, StickyNote, Upload, Video } from "lucide-react";
// import { Field, Form, Formik } from "formik";
// import { upload_New_File } from "@/services/upload/route";
// import { makeToast } from "@/utils/toaster";
// import { Input } from "../ui/input";

// interface UploadType {
//   id: number;
//   title: string;
//   type: string;
//   icon: JSX.Element;
//   accept: string;
// }

// const UploadFiles: React.FC = () => {
//   const uploadTypes: UploadType[] = [
//     {
//       id: 1,
//       title: "Video",
//       type: "video",
//       icon: <Video className="w-5 h-5 mr-2" />,
//       accept: "video/*",
//     },
//     {
//       id: 2,
//       title: "Image",
//       type: "image",
//       icon: <Image className="w-5 h-5 mr-2" />,
//       accept: "image/*",
//     },
//     {
//       id: 3,
//       title: "Documents",
//       type: "documents",
//       icon: <StickyNote className="w-5 h-5 mr-2" />,
//       accept: `application/pdf,application/msword,text/plain`,
//     },
//   ];

//   return (
//     <div>
//       <Formik
//         initialValues={{ files: [] as File[] }}
//         onSubmit={async (values) => {
//           console.log(values, "values");

//           try {
//             const formData = new FormData();
//             values.files.forEach((file) => formData.append("files", file));
//             const response = await upload_New_File(formData);
//             if (response.status === 200) {
//               makeToast(response.data.message);
//             }
//           } catch (error) {
//             console.error("Error uploading files:", error);
//           }
//         }}
//       >
//         {({ setFieldValue, values }) => (
//           <Form>
//             <pre>
//               {JSON.stringify(values, null, 2)}

//             </pre>
//             <Modal
//               trigger={
//                 <AyButton
//                   type="button"
//                   title=""
//                   sx={{ width: "100%", borderRadius: "10px", height: "40px" }}
//                 >
//                   <Upload className="h-4 w-4 mr-2" />
//                   Upload
//                 </AyButton>
//               }
//               title="Upload Your Files"
//             >
//               {/* Hidden File Input */}
//               <Field name="files">
//                 {() => (
//                   <Input
//                     type="file"
//                     multiple
//                     accept="image/*,video/*,application/pdf"
//                     className="hidden"
//                     onChange={(event) => {
//                       const files = event.target.files;
//                       console.log(files);

//                       if (files) {
//                         setFieldValue("files", Array.from(files));
//                       }
//                     }}
//                   />
//                 )}
//               </Field>

//               <ul className="grid grid-cols-3 gap-2">
//                 {uploadTypes.map((upload) => (
//                   <li key={upload.id}>
//                     <button
//                       className="flex items-center w-full cursor-pointer px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
//                       onClick={() => {
//                         const input =
//                           document.querySelector<HTMLInputElement>(
//                             'input[type="file"]'
//                           );
//                         if (input) {
//                           input.accept = upload.accept;
//                           input.click();
//                         }
//                       }}
//                     >
//                       {upload.icon} {upload.title}
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               <AyButton
//                 type="submit"
//                 title=""
//                 sx={{ width: "100%", borderRadius: "10px", height: "40px" }}
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 Upload
//               </AyButton>
//             </Modal>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default UploadFiles;
import Modal from "../global/modal-launcher";
import AyButton from "../myUi/AyButton";
import { Image, StickyNote, Upload, Video } from "lucide-react";
import { Form, Formik } from "formik";
import { upload_New_File } from "@/services/upload/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { Label } from "../ui/label";
import Loader from "../global/loader";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface UploadType {
  id: number;
  title: string;
  type: string;
  icon: JSX.Element;
  accept: string;
}

const UploadFiles: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const queryClient = useQueryClient();

  const uploadTypes: UploadType[] = [
    {
      id: 1,
      title: "Video",
      type: "video",
      icon: <Video className="w-5 h-5 mr-2" />,
      accept: "video/*",
    },
    {
      id: 2,
      title: "Image",
      type: "image",
      icon: <Image className="w-5 h-5 mr-2" />,
      accept: "image/*",
    },
    {
      id: 3,
      title: "Documents",
      type: "documents",
      icon: <StickyNote className="w-5 h-5 mr-2" />,
      accept: `application/pdf,application/msword,text/plain`,
    },
  ];

  return (
    <div>
      <Modal
        trigger={
          <AyButton
            type="button"
            title=""
            sx={{ width: "100%", borderRadius: "10px", height: "40px" }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </AyButton>
        }
        title="Upload Your Files"
      >
        {/* Hidden File Input */}
        <Formik
          initialValues={{ files: [] as File[], folderId: folderId ?? null }}
          onSubmit={async (values, { resetForm }) => {
            console.log(values, "values");

            try {
              const formData = new FormData();

              values.files.forEach((file) => formData.append("files", file));
              if (values.folderId) {
                formData.append("folderId", values.folderId);
              }

              const response = await upload_New_File(formData);
              if (response.status === 200) {
                resetForm();
                makeToast(response.data.message);
                queryClient.invalidateQueries({ queryKey: ["all-files"] });

              }
            } catch (error:any) {
              console.error("Error uploading files:", error);
              if(error){
                if(error.response.status === 503){
                    makeToastError(error.response.data.message);
                }
              
              }
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              {/* <pre>{JSON.stringify(values.fi, null, 2)}</pre> */}

              <div className="grid grid-cols-3 gap-2">
                {uploadTypes.map((upload) => (
                  <Label
                    htmlFor={upload.type}
                    key={upload.id}
                    className="flex items-center w-full cursor-pointer px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    <input
                      type="file"
                      id={upload.type}
                      accept={upload.accept}
                      className="hidden"
                      multiple
                      onChange={(event) => {
                        const files = event.target.files;
                        if (files) {
                          setFieldValue("files", [
                            ...values.files,
                            ...Array.from(files),
                          ]);
                        }
                      }}
                    />
                    {upload.icon} {upload.title}
                  </Label>
                ))}
              </div>

              {/* selected files */}
              <ul className="grid grid-cols-2 gap-2">
                {values.files.map((file, index) => (
                  <li className="text-xs p-3 bg-gray-50 border-b relative">
                    {file.name}

                    {/* delete single files */}
                    <span
                      className="absolute top-0 right-1 cursor-pointer h-4 w-4 shadow
                       text-xs flex items-center justify-center rounded-full bg-red-500 text-white"
                      onClick={() => {
                        setFieldValue(
                          "files",
                          values.files.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>

              <AyButton
                type="submit"
                title=""
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  height: "40px",
                  mt: 4,
                }}
              >
                <Loader state={isSubmitting}>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit
                </Loader>
              </AyButton>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default UploadFiles;
