import { useEffect, useState } from "react";

const Test = () => {
  const [diaries, setDiaries] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    content: "",
    mood: 0,
    weather: 0,
  });

  // 기분과 날씨에 대한 텍스트 변환 함수
  const moodOptions = ["즐거움", "기쁜", "평범", "화남", "슬픔"];
  const weatherOptions = ["맑음", "흐림", "비", "눈"];

  // 컴포넌트가 마운트될 때 일기 목록을 가져옵니다.
  useEffect(() => {
    fetchDiaries();
  }, []);

  // 일기 데이터 가져오기 (GET 요청)
  const fetchDiaries = async () => {
    try {
      const response = await fetch("http://localhost:5000/diaries");
      const data = await response.json();
      setDiaries(data);
    } catch (error) {
      console.error("Error fetching diaries:", error);
    }
  };

  // 폼 입력값 처리
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 새 일기 추가 (POST 요청)
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await response.json();
      fetchDiaries(); // 새로 추가된 일기 목록을 가져옴
      setFormData({ title: "", date: "", content: "", mood: 0, weather: 0 }); // 폼 초기화
    } catch (error) {
      console.error("Error adding diary:", error);
    }
  };

  // 일기 삭제 (DELETE 요청)
  const handleDelete = async id => {
    try {
      await fetch(`http://localhost:5000/diaries/${id}`, {
        method: "DELETE",
      });
      fetchDiaries(); // 삭제 후 일기 목록을 갱신
    } catch (error) {
      console.error("Error deleting diary:", error);
    }
  };

  // 일기 업데이트 (PUT 요청)
  const handleUpdate = async (id, updatedDiary) => {
    try {
      await fetch(`http://localhost:5000/diaries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDiary),
      });
      fetchDiaries(); // 업데이트 후 일기 목록을 갱신
    } catch (error) {
      console.error("Error updating diary:", error);
    }
  };

  return (
    <div>
      <h1>오늘의 일기</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="내용"
          required
        />
        <select
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          required
        >
          <option value={0}>기분</option>
          {moodOptions.map((mood, index) => (
            <option key={index} value={index}>
              {mood}
            </option>
          ))}
        </select>
        <select
          name="weather"
          value={formData.weather}
          onChange={handleChange}
          required
        >
          <option value={0}>날씨</option>
          {weatherOptions.map((weather, index) => (
            <option key={index} value={index}>
              {weather}
            </option>
          ))}
        </select>
        <button type="submit">일기 추가</button>
      </form>

      <h2>일기 목록</h2>
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <h3>{diary.title}</h3>
            <p>{diary.date}</p>
            <p>{diary.content}</p>
            <p>기분: {moodOptions[diary.mood]}</p>
            <p>날씨: {weatherOptions[diary.weather]}</p>
            <button onClick={() => handleDelete(diary.id)}>삭제</button>
            <button
              onClick={() => handleUpdate(diary.id, { ...diary, mood: 1 })}
            >
              기분 업데이트
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
