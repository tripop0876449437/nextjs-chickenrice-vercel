import { useState } from "react";
import { Button,Modal,Input } from "antd";


const  InStoreAddGroupmenu : React.FC = () => {
  const [modalAddGroupmenu, setmodalAddGroupmenu] = useState(false);
  const [selectedTableName, setSelectedTableName] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = (tableName: string) => {
    setSelectedTableName(tableName);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    setIsModalVisible(false);
  };

return (
  <main>
    <Button className="border border-red-600 w-[120px] h-[60px] mt-3 flex justify-center items-center" 
      type="primary"
      style={{ background: '#FDD77D'}}
      onClick={() => setmodalAddGroupmenu(true)}
    >
      <span className="font-bold text-[40px] mb-3">+</span>
    </Button>
    <Modal
      open={modalAddGroupmenu}
      closeIcon={false}
      footer={null}
      onOk={() => setmodalAddGroupmenu(false)}
      onCancel={() => setmodalAddGroupmenu(false)}
      centered
      width={400}
      style={{height: 170}}
    >
      <div className="border border-white flex justify-center items-center ">
        <div className="text-yellow-500 text-2xl">เพิ่มหมวดหมู่</div>
      </div>
        <div className="flex justify-center items-center mt-3">
          <div className="mr-3 text-red-500">ชื่อหมวดสินค้า</div>
          <Input
            style={{width: 200}}
            className="border border-red-500 mr-4"
          />
        </div>
        <div className="ml-[120px] mt-3 border border-green-500 w-[81px] h-[42px] flex justify-center items-center">
        <button className="text-green-500">เพิ่มเมนู</button>
        </div>
    </Modal>
    
  </main>
)
}

export default InStoreAddGroupmenu