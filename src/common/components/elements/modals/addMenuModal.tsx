import { Form, Input, Modal, message, Upload, Button } from 'antd';
import React, { useState } from 'react';
import ButtonConfirm from '../buttons/buttonConfirm';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image'; // Import Image from next/image
import ConfirmCreateMenuModal from './ConfirmCreateMenuModal';
import axios from 'axios';

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

interface AddMenuModalProps {
  visible: boolean;
  menuName: string;
  categoryId: number;
  onClose: () => void;
}

const getBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const AddMenuModal: React.FC<AddMenuModalProps> = ({ visible, menuName, categoryId, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [imageUploaded, setImageUploaded] = useState(false); // State to track whether an image has been uploaded
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category_id: categoryId,
    image: null as File | null,
    description: 'description',
  });

  const onFinish = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('accessToken');
      // const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (!authToken) {
        console.error('Bearer token not found in localStorage');
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append('productName', formData.productName);
      formDataObj.append('price', formData.price);
      formDataObj.append('category_id', String(categoryId));
      formDataObj.append('image', formData.image || ''); // You might need to adjust this based on how you handle file uploads

      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          // Note: Content-Type header is set automatically by FormData
        },
      };

      const response = await axios.post(`${BASE_URL_API}/api/product/add`, formDataObj, config);
      console.log('Menu added successfully:', response.data);
      message.success('Menu added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding menu:', error);
      message.error('Failed to add menu');
    } finally {
      setLoading(false);
    }
  };


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const base64String = await getBase64(file);
        setImageUrl(base64String);
        setImageUploaded(true);
        setFormData(prev => ({ ...prev, image: file }));
      } catch (error) {
        console.error('Error converting file to base64:', error);
      } finally {
        setLoading(false);
      }
    }
  };



  const uploadButton = (
    <label
      htmlFor="upload-input"
      style={{
        border: '2px solid #A93F3F',
        background: imageUploaded ? 'none' : '#D9D9D9', // Set the background color to red
        cursor: 'pointer',
        height: '201px',
        width: '201px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {!imageUploaded ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div style={{ marginTop: 8, color: '#A93F3F' }} className='text-[40px] font-bold'>เพิ่มรูป</div>
        </div>
      ) : (
        <img src={imageUrl || undefined} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
      <input
        type="file"
        id="upload-input"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </label>
  );

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // console.log('handleCancel');

  };

  const handleSubmit = () => {
    setIsModalVisible(false);
    console.log('form: ', form);
    form.submit();
    window.location.reload()
    // console.log('handleSubmit');

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
              <span>เพิ่มเมนู</span>
            </div>
            <div className="flex my-[40px] gap-[30px] items-center">
              <Form.Item className='p-0 m-0' name="image">
                {uploadButton}
              </Form.Item>
              <div className="flex flex-col justify-between items-between gap-[16px]">
                <Form.Item className='p-0 m-0' name="productName">
                  <div className="flex gap-[50px] justify-between items-center">
                    <span className='w-fit text-[18px] text-[#A93F3F] font-bold'>ชื่อสินค้า</span>
                    <Input style={{ width: '124px', height: '44px' }} className='border-2 border-[#A93F3F] rounded-none' name="productName" value={formData.productName} onChange={handleChange} />
                  </div>
                </Form.Item>
                <Form.Item className='p-0 m-0' name="price">
                  <div className="flex gap-[50px] justify-between items-center">
                    <span className='w-fit text-[18px] text-[#A93F3F] font-bold'>ราคาขาย</span>
                    <Input style={{ width: '124px', height: '44px' }} className='border-2 border-[#A93F3F] rounded-none' name="price" value={formData.price} onChange={handleChange} />
                  </div>
                </Form.Item>
              </div>
            </div>
            {/* <ButtonConfirm buttonType="submit" textButton="เพิ่มเมนู" onClick={() => setIsModalVisible(true)} /> */}
            <Form.Item>
              <Button
                // htmlType='submit'
                onClick={() => setIsModalVisible(true)}
                className="rounded-none justify-center items-center"
                style={{
                  borderColor: '#00BE2A',
                  fontSize: '20px',
                  padding: '0px 8px',
                  height: '40px',
                  width: '123px',
                  borderRadius: '0px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(240 253 244)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                <p style={{ color: '#00BE2A', fontSize: '20px', }} className="font-['Tahoma'] ">เพิ่มเมนู</p>
              </Button>
            </Form.Item>
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
              onClick={handleSubmit}
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

export default AddMenuModal;
