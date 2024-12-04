import { useEffect, useState } from "react";

const Diaries = () => {
  const diariesInit = {
    id: "",
    title: "",
    date: "",
    content: "",
    mood: "",
    weather: "",
  };
  const [diariesID, setDiariesID] = useState([]);
  const [diariesData, setDiariesData] = useState(diariesInit);
  const [putData, setPutData] = useState(diariesInit);
  const moodList = ["즐거움", "기쁜", "평범", "화남", "슬픔"];
  const weatherList = ["맑음", "흐림", "비", "눈"];

  const hendleChange = e => {
    const { name, value } = e.target;
    setDiariesData({ ...diariesData, [name]: value });
  };
  const hendleSubmit = async e => {
    e.preventDefault();
    postDiaries();
  };
  const getDiaries = async () => {
    try {
      const res = await fetch(`http://localhost:5000/diaries`);
      const data = await res.json();
      //새로 리랜더링하라!
      console.log(data);
      setDiariesID(data);
    } catch (error) {
      console.log(`에러입니다 : ${error}`);
      console.log(`잠시 후 다시 시도해주세요.`);
    }
  };
  const postDiaries = async () => {
    try {
      const res = await fetch(`http://localhost:5000/diaries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diariesData),
      });
      alert("일기가 등록되었습니다.");
      getDiaries();
      setDiariesData(diariesInit);
    } catch (error) {
      console.log(`네트워크가 불안정합니다. ${error}`);
      console.log(`잠시후 다시 시도해 주세요.`);
    }
  };
  const diariesDelete = async _id => {
    try {
      const res = await fetch(`http://localhost:5000/diaries/${_id}`, {
        method: "DELETE",
      });
      alert("일기가 삭제되었습니다.");
      getDiaries();
    } catch (error) {
      console.log(`네트워크가 불안정합니다. ${error}`);
      console.log(`잠시후 다시 시도해 주세요.`);
    }
  };
  const diariesPut = async diary => {
    const { title, date, content, mood, weather } = putData;
    try {
      await fetch(`http://localhost:5000/diaries/${diary.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date,
          content,
          mood,
          weather,
        }),
      });
      getDiaries();
      alert("수정되었습니다.");
    } catch (error) {
      console.log(`서버가 불안정합니다. ${error}`);
      console.log(`잠시 후 시도해주세요`);
    }
  };
  const getDiariesDetail = async diary => {
    try {
      const res = await fetch(`http://localhost:5000/diaries/${diary.id}`);
      const data = await res.json();
      setDiariesData(data);
      setPutData(data);
    } catch (error) {
      console.log(`네트워크 오류입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };
  useEffect(() => {
    getDiaries();
    return () => {};
  }, []);
  return (
    <div>
      <form onSubmit={e => hendleSubmit(e)}>
        <div>
          <h1>일기장</h1>
          <div>
            <label>제목 : </label>
            <input
              type="text"
              name="title"
              value={diariesData.title}
              onChange={e => hendleChange(e)}
            ></input>
          </div>
          <div>
            <label>날짜 : </label>
            <input
              type="date"
              name="date"
              value={diariesData.date}
              onChange={e => hendleChange(e)}
            ></input>
          </div>
          <div>
            <label>내용 : </label>
            <textarea
              type="text"
              name="content"
              value={diariesData.content}
              onChange={e => hendleChange(e)}
            ></textarea>
          </div>
          <div>
            {moodList.map((value, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "inline-block", marginRight: "10px" }}
                >
                  <input
                    id={`mood${index}`}
                    type="radio"
                    name="mood"
                    value={moodList.indexOf(value)}
                    onChange={e => hendleChange(e)}
                  />
                  <label htmlFor={`mood${index}`}>{value}</label>
                </div>
              );
            })}
            {console.log(diariesData.mood)}
          </div>
          <div>
            {weatherList.map((value, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "inline-block", marginRight: "10px" }}
                >
                  <input
                    id={`weather${index}`}
                    type="radio"
                    name="weather"
                    value={weatherList.indexOf(value)}
                    onChange={e => hendleChange(e)}
                  />
                  <label htmlFor={`weather${index}`}>{value}</label>
                </div>
              );
            })}
          </div>
          <button type="submit">일기추가</button>
        </div>
      </form>
      <div>
        <h2>일기 목록</h2>
        {diariesID.map(diary => (
          <li key={diary.id}>
            <h3>{diary.title}</h3>
            <p>{diary.date}</p>
            <p>{diary.content}</p>
            <p>기분: {moodList[diary.mood]}</p>
            <p>날씨: {weatherList[diary.weather]}</p>
            <button onClick={() => diariesDelete(diary.id)}>삭제</button>
            <button onClick={() => getDiariesDetail(diary)}>상세보기</button>
            <button onClick={() => diariesPut(diary)}>수정</button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Diaries;
