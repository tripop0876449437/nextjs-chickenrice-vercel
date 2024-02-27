"use client"

import React from 'react'
import { useState } from 'react';

interface MenuselectbuttonProp {
  menuText: string;
  isActive: boolean;
  onClick?: () => void;
}

const MenuselectbuttonProp: React.FC<MenuselectbuttonProp> = ({ menuText, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);  
  const buttonStyle: React.CSSProperties = {
    cursor: 'pointer',
    padding: '10px',
    width: '120px',
    height: '42px',
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
      {/* <div style={{ height: '10px' }}></div> */}
      <p className="text-[18px] font-bold ">{menuText}</p>
    
    </div>
  );
}

export default MenuselectbuttonProp;