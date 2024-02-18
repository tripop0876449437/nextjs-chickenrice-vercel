import React from 'react'
import Image from "next/image";
import { Modal, Pagination } from "antd";
import TableButton from "../buttons/tableButton";
import TableNameModel from "../modals/tableNameModal";
import { useState } from "react";

const InStoreTableList = () => {
  const [numButtons, setNumButtons] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTableName, setSelectedTableName] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const buttonsPerPage: number = 7; // Change this value as needed

  
  
  const handleOpenModal = (tableName: string) => {
    setSelectedTableName(tableName);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const totalPages: number = Math.ceil(numButtons / buttonsPerPage);
  const startIndex: number = (currentPage - 1) * buttonsPerPage;
  const endIndex: number = currentPage * buttonsPerPage;
  const handleAddButton = () => {
    setNumButtons(numButtons + 1);
    const totalPages: number = Math.ceil((numButtons + 1) / buttonsPerPage);
    
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      {/* Footer */}
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

      {/* Table buttons */}
      <div className="grid grid-cols-4 gap-4 text-center">
        {[...Array(numButtons)]
          .slice(startIndex, endIndex)
          .map((_, index) => (
            <TableButton 
              key={index} 
              tableName={`Table ${index + 1}`} 
              imgFile="Vector (2).svg" 
              onClick={() => handleOpenModal(`Table ${index + 1}`)}
            />
          ))}
        <div
          className="text-[40px] flex items-center justify-center h-[200px] cursor-pointer"
          style={{ background: '#FDD77D'}}
          onClick={handleAddButton}
        >
          <span className="text-[#A93F3F] text-[40px] font-bold">+</span>
        </div>
      </div>

      {/* Modal */}
      <TableNameModel visible={isModalVisible} tableName={`Table ${currentPage}`} onClose={handleCloseModal} />

      {/* Pagination */}
      <div className="flex justify-end mt-5">
        <Pagination
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          total={numButtons}
          pageSize={buttonsPerPage}
          showSizeChanger={false}
          style={{ marginBottom: '16px', color: 'red', borderColor: 'red' }}
          className="custom-pagination"
        />
      </div>
    </>
  )
}

export default InStoreTableList
