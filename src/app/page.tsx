import Input from "antd/es/input/Input";
import LoginPage from "./auth/login/page";
import Header from "@/common/components/elements/templatess/Header";
import React, { useState } from "react";
import Image from "next/image";
import Menulist from "@/common/components/elements/templates/Menulist";
import Menubutton from "@/common/components/elements/buttons/Menubutton";
import MenuselectbuttonProp from "@/common/components/elements/buttons/Menubutton";

type Props = {};

export default async function IndexSSPage({ }: Props) {
  // // return (
  // //   <>
  // //     <Header />

  // //     <div className="flex justify-end items-end mr-28 gap-10">
  // //       <div className=" ">กำลังใช้งาน</div>

  // //       <div className=" ">ว่าง</div>
  // //     </div>

  // //     <div className="grid grid-cols-4 gap-4 h-[250px] mt-3 mr-5 ml-5 text-xl text-center ">
  // //       <div className="border border-red-400">A1</div>
  // //       <div className="border border-red-400">A2</div>
  // //       <div className="border border-red-400">A3</div>
  // //       <div className="border border-red-400">A4</div>
  // //     </div>

  // //     <div className="grid grid-cols-4 gap-4 h-[250px] mt-3 mr-5 ml-5 mb-3 text-xl text-center">
  // //       <div className="border border-red-400">A5</div>
  // //       <div className="border border-red-400">A6</div>
  // //       <div className="border border-red-400">A7</div>
  // //       <div className="border border-red-400 text-[40px] bg-yellow-200 flex items-center justify-center">
  // //         <span className="">+</span>
  // //       </div>
  // //     </div>

  // //   </>

  // // );

  // // return (
  // //   <main>
  // //     <div className="grid grid-cols-2 gap-[1250px] mt-10">
  // //       <div className="ml-10 flex gap-3">
  // //         <Image src="account_circle.svg" alt="" width={30} height={30} />
  // //         <div className="mt-1">User</div>
  // //       </div>

  // //       <div className="mr-10 flex gap-3">
  // //         <Image src="logout.svg" alt="" width={20} height={20} />
  // //         <div className="mt-1">Logout</div>
  // //       </div>
  // //     </div>

  // //     <div className="mt-3 ml-5 mr-5 grid grid-cols-3 gap-5 h-[200px]">

  // //       <div className="border border-red-500 flex flex-col items-center justify-center">
  // //         <Image src="account_circle.svg" alt="" width={50} height={20} />
  // //         <div className="text-2xl">หน้าร้าน</div>
  // //       </div>

  // //       <div className="border border-red-500 flex flex-col items-center justify-center">
  // //         <Image src="account_circle.svg" alt="" width={20} height={20} />
  // //         <div className="text-2xl">ซื้อกลับบ้าน</div>
  // //       </div>

  // //       <div className="border border-red-500 flex flex-col items-center justify-center">
  // //         <Image src="account_circle.svg" alt="" width={20} height={20} />
  // //         <div className="text-2xl">ออร์เดอร์วันนี้</div>
  // //       </div>
  // //     </div>


  // //     <div className="flex flex-cols gap-3 justify-end items-end mr-20 mt-3">
  // //       <div className="ml-10 flex gap-3 ">
  // //         <Image src="account_circle.svg" alt="" width={30} height={30} />
  // //         <div className="mt-1">กำลังใช้งาน</div>
  // //       </div>

  // //       <div className="flex gap-3 ">
  // //         <Image src="logout.svg" alt="" width={20} height={20} />
  // //         <div className="mt-1">ว่าง</div>
  // //       </div>
  // //     </div>

  // //     <div className="grid grid-cols-4 gap-4 h-[250px] mt-2 mr-5 ml-5 text-xl text-center ">
  // //       <div className="border border-red-400">A1</div>
  // //       <div className="border border-red-400">A2</div>
  // //       <div className="border border-red-400">A3</div>
  // //       <div className="border border-red-400">A4</div>
  // //     </div>

  // //     <div className="grid grid-cols-4 gap-4 h-[250px] mt-3 mr-5 ml-5 mb-3 text-xl text-center">
  // //       <div className="border border-red-400">A5</div>
  // //       <div className="border border-red-400">A6</div>
  // //       <div className="border border-red-400">A7</div>
  // //       <div className="border border-red-400 text-[40px] bg-yellow-200 flex items-center justify-center">
  // //         <span className="">+</span>
  // //       </div>
  // //     </div>
  // //   </main>
  // // );
  // const Menulist = (props: Props) => {
  //   const [selectMenu, setSelectMenu] = useState<string>("หน้าร้าน");
  
  //   const handlerMenu = (menuText: string) => {
  //     setSelectMenu(menuText);
  //   };
  
  return(
    <main>
      <Menulist/>
      {/* <Header/> */}
      {/* <LoginPage/> */}

      {/* <div className="flex flex-cols mt-5 justify-between">
        <div className="text-2xl text-green-500 ml-4">โต๊ะ1</div>
        <div className="text-2xl text-blue-700">ย้อนกลับ</div>
      </div>

      <div className=" flex flex-cols gap-4 mt-3 justify-between ml-5 mr-5">
        <div className="w-[500px] h-[400px] mb-5">
          <div className="border border-gray-200 w-full h-[40px] bg-gray-300">
            <div className="justify-center items-center flex flex-cols mt-2">
              <Image src="mdi_qrcode-scan.svg" alt="" width="24" height="24" />
              <span>พิมพ์ QR CODE</span>
            </div>
          </div>

          <div className="border border-black mt-5 ml-10 mr-10 w-[350px] h-[300px]">
            <div className="justify-center items-center flex flex-cols mt-3 font-bold text-xl">
              ใบเสร็จ
            </div>
            <div className="flex flex-cols gap-10 justify-between items-center text-sm mr-10 ml-4">
              <div className="ml-5">อาหาร</div>
              <div>จำนวน</div>
              <div className="">รวม</div>
            </div>
          </div>

          <div className="border border-gray-200 mt-5 w-full h-[40px] bg-gray-300 justify-center items-center flex">
            <div className="flex mt-1">
              <Image src="typcn_printer.svg" alt="" width="24" height="24" />
              พิมพ์ใบเสร็จ
            </div>
          </div>

          <div className="border border-gray-200 mt-5 w-full h-[40px] bg-green-500 justify-center items-center flex">
            <button className="flex-cols mt-1.5 text-white font-bold">
              CHECK BILL
            </button>
          </div>
        </div> */}

        {/* <div className="w-[150px]">
          <MenuselectbuttonProp
            menuText="เมนูทั้งหมด"
            isActive={selectMenu === "เมนูทั้งหมด"}
            onClick={() => handlerMenu("เมนูทั้งหมด")}
          />
          <MenuselectbuttonProp
            menuText="ข้าวมันไก่"
            isActive={selectMenu === "ข้าวมันไก่"}
            onClick={() => handlerMenu("ข้าวมันไก่")}
          />
          <MenuselectbuttonProp
            menuText="เครื่องดื่ม"
            isActive={selectMenu === "เครื่องดื่ม"}
            onClick={() => handlerMenu("เครื่องดื่ม")}
          />
        </div> */}
        {/* <div className="grid grid-cols w-[700px] mt-3">
        <div className="border border-red-600 h-[30px]"> 
          <div>Search</div>
        </div>

        <div className="border border-red-500 mt-5 h-[400px] ">
          <div className="mr-3 ml-3 mt-3 flex justify-between">

          <div className=" grid gird-rows border border-red-700 w-[190px] h-[170px] justify-center ">
            <div className="border border-black  w-[150px] h-[100px] mt-3"></div>
            <div className="flex items-center justify-center">ข้าวมันไก่</div>
          </div>
          <div className="border border-red-700 w-[190px] h-[170px]">AA</div>
          <div className="border border-red-700 w-[190px] h-[170px]">AA</div>
          
          </div>

        </div>
        </div> */}
      {/* </div> */}
    </main>
    )
  }

