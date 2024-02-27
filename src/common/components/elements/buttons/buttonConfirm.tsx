import { Button } from "antd";
import React, { useState } from 'react';

interface ComponentProps {
  onClick?: () => void;
  textButton: string
  buttonType: "submit" | "button" | undefined
}

const ButtonConfirm = ({ onClick, textButton, buttonType }: ComponentProps) => {
  const buttonStyles = {
    borderColor: '#00BE2A',
    fontSize: '20px',
    padding: '0px 8px',
    height: '40px',
    weigth: '123px',
    borderRadius: '0px',
  };
  return (
    <main>
      <Button
        htmlType={buttonType}
        onClick={onClick}
        className="rounded-none justify-center items-center"
        style={buttonStyles}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
      >
        <p style={{ color: '#00BE2A', fontSize: '20px', }} className="font-['Tahoma'] ">
          {textButton}
        </p>
      </Button>
    </main>
  );
};

export default ButtonConfirm; 