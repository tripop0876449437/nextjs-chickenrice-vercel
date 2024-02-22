import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Image from "next/image";

interface MenuDiscriptionModalClientProps {
  visible: boolean;
  menuName: string;
  price: number;
  quatity: number;
  total: number;
  imgFile: string;
  onClose: () => void;
}

const MenuDiscriptionModelClient: React.FC<MenuDiscriptionModalClientProps> = ({ visible, menuName, price, quatity, total, imgFile, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTableName, setSelectedTableName] = useState<string>('');
  const [count, setCount] = useState(0);

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
    <Modal
      closeIcon={false}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={300}
      style={{ height: '465.3px', padding: 0 }}
      bodyStyle={{ padding: 0 }}
      className="no-border-radius-modal"
    >
      <div className='text-center'>
        <Image src={imgFile} alt="" width={240} height={165.3} className='w-full'/>
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
        <Button
          key="confirm" onClick={onClose}
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
  );
};

export default MenuDiscriptionModelClient;
