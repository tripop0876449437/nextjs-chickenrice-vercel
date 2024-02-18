import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import StatusTableNameModel from '../buttons/statusTableButton';

interface ModalProps {
  visible: boolean;
  tableName: string;
  onClose: () => void;
}

const TableNameModel: React.FC<ModalProps> = ({ visible, tableName, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTableName, setSelectedTableName] = useState<string>('');

  const showModal = (tableName: string) => {
    setSelectedTableName(tableName);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      closeIcon={false}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={500} // Set the width to 500px
      style={{ height: '470px' }} // Set the height to 470px
    >
      <div style={{ textAlign: 'center', padding: '30px' }}>
        <div className='flex items-center' style={{ background: '#FDD77D', padding: '16px', height: '80px' }}>
          <p className='font-bold text-[40px]' style={{ color: '#00BE2A', textAlign: 'center', width: '100%' }}>{tableName}</p>
        </div>
        <div style={{ height: '30px' }}></div>
        {/* Render your StatusTableNameModel */}
        <StatusTableNameModel statusTableName='กำลังใช้งาน' onClick={() => showModal(tableName)} colorBg='#00BE2A' colorText='#FFF' />
        <div style={{ height: '30px' }}></div>
        <StatusTableNameModel statusTableName='ว่าง' onClick={() => showModal(tableName)} colorBg='#D9D9D9' colorText='#FFF' />
        <div style={{ height: '30px' }}></div>
        <StatusTableNameModel statusTableName='ลบโต๊ะ' onClick={() => showModal(tableName)} colorBg='#C60000' colorText='#FFF' />
        <div style={{ height: '30px' }}></div>
        <Button 
          key="confirm" onClick={onClose} 
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
          visible={isModalVisible}
          onCancel={handleCancel}
          centered
          footer={null}
          width={440}
          style={{ height: '180px' }}
        >
          {/* Modal content goes here */}
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <p className='text-[40px] font-bold'>ยืนยันการลบ</p>
            <div style={{ height: '30px'}}></div>
            <div className='flex justify-center'>
              <Button 
                key="close" 
                onClick={handleSubmit} 
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
              <div style={{ width: '30px'}}></div>
              <Button 
                key="confirm" 
                onClick={handleSubmit} 
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
  );
};

export default TableNameModel;
