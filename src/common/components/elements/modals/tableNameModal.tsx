import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import StatusTableNameModel from '../buttons/statusTableButton';
import axios from 'axios';

// Load environment variables from .env file
const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

interface ModalProps {
  visible: boolean;
  tableName: string;
  tableId: number;
  onClose: () => void;
}

const TableNameModel: React.FC<ModalProps> = ({ visible, tableName, tableId, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTableName, setSelectedTableName] = useState<string>('');
  const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const [selectedActive, setSelectedActive] = useState<boolean>(false);
  const [instoreOneTwo, setInstoreOneTwo] = useState<string>('two')
  // const [selectedSubmit, setSelectedSubmit] = useState<boolean>(false);
  const showModalActive = async (tableName: string, tableId: number) => {
    try {
      onClose();
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
      onClose();
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
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmitToNewPage = () => {
    onClose();
    localStorage.setItem('instoreOneTwo', instoreOneTwo);
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

  return (
    <>
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
          <StatusTableNameModel statusTableName='กำลังใช้งาน' onClick={() => showModalActive(tableName, tableId)} colorBg='#00BE2A' colorText='#FFF' />
          <div style={{ height: '30px' }}></div>
          <StatusTableNameModel statusTableName='ว่าง' onClick={() => showModalInActive(tableName, tableId)} colorBg='#D9D9D9' colorText='#FFF' />
          <div style={{ height: '30px' }}></div>
          <StatusTableNameModel statusTableName='ลบโต๊ะ' onClick={() => showModalDelete(tableName, tableId)} colorBg='#C60000' colorText='#FFF' />
          <div style={{ height: '30px' }}></div>

          {/* Confirm Next to InStoreList */}
          <Button
            key="confirm" onClick={handleSubmitToNewPage}
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
                  onClick={() => handleSubmit(tableId)}
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
  );
};

export default TableNameModel;
