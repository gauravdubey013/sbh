// const getData = (dataIndex) => {
//   const datap = slide[dataIndex];
//   if (datap) {
//     return datap;
//   }
//   return notFound();
// };

import React from "react";
// import Link from "next/link";
// import { slides } from "./data";
import Carousel from "./Carousel";

const ServiceCompo = () => {
  return (
    <>
      <div className="w-full h-auto flex flex-col gap-1">
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">House & Home</h2>
          <div className="w-full h-full scale-90 md:scale-100">
            <Carousel onClickBtn={"/services/chomu"} />
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">Health & Wellness</h2>
          <div className="w-full h-full scale-90 md:scale-100">
            <Carousel />
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">Events & Entertainers</h2>
          <div className="w-full h-full scale-90 md:scale-100">
            <Carousel />
          </div>
        </div>
        {/* <Link href={"/services/chomu"} >Click me</Link> */}
      </div>
    </>
  );
};

export default ServiceCompo;

// import React from "react";
// import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import Carousel from "./Carousel";

// const ServiceCompo = async () => {
//   const session = await getServerSession();
//   const url = !session ? "/signIn" : "/services/chomu";
//   return (
//     <>
//       <div className="w-full h-full flex flex-col gap-1">
//         <div className="w-full h-full">
//           <h2 className="text-xl font-bold">House & Home</h2>
//           <div className="w-full h-full scale-90 md:scale-100">
//             <Carousel onClickBtn={url} />
//           </div>
//         </div>
//         <div className="w-full h-full">
//           <h2 className="text-xl font-bold">Health & Wellness</h2>
//           <div className="w-full h-full scale-90 md:scale-100">
//             <Carousel />
//           </div>
//         </div>
//         <div className="w-full h-full">
//           <h2 className="text-xl font-bold">Events & Entertainers</h2>
//           <div className="w-full h-full scale-90 md:scale-100">
//             <Carousel />
//           </div>
//         </div>
//         {/* <Link href={"/services/chomu"} >Click me</Link> */}
//       </div>
//     </>
//   );
// };

// export default ServiceCompo;
