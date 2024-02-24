"use client";

import React from "react";
import Header from "../templatess/Header";
import Image from "next/image";
import OrderAddressButton from "../buttons/orderAddressButton";
import { useState } from "react";
import BackButton from "../buttons/backButton";
import Menubutton from "../buttons/Menubutton";
import MenuselectbuttonProp from "../buttons/Menubutton";
import { Input } from "antd";
import InStoreAddmenu from "../buttons/addgroupmenubutton";
import SearchBar from "../search/searchmenu";
import InStoreTableList from "../bodyContent/InStoreTableList";



type Props = {};

const Menulist = (props: Props) => {
  const [selectMenu, setSelectMenu] = useState<string>("หน้าร้าน");

  const handlerMenu = (menuText: string) => {
    setSelectMenu(menuText);
  };

  const handleSearch = (query: any) => {
    console.log("", query);
  };
  return (
    <main className="h-screen" style={{ padding: "80px" }}>
      {/* Header */}
      <div
        className="flex justify-between"
        style={{ height: "44px", padding: "10px" }}
      >
        {/* User section */}
        <div className="flex items-center">
          <Image
            src="/user.png"
            alt=""
            width={24}
            height={24}
            style={{ margin: "0 8px 0 0" }}
          />
          <div>
            <p style={{ fontSize: "18px" }}>ผู้ใช้งาน</p>
          </div>
        </div>

        {/* Logout button */}
        <div className="flex items-center">
          <Image
            src="logout.svg"
            alt=""
            width={24}
            height={24}
            style={{ margin: "0 8px 0 0" }}
          />
          <button>
            <span style={{ fontSize: "18px" }}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-5" style={{ marginTop: "16px" }}>
        <OrderAddressButton
          menuText="หน้าร้าน"
          imgFile="Frame 96.svg"
          isActive={selectMenu === "หน้าร้าน"}
          onClick={() => handlerMenu("หน้าร้าน")}
        />
        <OrderAddressButton
          menuText="ซื้อกลับบ้าน"
          imgFile="Frame 95.svg"
          isActive={selectMenu === "ซื้อกลับบ้าน"}
          onClick={() => handlerMenu("ซื้อกลับบ้าน")}
        />
        <OrderAddressButton
          menuText="ออร์เดอร์วันนี้"
          imgFile="Frame 94.svg"
          isActive={selectMenu === "ออร์เดอร์วันนี้"}
          onClick={() => handlerMenu("ออร์เดอร์วันนี้")}
        />
      </div>

      {/* BodyContent */}
      {/* {selectMenu === "หน้าร้าน" && <InStoreTableList />} */}

      <div className="flex flex-cols mt-5 justify-between">
        <div className="text-2xl text-green-500 ml-4">โต๊ะ1</div>
        <div className="text-2xl text-blue-700 mr-5">ย้อนกลับ</div>
      </div>

      <div className=" flex flex-cols gap-4 mt-3 justify-between ml-5 mr-5">
        <div className="w-[400px] h-[408px] mb-5 mt-3">
          <div className="border border-gray-200 w-full h-[40px] bg-gray-300 cursor-pointer">
            <div className="justify-center items-center flex flex-cols mt-2">
              <Image src="mdi_qrcode-scan.svg" alt="" width="24" height="24" />
              <span>พิมพ์ QR CODE</span>
            </div>
          </div>

          <div className="border border-black mt-5 ml-10 w-[350px] h-[300px] ">
            <div className="justify-center items-center flex flex-cols mt-3 font-bold text-xl">
              ใบเสร็จ
            </div>
            <div className="flex flex-cols gap-9 justify-between items-center text-sm mr-10 ml-4">
              <div className="ml-3">อาหาร</div>
              <div>จำนวน</div>
              <div className="">รวม</div>
            </div>
            <div className="border border-black  ml-5 mr-10"></div>
          </div>

          <div className="border border-gray-200 mt-5 w-full h-[40px] bg-gray-300 justify-center items-center flex cursor-pointer">
            <div className="flex mt-1">
              <Image src="typcn_printer.svg" alt="" width="24" height="24" />
              <span className="ml-2">พิมพ์ใบเสร็จ </span>
            </div>
          </div>

          <div className="border border-gray-200 mt-5 w-full h-[40px] bg-green-500 justify-center items-center flex cursor-pointer">
            <button className="flex-cols mt-1.5 text-white font-bold">
              CHECK BILL
            </button>
          </div>
        </div>

        <div className="w-[150px]">
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
          <InStoreAddmenu />
        </div>

        <div className="grid grid-cols w-[700px] mt-1 mr-3">
          <div className="h-[50px]">
            {/* <Input alt="Search" width={190} height={30} className="border border-red-500" /> */}
            <SearchBar onSubmit={handleSearch} />
          </div>

          <div className="h-[400px] cursor-pointer ">
            <div className="mr-3 ml-3 mt-3 flex justify-between">
              <div className="grid grid-cols-3 gap-10">
                <div className="border border-red-700 w-[190px] h-[170px] justify-center ">
                  <div className="border border-black  w-[150px] h-[100px] mt-3 ml-5">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่ต้ม
                  </div>
                </div>

                <div className="border border-red-700 w-[190px] h-[170px] justify-center ">
                  <div className="border border-black  w-[150px] h-[100px] mt-3 ml-5">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่ทอด
                  </div>
                </div>

                <div className="border border-red-700 w-[190px] h-[170px] justify-center ">
                  <div className="border border-black  w-[150px] h-[100px] mt-3 ml-5">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่รวม
                  </div>
                </div>

                <div className="border border-red-700 w-[190px] h-[170px] justify-center ">
                  <div className="border border-black  w-[150px] h-[100px] mt-3 ml-5">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่แซบ
                  </div>
                </div>
                <div className="border border-red-500">AA</div>
                
              </div>
            </div>
       
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Menulist;
