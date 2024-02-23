import React, { useState } from 'react'
import Image from 'next/image'
import MenuselectbuttonProp from '../buttons/Menubutton'
import SearchBar from '../search/searchmenu'
import { Input } from 'antd'
import InStoreAddGroupmenu from '../buttons/addgroupmenubutton'
import Addmenu from '../buttons/Addmenu'

const BackStoreList = () => {
  const [selectMenu, setSelectMenu] = useState<string>("หน้าร้าน");

  const handlerMenu = (menuText: string) => {
    setSelectMenu(menuText);
  };

  const handleSearch = (query: any) => {
    console.log("", query);
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4; // Number of items per page

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    console.log(value); // Log the value of the input search field
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-start items-center py-[16px]">
          <span className="text-[40px] font-bold text-black">กลับบ้าน 1</span>
        </div>
        {/* Body */}
        <div className="grid grid-cols-3">
          <div className="w-full pr-[30px]">
            <div className="flex justify-center items-center w-full h-[44px] bg-[#D9D9D9] cursor-pointer">
              <Image src="mdi_qrcode-scan.svg" alt="" width="24" height="24" />
              <span className='text-[18px] ml-4'>พิมพ์ QR CODE</span>
            </div>
            {/* Bil */}
            <div className="flex justify-center items-center py-[16px]">
              <div className="border border-black w-[250px] h-[230px] p-[16px]">
                <div className="justify-center items-center flex flex-cols font-bold text-[18px]">
                  ใบเสร็จ
                </div>
                <div className="flex flex-cols justify-between items-center text-[12px] my-2 px-2">
                  <div className="w-full text-start">อาหาร</div>
                  <div className='w-full text-center'>จำนวน</div>
                  <div className="w-full text-end">รวม</div>
                </div>
                <div className="border-y-2 border-black h-[100px]"></div>
                <div className="w-full text-end mt-2 text-[12px] font-semibold">รวมเงินทั้งสิ้น</div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-[44px] bg-[#D9D9D9] cursor-pointer">
              <div className="flex mt-1">
                <Image src="typcn_printer.svg" alt="" width="24" height="24" />
                <span className="ml-2">พิมพ์ใบเสร็จ </span>
              </div>
            </div>
            <div className="mt-4 w-full h-[42px] bg-[#419453] justify-center items-center flex cursor-pointer">
              <button className="flex-cols text-white font-bold">
                CHECK BILL
              </button>
            </div>
          </div>
          <div className="flex col-span-2">
            {/* Category List */}
            <div className=" mr-[16px]">
              <MenuselectbuttonProp
                menuText="เมนูทั้งหมด"
                isActive={selectMenu === "เมนูทั้งหมด"}
                onClick={() => handlerMenu("เมนูทั้งหมด")}
              />
              <div className=" h-[16px]"></div>
              <MenuselectbuttonProp
                menuText="ข้าวมันไก่"
                isActive={selectMenu === "ข้าวมันไก่"}
                onClick={() => handlerMenu("ข้าวมันไก่")}
              />
              <div className=" h-[16px]"></div>
              <MenuselectbuttonProp
                menuText="เครื่องดื่ม"
                isActive={selectMenu === "เครื่องดื่ม"}
                onClick={() => handlerMenu("เครื่องดื่ม")}
              />
              <InStoreAddGroupmenu/>
            </div>
            {/* TableListMenu */}
            <div className="flex flex-col w-full p-2" >
              <div className="flex items-start bg-red-300 h-fit ">
                  <Input
                    placeholder="ค้นหาออร์เดอร์"
                    prefix={<Image src="/search.png" alt="search" width={16} height={16} className='ml-[6px]' />}
                    className="flex-1 h-[30px] pr-[16px] border-2 border-[#A93F3F] rounded-none"
                    onChange={handleChange} // Add onChange event handler
                  />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-3">
                <div className="border border-[#A93F3F] h-[170px] justify-center cursor-pointer">
                  <div className="border border-black h-[100px]">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่ต้ม
                  </div>
                </div>
                <div className="border border-[#A93F3F] h-[170px] justify-center cursor-pointer">
                  <div className="border border-black h-[100px]">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่ทอด
                  </div>
                </div>
                <div className="border border-[#A93F3F] h-[170px] justify-center cursor-pointer">
                  <div className="border border-black h-[100px]">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่รวม
                  </div>
                </div>
                <div className="border border-[#A93F3F] h-[170px] justify-center cursor-pointer">
                  <div className="border border-black h-[100px]">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่แซบ
                  </div>
                </div>
                <div className="border border-[#A93F3F] h-[170px] justify-center cursor-pointer">
                  <div className="border border-black h-[100px]">
                    <Image src="" alt="" />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    ข้าวมันไก่แซบ
                  </div>
                </div>
                  <Addmenu/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BackStoreList
