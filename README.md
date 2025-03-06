# MeetIn - Six Thinking Hats 기반 실시간 협업 화이트보드 서비스

## 🚀 프로젝트 소개

Six Thinking Hats 기반을 활용한 실시간 협업 도구로, 원격 회의 환경에서도 논리적인 의사 결정을 도움드는 기능을 제공합니다.색상별 생각 방식을 적용해 회의의 화복을 체계적으로 정리하고, 실시간으로 아이디어를 공유할 수 있습니다.

## 🎯 주요 기능

### ✅ Six Thinking Hats 역할 기반 회의 진행

- 파란 모자: 의장 역할 (회의 진행 및 통제)

- 홍새 모자: 정보 중심 생각 (사실과 데이터)

- 빨간 모자: 감정 중심 생각 (직관과 감성)

- 검은 모자: 부정적 생각 (위험과 문제 분석)

- 노란 모자: 공정적 생각 (이점과 가능성)

- 천바람 모자: 창적 생각 (새로운 아이디어 도출)

### ✅ 실시간 공유 시스템 (WebSocket 기반)

- 다수의 사용자와 실시간 회의 가능

- 회의로그 자동 생성 및 저장

### ✅ 색상 가이드라인 제공

- 회의 화복을 색상별 생각 방식으로 구조화

- 혼선 없는 체계적인 통보 가능

## demo
https://github.com/user-attachments/assets/25a36c62-838c-4c16-9a79-7b6f7326df4d

https://github.com/user-attachments/assets/f88b6dbd-4179-4e4d-9e96-41991df03bd8

## 🛠️ 기술 스택

**Frontend**
- **Framework:** React 17.0.2
- **Language:** TypeScript 4.3.5
- **Real-time Communication:**
  - SockJS-client 1.5.1
  - StompJS 2.3.3
  - WebSocket

**UI & Styling**
- **Canvas Manipulation:** 
  - react-konva 17.0.2
  - konva 8.1.1
- **UI Components:**
  - Material-UI Core 4.12.3 (Button 컴포넌트)
  - CSS Modules

**Routing & State Management**
- **Routing:** React Router 5.3.4
- **State Management:** 
  - React Context API
  - React Hooks (useState, useRef, useEffect, useContext)

**Development Tools**
- **Code Quality:**
  - ESLint 7.30.0
  - Prettier 2.3.2
  - TypeScript ESLint

## 🚀 설치 및 실행 방법

1️⃣ 환경 설정
```
git clone https://github.com/your-repo/6-thinking-hat.git
cd 6-thinking-hat
```
2️⃣ 프론트엔드 실행
```
npm install
npm start
```

## 📌 프로젝트 구성

```
Meet_In_demo/
├── .git/
├── .vscode/
├── public/
├── src/
│   ├── assets/
│   │   └── icon/
│   │       ├── sticky-note.png
│   │       ├── pen.png
│   │       ├── highlighter.png
│   │       └── ... (기타 아이콘 파일들)
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   ├── login/
│   │   ├── main/
│   │   ├── makeRoom/
│   │   ├── room/
│   │   ├── signUp/
│   │   └── history/
│   ├── context/
│   │   └── loginContext.tsx
│   ├── utils/
│   │   └── type/
│   │       └── constant/
│   │           └── network.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── package-lock.json
├── yarn.lock
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
└── README.md
```
