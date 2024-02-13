import Input from "antd/es/input/Input";

type Props = {};

export default async function IndexSSPage({}: Props) {
  return (
    <main>
      <div className="w-full p-20 bg-white flex-col justify-start gap-4 inline-flex">
        <div className="flex flex-cols-6 gap-[1300px]">
          <div className="flex-cols-3 justify-start items-start ">user</div>
          <div className="flex-cols-3 justify-end items-end">Logout</div>
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <button className="grow shrink basis-0 p-4 bg-red-900 border border-red-400 flex-col justify-start items-center gap-4 inline-flex">
            <img className="w-[60px] h-[60px] relative" src="" />
            <div className="text-black text-[40px] font-bold font-['Inter']">
              หน้าร้าน
            </div>
          </button>

          <div className="grow shrink basis-0 p-4 border border-red-400  flex-col justify-start items-center gap-4 inline-flex">
            <img className="w-[60px] h-[60px] relative" src="" />
            <div className="text-black text-[40px] font-bold font-['Inter']">
              ซื้อกลับบ้าน
            </div>
          </div>

          <div className="grow shrink basis-0 p-4 border border-red-400  flex-col justify-start items-center gap-4 inline-flex">
            <img className="w-[60px] h-[60px] relative" src="" />
            <div className="text-black text-[40px] font-bold font-['Inter']">
              ออเดอร์วันนี้
            </div>
          </div>
        </div>

        <div className="flex justify-end items-end">
          <div className="">ว่าง</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 justify-center items-center ml-13">
        <div className="ml-4 grid-cols-1 h-[300px] border border-red-500 ">
          Table1
        </div>
        <div className="grid-cols-1 h-[300px] border border-red-500">
          Table2
        </div>
        <div className="grid-cols-1 h-[300px] border border-red-500">
          Table3
        </div>
        <div className="mr-4 grid-cols-1 h-[300px] border border-red-500">
          Table4
        </div>
      </div>

      <div className="ml-4  h-[300px] border border-red-500">Table1</div>
      <div className="g h-[300px] border border-red-500">Table2</div>
      <div className=" h-[300px] border border-red-500">Table3</div>
      <div className="mr-4  h-[300px] border border-red-500">Table4</div>
    </main>
  );

  // return (
  //   <>
  //     <div className="h-full mt-20">
  //       <div className="felx justify-center items-center h-full">
  //         <div className="">
  //           <div className="text-center">
  //             <label className="text-yellow-400 text-xl font-bold ml-28">
  //               เพิ่มหมวดหมู่
  //             </label>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="grid grid-cols-2 justify-start items-center">
  //       <div className="grid-cols-1">
  //         <label className="text-red-400 text-base font-normal ml-[650px] ">
  //           ชื่อหมวดสินค้า
  //         </label>
  //       </div>

  //       <div className="grid-cols-1">
  //         <div className="mt-3 mr-96 ">
  //           <Input size="large" width={100} />
  //         </div>
  //       </div>
  //     </div>

  //     <div className="justify-center items-center ml-[750px] mt-6">
  //       <button className="border border-green-600 text-green-600 rounded-md h-7 w-40">
  //         เพิ่มหมวดหมู่
  //       </button>
  //     </div>
  //   </>
  // );
}
