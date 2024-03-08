import { Form, Input, Modal, message, Upload, Button } from 'antd';
import React, { useState } from 'react';
import ButtonConfirm from '../buttons/buttonConfirm';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [imageUploaded, setImageUploaded] = useState(false); // State to track whether an image has been uploaded

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    onClose();
  };


  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);

  };

  const handleSubmit = async (cateName: string) => {
    setIsModalVisible(false);
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

      const categoryPayload = {
        categoryName: cateName
      }

      await axios.post(`${BASE_URL_API}/api/category/add`, categoryPayload, config)

      window.location.reload()
    } catch (error) {
      console.error('Error creating category:', error);
      throw error; // Propagate the error for handling in the UI
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
        width={728}
        style={{ height: '451px', padding: 0 }}
        className="no-border-radius-modal"
      >
        <div className='text-center p-[30px] flex flex-col justify-center items-center'>
          <Form form={form} onFinish={onFinish}>
            <div className="flex justify-center items-center text-[#FDD77D] text-[40px] font-bold">
              <span>เพิ่มหมวดหมู่</span>
            </div>
            <div className="flex my-[16px] items-center">
              <Form.Item className='p-0 m-0'>
                <div className="flex gap-[30px] justify-between items-center">
                  <span className='w-fit text-[18px] text-[#A93F3F] font-bold'>ชื่อหมวดหมู่สินค้า</span>
                  <Input style={{ width: '363px', height: '44px' }} className='border-2 border-[#A93F3F] rounded-none' onChange={(e) => setCategoryName(e.target.value)} />
                </div>
              </Form.Item>
            </div>
            <ButtonConfirm buttonType="submit" textButton="เพิ่มเมนู" onClick={() => setIsModalVisible(true)} />
          </Form>
        </div>
      </Modal>
      {/* Modal for the selected table name */}
      <Modal
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
          <p className='text-[40px] font-bold text-[#FDD77D]'>ยืนยันการเพิ่ม</p>
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
              onClick={() => handleSubmit(categoryName)}
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
    </>
  );
};

export default AddCategoryModal;
