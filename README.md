<h1 align="center">WhisperWave</h1>

<p align="center">
  실시간 그룹 챗 애플리케이션
</p>
<br/>

## Demo

https://github.com/user-attachments/assets/db6fd15a-94a0-4978-a516-e2fd257ca243

## Features

- 사용자 이름 & 비밀번호 기반 사용자 인증 - Clerk

- 쿠키를 통한 세션(JWT) 기반 사용자 인증 - jose

- 서버 생성/수정/삭제

- 채널 생성/수정/삭제

- 초대 링크 접속 - 서버 참가

- 실시간 메시지 송수신/수정/삭제 - Socket.IO

- Websocket 연결 실패 시: 경고 메시지 표시 & 1초 지연 통신 - React Query

- 멤버 관리 (강퇴, Guest/Mod 역할 변경)

- 라이트/다크 모드

## Tech Stack

- 코어: React, TypeScript, Next.js
- 실시간 통신: Socket.IO
- 상태 관리: React Query, Zustand
- 스타일링: Tailwind CSS
- UI 컴포넌트: shadcn/ui
- 사용자 인증: Clerk, jose
- 파일 업로드: UploadThing
- ORM: Prisma
- 데이터베이스: Neon (PostgreSQL)
- 패키지 매니저: NPM
- CI/CD: Railway
