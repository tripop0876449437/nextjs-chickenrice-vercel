import { Modal } from "antd";
import { useState, useEffect } from "react";

interface GroupmenuModalProps {
  visible: boolean;
  Groupmenu: string;
  onClose: () => void;
}


const Groupmenu: React.FC<GroupmenuModalProps> = ({ visible,Groupmenu,onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedGroupmenu, setSelectedGroupmenu] = useState<string>('');

  const showModal = (Groupmenu: string) => {
    setSelectedGroupmenu(Groupmenu);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    setIsModalVisible(false);
  };

return (
  <Modal
    onCancel={onClose}
    footer={null}
    centered
    width={728}
    style={{ height: '226px' }}
  >
    <div className="">

    </div>
  </Modal>
)
}

export default Groupmenu