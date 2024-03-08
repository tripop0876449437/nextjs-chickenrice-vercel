"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OrderAddressButton from "../buttons/orderAddressButton";
import InStoreTableList from "../bodyContent/InStoreTableList";
import CurrentOrder from "../bodyContent/CurrentOrder";
import BackStoreList from "../bodyContent/BackStoreList";
import { logout } from '@/business/service/auth.service';
import jwt from 'jsonwebtoken';
import InStoreList from "../bodyContent/InStoreList";
import TableButton from "../buttons/tableButton";
import axios from "axios";
import { Button, Form, Input, Modal, Pagination, QRCode, Space } from "antd";
import StatusTableNameModel from "../buttons/statusTableButton";
import MenuselectbuttonProp from "../buttons/Menubutton";
import AddCategoryModal from "../modals/AddCategoryModal";
import MenuDiscriptionModel from "../modals/MenuDiscriptionModal";
import AddMenuModal from "../modals/AddMenuModal";
import ButtonConfirm from "../buttons/buttonConfirm";
import OrderMenuModal from "../modals/orderMenu";

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

export const Header = () => {
  const [selectMenu, setSelectMenu] = useState<string>("หน้าร้าน")
  const [instoreOneTwo, setInstoreOneTwo] = useState<string>('one')
  const [decodedToken, setDecodedToken] = useState<{ username: string } | null>(null);

  // InStoreTableList
  const [currentPage, setCurrentPage] = useState<number>(1);

  // TableMenuList
  const [tableNameModal, setTableNameModal] = useState<string>('');

  // Category
  const [categoriesData, setCategoriesData] = useState<any>({});

  // Search Menu
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>({});


  const [currentPageMenuList, setCurrentPageMenuList] = useState<number>(1);

  const [selectMenuCategory, setSelectMenuCategory] = useState<string>("เมนูทั้งหมด");
  const [selectMenuCategoryId, setSelectMenuCategoryId] = useState<number>(0);

  useEffect(() => {
    // Retrieve instoreOneTwo from local storage
    const asw = localStorage.getItem('instoreOneTwo');
    if (!asw) {
      // If instoreOneTwo is not found in localStorage, use the current state value
      localStorage.setItem('instoreOneTwo', instoreOneTwo);
    } else {
      // If instoreOneTwo is found in localStorage, update the state with its value
      setInstoreOneTwo(asw);
    }
    const tableNM = localStorage.getItem('tableNameModal');
    if (!tableNM) {
      // If instoreOneTwo is not found in localStorage, use the current state value
      localStorage.setItem('tableNameModal', tableNameModal);
    } else {
      // If instoreOneTwo is found in localStorage, update the state with its value
      setTableNameModal(tableNM);
    }
    const authToken = localStorage.getItem('accessToken');
    if (!authToken) {
      console.error('Bearer token not found in localStorage');
      return;
    }
    const decoded = jwt.decode(authToken) as { username: string } | null;
    setDecodedToken(decoded);

    // InStoreTableList Data
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('accessToken');

        if (!authToken) {
          console.error('Bearer token not found in localStorage');
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        };

        setLoading(true);
        const response = await axios.post(`${BASE_URL_API}/api/customer`, {
          page: currentPage,
        }, config);
        // console.log('response', response.data);

        setTableData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching table data:', error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const authToken = localStorage.getItem('accessToken');

        if (!authToken) {
          console.error('Bearer token not found in localStorage');
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.post(`${BASE_URL_API}/api/category`, {}, config);
        // console.log('Categories response:', response.data);

        setCategoriesData(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };


    const fetchSearchMenu = async () => {
      try {
        const authToken = localStorage.getItem('accessToken');


        if (!authToken) {
          console.error('Bearer token not found in localStorage');
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        };

        console.log('selectMenuCategory', selectMenuCategory);
        if (selectMenuCategory === 'เมนูทั้งหมด') {
          const response = await axios.post(`${BASE_URL_API}/api/product/search?page=${currentPageMenuList}&searchTerm=${searchQuery}&categoryName=`, {
          }, config);

          setSearchResults(response.data);
        } else {
          const response = await axios.post(`${BASE_URL_API}/api/product/search?page=${currentPageMenuList}&searchTerm=${searchQuery}&categoryName=${selectMenuCategory}`, {
          }, config);

          setSearchResults(response.data);
        }
        console.log('SearchResults', searchResults);

      } catch (error) {
        console.error('Error searching:', error);
      }
    };

    fetchData();
    fetchCategories();
    console.log('------------------');
    fetchSearchMenu();
    if (searchQuery.trim() !== '') {
      fetchSearchMenu();
    }
    console.log('------------------');

  }, [instoreOneTwo, currentPage, tableNameModal, searchQuery, currentPageMenuList, selectMenuCategory, searchResults]); // Empty dependency array to run the effect only once on mount

  const handleSearchMenu = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlerMenu = (menuText: string) => {
    setSelectMenu(menuText)
  }

  const handleLogout = () => {
    logout();
  };




  // InStoreTableList
  const [numButtons, setNumButtons] = useState<number>(0);
  const [selectedTableName, setSelectedTableName] = useState<string>('');
  const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const handleOpenModal = (tableId: number, tableName: string) => {
    setSelectedTableName(tableName);
    setSelectedTableId(tableId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddButton = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');

      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      const decodedToken = jwt.decode(authToken) as { username: string } | null;

      if (decodedToken) {
        console.log('Decoded Token:', decodedToken.username);
      } else {
        console.error('Decoded token is null or undefined');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };

      const tablePayload = {
        status: 'active',
        username: decodedToken.username,
      };

      await axios.post(`${BASE_URL_API}/api/customer/add`, tablePayload, config);

      window.location.reload()
      setNumButtons(numButtons + 1);
      const totalPages: number = Math.ceil((numButtons + 1) / 7);

      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(currentPage);
      }
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const renderTableButtons = () => {
    if (tableData && tableData.tables) {
      return tableData.tables.map((table: any) => (
        <TableButton
          key={table.id}
          tableName={table.tablename}
          tableActive={table.status}
          onClick={() => handleOpenModal(table.id, table.tablename)}
        />
      ));
    } else {
      return null;
    }
  };







  // TableNameModal
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // const [selectedTableName, setSelectedTableName] = useState<string>('');
  // const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const [selectedActive, setSelectedActive] = useState<boolean>(false);
  // const [instoreOneTwo, setInstoreOneTwo] = useState<string>('two')
  // const [selectedSubmit, setSelectedSubmit] = useState<boolean>(false);
  const showModalActive = async (tableName: string, tableId: number) => {
    try {
      handleCloseModal();
      setSelectedTableName(tableName);
      setSelectedTableId(tableId);
      const authToken = localStorage.getItem('accessToken');

      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      // Configure request headers
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          // 'Content-Type': 'application/json',
        },
      };

      const tablePayload = {
        status: 'active',
      };

      // Send DELETE request to API endpoint
      await axios.put(`${BASE_URL_API}/api/customer/update/${tableId}`, tablePayload, config);
      window.location.reload()
    } catch (error) {
      console.error('Error deleting table:', error);
      // Handle errors
    }
  };

  const showModalInActive = async (tableName: string, tableId: number) => {
    try {
      handleCloseModal();
      setSelectedTableName(tableName);
      setSelectedTableId(tableId);
      const authToken = localStorage.getItem('accessToken');

      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      // Configure request headers
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          // 'Content-Type': 'application/json',
        },
      };

      const tablePayload = {
        status: 'inactive',
      };

      // Send DELETE request to API endpoint
      await axios.put(`${BASE_URL_API}/api/customer/update/${tableId}`, tablePayload, config);
      window.location.reload()
    } catch (error) {
      console.error('Error deleting table:', error);
      // Handle errors
    }
  };
  const showModalDelete = (tableName: string, tableId: number) => {
    setSelectedTableName(tableName);
    setSelectedTableId(tableId);
    setSelectedActive(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
    setSelectedActive(false);
  };

  const handleSubmitToNewPage = (tableName: string) => {
    handleCloseModal();
    setTableNameModal(tableName);
    localStorage.setItem('instoreOneTwo', 'two');
    localStorage.setItem('tableNameModal', tableName);
    window.location.reload()
  };

  const handleSubmit = async (tableId: number) => {
    try {
      setIsModalVisible(false);
      const authToken = localStorage.getItem('accessToken');

      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      // Configure request headers
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          // 'Content-Type': 'application/json',
        },
      };

      // Send DELETE request to API endpoint
      await axios.delete(`${BASE_URL_API}/api/customer/delete/${tableId}`, config);
      window.location.reload()
    } catch (error) {
      console.error('Error deleting table:', error);
      // Handle errors
    }
  };




  // InStoreList


  const handlerMenuCategory = (menuText: string, id: number = 0) => {
    console.log('handlerMenuCategory: ', menuText);
    console.log('handlerMenuCategoryId: ', id);

    setSelectMenuCategory(menuText)
    setSelectMenuCategoryId(id)
  }
  console.log('selectMenuCategory', selectMenuCategory);
  console.log('selectMenuCategoryId', selectMenuCategoryId);

  const [searchValue, setSearchValue] = useState<string>('');
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4; // Number of items per page

  const handleChangeSearchMenuBar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const [isActiveQR, setIsActiveQR] = useState(false)

  const handleClickQrCode = () => {
    setIsActiveQR(true);
  }

  const handleClickQrCodeClose = () => {
    setIsActiveQR(false);
  }

  const [IsVisibleAddButtonCategory, setIsVisibleAddButtonCategory] = useState(false);

  const handleAddButtonCategory = () => {
    setIsVisibleAddButtonCategory(true);
  }

  const handleAddButtonCategoryClose = () => {
    setIsVisibleAddButtonCategory(false);
  }

  const handleBack = () => {
    localStorage.setItem('instoreOneTwo', 'one');
    window.location.reload()
  }




  // QrCode Modal
  const tbnGet = localStorage.getItem('tableNameModal')
  const [text, setText] = React.useState(`${CLIENT_URL}/${tbnGet}`);




  // TableMenuList
  const [selectListMenu, setSelectListMenu] = useState<string>("");
  const [isModalVisibleTableMenuList, setIsModalVisibleTableMenuList] = useState(false);

  const handlerMenuList = (menuText: string) => {
    setSelectListMenu(menuText);
    setIsModalVisibleTableMenuList(true)
  };
  const handleCloseModalMenuList = () => {
    setIsModalVisibleTableMenuList(false);
    setCount(0);
    setTotal(0);
  }

  // Pagination
  const onPageChange = (page: number) => {
    console.log('onPageChange', page);

    setCurrentPageMenuList(page);
    console.log('currentPageMenuList', currentPageMenuList);

  };

  // // Sample menu items
  // const menuItems = [
  //   {
  //     title: 'โต๊ะ 1',
  //     time: '12.00',
  //     submenuItems: [
  //       {
  //         menu: 'ข้าวมันไก่ต้มธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //       {
  //         menu: 'ข้าวมันไก่ต้มธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //     ],
  //     moneyTotalName: 'ข้าวมันไก่ต้มธรรมดา',
  //     quantityTotal: 2,
  //     moneyTotal: 100,
  //     image: '/ข้าวมันไก่ต้ม.jpg',
  //   },
  //   {
  //     title: 'โต๊ะ 2',
  //     time: '12.00',
  //     submenuItems: [
  //       {
  //         menu: 'ข้าวมันไก่ทอดธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //       {
  //         menu: 'ข้าวมันไก่ทอดธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //     ],
  //     moneyTotalName: 'ข้าวมันไก่ทอดธรรมดา',
  //     quantityTotal: 2,
  //     moneyTotal: 100,
  //     image: '/ข้าวมันไก่ทอด.jpg',
  //   },
  //   {
  //     title: 'โต๊ะ 3',
  //     time: '12.00',
  //     submenuItems: [
  //       {
  //         menu: 'ข้าวมันไก่ทอดธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //       {
  //         menu: 'ข้าวมันไก่ทอดธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //     ],
  //     moneyTotalName: 'ข้าวมันไก่ทอดธรรมดา',
  //     quantityTotal: 2,
  //     moneyTotal: 100,
  //     image: '/ข้าวมันไก่ทอด.jpg',
  //   },
  //   {
  //     title: 'โต๊ะ 4',
  //     time: '12.00',
  //     submenuItems: [
  //       {
  //         menu: 'ข้าวมันไก่ทอดธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //       {
  //         menu: 'ข้าวมันไก่ทอดธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //     ],
  //     moneyTotalName: 'ข้าวมันไก่ทอดธรรมดา',
  //     quantityTotal: 2,
  //     moneyTotal: 100,
  //     image: '/ข้าวมันไก่ทอด.jpg',
  //   },
  //   {
  //     title: 'โต๊ะ 5',
  //     time: '12.00',
  //     submenuItems: [
  //       {
  //         menu: 'ข้าวมันไก่ต้มธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //       {
  //         menu: 'ข้าวมันไก่ต้มธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //     ],
  //     moneyTotalName: 'ข้าวมันไก่ต้มธรรมดา',
  //     quantityTotal: 2,
  //     moneyTotal: 100,
  //     image: '/ข้าวมันไก่ต้ม.jpg',
  //   },
  //   {
  //     title: 'โต๊ะ 6',
  //     time: '12.00',
  //     submenuItems: [
  //       {
  //         menu: 'ข้าวมันไก่ต้มธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //       {
  //         menu: 'ข้าวมันไก่ต้มธรรมดา',
  //         quantity: 1,
  //         total: 50,
  //       },
  //     ],
  //     moneyTotalName: 'ข้าวมันไก่ต้มธรรมดา',
  //     quantityTotal: 2,
  //     moneyTotal: 100,
  //     image: '/ข้าวมันไก่ต้ม.jpg',
  //   },
  // ];

  // // Calculate the start and end index of items for the current page
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = Math.min(startIndex + pageSize, menuItems.length);
  // const visibleMenuItems = menuItems.slice(startIndex, endIndex);


  const [isVisibleAddButtonMenu, setIsVisibleAddButtonMenu] = useState(false);

  const handleAddButtonMenu = () => {
    setIsVisibleAddButtonMenu(true);
  }

  const handleAddButtonMenuClose = () => {
    setIsVisibleAddButtonMenu(false);
  }





  // AddCategoryModal
  const [form] = Form.useForm();
  // const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string | undefined>();
  // const [imageUploaded, setImageUploaded] = useState(false); // State to track whether an image has been uploaded

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    handleAddButtonCategoryClose();
  };

  const [isModalVisibleMenu, setIsModalVisibleMenu] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  const showModalMenu = () => {
    setIsModalVisibleMenu(true);
  };

  const handleCancelMenu = () => {
    setIsModalVisibleMenu(false);

  };

  const handleSubmitMenu = async (cateName: string) => {
    setIsModalVisibleMenu(false);
    try {

      const authToken = localStorage.getItem('accessToken');

      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      const decodedToken = jwt.decode(authToken) as { username: string } | null;

      if (decodedToken) {
        console.log('Decoded Token:', decodedToken.username);
      } else {
        console.error('Decoded token is null or undefined');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };

      const categoryPayload = {
        categoryName: cateName
      }

      await axios.post(`${BASE_URL_API}/api/category/add`, categoryPayload, config)

      window.location.reload()
    } catch (error) {
      console.error('Error creating category:', error);
      throw error; // Propagate the error for handling in the UI
    }
  };




  // MenuDiscriptionModal
  const [isModalVisibleMenuDiscriptionModal, setIsModalVisibleMenuDiscriptionModal] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0)

  const handleCloseModalMenuDiscriptionModal = () => {
    setIsModalVisibleMenuDiscriptionModal(false);
  };

  const handlerMenuMenuDiscriptionModal = () => {
    handleCloseModalMenuList();
    setIsModalVisibleMenuDiscriptionModal(true);
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

    // Reset total to 0 if count becomes 0
    if (count === 1) {
      setTotal(0);
    }
  };









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
        <MenuselectbuttonProp
          menuText="เมนูทั้งหมด"
          isActive={selectMenuCategory === "เมนูทั้งหมด"}
          onClick={() => handlerMenuCategory("เมนูทั้งหมด")}
        />
        <div className="h-[16px]"></div>
      </React.Fragment>
    );

    // Map over the categories and add buttons for each category
    categoriesData.categories.forEach((category: any) => {
      categoryButtons.push(
        <React.Fragment key={category.id}>
          <MenuselectbuttonProp
            menuText={category.categoryname}
            isActive={selectMenuCategory === category.categoryname}
            onClick={() => handlerMenuCategory(category.categoryname, category.id)}
          />
          <div className="h-[16px]"></div>
        </React.Fragment>
      );
    });

    return categoryButtons;
  };


  // Extract unique categories from menu items
  const categories = Array.from(new Set<string>(searchResults.products?.map((menuItem: { category: string }) => menuItem.category)));


  return (
    <main className="h-screen" style={{ padding: '80px' }}>
      {/* Header */}
      <div className="flex justify-between" style={{ height: '44px', padding: '10px' }}>
        {/* User section */}
        <div className="flex items-center">
          <Image src="/user.png" alt="" width={24} height={24} style={{ margin: '0 8px 0 0' }} />
          <div><p style={{ fontSize: '18px' }}>{decodedToken?.username}</p></div>
        </div>

        {/* Logout button */}
        <div className="flex items-center" onClick={handleLogout}>
          <Image src="logout.svg" alt="" width={24} height={24} style={{ margin: '0 8px 0 0' }} />
          <button><span style={{ fontSize: '18px' }}>Logout</span></button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-5" style={{ marginTop: '16px' }}>
        <OrderAddressButton menuText="หน้าร้าน" imgFile="Frame 96.svg" isActive={selectMenu === "หน้าร้าน"} onClick={() => handlerMenu('หน้าร้าน')} />
        <OrderAddressButton menuText="ซื้อกลับบ้าน" imgFile="Frame 95.svg" isActive={selectMenu === "ซื้อกลับบ้าน"} onClick={() => handlerMenu('ซื้อกลับบ้าน')} />
        <OrderAddressButton menuText="ออร์เดอร์วันนี้" imgFile="Frame 94.svg" isActive={selectMenu === "ออร์เดอร์วันนี้"} onClick={() => handlerMenu('ออร์เดอร์วันนี้')} />
      </div>

      {/* BodyContent */}
      {/* {selectMenu === "หน้าร้าน" && instoreOneTwo === "one" && <InStoreTableList />} */}
      {/* InStoreTableList */}
      {selectMenu === "หน้าร้าน" && instoreOneTwo === "one" &&
        <>
          <div className="flex flex-cols justify-end items-end" style={{ padding: '16px 0' }}>
            <div className="flex">
              <Image src="Vector (1).svg" alt="" width={24} height={24} style={{ marginRight: '30px' }} />
              <div><span style={{ fontSize: '18px', fontWeight: 'bold' }}>กำลังใช้งาน</span></div>
            </div>
            <div style={{ width: '40px' }}></div>
            <div className="flex">
              <Image src="Vector (2).svg" alt="" width={24} height={24} style={{ marginRight: '30px' }} />
              <div><span style={{ fontSize: '18px', fontWeight: 'bold' }}>ว่าง</span></div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            {renderTableButtons()}
            <div
              className="text-[40px] flex items-center justify-center h-[200px] cursor-pointer"
              style={{ background: '#FDD77D' }}
              onClick={() => { handleAddButton() }}
            >
              <span className="text-[#A93F3F] text-[40px] font-bold">+</span>
            </div>
          </div>

          {/* {isModalVisible && <TableNameModel visible={isModalVisible} tableName={selectedTableName} tableId={selectedTableId} onClose={handleCloseModal} />} */}
          {isModalVisible &&
            <>
              <Modal
                closeIcon={false}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                centered
                width={500} // Set the width to 500px
                style={{ height: '470px' }} // Set the height to 470px
              >
                <div style={{ textAlign: 'center', padding: '30px' }}>
                  <div className='flex items-center' style={{ background: '#FDD77D', padding: '16px', height: '80px' }}>
                    <p className='font-bold text-[40px]' style={{ color: '#00BE2A', textAlign: 'center', width: '100%' }}>{selectedTableName}</p>
                  </div>
                  <div style={{ height: '30px' }}></div>
                  {/* Render your StatusTableNameModel */}
                  <StatusTableNameModel statusTableName='กำลังใช้งาน' onClick={() => showModalActive(selectedTableName, selectedTableId)} colorBg='#00BE2A' colorText='#FFF' />
                  <div style={{ height: '30px' }}></div>
                  <StatusTableNameModel statusTableName='ว่าง' onClick={() => showModalInActive(selectedTableName, selectedTableId)} colorBg='#D9D9D9' colorText='#FFF' />
                  <div style={{ height: '30px' }}></div>
                  <StatusTableNameModel statusTableName='ลบโต๊ะ' onClick={() => showModalDelete(selectedTableName, selectedTableId)} colorBg='#C60000' colorText='#FFF' />
                  <div style={{ height: '30px' }}></div>

                  {/* Confirm Next to InStoreList */}
                  <Button
                    key="confirm" onClick={() => handleSubmitToNewPage(selectedTableName)}
                    style={{
                      width: '66px',
                      height: '42px',
                      padding: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #00BE2A',
                      margin: '0 auto',
                      transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>ยืนยัน</span>
                  </Button>

                  {/* Modal for the selected table name */}
                  <Modal
                    // title={`Table ${selectedTableName}`} // Use the selected table name as the modal title
                    closeIcon={false}
                    visible={selectedActive}
                    onCancel={handleDeleteCancel}
                    centered
                    footer={null}
                    width={440}
                    style={{ height: '180px' }}
                  >
                    {/* Modal content goes here */}
                    <div style={{ textAlign: 'center', padding: '30px' }}>
                      <p className='text-[40px] font-bold'>ยืนยันการลบ</p>
                      <div style={{ height: '30px' }}></div>
                      <div className='flex justify-center'>
                        <Button
                          key="close"
                          onClick={handleDeleteCancel}
                          style={{
                            width: '66px',
                            height: '42px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #C60000',
                            transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(254 226 226)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                        >
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#C60000' }}>ยกเลิก</span>
                        </Button>
                        <div style={{ width: '30px' }}></div>
                        <Button
                          key="confirm"
                          onClick={() => handleSubmit(selectedTableId)}
                          style={{
                            width: '66px',
                            height: '42px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #00BE2A',
                            transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                        >
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>ยืนยัน</span>
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </Modal>
            </>
          }

          <div className="flex justify-end mt-5">
            <Pagination
              current={tableData.current_page}
              onChange={(page) => setCurrentPage(page)}
              total={tableData.total}
              pageSize={tableData.page_size}
              showSizeChanger={false}
              style={{ marginBottom: '16px', color: 'red', borderColor: 'red' }}
              className="custom-pagination"
            />
          </div>
        </>}


      {/* InStoreList */}
      {selectMenu === "หน้าร้าน" && instoreOneTwo === "two" &&
        <>
          <div className="flex flex-col">
            <div className="flex justify-between items-center py-[16px]">
              <span className="text-[40px] font-bold text-[#00BE2A]">{tableNameModal}</span>
              <span className="text-[32px] font-bold text-[#1B00BE] cursor-pointer" onClick={handleBack}>ย้อนกลับ</span>
            </div>
            {/* Body */}
            <div className="grid grid-cols-3">
              <div className="w-full pr-[30px]">
                <div className="flex justify-center items-center w-full h-[44px] bg-[#D9D9D9] cursor-pointer" onClick={handleClickQrCode}>
                  <Image src="mdi_qrcode-scan.svg" alt="" width="24" height="24" />
                  <span className='text-[18px] ml-4'>พิมพ์ QR CODE</span>
                </div>

                {/* Modal QrCode */}
                {/* <QrCodeModal menuName='QrCode' visible={isActiveQR} onClose={handleClickQrCodeClose} /> */}
                <Modal
                  closeIcon={false}
                  visible={isActiveQR}
                  onCancel={handleClickQrCodeClose}
                  footer={null}
                  centered
                  width={728}
                  style={{ padding: 0 }}
                  className="no-border-radius-modal"
                >
                  <div className='text-center p-[30px] flex flex-col justify-center items-center'>
                    <div className="flex justify-center items-center text-[#000] text-[40px] text-bold">
                      <span>คิวอาร์โค้ดสำหรับสั่งอาหาร</span>
                    </div>
                    {/* Order List */}
                    <div className="flex justify-center items-center my-[40px]">
                      <Space direction="vertical" align="center">
                        <QRCode value={text || '-'} size={300} bordered={false} />
                      </Space>
                    </div>
                    <div className="flex justify-center items-center w-[400px] h-[44px] bg-[#D9D9D9] cursor-pointer" onClick={handleClickQrCodeClose}>
                      <Image src="mdi_qrcode-scan.svg" alt="" width="24" height="24" />
                      <span className='text-[18px] ml-4'>พิมพ์ QR CODE</span>
                    </div>
                  </div>
                </Modal>


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

              {/* Table Menu&Category */}
              <div className="flex col-span-2">
                {/* Category List */}
                <div className=" mr-[16px]">
                  {renderCategoryButtons()}
                  <div
                    className="text-[18px] flex items-center justify-center h-[42px] cursor-pointer"
                    style={{ background: '#FDD77D' }}
                    onClick={handleAddButtonCategory}
                  >
                    <span className="text-[#A93F3F] text-[18px] font-bold">+</span>
                  </div>

                  {/* Add Category */}
                  {/* <AddCategoryModal visible={IsVisibleAddButtonCategory} onClose={handleAddButtonCategoryClose} /> */}
                  <>
                    <Modal
                      closeIcon={false}
                      visible={IsVisibleAddButtonCategory}
                      onCancel={handleAddButtonCategoryClose}
                      footer={null}
                      centered
                      width={728}
                      style={{ height: '451px', padding: 0 }}
                      className="no-border-radius-modal"
                    >
                      <div className='text-center p-[30px] flex flex-col justify-center items-center'>
                        <Form form={form} onFinish={onFinish}>
                          <div className="flex justify-center items-center text-[#FDD77D] text-[40px] font-bold">
                            <span>เพิ่มหมวดหมู่</span>
                          </div>
                          <div className="flex my-[16px] items-center">
                            <Form.Item className='p-0 m-0'>
                              <div className="flex gap-[30px] justify-between items-center">
                                <span className='w-fit text-[18px] text-[#A93F3F] font-bold'>ชื่อหมวดหมู่สินค้า</span>
                                <Input style={{ width: '363px', height: '44px' }} className='border-2 border-[#A93F3F] rounded-none' onChange={(e) => setCategoryName(e.target.value)} />
                              </div>
                            </Form.Item>
                          </div>
                          <ButtonConfirm buttonType="submit" textButton="เพิ่มเมนู" onClick={() => setIsModalVisible(true)} />
                        </Form>
                      </div>
                    </Modal>
                    {/* Modal for the selected table name */}
                    <Modal
                      closeIcon={false}
                      visible={isModalVisible}
                      onCancel={handleCancel}
                      centered
                      footer={null}
                      width={440}
                      style={{ height: '180px' }}
                    >
                      {/* Modal content goes here */}
                      <div style={{ textAlign: 'center', padding: '30px' }}>
                        <p className='text-[40px] font-bold text-[#FDD77D]'>ยืนยันการเพิ่ม</p>
                        <div style={{ height: '30px' }}></div>
                        <div className='flex justify-center'>
                          <Button
                            key="close"
                            onClick={handleCancel}
                            style={{
                              width: '66px',
                              height: '42px',
                              padding: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '1px solid #C60000',
                              transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(254 226 226)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                          >
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#C60000' }}>ยกเลิก</span>
                          </Button>
                          <div style={{ width: '30px' }}></div>
                          <Button
                            key="confirm"
                            onClick={() => handleSubmitMenu(categoryName)}
                            style={{
                              width: '66px',
                              height: '42px',
                              padding: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '1px solid #00BE2A',
                              transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                          >
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>ยืนยัน</span>
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  </>
                </div>

                {/* Menu&TableListMenu */}
                <div className="flex flex-col w-full" >
                  {/* Search ListMenu */}
                  <div className="flex items-start bg-red-300 h-fit">
                    <Input
                      placeholder="ค้นหาออร์เดอร์"
                      prefix={<Image src="/search.png" alt="search" width={16} height={16} className='ml-[6px]' />}
                      className="flex-1 h-[30px] pr-[16px] border-2 border-[#A93F3F] rounded-none"
                      onChange={handleChangeSearchMenuBar} // Add onChange event handler
                    />
                  </div>
                  {/* TableListMenu */}
                  {/* {selectMenuCategory === "เมนูทั้งหมด" &&
                    <> */}
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {searchResults.products?.filter((menuItem: { category: { name: string } }) => {
                      if (selectMenuCategory === "เมนูทั้งหมด" || !menuItem.category.name) {
                        return true; // Show all menu items if selectMenuCategory is "เมนูทั้งหมด" or if the menuItem has no category
                      } else {
                        return menuItem.category.name === selectMenuCategory; // Show menu items of the selected category
                      }
                    }).map((menuItem: { imageUrl: string; productName: string }, index: number) => (
                      <div key={index} className="border border-[#A93F3F] w-full h-[153px] justify-center cursor-pointer p-2" onClick={() => handlerMenuList(menuItem.productName)}>
                        <div className="h-[99px] bg-[#D9D9D9] flex justify-center">
                          <img src={`${BASE_URL_API}${menuItem.imageUrl}`} alt="" className="object-contain max-w-full max-h-full" />
                        </div>
                        <div className="flex items-center justify-start mt-4 text-[#A93F3F] text-[18px] font-bold">
                          {menuItem.productName}
                        </div>
                      </div>
                    ))}
                    {selectMenuCategory !== "เมนูทั้งหมด" && !searchResults.products?.some((menuItem: { category: { name: string } }) => !menuItem.category.name) && (
                      <>
                        <div
                          className="text-[40px] flex items-center justify-center h-[153px] cursor-pointer"
                          style={{ background: '#FDD77D' }}
                          onClick={handleAddButtonMenu}
                        >
                          <span className="text-[#A93F3F] text-[40px] font-bold">+</span>
                        </div>
                        <AddMenuModal visible={isVisibleAddButtonMenu} menuName={categoryName} categoryId={selectMenuCategoryId} onClose={handleAddButtonMenuClose} />
                      </>
                    )}
                  </div>
                  <div className="flex justify-end mt-[16px]">
                    <Pagination current={searchResults.current_page} pageSize={searchResults.page_size} total={searchResults.total} onChange={onPageChange} style={{ textAlign: 'center', color: 'red', borderColor: 'red' }} className="custom-pagination" />
                  </div>

                  {/* Map through searchResults.products and render MenuDiscriptionModel */}
                  {searchResults.products?.map((menuItem: { imageUrl: string; productName: string; price: number }, index: number) => (
                    <>
                      <Modal
                        key={index}
                        closeIcon={false}
                        visible={isModalVisibleTableMenuList && selectListMenu === menuItem.productName}
                        onCancel={handleCloseModalMenuList}
                        footer={null}
                        centered
                        width={500}
                        style={{ padding: 0 }}
                        // style={{ padding: 0 }}
                        className="no-border-radius-modal"
                      >
                        <div className='text-center'>
                          <div className="flex justify-center items-center">
                            <img src={`${BASE_URL_API}${menuItem.imageUrl}`} alt="" width={440} height={165.3} className='max-w-[400px] max-h-[400px]' />
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
                          <div className="flex justify-center">
                            <Button
                              key="confirm"
                              onClick={() => handlerMenuMenuDiscriptionModal()}
                              style={{
                                height: '42px',
                                padding: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #00BE2A',
                                borderRadius: '0',
                                transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                            >
                              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>เพิ่มลงตะกร้า</span>
                            </Button>
                          </div>
                        </div>
                      </Modal>
                      {isModalVisible === true && <OrderMenuModal visible={isModalVisible} menuName='ข้าวมันไก่ต้มธรรมดา' quatity={4} onClose={() => handleCloseModal()} />}
                    </>
                  ))}
                  {/* </>
                  } */}
                </div>
              </div>
            </div>
          </div>
        </>
      }









      {selectMenu === "ซื้อกลับบ้าน" &&
        <>
          <div className="flex flex-col">
            <div className="flex justify-between items-center py-[16px]">
              {/* <span className="text-[40px] font-bold text-[#00BE2A]">{tableNameModal}</span> */}
              <span className="text-[40px] font-bold text-[#00BE2A]">สั่งกลับบ้าน</span>
              {/* <span className="text-[32px] font-bold text-[#1B00BE] cursor-pointer" onClick={handleBack}>ย้อนกลับ</span> */}
            </div>
            {/* Body */}
            <div className="grid grid-cols-3">
              <div className="w-full pr-[30px]">
                <div className="flex justify-center items-center w-full h-[44px] bg-[#D9D9D9] cursor-pointer" onClick={handleClickQrCode}>
                  <Image src="mdi_qrcode-scan.svg" alt="" width="24" height="24" />
                  <span className='text-[18px] ml-4'>พิมพ์ QR CODE</span>
                </div>

                {/* Modal QrCode */}
                {/* <QrCodeModal menuName='QrCode' visible={isActiveQR} onClose={handleClickQrCodeClose} /> */}
                <Modal
                  closeIcon={false}
                  visible={isActiveQR}
                  onCancel={handleClickQrCodeClose}
                  footer={null}
                  centered
                  width={728}
                  style={{ height: '451px', padding: 0 }}
                  className="no-border-radius-modal"
                >
                  <div className='text-center p-[30px] flex flex-col justify-center items-center'>
                    <div className="flex justify-center items-center text-[#000] text-[40px] text-bold">
                      <span>คิวอาร์โค้ดสำหรับสั่งอาหาร</span>
                    </div>
                    {/* Order List */}
                    <div className="flex justify-center items-center my-[40px]">
                      <Space direction="vertical" align="center">
                        <QRCode value={text || '-'} size={300} bordered={false} />
                      </Space>
                    </div>
                    <div className="flex justify-center items-center w-[400px] h-[44px] bg-[#D9D9D9] cursor-pointer" onClick={handleClickQrCodeClose}>
                      <Image src="mdi_qrcode-scan.svg" alt="" width="24" height="24" />
                      <span className='text-[18px] ml-4'>พิมพ์ QR CODE</span>
                    </div>
                  </div>
                </Modal>


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

              {/* Table Menu&Category */}
              <div className="flex col-span-2">
                {/* Category List */}
                <div className=" mr-[16px]">
                  {renderCategoryButtons()}
                  {/* <div
                    className="text-[18px] flex items-center justify-center h-[42px] cursor-pointer"
                    style={{ background: '#FDD77D' }}
                    onClick={handleAddButtonCategory}
                  >
                    <span className="text-[#A93F3F] text-[18px] font-bold">+</span>
                  </div> */}

                  {/* Add Category */}
                  {/* <AddCategoryModal visible={IsVisibleAddButtonCategory} onClose={handleAddButtonCategoryClose} /> */}
                  <>
                    {/* <Modal
                      closeIcon={false}
                      visible={IsVisibleAddButtonCategory}
                      onCancel={handleAddButtonCategoryClose}
                      footer={null}
                      centered
                      width={728}
                      style={{ height: '451px', padding: 0 }}
                      className="no-border-radius-modal"
                    >
                      <div className='text-center p-[30px] flex flex-col justify-center items-center'>
                        <Form form={form} onFinish={onFinish}>
                          <div className="flex justify-center items-center text-[#FDD77D] text-[40px] font-bold">
                            <span>เพิ่มหมวดหมู่</span>
                          </div>
                          <div className="flex my-[16px] items-center">
                            <Form.Item className='p-0 m-0'>
                              <div className="flex gap-[30px] justify-between items-center">
                                <span className='w-fit text-[18px] text-[#A93F3F] font-bold'>ชื่อหมวดหมู่สินค้า</span>
                                <Input style={{ width: '363px', height: '44px' }} className='border-2 border-[#A93F3F] rounded-none' onChange={(e) => setCategoryName(e.target.value)} />
                              </div>
                            </Form.Item>
                          </div>
                          <ButtonConfirm buttonType="submit" textButton="เพิ่มเมนู" onClick={() => setIsModalVisible(true)} />
                        </Form>
                      </div>
                    </Modal> */}
                    {/* Modal for the selected table name */}
                    {/* <Modal
                      closeIcon={false}
                      visible={isModalVisible}
                      onCancel={handleCancel}
                      centered
                      footer={null}
                      width={440}
                      style={{ height: '180px' }}
                    >
                    
                      <div style={{ textAlign: 'center', padding: '30px' }}>
                        <p className='text-[40px] font-bold text-[#FDD77D]'>ยืนยันการเพิ่ม</p>
                        <div style={{ height: '30px' }}></div>
                        <div className='flex justify-center'>
                          <Button
                            key="close"
                            onClick={handleCancel}
                            style={{
                              width: '66px',
                              height: '42px',
                              padding: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '1px solid #C60000',
                              transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(254 226 226)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                          >
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#C60000' }}>ยกเลิก</span>
                          </Button>
                          <div style={{ width: '30px' }}></div>
                          <Button
                            key="confirm"
                            onClick={() => handleSubmitMenu(categoryName)}
                            style={{
                              width: '66px',
                              height: '42px',
                              padding: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '1px solid #00BE2A',
                              transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                          >
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>ยืนยัน</span>
                          </Button>
                        </div>
                      </div>
                    </Modal> */}
                  </>
                </div>

                {/* Menu&TableListMenu */}
                <div className="flex flex-col w-full" >
                  {/* Search ListMenu */}
                  <div className="flex items-start bg-red-300 h-fit">
                    <Input
                      placeholder="ค้นหาออร์เดอร์"
                      prefix={<Image src="/search.png" alt="search" width={16} height={16} className='ml-[6px]' />}
                      className="flex-1 h-[30px] pr-[16px] border-2 border-[#A93F3F] rounded-none"
                      onChange={handleChangeSearchMenuBar} // Add onChange event handler
                    />
                  </div>
                  {/* TableListMenu */}
                  {/* {selectMenuCategory === "เมนูทั้งหมด" &&
                <> */}
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {searchResults.products?.filter((menuItem: { category: { name: string } }) => {
                      if (selectMenuCategory === "เมนูทั้งหมด" || !menuItem.category.name) {
                        return true; // Show all menu items if selectMenuCategory is "เมนูทั้งหมด" or if the menuItem has no category
                      } else {
                        return menuItem.category.name === selectMenuCategory; // Show menu items of the selected category
                      }
                    }).map((menuItem: { imageUrl: string; productName: string }, index: number) => (
                      <div key={index} className="border border-[#A93F3F] w-full h-[153px] justify-center cursor-pointer p-2" onClick={() => handlerMenuList(menuItem.productName)}>
                        <div className="h-[99px] bg-[#D9D9D9] flex justify-center">
                          <img src={`${BASE_URL_API}${menuItem.imageUrl}`} alt="" className="object-contain max-w-full max-h-full" />
                        </div>
                        <div className="flex items-center justify-start mt-4 text-[#A93F3F] text-[18px] font-bold">
                          {menuItem.productName}
                        </div>
                      </div>
                    ))}
                    {/* {selectMenuCategory !== "เมนูทั้งหมด" && !searchResults.products?.some((menuItem: { category: { name: string } }) => !menuItem.category.name) && (
                      <>
                        <div
                          className="text-[40px] flex items-center justify-center h-[153px] cursor-pointer"
                          style={{ background: '#FDD77D' }}
                          onClick={handleAddButtonMenu}
                        >
                          <span className="text-[#A93F3F] text-[40px] font-bold">+</span>
                        </div>
                        <AddMenuModal visible={isVisibleAddButtonMenu} menuName={categoryName} categoryId={selectMenuCategoryId} onClose={handleAddButtonMenuClose} />
                      </>
                    )} */}
                  </div>
                  <div className="flex justify-end mt-[16px]">
                    <Pagination current={searchResults.current_page} pageSize={searchResults.page_size} total={searchResults.total} onChange={onPageChange} style={{ textAlign: 'center', color: 'red', borderColor: 'red' }} className="custom-pagination" />
                  </div>

                  {/* Map through searchResults.products and render MenuDiscriptionModel */}
                  {searchResults.products?.map((menuItem: { imageUrl: string; productName: string; price: number }, index: number) => (
                    <>
                      <Modal
                        key={index}
                        closeIcon={false}
                        visible={isModalVisibleTableMenuList && selectListMenu === menuItem.productName}
                        onCancel={handleCloseModalMenuList}
                        footer={null}
                        centered
                        width={500}
                        style={{ padding: 0 }}
                        // style={{ padding: 0 }}
                        className="no-border-radius-modal"
                      >
                        <div className='text-center'>
                          <div className="flex justify-center items-center">
                            <img src={`${BASE_URL_API}${menuItem.imageUrl}`} alt="" width={440} height={165.3} className='max-w-[400px] max-h-[400px]' />
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
                          <div className="flex justify-center">
                            <Button
                              key="confirm"
                              onClick={() => handlerMenuMenuDiscriptionModal()}
                              style={{
                                height: '42px',
                                padding: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #00BE2A',
                                borderRadius: '0',
                                transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                            >
                              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>เพิ่มลงตะกร้า</span>
                            </Button>
                          </div>
                        </div>
                      </Modal>
                      {isModalVisible === true && <OrderMenuModal visible={isModalVisible} menuName='ข้าวมันไก่ต้มธรรมดา' quatity={4} onClose={() => handleCloseModal()} />}
                    </>
                  ))}
                  {/* </>
              } */}
                </div>
              </div>
            </div>
          </div>
        </>
      }
      {selectMenu === "ออร์เดอร์วันนี้" && <CurrentOrder />}

      {/* InStoreList */}
      {/* {isModalVisible === true && <InStoreList />} */}


    </main>
  );
};
export default Header;
