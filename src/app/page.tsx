type Props = {};

export default async function IndexSSRPage({}: Props) {

  return (
  <div className="w-full h-full p-20 bg-white flex-col justify-start items-end gap-4 inline-flex">
     <div className="self-stretch justify-start items-start gap-4 inline-flex ml-20">
        <button className="grow shrink basis-0 p-4 bg-white border border-black flex-col justify-start items-center gap-4 inline-flex">
            <img className="w-[60px] h-[60px] relative" src="Frame 94.png"/>
            <div className="text-black text-[40px] font-bold font-['Inter']">หน้าร้าน</div>
        </button>

        <button className="grow shrink basis-0 p-4 border border-black flex-col justify-start items-center gap-4 inline-flex">
            <img className="w-[60px] h-[60px] relative" src="Frame 95.png" />
            <div className="text-black text-[40px] font-bold font-['Inter']">ซื้อกลับบ้าน</div>
        </button>

        <button className="grow shrink basis-0 p-4 border border-black flex-col justify-start items-center gap-4 inline-flex">
            <img className="w-[60px] h-[60px] relative" src="Frame 96.png" />
            <div className="text-black text-[40px] font-bold font-['Inter']">ออเดอร์วันนี้</div>
        </button>

    </div>
  </div>
  );
}
