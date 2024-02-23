"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from 'antd'
import OrderMenuModalClient from '@/common/components/elements/modals/orderMenuClient';
import { tree } from 'next/dist/build/templates/app-page';

const CartPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handlerMenu = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="py-[40px] px-[10px]">
        <div className="bg-[#E74040] flex justify-between p-[5px] border border-1 border-[#000] mb-[16px] opacity-[.69]">
          <div className="flex items-center">
            <Image src='/cart.png' alt='cart' width={20} height={20} />
            <span className='text-[12px] text-[#fff] font-bold'>ตะกร้าของฉัน</span>
          </div>
          <div>
            <Image src='/x_white.png' alt='x_white' width={24} height={24} />
          </div>
        </div>
        {/* Bil Order*/}
        <div className="">
          <p className='font-bold text-[18px]'>โต๊ะ 1</p>
          <div className="border-[#000] border-y-2 px-[16px] pb-[16px] mt-[16px] min-h-[542px]">
            <div className="flex justify-between pt-[16px]">
              <div className="w-[128.5px] text-[16px]"><p>ข้าวมันไก่ต้มธรรมดา</p></div>
              <div className="w-[20px] text-center text-[16px]"><p>1</p></div>
              <div className="w-[128.5px] text-center text-[16px]"><p>50</p></div>
              <div className=""><Image src='/x_red.png' alt='x_red' width={24} height={24} /></div>
            </div>
            <div className="flex justify-between pt-[16px]">
              <div className="w-[128.5px] text-[16px]"><p>ข้าวมันไก่ทอดธรรมดา</p></div>
              <div className="w-[20px] text-center text-[16px]"><p>1</p></div>
              <div className="w-[128.5px] text-center text-[16px]"><p>50</p></div>
              <div className=""><Image src='/x_red.png' alt='x_red' width={24} height={24} /></div>
            </div>
          </div>
        </div>
        {/* Total Order */}
        <div className="flex justify-between items-center bg-[#D9D9D9] h-[64px] p-[16px] my-[16px]">
          <div className="w-[19px] h-[32px] bg-white flex justify-center items-center"><span>2</span></div>
          <div className="'text-[18px] text-[#C60000]"><span>รวมเงินทั้งสิ้น</span><span className='mx-[16px] text-black'>100</span><span className='text-black'>บาท</span></div>
        </div>
        {/* Footer Button */}
        <Button
          key="confirm" 
          onClick={() => handlerMenu()}
          style={{
            width: '100%',
            height: '38px',
            padding: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#00BE2A',
            margin: '0 auto',
            transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
          }}
          className='rounded-none'
        >
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>ยืนยันการสั่งอาหาร</span>
        </Button>
        {isModalVisible === true && <OrderMenuModalClient visible={isModalVisible} tableName='Table 1' menuName='ข้าวมันไก่ต้มธรรมดา' orderTotal={200} quatity={4} total={59} onClose={() => handleCloseModal()} />}
      </div>
    </>
  )
}

export default CartPage
