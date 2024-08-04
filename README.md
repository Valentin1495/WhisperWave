<h1 align="center">WhisperWave</h1>

<p align="center">
  실시간 그룹 챗 애플리케이션
</p>
<br/>

## Demo

https://github.com/Valentin1495/WhisperWave/assets/69514169/9f12c1f6-4178-4334-bc7b-0475f098b9da

## Features

- 사용자 이름 & 비밀번호 로그인 - Clerk

- 서버 생성/수정/삭제

- 채널 생성/수정/삭제

- 초대 링크 접속 - 서버 참가

- 실시간 메시지 송수신/수정/삭제 - Socket.io

- Websocket 연결 실패 시: 경고 메시지 표시 & 1초 지연 통신 - React Query

- 멤버 관리 (강퇴, Guest/Mod 역할 변경)

- 라이트/다크 모드

## Tech Stack

- 코어: React, TypeScript, Next.js
- 상태 관리: React Query, Zustand
- 스타일링: Tailwind CSS
- UI 컴포넌트: shadcn/ui
- ORM: Prisma
- 데이터베이스: Neon (PostgreSQL)
- 패키지 매니저: NPM
- CI/CD: Railway
