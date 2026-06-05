export async function onRequest(context) {
  try {
    // KV 데이터베이스에서 'current_version'과 'download_url' 두 가지 값을 가져옴
    // 데이터가 아직 비어있다면 기본값(1.0.0과 네 웹사이트 주소)을 대신 넣어줌
    const version = await context.env.MEAL_KV.get("current_version") || "1.0.0";
    const url = await context.env.MEAL_KV.get("download_url") || "https://hcu-meal.pages.dev";
    
    // 버전과 링크를 하나의 JSON 덩어리로 예쁘게 묶어서 반환함
    return new Response(JSON.stringify({ 
      version: version,
      download_url: url 
    }), { 
      headers: { "Content-Type": "application/json; charset=utf-8" } 
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: "KV 설정이나 연결에 오류가 있습니다!" }), { 
      headers: { "Content-Type": "application/json; charset=utf-8" } 
    });
  }
} 
