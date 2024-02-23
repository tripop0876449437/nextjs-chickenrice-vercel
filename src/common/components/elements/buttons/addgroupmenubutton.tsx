import { useState } from "react";
import { Button,Modal,Input } from "antd";


const  InStoreAddGroupmenu : React.FC = () => {
  const [modalAddGroupmenu, setmodalAddGroupmenu] = useState(false);


return (
  <main>
    <Button className="border border-red-600 w-[150px] h-[63px] mt-3 flex justify-center items-center" 
      type="primary"
      style={{ background: '#FDD77D'}}
      onClick={() => setmodalAddGroupmenu(true)}
    >
      <span className="font-bold text-[40px] mb-3">+</span>
    </Button>
    <Modal
      title=""
      open={modalAddGroupmenu}
      onOk={() => setmodalAddGroupmenu(false)}
      onCancel={() => setmodalAddGroupmenu(false)}
    >
      <div className="flex justify-center items-center">
        <div className="text-yellow-500 text-2xl">เพิ่มหมวดหมู่</div>
      </div>
        <div className="flex justify-center items-center mt-3">
          <div className="mr-3 text-red-500">ชื่อหมวดสินค้า</div>
          <Input
            style={{width: 200}}
            className="border border-red-500 mr-4"
          />
        </div>
    </Modal>
  </main>
)
}

export default InStoreAddGroupmenu