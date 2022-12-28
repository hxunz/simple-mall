### 실행 환경
Next.js & Typescript를 기반으로 만든 웹 페이지 입니다.
Redux를 사용하여 상태 관리를 하였고 Emotion을 사용하여 css 스타일을 지정했습니다.

### 실행 방법
아래 커맨드를 입력하면 확인할 수 있습니다.
```
npm install
npm run build
npm run start
```
## 추가 기능

기본적인 요구사항 외에 추가 개발된 기능들입니다.

### 홈페이지 url인 http://localhost:3001 에서 /products를 입력할 경우 /products 페이지로 이동합니다.

- 홈페이지에서 header 부분에 BEST 버튼을 누르면 products 페이지로 이동합니다.
- 사용자에게 명확한 피드백을 주기 위해서 상품을 장바구니에 담은 후 다시 담을 때 이미 장바구니에 추가된 상품이라고 명시해주었습니다.
- 장바구니에 추가된 상품의 개수를 /cart 페이지에 진입하지 않더라도 확인할 수 있도록 상품의 개수를 보여주었습니다.

### 홈페이지 url인 http://localhost:3001 에서 /cart를 입력할 경우 /cart 페이지로 이동합니다.

- 오른쪽 상단 장바구니 버튼을 누르면 cart 페이지로 이동합니다.
- 커머스 회사 입장에서 사용자의 상품 구매를 장려하기 위해서 장바구니에 담긴 상품을 삭제하기를 원하는 경우 /products 페이지가 아닌 /cart 페이지에서 처리할 수 있도록 했습니다.
- 총 결제 금액을 명확하게 보여주기 위해서 천 단위마다 콤마를 추가해주었습니다.


#### 회고
과제를 진행하면서 요구 사항을 실현 시키면서 의미있는 변수, 함수의 이름을 짓는 것이 어렵다는 것을 느꼈습니다. 커밋을 작성하면서 커밋을 제대로 쪼개지 못했다는 생각이 들어 협업할 때에는 더욱 주의해야겠다는 생각이 들었습니다. 의존성 관리를 어떻게 해야할 것이며, 전역적인 상태관리를 언제, 어떻게 해야할지에 대한 고민을 깊게 해볼 수 있었던 시간이었습니다.
총 결제 금액을 보여줄때 몇개의 상품에 대한 금액인지를 사용자가 알 수 있도록 수량 표시를 해주면 더 좋을 것 같다는 생각이 들었고 장바구니에서 상품 전체를 결제 할 때 상품들을 하나씩 누르는 것 보다 전체 상품을 한번에 선택할 수 있는 체크박스가 있으면 좋을 것 같다는 생각이 들었습니다.
