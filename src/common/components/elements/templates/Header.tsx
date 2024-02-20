import Input from "antd/es/input/Input";
import Image from "next/image";
import React from "react";
type Props = {};

export const Header = () => {
  return (
    <main>
      <div className="grid grid-cols-2 gap-[1250px] mt-10">
        <div className="ml-10 flex gap-3">
          <Image src="account_circle.svg" alt="" width={30} height={30} />
          <div className="mt-1">User</div>
        </div>

        <div className="mr-10 flex gap-3">
          <Image src="logout.svg" alt="" width={20} height={20} />
          <button className="mt-1">Logout</button>
        </div>
      </div>

      <div className="mt-3 ml-5 mr-5 grid grid-cols-3 gap-5 h-[200px] cursor-pointer">

        <div className="border border-red-500 flex flex-col items-center justify-center ">
          <Image src="Frame 96.svg" alt="" width={50} height={20} />
          <button className="text-2xl font-bold mt-5">หน้าร้าน</button>
        </div>

        <div className="border border-red-500 flex flex-col items-center justify-center">
          <Image src="Frame 95.svg" alt="" width={50} height={20} />
          <button className="text-2xl font-bold mt-5">ซื้อกลับบ้าน</button>
        </div>
 
        <div className="border border-red-500 flex flex-col items-center justify-center">
          <Image src="Frame 94.svg" alt="" width={50} height={20} />
          <button className="text-2xl  font-bold mt-5">ออร์เดอร์วันนี้</button>
        </div>
      </div>


      {/* <div className="flex flex-cols gap-3 justify-end items-end mr-20 mt-3">
        <div className="ml-10 flex gap-3 ">
          <Image src="Vector (1).svg" alt="" width={30} height={30} />
          <div className="mt-1">กำลังใช้งาน</div>
        </div>

        <div className="flex gap-3 ">
          <Image src="Vector (2).svg" alt="" width={20} height={20} />
          <div className="mt-1">ว่าง</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 h-[250px] mt-2 mr-5 ml-5 text-xl text-center  ">
        <div className="border border-red-400 flex flex-col items-center justify-center">
        <Image src="Vector (1).svg" alt="" width={70} height={30} />
          <div className="mt-5  font-bold">Table1</div>
        </div>
        <div className="border border-red-400 flex flex-col items-center justify-center">
        <Image src="Vector (2).svg" alt="" width={70} height={30} />
          <div className="mt-5  font-bold">Table2</div>
        </div>
        <div className="border border-red-400 flex flex-col items-center justify-center">
        <Image src="Vector (1).svg" alt="" width={70} height={30} />
          <div className="mt-5  font-bold">Table3</div>
        </div>
        <div className="border border-red-400 flex flex-col items-center justify-center">
        <Image src="Vector (2).svg" alt="" width={70} height={30} />
          <div className="mt-5  font-bold">Table4</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 h-[250px] mt-3 mr-5 ml-5 mb-3 text-xl text-center">
        <div className="border border-red-400">A5</div>
        <div className="border border-red-400">A6</div>
        <div className="border border-red-400">A7</div>
        <div className="border border-red-400 text-[40px] bg-yellow-200 flex items-center justify-center">
         <span className="">+</span>
          </div>
      </div> */}
     </main>
  );
};
export default Header;
