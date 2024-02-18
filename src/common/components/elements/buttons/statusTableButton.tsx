import { Modal } from 'antd';
import React from 'react';

interface StatusTableNameModalProps {
  statusTableName: string;
  colorBg: string;
  colorText: string;
  onClick: () => void;
}

const StatusTableNameModel: React.FC<StatusTableNameModalProps> = ({ colorBg, colorText, statusTableName, onClick }) => {
  const colorBgStyle: React.CSSProperties = {
    cursor: 'pointer', backgroundColor: colorBg, padding: '10px', height: '56px'
  };
  const colorTextStyle: React.CSSProperties = {
    fontSize: '30px', color: colorText, textAlign: 'center', width: '100%'
  };
  
  return (
    <div className='flex items-center' style={colorBgStyle} onClick={onClick}>
      <p className='font-bold' style={colorTextStyle}>
        {statusTableName}
      </p>
    </div>
  );
};

export default StatusTableNameModel;