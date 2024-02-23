import React, { useState } from 'react';
import { Input, Menu, Pagination } from 'antd';
import Image from 'next/image';
import { MailOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const CurrentOrder = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4; // Number of items per page

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    console.log(value); // Log the value of the input search field
  };

  const onClick = (e: any) => {
    console.log('click ', e);
  };

  const onOpenChange = (openKeys: React.Key[]) => {
    console.log('openKeys: ', openKeys);
  };

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
    },
    {
      title: 'โต๊ะ 5',
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
    },
  ];

  // Calculate the start and end index of items for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, menuItems.length);
  const visibleMenuItems = menuItems.slice(startIndex, endIndex);

  return (
    <div>
      {/* Search input */}
      <div className="flex justify-center items-center py-[16px]">
        <div className="w-[200px] h-[30px] border-2 border-[#A93F3F] rounded-none flex justify-center items-center"><span>วันนี้</span></div>
        <div className="w-[30px]"></div>
        <div className="w-full">
          <Input
            placeholder="ค้นหาออร์เดอร์"
            prefix={<Image src="/search.png" alt="search" width={16} height={16} className='ml-[6px]' />}
            className="h-[30px] pr-[16px] border-2 border-[#A93F3F] rounded-none"
            onChange={handleChange} // Add onChange event handler
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[434px]">
        {/* Dropdown Menu */}
        <div className="grid gap-[8px]">
          {visibleMenuItems.map((menuItem, index) => (
            <Menu
              key={index}
              onClick={onClick}
              onOpenChange={onOpenChange}
              style={{ width: '100%', borderRadius: 0, border: '1px solid #A93F3F', background: '#FDD77D', padding: 0, margin: 0, borderLeft: 'none', borderRight: 'none' }}
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['sub0']}
              mode="inline"
              className="custom-menu"
            >
              <SubMenu
                key={`sub${index}`}
                title={
                  <div className="flex">
                    <div className="text-[18px] font-bold text-[#A93F3F] mr-[10px]"><span>{menuItem.title}</span></div>
                    <div className="text-[12px] text-[#A93F3F]"><span>เวลา <span>{menuItem.time}</span>น.</span></div>
                  </div>
                }
                style={{ background: '#FDD77D', padding: 0, margin: 0 }}
                className="custom-submenu"
              >
                <div className="w-full h-[130px] bg-white border-[#A93F3F] border-t-[2px] pt-[26px] pb-[16px] px-[16px] grid grid-cols-1 gap-4">
                  {menuItem.submenuItems.map((subMenuItem, subIndex) => (
                    <div key={subIndex} className="w-full grid grid-cols-7">
                      <div className='flex justify-start items-center text-[18px] text-[#A93F3F] col-start-1 col-span-3'><p>{subMenuItem.menu}</p></div>
                      <div className='flex justify-center items-center text-[18px] text-[#A93F3F] col-span-1'><p>{subMenuItem.quantity}</p></div>
                      <div className='flex justify-end items-center text-[18px] text-[#A93F3F] col-span-3'><p>{subMenuItem.total}</p></div>
                    </div>
                  ))}
                  <div className="w-full grid grid-cols-7">
                    <div className='flex justify-center items-center text-[18px] text-[#A93F3F] col-start-1 col-span-3'><p>รวมทั้งสิ้น</p></div>
                    <div className='flex justify-center items-center text-[18px] text-[#A93F3F] col-span-1'><p>{menuItem.quantityTotal}</p></div>
                    <div className='flex justify-end items-center text-[18px] text-[#A93F3F] col-span-3'><p>{menuItem.moneyTotal}</p></div>
                  </div>
                </div>
              </SubMenu>
            </Menu>
          ))}
        </div>
        {/* Total */}
        <div className="h-[38px] bg-[#A93F3F] flex items-center p-2">
          <span className='text-[18px] font-bold text-[#FDD77D]'>ยอดรวม</span>
        </div>
        {/* Pagination */}
        <div className="flex justify-end mt-[16px]">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={menuItems.length}
            onChange={onPageChange}
            style={{ textAlign: 'center', color: 'red', borderColor: 'red' }}
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentOrder;
