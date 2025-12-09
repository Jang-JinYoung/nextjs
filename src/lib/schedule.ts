import * as schedule from "@/types/schedule";

export async function getScheduleList(): Promise<schedule.ScheduleItem[]> {
  return [
    {
      id: 1,
      storeName: "스타벅스 강남점",
      time: "10:30",
      url: "https://www.starbucks.co.kr",
    },
    {
      id: 2,
      storeName: "을지로 김밥천국",
      time: "12:00",
    },
    {
      id: 3,
      storeName: "카카오프렌즈 스토어",
      time: "15:00",
      url: "https://store.kakaofriends.com",
    },
  ];
}
