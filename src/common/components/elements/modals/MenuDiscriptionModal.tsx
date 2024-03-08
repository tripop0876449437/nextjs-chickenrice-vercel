import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Image from "next/image";
import OrderMenuModal from './orderMenu';

interface MenuDiscriptionModalProps {
  visible: boolean;
  menuName: string;
  price: number;
  quatity: number;
  total: number;
  imgFile: string;
  onClose: () => void;
}

const MenuDiscriptionModel: React.FC<MenuDiscriptionModalProps> = ({ visible, menuName, price, quatity, total, imgFile, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handlerMenu = () => {
    onClose();
    setIsModalVisible(true);
  }

  // Function to increment the count
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Function to decrement the count
  const decrementCount = () => {
    // Ensure count doesn't go below 0
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <Modal
        closeIcon={false}
        visible={visible}
        onCancel={onClose}
        footer={null}
        centered
        width={500}
        style={{ height: '529.3px', padding: 0 }}
        // style={{ padding: 0 }}
        className="no-border-radius-modal"
      >
        <div className='text-center'>
          <img src={imgFile} alt="" width={440} height={165.3} className='w-full' />
          <div className='h-[30px]'></div>
          <p className='font-bold text-[18px] text-start'>{menuName}</p>
          <div className='h-[16px]'></div>
          <div className='flex'>
            <div className="w-[50%] text-start text-[18px] font-bold"><span>ราคา</span></div>
            <div className="w-[50%] text-start text-[18px]"><span>{price}</span></div>
          </div>
          <div className='h-[16px]'></div>
          <div className='flex'>
            <div className="w-[50%] text-start text-[18px] font-bold"><span>จำนวน</span></div>
            <div className="w-[50%] text-start flex">
              <div className="cursor-pointer border border-[#000] w-[24px] text-center" onClick={decrementCount}>-</div>
              <div className="border border-[#000] w-[100%] flex justify-center items-center"><span>{count}</span></div>
              <div className="cursor-pointer border border-[#000] w-[24px] text-center" onClick={incrementCount}>+</div>
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
              onClick={() => handlerMenu()}
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
  );
};

export default MenuDiscriptionModel;
