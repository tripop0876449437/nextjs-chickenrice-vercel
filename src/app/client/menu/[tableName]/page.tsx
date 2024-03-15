"use client";

import { Button, Input, Modal, Spin } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import MenuSelectButtonClient from '@/common/components/elements/buttons/menubuttonClient';
import InStoreTableListClient from '@/common/components/elements/bodyContent/InStoreTableListClient';
import axios from 'axios';
import MenuListClient from '@/common/components/elements/buttons/menuListClient';
import MenuDiscriptionModelClient from '@/common/components/elements/modals/menuDiscriptionModalClient';
import { useRouter } from 'next/navigation';

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

const Menu = ({ params, }: { params: { tableName: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectMenu, setSelectMenu] = useState<string>("เมนูทั้งหมด")
  const [searchValue, setSearchValue] = useState<string>('');

  // Category
  const [categoriesData, setCategoriesData] = useState<any>({});

  // Search Menu
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>({});

  const [selectMenuCategory, setSelectMenuCategory] = useState<string>("เมนูทั้งหมด");
  const [selectMenuCategoryId, setSelectMenuCategoryId] = useState<number>(0);

  const [orderQuantityTotal, setOrderQuantityTotal] = useState<number>(0)

  useEffect(() => {
    const PRTableName = decodeURI(params.tableName)
    if (PRTableName) {
      // If instoreOneTwo is not found in localStorage, use the current state value
      localStorage.setItem('tableNameClient', PRTableName)
    } else {
      // If instoreOneTwo is found in localStorage, update the state with its value
      console.log('not found tableNameClient');

    }
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL_API}/api/category`, {});

        console.log('Categories response:', response.data);
        setCategoriesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };


    const fetchSearchMenu = async () => {
      try {
        setLoading(true);
        console.log('selectMenuCategory', selectMenuCategory);
        let response;
        if (selectMenuCategory === 'เมนูทั้งหมด') {
          response = await axios.post(`${BASE_URL_API}/api/product/search?pageSize=100&searchTerm=${searchQuery}&categoryName=`, {});
        } else {
          response = await axios.post(`${BASE_URL_API}/api/product/search?pageSize=100&searchTerm=${searchQuery}&categoryName=${selectMenuCategory}`, {});
        }
        console.log('SearchResults', response.data);
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error searching:', error);
        setLoading(false);
      }
    };

    const fetchOrderTotal = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL_API}/api/order-total/${PRTableName}`)
        setOrderQuantityTotal(response.data[0].orderTotal.ordertotalquantity);
        setLoading(false);
      } catch (error) {
        console.error("Error fetchOrderTotal:", error);
        setLoading(false);
      }
    }

    fetchCategories();
    console.log('------------------');
    fetchSearchMenu();
    if (searchQuery.trim() !== '') {
      fetchSearchMenu();
    }
    console.log('------------------');
    console.log('SearchResults useEffect:', searchResults);
    fetchOrderTotal();


  }, [searchQuery, selectMenuCategory, searchResults, params.tableName]); // Empty dependency array to run the effect only once on mount


  const handlerMenuCategory = (menuText: string, id: number = 0) => {
    console.log('handlerMenuCategory: ', menuText);
    console.log('handlerMenuCategoryId: ', id);

    setSelectMenuCategory(menuText)
    setSelectMenuCategoryId(id)
  }
  console.log('selectMenuCategory', selectMenuCategory);
  console.log('selectMenuCategoryId', selectMenuCategoryId);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };


  // const handlerMenu = (textMenu: string) => {
  //   setSearchValue(textMenu)
  // }

  const renderCategoryButtons = () => {
    // console.log('categoriesData: ', categoriesData);
    if (!categoriesData || !categoriesData.categories || !Array.isArray(categoriesData.categories)) {
      // Handle the case where categoriesData or categoriesData.categories is undefined or not an array
      return null;
    }

    // Create an array to hold the category buttons
    const categoryButtons = [];

    // Add the "All Categories" button as the first option
    categoryButtons.push(
      <React.Fragment key="all-categories">
        <MenuSelectButtonClient
          menuText="เมนูทั้งหมด"
          isActive={selectMenuCategory === "เมนูทั้งหมด"}
          onClick={() => handlerMenuCategory("เมนูทั้งหมด")}
        />
      </React.Fragment>
    );

    // Map over the categories and add buttons for each category
    categoriesData.categories.forEach((category: any) => {
      categoryButtons.push(
        <React.Fragment key={category.categoryname}>
          <MenuSelectButtonClient
            menuText={category.categoryname}
            isActive={selectMenuCategory === category.categoryname}
            onClick={() => handlerMenuCategory(category.categoryname, category.id)}
          />
        </React.Fragment>
      );
    });

    return categoryButtons;
  };


  const [selectListMenuClient, setSelectListMenuClient] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTableName, setSelectedTableName] = useState<string>("");

  const handlerMenu = (textMenu: string) => {
    setSearchValue(textMenu);
    setSelectListMenuClient(textMenu);
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCount(0);
    setTotal(0);
  };



  const [isHovered, setIsHovered] = useState<boolean>(false);
  const buttonStyle: React.CSSProperties = {
    cursor: 'pointer',
    padding: '16px',
    // backgroundColor: isActive ? '#A93F3F' : (isHovered ? '#A93F3F' : 'transparent'), // Background color changes on hover
    // color: isActive ? '#FDD77D' :  (isHovered ? '#FDD77D' : 'black'),
  };

  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addOrderMenu = async (productId: number) => {
    handleCloseModal();
    console.log('productId', productId);

    const orderResponse = {
      customerName: decodeURI(params.tableName),
      orderProductQuantity: count,
      orderProductPrice: total
    }
    console.log('orderResponse: ', orderResponse);

    // api post order
    const response = await axios.post(`${BASE_URL_API}/api/order/add/${productId}`, orderResponse)
    console.log('response api order add: ', response.data);
  }




  // Function to increment the count
  const incrementCount = (price: number) => {
    setCount((prevCount) => prevCount + 1);
    setTotal((prevTotal) => prevTotal + Number(price));
  };

  // Function to decrement the count
  const decrementCount = (price: number) => {
    // Ensure count doesn't go below 0
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
      setTotal((prevTotal) => prevTotal - Number(price));
    }
    if (count === 1) {
      setTotal(0);
    }
  };

  const nextToCartPage = () => {
    router.push('../cart')
  }




  return (
    <>
      <div className="py-[40px] px-[10px]">
        <div className="flex justify-between bg-[#FDD77D] p-[4px]">
          <div className="flex flex-col">
            <span className='text-[18px] font-bold'>{decodeURI(params.tableName)}</span>
            <span className='text-[12px] font-bold text-[#A93F3F]'>รวมอร่อย</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={nextToCartPage}>
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
          {renderCategoryButtons()}
        </div>
        {/* SelectMenu */}

        {/* Menu List */}
        <div className="grid grid-cols-2 gap-2 mt-[16px]">

          {searchResults.products?.filter((menuItem: { category: { name: string } }) => {
            if (selectMenuCategory === "เมนูทั้งหมด" || !menuItem.category.name) {
              return true; // Show all menu items if selectMenuCategory is "เมนูทั้งหมด" or if the menuItem has no category
            } else {
              return menuItem.category.name === selectMenuCategory; // Show menu items of the selected category
            }
          }).map((menuItem: { imageUrl: string; productName: string }, index: number) => (
            // <MenuListClient key={index} onClick={() => handlerMenu(menuItem.productName)} imgFile={`${BASE_URL_API}${menuItem.imageUrl}`} menuText={menuItem.productName} />
            <div
              className={`border-2 border-[#A93F3F] flex flex-col items-center justify-center`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={buttonStyle} // Optional: Add pointer cursor on hover
              onClick={() => handlerMenu(menuItem.productName)}
              key={index}
            >
              <img src={`${BASE_URL_API}${menuItem.imageUrl}`} alt="" width={165} height={105} />
              <p className="text-[16px] font-bold mt-[16px] text-[#A93F3F]">{menuItem.productName}</p>
            </div>
          ))}

        </div>

        {/* Modal */}
        {searchResults.products?.map((menuItem: { imageUrl: string; productName: string; price: number; id: number }, index: number) => (
          // <MenuDiscriptionModelClient key={index} visible={isModalVisible} menuName={menuItem.productName} price={200} quatity={4} total={59} imgFile='/ข้าวมันไก่ต้ม.jpg' onClose={handleCloseModal} />
          <>
            <Modal
              closeIcon={false}
              open={isModalVisible && selectListMenuClient === menuItem.productName}
              onCancel={handleCloseModal}
              footer={null}
              centered
              width={300}
              style={{ padding: 0 }}
              className="no-border-radius-modal"
              key={index}
            >
              <div className='text-center'>
                <div className="flex justify-center items-center">
                  <img src={`${BASE_URL_API}${menuItem.imageUrl}`} alt="" width={240} height={165.3} className='max-w-[465.3pxpx] max-h-[465.3pxpx]' />
                </div>
                <div className='h-[30px]'></div>
                <p className='font-bold text-[18px] text-start'>{menuItem.productName}</p>
                <div className='h-[16px]'></div>
                <div className='flex'>
                  <div className="w-[50%] text-start text-[18px] font-bold"><span>ราคา</span></div>
                  <div className="w-[50%] text-start text-[18px]"><span>{menuItem.price}</span></div>
                </div>
                <div className='h-[16px]'></div>
                <div className='flex'>
                  <div className="w-[50%] text-start text-[18px] font-bold"><span>จำนวน</span></div>
                  <div className="w-[50%] text-start flex">
                    <div className="cursor-pointer border border-[#000] w-[24px] text-center" onClick={() => decrementCount(menuItem.price)}>-</div>
                    <div className="border border-[#000] w-[100%] flex justify-center items-center"><span>{count}</span></div>
                    <div className="cursor-pointer border border-[#000] w-[24px] text-center" onClick={() => incrementCount(menuItem.price)}>+</div>
                  </div>
                </div>
                <div className='h-[16px]'></div>
                <div className='flex'>
                  <div className="w-[50%] text-start text-[18px] font-bold"><span>รวมเงิน</span></div>
                  <div className="w-[50%] text-center text-[18px] border border-[#000]"><span>{total}</span></div>
                </div>
                <div style={{ height: '30px' }}></div>
                <Button
                  key="confirm" onClick={() => addOrderMenu(menuItem.id)}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#00BE2A',
                    margin: '0 auto',
                    transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                  }}
                  className='rounded-none'
                >
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>เพิ่มลงตะกร้า</span>
                </Button>
              </div>
            </Modal>
          </>
        ))}
        {/* Footer Total */}
        <div className="flex justify-between items-center bg-[#FDD77D] h-[64px] p-[16px] mt-[16px]">
          <div className="w-[19px] h-[32px] bg-white flex justify-center items-center"><span>{orderQuantityTotal}</span></div>
          <div className="text-[18px] text-white"><span>ดูข้อมูลในตะกร้า</span></div>
          <div className="'text-[18px] text-[#C60000]"><span>รวมเงิน</span></div>
        </div>
      </div >
    </>
  )
}

export default Menu
