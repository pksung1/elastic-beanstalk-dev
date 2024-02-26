# nestjs-boilerplate 프로젝트

빠른 개발을 위해 만든 NestJS Boilerplate 입니다.

## Setup
```shell
pnpm install
pnpm run env:local        # 로컬환경 .env 파일 생성
pnpm run docker:local     # 로컬환경 docker 실행
pnpm run prisma:migrate   # prisma migrate 실행 (최초 1회)
pnpm run seed:local       # 로컬에 db seed 추가
```

```shell
pnpm run docker:local     # 도커가 실행되지 않은 상태라면 실행
pnpm run prisma:generate  # prisma client 생성
pnpm run start:dev        # 개발서버 실행
```

## 사용된 기술

