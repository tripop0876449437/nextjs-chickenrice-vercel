'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal, Pagination } from 'antd';
import TableButton from '../buttons/tableButton';
import TableNameModel from '../modals/tableNameModal';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

// Load environment variables from .env file
const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

const InStoreTableList = () => {
  const [numButtons, setNumButtons] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTableName, setSelectedTableName] = useState<string>('');
  const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('accessToken');

        if (!authToken) {
          console.error('Bearer token not found in localStorage');
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        };

        setLoading(true);
        const response = await axios.post(`${BASE_URL_API}/api/customer`, {
          page: currentPage,
        }, config);
        console.log('response', response.data);
        
        setTableData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching table data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleOpenModal = (tableId: number, tableName: string) => {
    setSelectedTableName(tableName);
    setSelectedTableId(tableId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddButton = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');

      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      const decodedToken = jwt.decode(authToken) as { username: string } | null;

      if (decodedToken) {
        console.log('Decoded Token:', decodedToken.username);
      } else {
        console.error('Decoded token is null or undefined');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };

      const tablePayload = {
        status: 'active',
        username: decodedToken.username,
      };

      await axios.post('${BASE_URL_API}/api/customer/add', tablePayload, config);

      window.location.reload()
      setNumButtons(numButtons + 1);
      const totalPages: number = Math.ceil((numButtons + 1) / 7);

      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }else{
        setCurrentPage(currentPage);
      }
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const renderTableButtons = () => {
    if (tableData && tableData.tables) {
      return tableData.tables.map((table: any) => (
        <TableButton
          key={table.id}
          tableName={table.tablename}
          tableActive={table.status}
          onClick={() => handleOpenModal(table.id, table.tablename)}
        />
      ));
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="flex flex-cols justify-end items-end" style={{ padding: '16px 0' }}>
        <div className="flex">
          <Image src="Vector (1).svg" alt="" width={24} height={24} style={{ marginRight: '30px' }} />
          <div><span style={{ fontSize: '18px', fontWeight: 'bold' }}>กำลังใช้งาน</span></div>
        </div>
        <div style={{ width: '40px' }}></div>
        <div className="flex">
          <Image src="Vector (2).svg" alt="" width={24} height={24} style={{ marginRight: '30px' }} />
          <div><span style={{ fontSize: '18px', fontWeight: 'bold' }}>ว่าง</span></div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        {renderTableButtons()}
        <div
          className="text-[40px] flex items-center justify-center h-[200px] cursor-pointer"
          style={{ background: '#FDD77D' }}
          onClick={() => { handleAddButton() }}
        >
          <span className="text-[#A93F3F] text-[40px] font-bold">+</span>
        </div>
      </div>

      {isModalVisible && <TableNameModel visible={isModalVisible} tableName={selectedTableName} tableId={selectedTableId}  onClose={handleCloseModal} />}

      <div className="flex justify-end mt-5">
        <Pagination
          current={tableData.current_page}
          onChange={(page) => setCurrentPage(page)}
          total={tableData.total}
          pageSize={tableData.page_size}
          showSizeChanger={false}
          style={{ marginBottom: '16px', color: 'red', borderColor: 'red' }}
          className="custom-pagination"
        />
      </div>
    </>
  );
};

export default InStoreTableList;
