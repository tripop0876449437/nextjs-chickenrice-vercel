import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Image from "next/image";
import SuccessOrderMenu from './SuccessOrderMenu';

interface OrderMenuModalProps {
  visible: boolean;
  menuName: string;
  quatity: number;
  onClose: () => void;
}

const OrderMenuModal: React.FC<OrderMenuModalProps> = ({ visible, menuName, quatity, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState<boolean>(false);

  const handlerMenu = () => {
    // onClose();
    setIsModalVisible(true);
    setIsModalSuccessVisible(false);
  }

  const handlerMenuSuccess = () => {
    // onClose();
    setIsModalSuccessVisible(true);
    setIsModalVisible(false);
  }
  

  return (
    <>
      <Modal
        closeIcon={false}
        visible={visible}
        onCancel={() => handlerMenu()}
        footer={null}
        centered
        width={500}
        style={{ height: '529.3px', padding: 0 }}
        className="no-border-radius-modal"
      >
        <div className='text-center p-[30px]'>
          <div className="flex justify-center items-center text-[#FF0000] text-[32px] text-bold mb-[30px]">
            <span>ยืนยันการสั่งซื้อ</span>
          </div>
          <div className="border-[#000] border-y-2 p-[16px] flex justify-between">
            {/* Order List */}
            <div className="flex">
              <div className="text-[18px] px-4"><span>{quatity}</span></div>
              <div className="text-[18px]"><span>{menuName}</span></div>
            </div>
            <div className="flex">
              <Image src="/x_red.png" alt="" width={24} height={24} />
            </div>
          </div>
          {/* Button Footer */}
          <div className='flex justify-center mt-[30px]'>
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
              onClick={() => handlerMenuSuccess()}
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
      {/* Modal */}
      {isModalSuccessVisible === true &&
        <Modal
          closeIcon={false}
          visible={visible}
          onCancel={onClose}
          footer={null}
          centered
          width={500}
          style={{ height: '529.3px', padding: 0 }}
          className="no-border-radius-modal"
        >
          <div className='text-center p-[30px]'>
            <div className="flex justify-center items-center text-[#000] text-[40px] text-bold mb-[30px]">
              <span>ออเดอร์กลับบ้าน 1</span>
            </div>
            <div className="border-[#000] border-y-2 p-[16px] flex justify-start mb-[30px]">
              {/* Order List */}
              <div className="flex">
                <div className="text-[18px] px-4"><span>{quatity}</span></div>
                <div className="text-[18px]"><span>{menuName}</span></div>
              </div>
            </div>
            <Button
              key="confirm"
              onClick={onClose}
              style={{
                width: '162px',
                height: '42px',
                padding: '10px',
                margin: 'auto',
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
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#00BE2A' }}>ตกลง</span>
            </Button>
          </div>
        </Modal>
      }
    </>
  );
};

export default OrderMenuModal;
