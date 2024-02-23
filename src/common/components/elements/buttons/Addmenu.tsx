import { useState } from "react";
import { Button, Modal, Input } from "antd";

const InStoreAddGroupmenu: React.FC = () => {
  const [modalAddGroupmenu, setmodalAddGroupmenu] = useState(false);
  const [selectedTableName, setSelectedTableName] = useState<string>("");
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
      <Button
        className="border border-red-600 w-[170px] h-[170px] flex justify-center items-center"
        type="primary"
        style={{ background: "#FDD77D" }}
        onClick={() => setmodalAddGroupmenu(true)}
      >
        <span className="font-bold text-[40px] mb-3 text-red-500">+</span>
      </Button>
      <Modal
        open={modalAddGroupmenu}
        closeIcon={false}
        footer={null}
        onOk={() => setmodalAddGroupmenu(false)}
        onCancel={() => setmodalAddGroupmenu(false)}
        centered
        width={700}
        style={{ height: 170 }}
      >
        <div className="border border-white flex justify-center items-center ">
          <div className="text-yellow-500 text-2xl">เพิ่มเมนู</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="flex items-center justify-center border border-red-500 w-[170px] h-[150px] text-red-500 text-[30px]">
            เพิ่มรูปภาพ
          </div>
          <div className="flex flex-col justify-center items-center mt-3 ml-3">
            <div className="mr-3 text-red-500 flex">
              <div className="mr-3">ชื่อเมนู</div>
              <Input
                style={{ width: 100 }}
                className="border border-red-500 mr-4"
              />
            </div>
            <div className="mr-3 mt-3 text-red-500 flex">
              <div className="mr-5">ราคา</div>
              <Input
                style={{ width: 100 }}
                className="border border-red-500 mr-4"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
        <div className=" mt-3 border border-green-500 w-[81px] h-[42px] flex justify-center items-center">
          <button className="text-green-500">เพิ่มเมนู</button>
        </div>
        </div>
      </Modal>
    </main>
  );
};

export default InStoreAddGroupmenu;
