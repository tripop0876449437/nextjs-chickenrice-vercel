import Input from "antd/es/input/Input";
import LoginPage from "./auth/login/page";
import Header from "@/common/components/elements/templatess/Header";
import React, { useState } from "react";
import Image from "next/image";

type Props = {};

export default async function IndexSSPage({ }: Props) {
  // return (
  //   <>
  //     <Header />

  //     <div className="flex justify-end items-end mr-28 gap-10">
  //       <div className=" ">กำลังใช้งาน</div>

  //       <div className=" ">ว่าง</div>
  //     </div>

  //     <div className="grid grid-cols-4 gap-4 h-[250px] mt-3 mr-5 ml-5 text-xl text-center ">
  //       <div className="border border-red-400">A1</div>
  //       <div className="border border-red-400">A2</div>
  //       <div className="border border-red-400">A3</div>
  //       <div className="border border-red-400">A4</div>
  //     </div>

  //     <div className="grid grid-cols-4 gap-4 h-[250px] mt-3 mr-5 ml-5 mb-3 text-xl text-center">
  //       <div className="border border-red-400">A5</div>
  //       <div className="border border-red-400">A6</div>
  //       <div className="border border-red-400">A7</div>
  //       <div className="border border-red-400 text-[40px] bg-yellow-200 flex items-center justify-center">
  //         <span className="">+</span>
  //       </div>
  //     </div>

  //   </>

  // );

  // return (
  //   <main>
  //     <div className="grid grid-cols-2 gap-[1250px] mt-10">
  //       <div className="ml-10 flex gap-3">
  //         <Image src="account_circle.svg" alt="" width={30} height={30} />
  //         <div className="mt-1">User</div>
  //       </div>

  //       <div className="mr-10 flex gap-3">
  //         <Image src="logout.svg" alt="" width={20} height={20} />
  //         <div className="mt-1">Logout</div>
  //       </div>
  //     </div>

  //     <div className="mt-3 ml-5 mr-5 grid grid-cols-3 gap-5 h-[200px]">

  //       <div className="border border-red-500 flex flex-col items-center justify-center">
  //         <Image src="account_circle.svg" alt="" width={50} height={20} />
  //         <div className="text-2xl">หน้าร้าน</div>
  //       </div>

  //       <div className="border border-red-500 flex flex-col items-center justify-center">
  //         <Image src="account_circle.svg" alt="" width={20} height={20} />
  //         <div className="text-2xl">ซื้อกลับบ้าน</div>
  //       </div>

  //       <div className="border border-red-500 flex flex-col items-center justify-center">
  //         <Image src="account_circle.svg" alt="" width={20} height={20} />
  //         <div className="text-2xl">ออร์เดอร์วันนี้</div>
  //       </div>
  //     </div>


  //     <div className="flex flex-cols gap-3 justify-end items-end mr-20 mt-3">
  //       <div className="ml-10 flex gap-3 ">
  //         <Image src="account_circle.svg" alt="" width={30} height={30} />
  //         <div className="mt-1">กำลังใช้งาน</div>
  //       </div>

  //       <div className="flex gap-3 ">
  //         <Image src="logout.svg" alt="" width={20} height={20} />
  //         <div className="mt-1">ว่าง</div>
  //       </div>
  //     </div>

  //     <div className="grid grid-cols-4 gap-4 h-[250px] mt-2 mr-5 ml-5 text-xl text-center ">
  //       <div className="border border-red-400">A1</div>
  //       <div className="border border-red-400">A2</div>
  //       <div className="border border-red-400">A3</div>
  //       <div className="border border-red-400">A4</div>
  //     </div>

  //     <div className="grid grid-cols-4 gap-4 h-[250px] mt-3 mr-5 ml-5 mb-3 text-xl text-center">
  //       <div className="border border-red-400">A5</div>
  //       <div className="border border-red-400">A6</div>
  //       <div className="border border-red-400">A7</div>
  //       <div className="border border-red-400 text-[40px] bg-yellow-200 flex items-center justify-center">
  //         <span className="">+</span>
  //       </div>
  //     </div>
  //   </main>
  // );

  return(
    <main>
      <Header/>
      {/* <LoginPage/> */}
    </main>
  )
}
