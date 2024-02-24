import { Modal } from 'antd';
import React from 'react';

interface SuccessOrderMenuProps {
  visible: boolean;
  menuName: string;
  quatity: number;
  onClose: () => void;
}

const SuccessOrderMenu: React.FC<SuccessOrderMenuProps> = ({ visible, menuName, quatity, onClose }) => {

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
        className="no-border-radius-modal"
      >
        <div className='text-center p-[30px]'>
          <div className="flex justify-center items-center text-[#000] text-[40px] text-bold mb-[30px]">
            <span>ออเดอร์กลับบ้าน 1</span>
          </div>
          <div className="border-[#000] border-y-2 p-[16px] flex justify-start">
            {/* Order List */}
            <div className="flex">
              <div className="text-[18px] px-4"><span>{quatity}</span></div>
              <div className="text-[18px]"><span>{menuName}</span></div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SuccessOrderMenu;
