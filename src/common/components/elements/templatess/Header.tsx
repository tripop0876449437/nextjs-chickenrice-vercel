"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import OrderAddressButton from "../buttons/orderAddressButton";
import { logout } from '@/business/service/auth.service';
import jwt from 'jsonwebtoken';
import TableButton from "../buttons/tableButton";
import axios from "axios";
import { Button, Form, Input, Menu, Modal, Pagination, QRCode, Space, message } from "antd";
import StatusTableNameModel from "../buttons/statusTableButton";
import MenuselectbuttonProp from "../buttons/Menubutton";
import ButtonConfirm from "../buttons/buttonConfirm";
import OrderMenuModal from "../modals/orderMenu";
import SubMenu from "antd/es/menu/SubMenu";

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

const getBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Function to handle token refresh
async function refreshTokenApi(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(`${BASE_URL_API}/api/refreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.accessToken;
    } else {
      console.error('Failed to refresh token:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

// Function to schedule token refresh
function scheduleTokenRefresh(refreshToken: string) {
  const refreshInterval = 60 * 60 * 1000; // Refresh every hour (in milliseconds)

  const refresh = async () => {
    try {
      const accessToken = await refreshTokenApi(refreshToken);
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        console.log('Access token refreshed:', accessToken);
      } else {
        console.error('Failed to refresh access token');
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    } finally {
      // Schedule next refresh
      setTimeout(refresh, refreshInterval);
    }
  };

  // Initial call to start the refresh cycle
  refresh();
}

export const Header = () => {
  const [selectMenu, setSelectMenu] = useState<string>("หน้าร้าน")
  const [instoreOneTwo, setInstoreOneTwo] = useState<string>('one')
  const [outstoreOneTwo, setOutstoreOneTwo] = useState<string>('one')
  const [decodedToken, setDecodedToken] = useState<{ username: string } | null>(null);

  // InStoreTableList
  const [currentPage, setCurrentPage] = useState<number>(1);
  // OutStoreTableList
  const [currentPageOutStore, setCurrentPageOutStore] = useState<number>(1);


  // TableMenuList
  const [tableNameModal, setTableNameModal] = useState<string>('');
  const [tableNameModalOutStore, setTableNameModalOutStore] = useState<string>('');

  // Category
  const [categoriesData, setCategoriesData] = useState<any>({});

  // Search Menu
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>({});


  const [currentPageMenuList, setCurrentPageMenuList] = useState<number>(1);

  const [selectMenuCategory, setSelectMenuCategory] = useState<string>("เมนูทั้งหมด");
  const [selectMenuCategoryId, setSelectMenuCategoryId] = useState<number>(0);

  const [orderProductAndTotalData, setOrderProductAndTotalData] = useState<any>({});
  const [searchValueCurrentOrder, setSearchValueCurrentOrder] = useState<string>('');

  const [worningOrderProductAndTotal, setWorningOrderProductAndTotal] = useState<boolean>(true)
  const [worningOrderProductAndTotalConfirmShow, setWorningOrderProductAndTotalConfirmShow] = useState<boolean>(false)
  const [worningOrderProductAndTotalData, setWorningOrderProductAndTotalData] = useState<any>({});

  const [isModalVisibleMenuDiscriptionModal, setIsModalVisibleMenuDiscriptionModal] = useState<boolean>(false);
  const [orderProductData, setOrderProductData] = useState<any>({});
  const [orderQuantityTotal, setOrderQuantityTotal] = useState<number>(0)
  const [orderPriceTotal, setOrderPriceTotal] = useState<number>(0)

  const ActivateButton = 'กำลังใช้งาน';
  const InactivateButton = 'ว่าง';
  const DeleteButton = 'ลบโต๊ะ';

  // useEffect to monitor changes in order status and open modal accordingly
  useEffect(() => {
    if (worningOrderProductAndTotalData?.orderTotals) {
      const pendingOrder = worningOrderProductAndTotalData.orderTotals.find((order: any) => order.orderProductStatus === 'pending');
      if (pendingOrder) {
        setWorningOrderProductAndTotal(true);
      }
    }
  }, [worningOrderProductAndTotalData]);

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
    const aswi = localStorage.getItem('outstoreOneTwo');
    if (!aswi) {
      // If outstoreOneTwo is not found in localStorage, use the current state value
      localStorage.setItem('outstoreOneTwo', outstoreOneTwo);
    } else {
      // If outstoreOneTwo is found in localStorage, update the state with its value
      setOutstoreOneTwo(aswi);
    }
    const tableNM = localStorage.getItem('tableNameModal');
    if (!tableNM) {
      // If instoreOneTwo is not found in localStorage, use the current state value
      localStorage.setItem('tableNameModal', tableNameModal);
    } else {
      // If instoreOneTwo is found in localStorage, update the state with its value
      setTableNameModal(tableNM);
    }
    const tableNMOutStore = localStorage.getItem('tableNameModalOutStore');
    if (!tableNMOutStore) {
      // If instoreOneTwo is not found in localStorage, use the current state value
      localStorage.setItem('tableNameModalOutStore', tableNameModalOutStore);
    } else {
      // If instoreOneTwo is found in localStorage, update the state with its value
      setTableNameModalOutStore(tableNMOutStore);
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
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: currentPage,
          }),
        };

        // setLoading(true);
        const response = await fetch(`${BASE_URL_API}/api/customer`, config);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTableData(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching table data:', error);
        // setLoading(false);
      }
    };

    // OutStoreTableList Data
    const fetchDataOutStore = async () => {
      try {
        const authToken = localStorage.getItem('accessToken');

        if (!authToken) {
          console.error('Bearer token not found in localStorage');
          return;
        }

        const config = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: currentPage,
          }),
        };

        // setLoading(true);
        const response = await fetch(`${BASE_URL_API}/api/customer-outstore`, config);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTableData(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching table data:', error);
        // setLoading(false);
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

        const response = await fetch(`${BASE_URL_API}/api/category`, {
          method: 'POST',
          headers: {
            ...config.headers,
          },
          body: JSON.stringify({}), // Make sure to stringify the body if necessary
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategoriesData(data);
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

        if (selectMenuCategory === 'เมนูทั้งหมด') {
          const response = await axios.post(`${BASE_URL_API}/api/product/search?page=${currentPageMenuList}&searchTerm=${searchQuery}&categoryName=`, {
          }, config);

          setSearchResults(response.data);
        } else {
          const response = await axios.post(`${BASE_URL_API}/api/product/search?page=${currentPageMenuList}&searchTerm=${searchQuery}&categoryName=${selectMenuCategory}`, {
          }, config);

          setSearchResults(response.data);
        }

      } catch (error) {
        console.error('Error searching:', error);
      }
    };

    const fetchOrderProductAndTotal = async () => {
      try {

        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            search: searchValueCurrentOrder
          }),
        };

        const response = await fetch(`${BASE_URL_API}/api/order-total-paginate`, config);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrderProductAndTotalData(data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    const worningOrderProductAndTotal = async () => {
      try {
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            search: ''
          }),
        };

        const response = await fetch(`${BASE_URL_API}/api/order-total-paginate`, config);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWorningOrderProductAndTotalData(data);
        setWorningOrderProductAndTotal(true);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    const fetchOrderProduct = async () => {
      const tableNameModalOS = localStorage.getItem('tableNameModalOutStore');
      if (!tableNameModalOS) {
        console.error('Bearer token not found in localStorage');
        return;
      }
      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL_API}/api/order-product/${tableNameModalOS}`);
        setOrderProductData(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (selectMenu == "หน้าร้าน" && instoreOneTwo == "one") {
      fetchData();
    }
    if (selectMenu == "ซื้อกลับบ้าน" && outstoreOneTwo == "one") {
      fetchDataOutStore();
    }
    if (selectMenu == "หน้าร้าน" && instoreOneTwo == "two" || selectMenu == "ซื้อกลับบ้าน") {
      fetchCategories();
      fetchSearchMenu();
      if (searchQuery.trim() !== '') {
        fetchSearchMenu();
      }
    }
    if (isModalVisibleMenuDiscriptionModal == true) {
      fetchOrderProduct();
    }
    if (selectMenu == "ออร์เดอร์วันนี้") {
      fetchOrderProductAndTotal();
    }

    worningOrderProductAndTotal();

  }, [instoreOneTwo, currentPage, tableNameModal, searchQuery, currentPageMenuList, selectMenuCategory, searchResults, orderProductAndTotalData, searchValueCurrentOrder, selectMenu, outstoreOneTwo, isModalVisibleMenuDiscriptionModal, tableNameModalOutStore, orderProductData]); // Empty dependency array to run the effect only once on mount

  const handlerMenu = (menuText: string) => {
    setSelectMenu(menuText)
  }

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (refreshTokenValue) {
      scheduleTokenRefresh(refreshTokenValue);
    } else {
      console.error('Refresh token not found');
      return;
    }
  }, []); // Empty dependency array to run the effect only once on mount



  // InStoreTableList
  const [numButtons, setNumButtons] = useState<number>(0);
  const [numButtonsOutStore, setNumButtonsOutStore] = useState<number>(0);
  const [selectedTableName, setSelectedTableName] = useState<string>('');
  const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisibleConfirm, setIsModalVisibleConfirm] = useState<boolean>(false);
  const [isModalVisibleConfirmSuccess, setIsModalVisibleConfirmSuccess] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);


  const handleOpenModal = (tableId: number, tableName: string) => {
    setSelectedTableName(tableName);
    setSelectedTableId(tableId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseModalConfirmOrder = () => {
    setIsModalVisibleConfirm(false);
    setIsModalVisibleMenuDiscriptionModal(false);
  };

  const handleCloseModalConfirmOrderSuccess = () => {
    setIsModalVisibleConfirmSuccess(false);
  };

  const calculateTotals = (data: any) => {
    let totalQuantity = 0;
    let totalPrice = 0;
    if (data && data.orderProduct) {
      data.orderProduct.forEach((orderProductItem: any) => {
        totalQuantity += orderProductItem.orderProductQuantity;
        totalPrice += orderProductItem.orderProductPrice;
      });
    }
    setOrderQuantityTotal(totalQuantity);
    setOrderPriceTotal(totalPrice);
  };

  const handleSubmitModalConfirmOrder = async () => {
    try {
      setIsModalVisibleConfirm(false);
      setIsModalVisibleMenuDiscriptionModal(false);
      const tableNameModalOS = localStorage.getItem('tableNameModalOutStore');
      if (!tableNameModalOS) {
        console.error('Bearer token not found in localStorage');
        return;
      }
      console.log(count, total);
      console.log(orderQuantityTotal, orderPriceTotal);

      const orderTotalPayload = {
        orderTotalQuantity: orderQuantityTotal,
        orderTotalPrice: orderPriceTotal,
        tablename: tableNameModalOS
      }
      await axios.post(`${BASE_URL_API}/api/order-total/add`, orderTotalPayload)
      setIsModalVisibleConfirmSuccess(true);
    } catch (error) {
      console.error('Error Submit Api Post OrderProduct.', error)
    }
  }

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

  const handleAddButtonOutStore = async () => {
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

      await axios.post(`${BASE_URL_API}/api/customer-outstore/add`, tablePayload, config);

      window.location.reload()
      setNumButtonsOutStore(numButtonsOutStore + 1);
      const totalPages: number = Math.ceil((numButtonsOutStore + 1) / 7);

      if (currentPage < totalPages) {
        setCurrentPageOutStore(currentPageOutStore + 1);
      } else {
        setCurrentPageOutStore(currentPageOutStore);
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
  const [selectedActive, setSelectedActive] = useState<boolean>(false);
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // const [selectedTableName, setSelectedTableName] = useState<string>('');
  // const [selectedTableId, setSelectedTableId] = useState<number>(0);
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

  const handleSubmitToNewPage = (tableName: string, selectedTableId: number) => {
    handleCloseModal();
    setTableNameModal(tableName);
    localStorage.setItem('instoreOneTwo', 'two');
    localStorage.setItem('tableNameModal', tableName);
    localStorage.setItem('selectedTableIdInStore', String(selectedTableId));
    window.location.reload()
  };

  const handleSubmitToNewPageOutStore = (tableName: string, selectedTableId: number) => {
    handleCloseModal();
    setTableNameModalOutStore(tableName);
    localStorage.setItem('outstoreOneTwo', 'two');
    localStorage.setItem('tableNameModalOutStore', tableName);
    localStorage.setItem('selectedTableIdOutStore', String(selectedTableId));
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
    setSelectMenuCategory(menuText)
    setSelectMenuCategoryId(id)
  }

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

  const handleBackOutStore = () => {
    localStorage.setItem('outstoreOneTwo', 'one');
    window.location.reload()
  }




  // QrCode Modal
  const tbnGet = typeof localStorage !== 'undefined' ? localStorage.getItem('tableNameModal') : null;
  const tbnGetOutStore = typeof localStorage !== 'undefined' ? localStorage.getItem('tableNameModalOutStore') : null;
  const [text, setText] = React.useState<string>(`${CLIENT_URL}/${tbnGet}`);
  const [textOutStore, setTextOutStore] = React.useState<string>(`${CLIENT_URL}/${tbnGetOutStore}`);





  // TableMenuList
  const [selectListMenu, setSelectListMenu] = useState<string>("");
  const [isModalVisibleTableMenuList, setIsModalVisibleTableMenuList] = useState(false);

  const handlerMenuList = (menuText: string) => {
    setSelectListMenu(menuText);
    setIsModalVisibleTableMenuList(true)
  };
  const handlerMenuListAddCart = (menuText: string) => {
    setSelectListMenu(menuText);
    setIsModalVisibleTableMenuList(true)
  };
  const handleCloseModalMenuList = () => {
    setIsModalVisibleTableMenuList(false);
    setCount(0);
    setTotal(0);
  }
  const handleCloseModalMenuListNextToListCart = () => {
    setIsModalVisibleTableMenuList(false);
  }
  const handleCloseModalMenuListAddCart = () => {
    setIsModalVisibleMenuDiscriptionModal(false);
  }

  // Pagination
  const onPageChange = (page: number) => {
    setCurrentPageMenuList(page);
  };

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
    handleAddButtonCategoryClose();
  };

  const [isModalVisibleMenu, setIsModalVisibleMenu] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  const handleSubmitMenu = async (cateName: string) => {
    setIsModalVisibleMenu(false);
    try {
      const authToken = localStorage.getItem('accessToken');

      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      const decodedToken = jwt.decode(authToken) as { username: string } | null;

      if (!decodedToken) {
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
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          ...config.headers
        },
        body: JSON.stringify(categoryPayload)
      };

      await fetch(`${BASE_URL_API}/api/category/add`, requestOptions);

      window.location.reload();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error; // Propagate the error for handling in the UI
    }
  };




  // MenuDiscriptionModal
  const handleCloseModalMenuDiscriptionModal = () => {
    setIsModalVisibleMenuDiscriptionModal(false);
  };

  const handlerMenuMenuDiscriptionModal = async (productId: number) => {
    const tableNameModalOS = localStorage.getItem('tableNameModalOutStore');
    if (!tableNameModalOS) {
      console.error('Bearer token not found in localStorage');
      return;
    }

    const orderResponse = {
      customerName: tableNameModalOS,
      orderProductQuantity: count,
      orderProductPrice: total
    }

    // api post order
    await axios.post(`${BASE_URL_API}/api/order/add/${productId}`, orderResponse)
    handleCloseModalMenuListNextToListCart();
    setIsModalVisibleMenuDiscriptionModal(true);
    setCount(0);
    setTotal(0);
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


  const deleteOrderProduct = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL_API}/api/order-product/delete/${id}`)
      // window.location.reload();

    } catch (error) {
      console.error(' Error deleting OrderProduct:', error);
    }
  }






  const renderCategoryButtons = () => {
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



  const [formProduct] = Form.useForm();
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [imageUploaded, setImageUploaded] = useState(false); // State to track whether an image has been uploaded
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category_id: selectMenuCategoryId,
    image: null as File | null,
    description: 'description',
  });

  const onFinishProduct = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      const formDataObj = new FormData();

      formDataObj.append('productName', formData.productName);
      formDataObj.append('price', formData.price);
      formDataObj.append('category_id', String(selectMenuCategoryId));
      formDataObj.append('image', formData.image || ''); // You might need to adjust this based on how you handle file uploads

      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          // 'Content-Type': 'application/json',
        },
      };

      await axios.post(`${BASE_URL_API}/api/product/add`, formDataObj, config);
      message.success('Menu added successfully');
      handleAddButtonMenuClose();
      setLoadingProduct(true);
    } catch (error) {
      console.error('Error adding menu:', error);
      message.error('Failed to add menu');
    } finally {
      setLoadingProduct(false);
    }
  };


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const file = e.target.files?.[0];
    if (file) {
      setLoadingProduct(true);
      try {
        const base64String = await getBase64(file);
        setImageUrl(base64String);
        setImageUploaded(true);
        setFormData(prev => ({ ...prev, image: file }));
      } catch (error) {
        console.error('Error converting file to base64:', error);
      } finally {
        setLoadingProduct(false);
      }
    }
  };



  const uploadButton = (
    <label
      htmlFor="upload-input"
      style={{
        border: '2px solid #A93F3F',
        background: imageUploaded ? 'none' : '#D9D9D9', // Set the background color to red
        cursor: 'pointer',
        height: '201px',
        width: '201px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {!imageUploaded ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div style={{ marginTop: 8, color: '#A93F3F' }} className='text-[40px] font-bold'>เพิ่มรูป</div>
        </div>
      ) : (
        <img src={imageUrl || undefined} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
      <input
        type="file"
        id="upload-input"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </label>
  );

  const [isModalVisibleProduct, setIsModalVisibleProduct] = useState<boolean>(false);

  const handleCancelProduct = () => {
    setIsModalVisibleProduct(false);
  };

  const handleSubmitProduct = async () => {
    setIsModalVisibleProduct(false);
    try {
      // Submit the form data
      await formProduct.submit();

      // Wait for 3 seconds before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 5000); // 3000 milliseconds = 3 seconds

    } catch (error) {
      // Handle any errors that occur during form submission or API request
      console.error('Error occurred:', error);

    }
  };




  // Current
  const [currentPageOrder, setCurrentPageOrder] = useState<number>(1);
  const pageSizeCurrentOrder = 4; // Number of items per page
  // Calculate the start and end index of items for the current page
  const startIndex = (currentPageOrder - 1) * pageSizeCurrentOrder;
  const endIndex = Math.min(startIndex + pageSizeCurrentOrder, orderProductAndTotalData.orderTotals?.length);
  const visibleMenuItems = orderProductAndTotalData.orderTotals?.slice(startIndex, endIndex);

  const handleChangeCurrentOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValueCurrentOrder(value);
  };

  // Use the searchValueCurrentOrder state to filter the visibleMenuItems
  const filteredMenuItems = useMemo(() => {
    if (!searchValueCurrentOrder) {
      return visibleMenuItems;
    }

    // Perform case-insensitive search on the tableName field
    return visibleMenuItems.filter((menuItem: any) =>
      menuItem.tableName.toLowerCase().includes(searchValueCurrentOrder.toLowerCase())
    );
  }, [visibleMenuItems, searchValueCurrentOrder]);

  // Calculate the total order price
  const totalOrderPrice = (filteredMenuItems || []).reduce((total: number, menuItem: any) => {
    return total + menuItem.orderTotalPrice;
  }, 0);

  const onClick = (e: any) => {
    // console.log('click ', e);
  };

  const onOpenChange = (openKeys: React.Key[]) => {
    // console.log('openKeys: ', openKeys);
  };

  // Pagination
  const onPageChangeCurrentOrder = (page: number) => {
    setCurrentPageOrder(page);
  };

  // Worning OrderProductAndTotal
  const handleWorningOrderProductAndTotalSubmit = async (status: string, tablename: string) => {
    if (status == 'pending') {
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "doing"
        })
      };

      const response = await fetch(`${BASE_URL_API}/api/order-total/update/${tablename}`, config)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      message.success('Order Received');
      setWorningOrderProductAndTotal(false)
      setWorningOrderProductAndTotalConfirmShow(true)
    };

  };

  const handleWorningOrderProductAndTotalClose = async (status: string, tablename: string) => {
    if (status == 'pending') {
      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      };
      const response = await fetch(`${BASE_URL_API}/api/order-total/delete/${tablename}`, config)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      message.success('Cancel Order');
      setWorningOrderProductAndTotal(false)
    }
  };

  const lastOrderId = worningOrderProductAndTotalData.orderTotals?.[worningOrderProductAndTotalData.orderTotals.length - 1]?.id;


  const handleCheckBillButtonInStore = () => {
    const selectedTableIdInStoreValiable = localStorage.getItem('selectedTableIdInStore');

    if (!selectedTableIdInStoreValiable) {
      console.error('Bearer token not found in localStorage');
      return;
    }
    setInstoreOneTwo('one');
    localStorage.setItem('instoreOneTwo', 'one');
    showModalInActive(selectedTableName, Number(selectedTableIdInStoreValiable));
  }

  const handleCheckBillButtonOutStore = () => {
    const selectedTableIdOutStoreValiable = localStorage.getItem('selectedTableIdOutStore');

    if (!selectedTableIdOutStoreValiable) {
      console.error('Bearer token not found in localStorage');
      return;
    }
    setOutstoreOneTwo('one');
    localStorage.setItem('outstoreOneTwo', 'one');
    showModalInActive(selectedTableName, Number(selectedTableIdOutStoreValiable));
  }



  return (
    <main className="h-screen" style={{ padding: '80px' }}>
      <>
        {/* Header */}
        <div>
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
                    open={isModalVisible}
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
                      <StatusTableNameModel statusTableName={ActivateButton} onClick={() => showModalActive(selectedTableName, selectedTableId)} colorBg='#00BE2A' colorText='#FFF' />
                      <div style={{ height: '30px' }}></div>
                      <StatusTableNameModel statusTableName={InactivateButton} onClick={() => showModalInActive(selectedTableName, selectedTableId)} colorBg='#D9D9D9' colorText='#FFF' />
                      <div style={{ height: '30px' }}></div>
                      <StatusTableNameModel statusTableName={DeleteButton} onClick={() => showModalDelete(selectedTableName, selectedTableId)} colorBg='#C60000' colorText='#FFF' />
                      <div style={{ height: '30px' }}></div>

                      {/* Confirm Next to InStoreList */}
                      <Button
                        key="confirm" onClick={() => handleSubmitToNewPage(selectedTableName, selectedTableId)}
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
                        open={selectedActive}
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
            </>
          }


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
                      open={isActiveQR}
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
                    <div className="mt-4 w-full h-[42px] bg-[#419453] justify-center items-center flex cursor-pointer" onClick={handleCheckBillButtonInStore}>
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
                          open={IsVisibleAddButtonCategory}
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
                          open={isModalVisible}
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
                              <img src={`${menuItem.imageUrl}`} alt="" className="object-contain max-w-full max-h-full" />
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
                            {/* <AddMenuModal visible={isVisibleAddButtonMenu} menuName={categoryName} categoryId={selectMenuCategoryId} onClose={handleAddButtonMenuClose} /> */}
                            <Modal
                              closeIcon={false}
                              open={isVisibleAddButtonMenu}
                              onCancel={handleAddButtonMenuClose}
                              footer={null}
                              centered
                              width={728}
                              style={{ height: '451px', padding: 0 }}
                              className="no-border-radius-modal"
                            >
                              <div className='text-center p-[30px] flex flex-col justify-center items-center'>
                                <Form form={formProduct} onFinish={onFinishProduct}>
                                  <div className="flex justify-center items-center text-[#FDD77D] text-[40px] font-bold">
                                    <span>เพิ่มเมนู</span>
                                  </div>
                                  <div className="flex my-[40px] gap-[30px] items-center">
                                    <Form.Item className='p-0 m-0' name="image">
                                      {uploadButton}
                                    </Form.Item>
                                    <div className="flex flex-col justify-between items-between gap-[16px]">
                                      <Form.Item className='p-0 m-0' name="productName">
                                        <div className="flex gap-[50px] justify-between items-center">
                                          <span className='w-fit text-[18px] text-[#A93F3F] font-bold'>ชื่อสินค้า</span>
                                          <Input style={{ width: '124px', height: '44px' }} className='border-2 border-[#A93F3F] rounded-none' name="productName" value={formData.productName} onChange={handleChange} />
                                        </div>
                                      </Form.Item>
                                      <Form.Item className='p-0 m-0' name="price">
                                        <div className="flex gap-[50px] justify-between items-center">
                                          <span className='w-fit text-[18px] text-[#A93F3F] font-bold'>ราคาขาย</span>
                                          <Input style={{ width: '124px', height: '44px' }} className='border-2 border-[#A93F3F] rounded-none' name="price" value={formData.price} onChange={handleChange} />
                                        </div>
                                      </Form.Item>
                                    </div>
                                  </div>
                                  {/* <ButtonConfirm buttonType="submit" textButton="เพิ่มเมนู" onClick={() => setIsModalVisible(true)} /> */}
                                  <Form.Item>
                                    <Button
                                      // htmlType='submit'
                                      onClick={() => setIsModalVisibleProduct(true)}
                                      className="rounded-none justify-center items-center"
                                      style={{
                                        borderColor: '#00BE2A',
                                        fontSize: '20px',
                                        padding: '0px 8px',
                                        height: '40px',
                                        width: '123px',
                                        borderRadius: '0px'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
                                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                      <p style={{ color: '#00BE2A', fontSize: '20px', }} className="font-['Tahoma'] ">เพิ่มเมนู</p>
                                    </Button>
                                  </Form.Item>
                                </Form>
                              </div>
                            </Modal>
                            {/* Modal for the selected table name */}
                            <Modal
                              closeIcon={false}
                              open={isModalVisibleProduct}
                              onCancel={handleCancelProduct}
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
                                    onClick={handleCancelProduct}
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
                                    onClick={handleSubmitProduct}
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
                        )}
                      </div>
                      <div className="flex justify-end mt-[16px]">
                        <Pagination current={searchResults.current_page} pageSize={searchResults.page_size} total={searchResults.total} onChange={onPageChange} style={{ textAlign: 'center', color: 'red', borderColor: 'red' }} className="custom-pagination" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }


          {/* InStoreTableList */}
          {selectMenu === "ซื้อกลับบ้าน" && outstoreOneTwo === "one" &&
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
                  onClick={() => { handleAddButtonOutStore() }}
                >
                  <span className="text-[#A93F3F] text-[40px] font-bold">+</span>
                </div>
              </div>

              {/* {isModalVisible && <TableNameModel visible={isModalVisible} tableName={selectedTableName} tableId={selectedTableId} onClose={handleCloseModal} />} */}
              {isModalVisible &&
                <>
                  <Modal
                    closeIcon={false}
                    open={isModalVisible}
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
                      <StatusTableNameModel statusTableName={ActivateButton} onClick={() => showModalActive(selectedTableName, selectedTableId)} colorBg='#00BE2A' colorText='#FFF' />
                      <div style={{ height: '30px' }}></div>
                      <StatusTableNameModel statusTableName={InactivateButton} onClick={() => showModalInActive(selectedTableName, selectedTableId)} colorBg='#D9D9D9' colorText='#FFF' />
                      <div style={{ height: '30px' }}></div>
                      <StatusTableNameModel statusTableName={DeleteButton} onClick={() => showModalDelete(selectedTableName, selectedTableId)} colorBg='#C60000' colorText='#FFF' />
                      <div style={{ height: '30px' }}></div>

                      {/* Confirm Next to InStoreList */}
                      {/* {if ()} */}
                      <Button
                        key="confirm" onClick={() => handleSubmitToNewPageOutStore(selectedTableName, selectedTableId)}
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
                        open={selectedActive}
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
            </>
          }


          {selectMenu === "ซื้อกลับบ้าน" && outstoreOneTwo === "two" &&
            <>
              <div className="flex flex-col">
                <div className="flex justify-between items-center py-[16px]">
                  {/* <span className="text-[40px] font-bold text-[#00BE2A]">{tableNameModal}</span> */}
                  <span className="text-[40px] font-bold text-[#000000]">{tableNameModalOutStore}</span>
                  <span className="text-[32px] font-bold text-[#1B00BE] cursor-pointer" onClick={handleBackOutStore}>ย้อนกลับ</span>
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
                      open={isActiveQR}
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
                            <QRCode value={textOutStore || '-'} size={300} bordered={false} />
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
                    <div className="mt-4 w-full h-[42px] bg-[#419453] justify-center items-center flex cursor-pointer" onClick={handleCheckBillButtonOutStore}>
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
                              <img src={`${menuItem.imageUrl}`} alt="" className="object-contain max-w-full max-h-full" />
                            </div>
                            <div className="flex items-center justify-start mt-4 text-[#A93F3F] text-[18px] font-bold">
                              {menuItem.productName}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end mt-[16px]">
                        <Pagination current={searchResults.current_page} pageSize={searchResults.page_size} total={searchResults.total} onChange={onPageChange} style={{ textAlign: 'center', color: 'red', borderColor: 'red' }} className="custom-pagination" />
                      </div>

                      {/* Map through searchResults.products and render MenuDiscriptionModel */}
                      {searchResults.products?.map((menuItem: { id: number; imageUrl: string; productName: string; price: number }, index: number) => (
                        <>
                          <Modal
                            key={index}
                            closeIcon={false}
                            open={isModalVisibleTableMenuList && selectListMenu === menuItem.productName}
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
                                <img src={`${menuItem.imageUrl}`} alt="" width={440} height={165.3} className='max-w-[400px] max-h-[400px]' />
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
                                  onClick={() => handlerMenuMenuDiscriptionModal(menuItem.id)}
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
                          {/* Confirm Order */}
                          <Modal
                            closeIcon={false}
                            open={isModalVisibleMenuDiscriptionModal}
                            onCancel={handleCloseModalMenuListAddCart}
                            footer={null}
                            centered
                            width={500}
                            style={{ padding: 0 }}
                            className="no-border-radius-modal"
                          >
                            <div className="text-center">
                              <h1 className="text-[32px] font-bold text-[#FF0000] text-center">ยืนยันการทำรายการ</h1>
                              <div className="border-[#000] border-y-2 px-[32px] pb-[16px] mt-[16px] max-h-[542px]">
                                {orderProductData.orderProduct?.map((orderProductItem: { id: number; productName: string; orderProductPrice: number; orderProductQuantity: number; }, index: number) => (
                                  <div className="flex justify-between pt-[16px]" key={index}>
                                    <div className="flex">
                                      <div className="max-w-[25px] w-[25px] text-start text-[16px]"><p>{orderProductItem.orderProductQuantity}</p></div>
                                      <div className="text-[16px]"><p>{orderProductItem.productName}</p></div>
                                    </div>
                                    <div className="cursor-pointer" onClick={() => deleteOrderProduct(orderProductItem.id)}><Image src='/x_red.png' alt='x_red' width={24} height={24} /></div>
                                  </div>
                                ))}
                              </div>
                              <div className="h-[20px]"></div>
                              {/* Button Footer */}
                              <div className='flex justify-center'>
                                <Button
                                  key="close"
                                  onClick={() => handleCloseModalConfirmOrder()}
                                  style={{
                                    width: '66px',
                                    height: '42px',
                                    padding: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #C60000',
                                    borderRadius: '0',
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
                                  onClick={() => handleSubmitModalConfirmOrder()}
                                  style={{
                                    width: '162px',
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
                                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>ยืนยันการสั่งอาหาร</span>
                                </Button>
                              </div>
                            </div>
                          </Modal>
                          <Modal
                            closeIcon={false}
                            open={isModalVisibleConfirmSuccess}
                            onCancel={handleCloseModalConfirmOrderSuccess}
                            footer={null}
                            centered
                            width={500}
                            style={{ padding: 0 }}
                            className="no-border-radius-modal"
                          >
                            <div className="text-center">
                              <h1 className="text-[32px] font-bold text-[#000000] text-center">ออร์เดอร์{tableNameModalOutStore}</h1>
                              <div className="border-[#000] border-y-2 px-[32px] pb-[16px] mt-[16px] max-h-[542px]">
                                {orderProductData.orderProduct?.map((orderProductItem: { id: number; productName: string; orderProductPrice: number; orderProductQuantity: number; }, index: number) => (
                                  <div className="flex justify-start pt-[16px]" key={index}>
                                    <div className="flex">
                                      <div className="max-w-[25px] w-[25px] text-start text-[16px]"><p>{orderProductItem.orderProductQuantity}</p></div>
                                      <div className="text-[16px]"><p>{orderProductItem.productName}</p></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Modal>
                          {isModalVisible === true && <OrderMenuModal visible={isModalVisible} menuName='ข้าวมันไก่ต้มธรรมดา' quatity={4} onClose={() => handleCloseModal()} />}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          }


          {/* Current Order */}
          {selectMenu === "ออร์เดอร์วันนี้" &&
            <>
              <div>
                {/* Search input */}
                <div className="flex justify-center items-center py-[16px]">
                  <div className="w-[200px] h-[30px] border-2 border-[#A93F3F] rounded-none flex justify-center items-center"><span>ออร์เดอร์ทั้งหมด</span></div>
                  <div className="w-[30px]"></div>
                  <div className="w-full">
                    <Input
                      value={orderProductAndTotalData.orderTotals ? orderProductAndTotalData.orderTotals.tableName : ''}
                      placeholder="ค้นหาออร์เดอร์"
                      prefix={<Image src="/search.png" alt="search" width={16} height={16} className='ml-[6px]' />}
                      className="h-[30px] pr-[16px] border-2 border-[#A93F3F] rounded-none"
                      onChange={handleChangeCurrentOrder} // Add onChange event handler
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between h-[434px]">
                  {/* Dropdown Menu */}
                  <div className="grid gap-[8px]">
                    {filteredMenuItems?.map((menuItem: any, index: any) => (
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
                              <div className="text-[18px] font-bold text-[#A93F3F] mr-[10px]"><span>{menuItem.tableName}</span></div>
                              <div className="text-[12px] text-[#A93F3F]"><span>เวลา <span>{new Date(menuItem.created_at).toLocaleTimeString('th-TH')}</span>น.</span></div>
                            </div>
                          }
                          style={{ background: '#FDD77D', padding: 0, margin: 0 }}
                          className="custom-submenu"
                        >
                          <div className="w-full min-h-[130px] bg-white border-[#A93F3F] border-t-[2px] pt-[16px] pb-[16px] px-[16px] grid grid-cols-1 gap-4">
                            {menuItem.orderProducts.map((subMenuItem: any, subIndex: any) => (
                              <div key={subIndex} className="w-full grid grid-cols-7 mt-[10px]">
                                <div className='flex justify-start items-center text-[18px] text-[#A93F3F] col-start-1 col-span-3'><p>{subMenuItem.productName}</p></div>
                                <div className='flex justify-center items-center text-[18px] text-[#A93F3F] col-span-1'><p>{subMenuItem.orderProductQuantity}</p></div>
                                <div className='flex justify-end items-center text-[18px] text-[#A93F3F] col-span-3'><p>{subMenuItem.orderProductPrice}</p></div>
                              </div>
                            ))}
                            <div className="w-full grid grid-cols-7 mt-[10px] mb-[10px]">
                              <div className='flex justify-center items-center text-[18px] text-[#A93F3F] col-start-1 col-span-3'><p>รวมทั้งสิ้น</p></div>
                              <div className='flex justify-center items-center text-[18px] text-[#A93F3F] col-span-1'><p>{menuItem.orderTotalQuantity}</p></div>
                              <div className='flex justify-end items-center text-[18px] text-[#A93F3F] col-span-3'><p>{menuItem.orderTotalPrice}</p></div>
                            </div>
                          </div>
                        </SubMenu>
                      </Menu>
                    ))}
                  </div>
                  {/* Total */}
                  <div className="h-[38px] bg-[#A93F3F] flex justify-between items-center p-2">
                    <span className='text-[18px] font-bold text-[#FDD77D]'>ยอดรวม</span>
                    <span className='text-[18px] font-bold text-[#FDD77D]'>{totalOrderPrice} บาท</span>
                  </div>
                  {/* Pagination */}
                  <div className="flex justify-end mt-[16px]">
                    <Pagination
                      current={currentPageOrder}
                      pageSize={pageSizeCurrentOrder}
                      total={orderProductAndTotalData.orderTotals?.length}
                      onChange={onPageChangeCurrentOrder}
                      style={{ textAlign: 'center', color: 'red', borderColor: 'red' }}
                      className="custom-pagination"
                    />
                  </div>
                </div>
              </div>
            </>
          }
        </div>

        {worningOrderProductAndTotalData.orderTotals?.map((order: any) => (
          <>
            <Modal
              key={order.id}
              closeIcon={false}
              open={worningOrderProductAndTotal && order.orderProductStatus === "pending"}
              // onCancel={() => handleWorningOrderProductAndTotalClose(order.orderProductStatus)}
              footer={null}
              centered
              width={500}
              style={{ padding: 0 }}
              className="no-border-radius-modal"
            >
              <div>
                <div className='text-center'>
                  <p className='font-bold text-[40px]'>ออร์เดอร์{order.tableName}</p>
                  <div className="flex justify-between text-[18px] my-[30px] mx-[16px]">
                    <span>อาหาร</span>
                    <span>จำนวน</span>
                    <span>รวม</span>
                  </div>
                  <div className="border-[#000] border-y-2 p-[16px] grid gap-4">
                    {/* Order List */}
                    {order.orderProducts.map((product: any) => (
                      <div className="flex justify-between" key={product.id}>
                        <div className="max-w-[180px] w-[180px] text-start text-[16px]"><span>{product.productName}</span></div>
                        <div className="ml-[15px] text-[16px]"><span>{product.orderProductQuantity}</span></div>
                        <div className="ml-[125px] w-[50px] text-end text-[16px]"><span>{product.orderProductPrice}</span></div>
                      </div>
                    ))}
                  </div>
                  {/* Total */}
                  <div className="flex justify-between text-[18px] my-[30px]">
                    <span>รวมทั้งสิ้น</span>
                    {/* <span>{order.orderTotalQuantity}</span>
                    <span>{order.orderTotalPrice}บาท</span> */}
                    <span>{orderQuantityTotal}</span>
                    <span>{orderPriceTotal}บาท</span>
                  </div>
                  {/* Button Footer */}
                  <div className='flex justify-center'>
                    <Button
                      key="close"
                      onClick={() => handleWorningOrderProductAndTotalClose(order.orderProductStatus, order.tableName)}
                      style={{
                        width: '66px',
                        height: '42px',
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #C60000',
                        borderRadius: '0',
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
                      onClick={() => handleWorningOrderProductAndTotalSubmit(order.orderProductStatus, order.tableName)}
                      style={{
                        width: '100px',
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
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>รับออเดอร์</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </>
        ))}

        <Modal
          key={lastOrderId}
          closeIcon={false}
          open={worningOrderProductAndTotalConfirmShow}
          onCancel={() => setWorningOrderProductAndTotalConfirmShow(false)}
          footer={null}
          centered
          width={500}
          style={{ padding: 0 }}
          className="no-border-radius-modal"
        >
          <div className="text-center">
            <p className='font-bold text-[40px]'>ออร์เดอร์ {worningOrderProductAndTotalData.orderTotals?.[worningOrderProductAndTotalData.orderTotals.length - 1]?.tableName}</p>
            <div className="h-[25px]"></div>
            <div className="border-[#000] border-y-2 px-[32px] py-[16px] grid gap-4">
              {/* Order List */}
              {worningOrderProductAndTotalData.orderTotals?.[worningOrderProductAndTotalData.orderTotals.length - 1]?.orderProducts.map((product: any) => (
                <div className="flex justify-start" key={product.id}>
                  <div className="max-w-[25px] w-[25px] text-start text-[16px]">{product.orderProductQuantity}</div>
                  <div className="text-[16px]">{product.productName}</div>
                </div>
              ))}
            </div>
            {/* Total */}
            <div className="flex justify-between text-[18px] mt-[25px]">
              <span>รวมทั้งสิ้น</span>
              <span>{orderQuantityTotal}</span>
              <span>{orderPriceTotal} บาท</span>
            </div>
          </div>
        </Modal>
      </>
    </main>
  );
};
export default Header;