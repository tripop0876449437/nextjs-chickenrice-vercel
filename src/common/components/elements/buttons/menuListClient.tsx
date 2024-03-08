"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface MenuListClientProps {
  menuText: string;
  imgFile: string;
  // isActive: boolean;
  onClick?: () => void;
}

const MenuListClient: React.FC<MenuListClientProps> = ({ menuText, imgFile, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);  
  const buttonStyle: React.CSSProperties = {
    cursor: 'pointer',
    padding: '16px',
    // backgroundColor: isActive ? '#A93F3F' : (isHovered ? '#A93F3F' : 'transparent'), // Background color changes on hover
    // color: isActive ? '#FDD77D' :  (isHovered ? '#FDD77D' : 'black'),
  };
  console.log(imgFile);
  

  return (
    <div
      className={`border-2 border-[#A93F3F] flex flex-col items-center justify-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonStyle} // Optional: Add pointer cursor on hover
      onClick={onClick}
    >
      <img src={imgFile} alt="" width={165} height={105} />
      <p className="text-[16px] font-bold mt-[16px] text-[#A93F3F]">{menuText}</p>
    </div>
  );
};

export default MenuListClient;