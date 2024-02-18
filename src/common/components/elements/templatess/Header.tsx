"use client";
import Image from "next/image";
import { useState } from "react";
import OrderAddressButton from "../buttons/orderAddressButton";
import InStoreTableList from "../bodyContent/InStoreTableList";


export const Header = () => {
  const [selectMenu, setSelectMenu] = useState<string>("หน้าร้าน")

  const handlerMenu = (menuText: string) => {
    setSelectMenu(menuText)
  }

  return (
    <main className="h-screen" style={{ padding: '80px' }}>
      {/* Header */}
      <div className="flex justify-between" style={{ height: '44px', padding: '10px' }}>
        {/* User section */}
        <div className="flex items-center">
          <Image src="/user.png" alt="" width={24} height={24} style={{ margin: '0 8px 0 0' }} />
          <div><p style={{ fontSize: '18px' }}>ผู้ใช้งาน</p></div>
        </div>

        {/* Logout button */}
        <div className="flex items-center">
          <Image src="logout.svg" alt="" width={24} height={24} style={{ margin: '0 8px 0 0' }} />
          <button><span style={{ fontSize: '18px' }}>Logout</span></button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-5" style={{ marginTop: '16px' }}>
        <OrderAddressButton menuText="หน้าร้าน" imgFile="Frame 96.svg" isActive={selectMenu === "หน้าร้าน"} onClick={() => handlerMenu('หน้าร้าน')}/>
        <OrderAddressButton menuText="ซื้อกลับบ้าน" imgFile="Frame 95.svg" isActive={selectMenu === "ซื้อกลับบ้าน"} onClick={() => handlerMenu('ซื้อกลับบ้าน')}/>
        <OrderAddressButton menuText="ออร์เดอร์วันนี้" imgFile="Frame 94.svg" isActive={selectMenu === "ออร์เดอร์วันนี้"} onClick={() => handlerMenu('ออร์เดอร์วันนี้')}/>
      </div>

      {/* BodyContent */}
      {selectMenu === "หน้าร้าน" && <InStoreTableList />}


    </main>
  );
};
export default Header;
