import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Image from "next/image";

interface OrderMenuModalClientProps {
  visible: boolean;
  tableName: string;
  menuName: string;
  quatity: number;
  total: number;
  orderTotal: number;
  onClose: () => void;
}

const OrderMenuModalClient: React.FC<OrderMenuModalClientProps> = ({ visible, tableName, menuName, orderTotal, quatity, total, onClose }) => {
  const [count, setCount] = useState(0);

  return (
    <Modal
      closeIcon={false}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={310}
      style={{ height: '440px', padding: 0 }}
      className="no-border-radius-modal"
    >
      <div className='text-center'>
        <p className='font-bold text-[40px]'>{tableName}</p>
        <div className="flex justify-between text-[18px] my-[30px] mx-[16px]">
          <span>อาหาร</span>
          <span>จำนวน</span>
          <span>รวม</span>
        </div>
        <div className="border-[#000] border-y-2 p-[16px] grid gap-4">
          {/* Order List */}
          <div className="flex">
            <div className="max-w-[115px] text-start text-[16px]"><span>{menuName}</span></div>
            <div className="ml-[25px] text-[16px]"><span>{quatity}</span></div>
            <div className="ml-[63px] w-[50px] text-end text-[16px]"><span>{total}</span></div>
          </div>
          <div className="flex">
            <div className="max-w-[115px] text-start text-[16px]"><span>ข้าวมันไก่ทอดธรรมดา</span></div>
            <div className="ml-[25px] text-[16px]"><span>5</span></div>
            <div className="ml-[63px] w-[50px] text-end text-[16px]"><span>250</span></div>
          </div>
        </div>
        {/* Total */}
        <div className="flex justify-between text-[18px] my-[30px]">
          <span>รวมทั้งสิ้น</span>
          <span>9</span>
          <span>{orderTotal}บาท</span>
        </div>
        {/* Button Footer */}
        <div className='flex justify-center'>
          <Button
            key="close"
            onClick={onClose}
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
            onClick={onClose}
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
  );
};

export default OrderMenuModalClient;
