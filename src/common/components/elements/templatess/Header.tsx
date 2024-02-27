"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import OrderAddressButton from "../buttons/orderAddressButton";
import InStoreTableList from "../bodyContent/InStoreTableList";
import CurrentOrder from "../bodyContent/CurrentOrder";
import BackStoreList from "../bodyContent/BackStoreList";
import { logout } from '@/business/service/auth.service';
import jwt from 'jsonwebtoken';
import InStoreList from "../bodyContent/InStoreList";


export const Header = () => {
  const [selectMenu, setSelectMenu] = useState<string>("หน้าร้าน")
  const [instoreOneTwo, setInstoreOneTwo] = useState<string>('one')
  const [decodedToken, setDecodedToken] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Retrieve instoreOneTwo from local storage
    const asw = localStorage.getItem('instoreOneTwo');
    if (!asw) {
      // If instoreOneTwo is not found in localStorage, use the current state value
      localStorage.setItem('instoreOneTwo', instoreOneTwo);
    } else {
      // If instoreOneTwo is found in localStorage, update the state with its value
      setInstoreOneTwo(asw);
    }
    const authToken = localStorage.getItem('accessToken');
    if (!authToken) {
      console.error('Bearer token not found in localStorage');
      return;
    }
    const decoded = jwt.decode(authToken) as { username: string } | null;
    setDecodedToken(decoded);
  }, [instoreOneTwo]); // Empty dependency array to run the effect only once on mount

  const handlerMenu = (menuText: string) => {
    setSelectMenu(menuText)
  }

  const handleLogout = () => {
    logout();
  };



  return (
    <main className="h-screen" style={{ padding: '80px' }}>
      {/* Header */}
      <div className="flex justify-between" style={{ height: '44px', padding: '10px' }}>
        {/* User section */}
        <div className="flex items-center">
          <Image src="/user.png" alt="" width={24} height={24} style={{ margin: '0 8px 0 0' }} />
          <div><p style={{ fontSize: '18px' }}>{decodedToken?.username}</p></div>
        </div>

        {/* Logout button */}
        <div className="flex items-center" onClick={handleLogout}>
          <Image src="logout.svg" alt="" width={24} height={24} style={{ margin: '0 8px 0 0' }} />
          <button><span style={{ fontSize: '18px' }}>Logout</span></button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-5" style={{ marginTop: '16px' }}>
        <OrderAddressButton menuText="หน้าร้าน" imgFile="Frame 96.svg" isActive={selectMenu === "หน้าร้าน"} onClick={() => handlerMenu('หน้าร้าน')} />
        <OrderAddressButton menuText="ซื้อกลับบ้าน" imgFile="Frame 95.svg" isActive={selectMenu === "ซื้อกลับบ้าน"} onClick={() => handlerMenu('ซื้อกลับบ้าน')} />
        <OrderAddressButton menuText="ออร์เดอร์วันนี้" imgFile="Frame 94.svg" isActive={selectMenu === "ออร์เดอร์วันนี้"} onClick={() => handlerMenu('ออร์เดอร์วันนี้')} />
      </div>

      {/* BodyContent */}
      {selectMenu === "หน้าร้าน" && instoreOneTwo === "one" && <InStoreTableList />}
      {selectMenu === "หน้าร้าน" && instoreOneTwo === "two" && <InStoreList />}
      {selectMenu === "ซื้อกลับบ้าน" && <BackStoreList />}
      {selectMenu === "ออร์เดอร์วันนี้" && <CurrentOrder />}

      {/* InStoreList */}
      {/* {isModalVisible === true && <InStoreList />} */}


    </main>
  );
};
export default Header;
