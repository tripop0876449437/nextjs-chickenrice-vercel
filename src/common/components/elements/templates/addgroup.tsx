import Input from "antd/es/input/Input";

type Props = {};

export default async function IndexSSPage({}: Props) {
  return (
      <>
        <div className="h-full mt-20">
          <div className="felx justify-center items-center h-full">
            <div className="">
              <div className="text-center">
                <label className="text-yellow-400 text-xl font-bold ml-28">
                  เพิ่มหมวดหมู่
                </label>
              </div>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-2 justify-start items-center">
          <div className="grid-cols-1">
            <label className="text-red-400 text-base font-normal ml-[650px] ">
              ชื่อหมวดสินค้า
            </label>
          </div>
  
          <div className="grid-cols-1">
            <div className="mt-3 mr-96 ">
              <Input size="large" width={100} />
            </div>
          </div>
        </div>
  
        <div className="justify-center items-center ml-[750px] mt-6">
          <button className="border border-green-600 text-green-600 rounded-md h-7 w-40">
            เพิ่มหมวดหมู่
          </button>
        </div>
      </>
    );
}