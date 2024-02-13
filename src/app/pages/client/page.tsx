import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
    <>
    <div className="w-full p-20 bg-white flex-col justify-start gap-4 inline-flex">
       <div className="self-stretch justify-start items-start gap-4 inline-flex">

           <button className="grow shrink basis-0 p-4 bg-zinc-300 border border-black flex-col justify-start items-center gap-4 inline-flex">
           <img className="w-[60px] h-[60px] relative" src="Frame94.png"/>
           <div className="text-black text-[40px] font-bold font-['Inter']">หน้าร้าน</div>
           </button>

           <div className="grow shrink basis-0 p-4 border border-black flex-col justify-start items-center gap-4 inline-flex">
           <img className="w-[60px] h-[60px] relative" src="Frame95.png" />
           <div className="text-black text-[40px] font-bold font-['Inter']">ซื้อกลับบ้าน</div>
           </div>

           <div className="grow shrink basis-0 p-4 border border-black flex-col justify-start items-center gap-4 inline-flex">
           <img className="w-[60px] h-[60px] relative" src="Frame96.png" />
          <div className="text-black text-[40px] font-bold font-['Inter']">ออเดอร์วันนี้</div>
           </div>
       </div>

       <div className=" w-[700px] justify-start bg-gray-300  flex-row">
         <div className="flex justify-between">
           AA
         </div>
       </div>

     </div>
    </>
  );
}