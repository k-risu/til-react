import styled from "@emotion/styled";
import { useState } from "react";

const ColorDiv = styled.div`
  background-color: ${props => props.bg || "red"};
  color: ${props => props.fontColor || "white"};
`;

const Sample5 = () => {
  const [bgColor, setBgColer] = useState("green");
  const [fontColor, setFontColer] = useState("white");
  return (
    <div>
      {/* 버튼을 클릭하면 배경 색상 바꾸기 */}
      <ColorDiv bg={bgColor} fontColor={fontColor}>
        {" "}
        색상이 바뀌어요.{" "}
      </ColorDiv>
      <button
        onClick={() => {
          setBgColer("red");
          setFontColer("green");
        }}
      >
        빨강
      </button>
      <button onClick={() => setBgColer("yellow")}>노랑</button>
      <button onClick={() => setBgColer("blue")}>파랑</button>
    </div>
  );
};

export default Sample5;
