"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface TableButtonProps {
  tableName: string;
  tableActive: string;
  onClick?: () => void;
}

const TableButton: React.FC<TableButtonProps> = ({ tableName, onClick, tableActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyleActive: React.CSSProperties = {
    cursor: 'pointer',
    padding: '16px',
    backgroundColor: isHovered ? '#A93F3F' : 'transparent', // Background color changes on hover
    color: isHovered ? '#FDD77D' : 'black',
  };
  const buttonStyleInActive: React.CSSProperties = {
    cursor: 'pointer',
    padding: '16px',
    backgroundColor: isHovered ? '#A93F3F' : 'transparent', // Background color changes on hover
    color: isHovered ? '#FDD77D' : '#00BE2A',
  };
  

  return (
    <>
      {tableActive === 'inactive' && <div
        className={`border-2 border-[#A93F3F] flex flex-col items-center justify-center`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={buttonStyleActive} // Optional: Add pointer cursor on hover
        onClick={onClick} // Add onClick event handler
      >
        <Image src='Vector (2).svg' alt="" width={73} height={73} />
        <div style={{ height: '16px' }}></div>
        <p className="text-[40px] font-bold mt-[16px]">{tableName}</p>
      </div>}
      {tableActive === 'active' && <div
        className={`border-2 border-[#A93F3F] flex flex-col items-center justify-center`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={buttonStyleInActive} // Optional: Add pointer cursor on hover
        onClick={onClick} // Add onClick event handler
      >
        <Image src='Vector (1).svg' alt="" width={73} height={73} />
        <div style={{ height: '16px' }}></div>
        <p className="text-[40px] font-bold mt-[16px]">{tableName}</p>
      </div>}
    </>
  );
};

export default TableButton;
