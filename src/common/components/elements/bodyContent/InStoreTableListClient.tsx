import React, { useState } from 'react'
import MenuListClient from '../buttons/menuListClient'
import MenuDiscriptionModelClient from '../modals/menuDiscriptionModalClient';

const InStoreTableListClient = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTableName, setSelectedTableName] = useState<string>("");
  const handlerMenu = (textMenu: string) => {
    setSearchValue(textMenu)
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Menu List */}
      <div className="grid grid-cols-2 gap-2 mt-[16px]">
        <MenuListClient onClick={() => handlerMenu('ข้าวมันไก่ต้มธรรมดา')} imgFile='/ข้าวมันไก่ต้ม.jpg' menuText='ข้าวมันไก่ต้มธรรมดา' />
        <MenuListClient onClick={() => handlerMenu('ข้าวมันไก่ต้มพิเศษ')} imgFile='/ข้าวมันไก่ต้ม.jpg' menuText='ข้าวมันไก่ต้มพิเศษ' />
        <MenuListClient onClick={() => handlerMenu('ข้าวมันไก่ทอดธรรมดา')} imgFile='/ข้าวมันไก่ทอด.jpg' menuText='ข้าวมันไก่ทอดธรรมดา' />
        <MenuListClient onClick={() => handlerMenu('ข้าวมันไก่ทอดพิเศษ')} imgFile='/ข้าวมันไก่ทอด.jpg' menuText='ข้าวมันไก่ทอดพิเศษ' />
        <MenuListClient onClick={() => handlerMenu('ข้าวมันไก่ย่างธรรมดา')} imgFile='/ข้าวมันไก่ย่าง.jpg' menuText='ข้าวมันไก่ย่างธรรมดา' />
        <MenuListClient onClick={() => handlerMenu('ข้าวมันไก่ย่างพิเศษ')} imgFile='/ข้าวมันไก่ย่าง.jpg' menuText='ข้าวมันไก่ย่างพิเศษ' />
        <MenuListClient onClick={() => handlerMenu('น้ำเปล่าขวดเล็ก')} imgFile='/น้ำเปล่า.jpg' menuText='น้ำเปล่าขวดเล็ก' />
        <MenuListClient onClick={() => handlerMenu('น้ำเปล่าขวดใหญ่')} imgFile='/น้ำเปล่า.jpg' menuText='น้ำเปล่าขวดใหญ่' />
        <MenuListClient onClick={() => handlerMenu('น้ำโค้กขวดเล็ก')} imgFile='/น้ำโค้ก.jpg' menuText='น้ำโค้กขวดเล็ก' />
        <MenuListClient onClick={() => handlerMenu('น้ำโค้กขวดใหญ่')} imgFile='/น้ำโค้ก.jpg' menuText='น้ำโค้กขวดใหญ่' />
      </div>

      {/* Modal */}
      <MenuDiscriptionModelClient visible={isModalVisible} menuName='ข้าวมันไก่ต้ม' price={200} quatity={4} total={59} imgFile='/ข้าวมันไก่ต้ม.jpg' onClose={handleCloseModal}/>
      {/* Footer Total */}
      <div className="flex justify-between items-center bg-[#FDD77D] h-[64px] p-[16px] mt-[16px]">
        <div className="w-[19px] h-[32px] bg-white"></div>
        <div className="text-[18px] text-white"><span>ดูข้อมูลในตะกร้า</span></div>
        <div className="'text-[18px] text-[#C60000]"><span>รวมเงิน</span></div>
      </div>
    </>
  )
}

export default InStoreTableListClient
