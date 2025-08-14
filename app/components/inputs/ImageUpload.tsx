// 'use client';


// import { CldUploadWidget} from "next-cloudinary";
// import Image from "next/image";
// import { useCallback,useEffect } from "react";
// import { TbPhotoPlus } from "react-icons/tb";


// declare global {
// var cloudinary:any;
// }


// interface ImageUploadProps{
// onChange :(value:string)=>void;
// value:string;
// }

// const ImageUpload:React.FC<ImageUploadProps> = ({
// onChange,
// value
// }) => {
// const handleUpload=useCallback((result: any)=>{
//   console.log("Cloudinary Upload Result:", result);
// onChange(result.info.secure_url);
// },[onChange]);

// useEffect(() => {
//   console.log("ImageUpload value:", value);
//   if (!value || typeof value !== "string" || !value.startsWith("http")) {
//     console.warn("⚠️ Invalid image value passed to <Image />:", value);
//   }

// }, [value]);




//       return (
//             <CldUploadWidget
//             onUpload={handleUpload}
//             // uploadPreset="unsigned_airbnb"
//             uploadPreset="preset2" // public default preset from Cloudinary



//            options={{
//            maxFiles:1
//                   }}
// >


//             {({open})=>{
//              return(
//                 <div
//                 onClick={()=>open?.()}
//                 className="
//                 relative
//                 cursor-pointer
//                 hover:opacity-70
//                 transition
//                 border-dashed
//                 border-2
//                 p-20
//                 border-neutral-300
//                 flex
//                 flex-col
//                 justify-center
//                 items-center
//                 gap-4
//                 text-neutral-600
                
                
                
                
//                 "
//                 >
//                     <TbPhotoPlus size={50} />
//        <div className="font-semibold text-lg">


//       Click to Upload
//        </div>
//        {typeof value === 'string' && value.startsWith('http') && (
//         <div className="absolute inset-0 w-full h-full">

//          <Image
//          src={
//           typeof value === 'string' && value.startsWith('http')
//         ? value
//         : '/images/placeholder.jpeg'

//          }
//          alt="Upload"
//          fill
//          style={{objectFit: 'cover'}}
//          sizes="100vw"
         
//          />


//         </div>
//           )}
//        </div>
//        )
//       }}
//      </CldUploadWidget>
//      )
//     }



// export default ImageUpload;


// 'use client';

// import { CldUploadWidget } from "next-cloudinary";
// import Image from "next/image";
// import { useCallback } from "react";
// import { TbPhotoPlus } from "react-icons/tb";

// declare global {
//   // eslint-disable-next-line no-var
//   var cloudinary: any;
// }

// interface ImageUploadProps {
//   onChange: (value: string) => void;
//   value: string;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
//   const handleUpload = useCallback((result: unknown) => {
//     if (typeof result === 'object' && result && 'info' in result) {
//       console.log("Cloudinary Upload Result:", result);
//       onChange((result as any)?.info?.secure_url || '');
//     }
//   }, [onChange]);

//   const isValidImage = typeof value === 'string' && value.startsWith('http');

//   return (
//     <CldUploadWidget
//   onUpload={handleUpload}
//   uploadPreset="preset2"
//   options={{ maxFiles: 1 }}
// >
//   {() => (
//     <div
//       onClick={() => {
//         console.log("Manual open triggered");
//         if (typeof window.cloudinary !== 'undefined') {
//           window.cloudinary.openUploadWidget(
//             {
//               cloudName: 'dafzygxfz',
//               uploadPreset: 'preset2',
//               sources: ['local', 'url', 'camera'],
//               multiple: false,
//               maxFiles: 1
//             },
//             (error: unknown, result: unknown) => {
//               if (error) {
//                 console.error("Upload Error:", error);
//               } else if (
//                 typeof result === 'object' &&
//                 result !== null &&
//                 'event' in result &&
//                 (result as { event?: string }).event === 'success'
//               ) {
//                 console.log("Upload Success:", result);
//                 handleUpload(result);
//               }
//             }
//           );
//         } else {
//           console.error("Cloudinary is not defined");
//         }
//       }}
//       className="
//         relative
//         cursor-pointer
//         hover:opacity-70
//         transition
//         border-dashed
//         border-2
//         p-20
//         border-neutral-300
//         flex
//         flex-col
//         justify-center
//         items-center
//         gap-4
//         text-neutral-600
//       "
//     >
//       <TbPhotoPlus size={50} />
//       <div className="font-semibold text-lg">Click to Upload</div>

//       {isValidImage && (
//         <div className="absolute inset-0 w-full h-full">
//           <Image
//             src={value}
//             alt="Uploaded preview"
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
//             style={{ objectFit: 'cover' }}
//             // sizes="100vw"
//           />
//         </div>
//       )}
//     </div>
//   )}
// </CldUploadWidget>



//   );
// };

// export default ImageUpload;
'use client';

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback((result: CloudinaryUploadWidgetResults) => {
    const info = result.info as { secure_url: string };
    onChange(info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="preset2"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">
              Click to Upload
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={value}
                  alt="Uploaded image"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
