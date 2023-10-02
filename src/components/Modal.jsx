export default function Modal({ title, children }) {
  return (
    <>
      <div className="fixed inset-0 bg-white opacity-70 z-20"></div>
      <div className="fixed inset-0 z-30">
        <div className="flex justify-center items-center min-h-full p-4">
          <div className="rounded-lg w-full bg-white shadow-2xl border">
            {/* Header */}
            <div className="flex justify-between p-4 text-xl border-b">
              <div className="invisible">X</div>
              <div className="font-bold">{title}</div>
              <div className="text-gray-500 cursor-pointer">X</div>
            </div>
            {/* Body */}
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}