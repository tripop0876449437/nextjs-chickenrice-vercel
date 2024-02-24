import React, { useState } from 'react'
import Image from 'next/image'
import MenuDiscriptionModel from '../modals/MenuDiscriptionModal'
import { Pagination } from 'antd';

const TableBackMenuList = () => {
  const [selectListMenu, setSelectListMenu] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8; // Number of

  const handlerMenu = (menuText: string) => {
    setSelectListMenu(menuText);
    setIsModalVisible(true)
  };
  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  // Pagination
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Sample menu items
  const menuItems = [
    {
      title: 'โต๊ะ 1',
      time: '12.00',
      submenuItems: [
        {
          menu: 'ข้าวมันไก่ต้มธรรมดา',
          quantity: 1,
          total: 50,
        },
        {
          menu: 'ข้าวมันไก่ต้มธรรมดา',
          quantity: 1,
          total: 50,
        },
      ],
      moneyTotalName: 'ข้าวมันไก่ต้มธรรมดา',
      quantityTotal: 2,
      moneyTotal: 100,
      image: '/ข้าวมันไก่ต้ม.jpg',
    },
    {
      title: 'โต๊ะ 2',
      time: '12.00',
      submenuItems: [
        {
          menu: 'ข้าวมันไก่ทอดธรรมดา',
          quantity: 1,
          total: 50,
        },
        {
          menu: 'ข้าวมันไก่ทอดธรรมดา',
          quantity: 1,
          total: 50,
        },
      ],
      moneyTotalName: 'ข้าวมันไก่ทอดธรรมดา',
      quantityTotal: 2,
      moneyTotal: 100,
      image: '/ข้าวมันไก่ทอด.jpg',
    },
    {
      title: 'โต๊ะ 3',
      time: '12.00',
      submenuItems: [
        {
          menu: 'ข้าวมันไก่ทอดธรรมดา',
          quantity: 1,
          total: 50,
        },
        {
          menu: 'ข้าวมันไก่ทอดธรรมดา',
          quantity: 1,
          total: 50,
        },
      ],
      moneyTotalName: 'ข้าวมันไก่ทอดธรรมดา',
      quantityTotal: 2,
      moneyTotal: 100,
      image: '/ข้าวมันไก่ทอด.jpg',
    },
    {
      title: 'โต๊ะ 4',
      time: '12.00',
      submenuItems: [
        {
          menu: 'ข้าวมันไก่ทอดธรรมดา',
          quantity: 1,
          total: 50,
        },
        {
          menu: 'ข้าวมันไก่ทอดธรรมดา',
          quantity: 1,
          total: 50,
        },
      ],
      moneyTotalName: 'ข้าวมันไก่ทอดธรรมดา',
      quantityTotal: 2,
      moneyTotal: 100,
      image: '/ข้าวมันไก่ทอด.jpg',
    },
    {
      title: 'โต๊ะ 5',
      time: '12.00',
      submenuItems: [
        {
          menu: 'ข้าวมันไก่ต้มธรรมดา',
          quantity: 1,
          total: 50,
        },
        {
          menu: 'ข้าวมันไก่ต้มธรรมดา',
          quantity: 1,
          total: 50,
        },
      ],
      moneyTotalName: 'ข้าวมันไก่ต้มธรรมดา',
      quantityTotal: 2,
      moneyTotal: 100,
      image: '/ข้าวมันไก่ต้ม.jpg',
    },
  ];

  // Calculate the start and end index of items for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, menuItems.length);
  const visibleMenuItems = menuItems.slice(startIndex, endIndex);


  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {visibleMenuItems.map((menuItem, index) => (
          <div key={index} className="border border-[#A93F3F] h-[170px] justify-center cursor-pointer p-2" onClick={() => handlerMenu(menuItem.title)}>
            <div className="h-[100px] bg-[#D9D9D9]">
              <Image src={menuItem.image} alt="" width={1} height={1} layout="responsive" className="object-contain max-w-full max-h-full" />
            </div>
            <div className="flex items-center justify-center mt-5">
              {menuItem.title}
            </div>
          </div>
        ))}
      </div>
      {/* <MenuDiscriptionModel visible={isModalVisible} menuName={'ข้าวมันไก่ต้ม'} price={400} quatity={8} total={400} imgFile={'/ข้าวมันไก่ต้ม.jpg'} onClose={handleCloseModal} /> */}
      {visibleMenuItems.map((menuItem, index) => (
        <MenuDiscriptionModel key={index} visible={isModalVisible} menuName={'ข้าวมันไก่ต้ม'} price={400} quatity={8} total={400} imgFile={menuItem.image} onClose={handleCloseModal} />
      ))}
      <div className="flex justify-end mt-[16px]">
        <Pagination current={currentPage} pageSize={pageSize} total={menuItems.length} onChange={onPageChange} style={{ textAlign: 'center', color: 'red', borderColor: 'red' }} className="custom-pagination" />
      </div>
    </div>
  )
}

export default TableBackMenuList
