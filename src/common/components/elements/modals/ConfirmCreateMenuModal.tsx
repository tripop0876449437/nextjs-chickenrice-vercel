import { Button, Modal } from 'antd'; // Import Modal from 'antd'
import React, { useState } from 'react';

interface ConfirmCreateMenuModalProps {
  visible: boolean;
  onClose: () => void;
}

const ConfirmCreateMenuModal: React.FC<ConfirmCreateMenuModalProps> = ({ visible, onClose }) => {

  return (
    <>
      <Modal
        closeIcon={false}
        visible={visible}
        onCancel={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
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
  )
}

export default ConfirmCreateMenuModal;
