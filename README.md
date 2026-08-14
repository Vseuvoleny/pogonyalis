# Pogonyalis Monorepo

Монорепозиторий на базе **pnpm workspaces + Turborepo**, объединяющий веб-приложение, REST API и мобильное приложение с общим UI-пакетом.

## Технологии

- **Менеджер пакетов**: pnpm 8.10.0
- **Сборка/оркестрация**: Turborepo
- **Язык**: TypeScript

## Структура

```
pogonyalis/
├── apps/
│   ├── web/      # Next.js 14 (App Router) + React 18 + MUI
│   ├── api/      # NestJS 10 REST API
│   └── mobile/   # React Native + Expo
├── packages/
│   └── ui/       # @pogonyalis/ui — общий TypeScript-пакет
├── turbo.json
└── pnpm-workspace.yaml
```

### apps/web

Веб-клиент на **Next.js 14** с App Router и серверными компонентами.

- React 18, TypeScript
- UI: MUI (Material UI), Emotion
- Формы: React Hook Form
- Стили: SCSS-модули
- Архитектура: [Feature-Sliced Design](https://feature-sliced.design/ru/) (`src/fsd/`) — слои `pages` и `widgets`
- Маршруты App Router (`app/`): главная, список «разборов» (`debriefings`), новый разбор
- `transpilePackages` подключает `@pogonyalis/ui`

### apps/api

REST API на **NestJS 10** (Express, TypeScript).

### apps/mobile

Мобильное приложение на **React Native 0.72** через **Expo** (iOS / Android / Web).

### packages/ui

`@pogonyalis/ui` — общий TypeScript-пакет, используемый `web` и `mobile`. Собирается через `tsc`, раздаёт типы и сборку из `dist/`.

## Быстрый старт

1. Установить зависимости:

   ```bash
   pnpm install
   ```

2. Запустить всё в режиме разработки:

   ```bash
   pnpm dev
   ```

   Команда параллельно поднимает web, api и mobile (Turborepo сначала собирает зависимости, включая `@pogonyalis/ui`).

## Команды

Запускаются из корня монорепозитория:

| Команда       | Описание                                                |
| ------------- | ------------------------------------------------------- |
| `pnpm dev`    | Запуск всех приложений в dev-режиме (параллельно)       |
| `pnpm build`  | Сборка всех пакетов и приложений (`next build` и т. д.) |
| `pnpm lint`   | Прогон линтеров в каждом workspace                      |

Команды конкретного workspace можно запускать точечно: `pnpm --filter @pogonyalis/web dev`.

### apps/web

- `pnpm dev` — `next dev`
- `pnpm build` — `next build`
- `pnpm start` — `next start` (продакшн-сервер после сборки)

### apps/api

- `pnpm dev` / `pnpm start:dev` — `nest start --watch`
- `pnpm build` — `tsc -p tsconfig.build.json`
- `pnpm start` — `node dist/main.js`

### apps/mobile

- `pnpm start` — `expo start`
- `pnpm android` — `expo run:android`
- `pnpm ios` — `expo run:ios`
- `pnpm web` — `expo start --web`

## Заметки

- Линтер во всех workspaces пока заглушён (`echo "No lint configured"`).
- Версии SDK и библиотек зафиксированы в соответствующих `package.json` каждого приложения.
