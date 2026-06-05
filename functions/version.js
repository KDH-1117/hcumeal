export async function onRequest(context) {
  try {
    // KV에서 버전 정보 가져오기 (없으면 1.0.0)
    const version = await context.env.MEAL_KV.get("current_version") || "1.0.0";
    
    // 네가 아는 진짜 API들처럼 JSON 형태로 예쁘게 화면에 띄워주기
    return new Response(JSON.stringify({ version: version }), { 
      headers: { "Content-Type": "application/json; charset=utf-8" } 
    });
    
  } catch (error) {
    // 만약 KV 연결이 안 되어있으면 화면에 에러 원인을 띄워줌
    return new Response(JSON.stringify({ error: "KV 설정이 연결되지 않았습니다!" }), { 
      headers: { "Content-Type": "application/json; charset=utf-8" } 
    });
  }
}
