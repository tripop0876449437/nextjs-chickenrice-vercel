import { Image } from "antd";
import Input from "antd";

const Orderlist = () => {
  return (
  <main>
    <div className="border border-red-500 w-[300px] h-[450px] ml-5 mt-5">
      <div className="flex justify-center mt-5 text-yellow-500 text-2xl">
        เพิ่มเมนู
      </div>
      <div className="border border-red-500 w-[201px] h-[201px] ml-[50px] mt-10">
        <Image src="" alt="" />
        <p className="flex justify-center items-center mt-[50px] text-red-500 text-2xl font-bold">
          เพิ่มรูป
        </p>
      </div>
      <div className="grid grid-rows-2">
        <div className="grid grid-rows-1 mt-3 ml-3 text-red-500">
          <div>ชื่อสินค้า</div>
            
        </div>
        <div className="grid grid-rows-1 mt-3 ml-3 text-red-500">
          <div>ราคา</div>

        </div>
      </div>

      <div className="mt-4 ml-[100px] border border-green-500 w-[81px] h-[42px] flex justify-center items-center">
        <button className="text-green-500">เพิ่มเมนู</button>
      </div>
    </div>
  </main>
  );
};
export default Orderlist;
