"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Modal, Spin } from 'antd'
import { useRouter } from 'next/navigation';
import axios from 'axios';

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

const CartPage = () => {
  const router = useRouter();
  // const tableNameClient = typeof localStorage !== 'undefined' ? localStorage.getItem('tableNameClient') : null;
  const tableNameClient = localStorage.getItem('tableNameClient');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [orderProductData, setOrderProductData] = useState<any>({})
  const [orderQuantityTotal, setOrderQuantityTotal] = useState<number>(0)
  const [orderPriceTotal, setOrderPriceTotal] = useState<number>(0)

  
  useEffect(() => {
    const fetchData = async () => {
      if (!tableNameClient) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL_API}/api/order-product/${tableNameClient}`);
        setOrderProductData(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableNameClient]);

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

  const handlerMenu = () => {
    setIsModalVisible(true);
  }

  const handleSubmitModal = async () => {
    try {
      setIsModalVisible(false);
      const orderTotalPayload = {
        orderTotalQuantity: orderQuantityTotal,
        orderTotalPrice: orderPriceTotal,
        tablename: tableNameClient
      }
      await axios.post(`${BASE_URL_API}/api/order-total/add`, orderTotalPayload)
    } catch (error) {
      console.error('Error Submit Api Post OrderProduct.', error)
    }
  }


  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const nextToPageMenuList = () => {
    router.push(`./menu/${tableNameClient}`)
  }

  const deleteOrderProduct = async (id: number) => {
    try {
      console.log('id: ', id);
      await axios.delete(`${BASE_URL_API}/api/order-product/delete/${id}`)
      window.location.reload();

    } catch (error) {
      console.error(' Error deleting OrderProduct:', error);
    }
  }

  return (
    <>
      <div className="py-[40px] px-[10px]">
        <div className="bg-[#E74040] flex justify-between p-[5px] border border-1 border-[#000] mb-[16px] opacity-[.69]">
          <div className="flex items-center">
            <Image src='/cart.png' alt='cart' width={20} height={20} />
            <span className='text-[12px] text-[#fff] font-bold'>ตะกร้าของฉัน</span>
          </div>
          <div className='cursor-pointer' onClick={nextToPageMenuList}>
            <Image src='/x_white.png' alt='x_white' width={24} height={24} />
          </div>
        </div>
        {/* Bil Order*/}
        <div className="">
          <p className='font-bold text-[18px]'>{tableNameClient}</p>
          <div className="border-[#000] border-y-2 px-[16px] pb-[16px] mt-[16px] min-h-[542px]">
            {orderProductData.orderProduct?.map((orderProductItem: { id: number; productName: string; orderProductPrice: number; orderProductQuantity: number; }, index: number) => (
              <div className="flex justify-between pt-[16px]" key={index}>
                <div className="w-[128.5px] text-[16px]"><p>{orderProductItem.productName}</p></div>
                <div className="w-[20px] text-center text-[16px]"><p>{orderProductItem.orderProductQuantity}</p></div>
                <div className="w-[128.5px] text-center text-[16px]"><p>{orderProductItem.orderProductPrice}</p></div>
                <div className="cursor-pointer" onClick={() => deleteOrderProduct(orderProductItem.id)}><Image src='/x_red.png' alt='x_red' width={24} height={24} /></div>
              </div>
            ))}
          </div>
        </div>
        {/* Total Order */}
        <div className="flex justify-between items-center bg-[#D9D9D9] h-[64px] p-[16px] my-[16px]">
          <div className="w-[19px] h-[32px] bg-white flex justify-center items-center"><span>{orderQuantityTotal}</span></div>
          <div className="'text-[18px] text-[#C60000]"><span>รวมเงินทั้งสิ้น</span><span className='mx-[16px] text-black'>{orderPriceTotal}</span><span className='text-black'>บาท</span></div>
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
        {/* {isModalVisible === true && <OrderMenuModalClient visible={isModalVisible} tableName='Table 1' menuName='ข้าวมันไก่ต้มธรรมดา' orderTotal={200} quatity={4} total={59} onClose={() => handleCloseModal()} />} */}
        {isModalVisible === true &&
          <>
            <Modal
              closeIcon={false}
              open={isModalVisible}
              onCancel={() => handleCloseModal()}
              footer={null}
              centered
              width={310}
              style={{ height: '440px', padding: 0 }}
              className="no-border-radius-modal"
            >
              <div className='text-center'>
                <p className='font-bold text-[40px]'>{tableNameClient}</p>
                <div className="flex justify-between text-[18px] my-[30px] mx-[16px]">
                  <span>อาหาร</span>
                  <span>จำนวน</span>
                  <span>รวม</span>
                </div>
                <div className="border-[#000] border-y-2 p-[16px] grid gap-4">
                  {/* Order List */}
                  {orderProductData.orderProduct?.map((orderProductItem: { id: number; productName: string; orderProductPrice: number; orderProductQuantity: number; }, index: number) => (
                    <div className="flex" key={index}>
                      <div className="max-w-[100px] w-[115px] text-start text-[16px]"><span>{orderProductItem.productName}</span></div>
                      <div className="ml-[25px] text-[16px]"><span>{orderProductItem.orderProductQuantity}</span></div>
                      <div className="ml-[47px] w-[50px] text-end text-[16px]"><span>{orderProductItem.orderProductPrice}</span></div>
                    </div>
                  ))}
                </div>
                {/* Total */}
                <div className="flex justify-between text-[18px] my-[30px]">
                  <span>รวมทั้งสิ้น</span>
                  <span>{orderQuantityTotal}</span>
                  <span>{orderPriceTotal}บาท</span>
                </div>
                {/* Button Footer */}
                <div className='flex justify-center'>
                  <Button
                    key="close"
                    onClick={() => handleCloseModal()}
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
                    onClick={() => handleSubmitModal()}
                    style={{
                      width: '66px',
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
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>ยืนยัน</span>
                  </Button>
                </div>
              </div>
            </Modal>
          </>
        }

      </div>
    </>
  )
}

export default CartPage
