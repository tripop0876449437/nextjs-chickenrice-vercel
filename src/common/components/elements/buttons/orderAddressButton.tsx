"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface OrderAddressButtonProps {
  menuText: string;
  imgFile: string;
  isActive: boolean;
  onClick?: () => void;
}

const OrderAddressButton: React.FC<OrderAddressButtonProps> = ({ menuText, imgFile, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);  
  const buttonStyle: React.CSSProperties = {
    cursor: 'pointer',
    padding: '16px',
    backgroundColor: isActive ? '#A93F3F' : (isHovered ? '#A93F3F' : 'transparent'), // Background color changes on hover
    color: isActive ? '#FDD77D' :  (isHovered ? '#FDD77D' : 'black'),
  };
  console.log(onClick);
  

  return (
    <div
      className={`border-2 border-[#A93F3F] flex flex-col items-center justify-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonStyle} // Optional: Add pointer cursor on hover
      onClick={onClick}
    >
      <Image src={imgFile} alt="" width={60} height={60} />
      <div style={{ height: '16px' }}></div>
      <p className="text-[40px] font-bold mt-[16px]">{menuText}</p>
    </div>
  );
};

export default OrderAddressButton;