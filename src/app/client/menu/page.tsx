"use client";

import { Input } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import MenuSelectButtonClient from '@/common/components/elements/buttons/menubuttonClient';
import InStoreTableListClient from '@/common/components/elements/bodyContent/InStoreTableListClient';

const Menu = () => {
  const [selectMenu, setSelectMenu] = useState<string>("เมนูทั้งหมด")
  const [searchValue, setSearchValue] = useState<string>('');

  const handlerMenuCategory = (textMenu: string) => {
    setSelectMenu(textMenu)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    // console.log(value); // Log the value of the input search field
  };

  const handlerMenu = (textMenu: string) => {
    setSearchValue(textMenu)
  }

  return (
    <>
      <div className="py-[40px] px-[10px]">
        <div className="flex justify-between bg-[#FDD77D] p-[4px]">
          <div className="flex flex-col">
            <span className='text-[18px] font-bold'>โต๊ะ 1</span>
            <span className='text-[12px] font-bold text-[#A93F3F]'>รวมอร่อย</span>
          </div>
          <div className="flex items-center">
            <div className='flex p-[5px] bg-[#E74040] w-[67px] border border-[#000000] h-[30px]'>
              <Image src="/cart.png" alt="" width={20} height={20} />
              <div className=''></div>
              <span className='text-[12px] font-bold text-[#fff]'>ตะกร้า</span>
            </div>
          </div>
        </div>
        {/* Search input */}
        <div className="py-[16px]">
          <Input
            placeholder="Search"
            prefix={<Image src="/search.png" alt="search" width={16} height={16} className='ml-[6px]' />}
            className="h-[40px] pr-[16px] py-2 border-2 border-[#A93F3F] rounded-none"
            onChange={handleChange} // Add onChange event handler
          />
        </div>
        {/* Menu Category*/}
        <div className="mt-[8px] grid grid-cols-4 gap-[0.5rem]">
          <MenuSelectButtonClient menuText='เมนูทั้งหมด' isActive={selectMenu === "เมนูทั้งหมด"} onClick={() => handlerMenuCategory('เมนูทั้งหมด')} />
          <MenuSelectButtonClient menuText='ข้าวมันไก่' isActive={selectMenu === "ข้าวมันไก่"} onClick={() => handlerMenuCategory('ข้าวมันไก่')} />
          <MenuSelectButtonClient menuText='สามมิตร' isActive={selectMenu === "สามมิตร"} onClick={() => handlerMenuCategory('สามมิตร')} />
          <MenuSelectButtonClient menuText='เครื่องดี่ม' isActive={selectMenu === "เครื่องดี่ม"} onClick={() => handlerMenuCategory('เครื่องดี่ม')} />
        </div>
        {selectMenu === "เมนูทั้งหมด" && <InStoreTableListClient />}
      </div>
    </>
  )
}

export default Menu
