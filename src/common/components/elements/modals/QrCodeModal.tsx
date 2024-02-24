import { Input, Modal, QRCode, Space } from 'antd';
import React, { useState } from 'react'
import Image from 'next/image';

interface QrCodeModalProps {
  visible: boolean;
  menuName: string;
  onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ visible, menuName, onClose }) => {
  const [text, setText] = React.useState('https://ant.design/');
  const [IsQrCodeButton, setIsQrCodeButton] = useState(false);
  
  return (
    <Modal
      closeIcon={false}
      visible={visible}
      onCancel={onClose}
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
        <div className="flex justify-center items-center w-[400px] h-[44px] bg-[#D9D9D9] cursor-pointer" onClick={onClose}>
          <Image src="mdi_qrcode-scan.svg" alt="" width="24" height="24" />
          <span className='text-[18px] ml-4'>พิมพ์ QR CODE</span>
        </div>
      </div>
    </Modal>
  )
}

export default QrCodeModal
