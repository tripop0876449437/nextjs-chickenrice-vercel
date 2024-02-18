import { Button } from "antd";
import React, { useState } from 'react';

interface ComponentProps {
  onClick?: () => void;
  textButton: string
  buttonType: "submit" | "button" | undefined
}

const SignInButton = ({ onClick, textButton, buttonType }: ComponentProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyles = {
    backgroundColor: isHovered ? '#791E1E' : '#A93F3F',
    borderColor: isHovered ? '#791E1E' : '#A93F3F',
    fontSize: '20px',
    padding: '0px 8px',
    height: '40px',
    weigth: '123px',
    borderRadius: '30px',
  };
  return (
    <main>
      <Button 
        htmlType={buttonType} 
        onClick={onClick} 
        className="rounded-[30px] justify-center items-center" 
        style={buttonStyles} 
        onMouseEnter={() => setIsHovered(true)} // Set isHovered to true when mouse enters
        onMouseLeave={() => setIsHovered(false)} // Set isHovered to false when mouse leaves
      >
        <p style={{ color: '#fff', fontSize: '20px'}} className="font-['Tahoma']">
          {textButton}
        </p>
      </Button>
    </main>
  );
};

export default SignInButton; 