/*
@docs https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
Next.js 서버 컴포넌트에서 fetch를 권장하는 이유
1. 서버에 가까운 데이터 페칭
	•	서버 컴포넌트는 서버 내에서 실행되므로, 데이터 소스에 더 가까운 위치에서 데이터를 가져올 수 있어 네트워크 지연이 줄어듭니다.
2. 자동 캐싱 및 중복 요청 방지
	•	Next.js의  fetch 는 서버 컴포넌트에서 호출 시 자동 요청 중복 제거(request deduplication) 및 캐싱을 지원해, 같은 데이터 요청을 여러 번 하지 않고 효율적으로 처리합니다.
	•	캐시는 영구 HTTP 캐시로, CDN과 같은 인프라에서 글로벌로 분산하여 빠른 응답을 가능하게 합니다.
3. 서버 전용 최적화 기능 통합
	•	 fetch  API는 Next.js에서 요청별로 캐싱 정책( cache ,  revalidate  등)을 제어할 수 있도록 확장되어 있어 빌드 시점, 런타임 등에서 효율적인 데이터 갱신 관리가 가능합니다.
	•	이러한 최적화는 외부 라이브러리인 Axios로는 기본적으로 지원되지 않습니다.
4. 번들 사이즈 감소 및 환경 통합성
	•	 fetch 는 브라우저와 서버 모두에서 네이티브로 지원되어 별도 추가 설치가 필요 없고, 번들 사이즈가 늘어나지 않습니다.
	•	반면 Axios는 라이브러리를 추가로 설치하고 관리해야 하며, 서버에서 사용 시 별도의 Node.js HTTP 클라이언트 설정이 필요할 수 있습니다.
5. 보안상 이점
	•	서버 컴포넌트에서 실행되는  fetch 는 클라이언트에 API 키 등 민감한 데이터가 노출되지 않도록 할 수 있어 보안에 유리합니다.
*/
export const fetcher = (url: string) =>
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // 인증 토큰 등 추가 가능
            // Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        next: {
            // 데이터를 시간 간격에 따라 재검증
            // revalidate: 60, // ISR 적용, 60초마다 재검증
        },
    }).then((res) => {

        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
    });
