import { useState } from "react";

const Sample3 = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>보기</button>
      {open && (
        <div>
          팝업창
          <button onClick={closeModal}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default Sample3;
