# Проект Jira Project Assistant

**Jira Project Assistant** – Приложение-помощник для управления проектами в Jira. Показывает проблемные задачи и позволяет автоматически исправлять некоторые из них через Jira API. Развертывается на Atlassian Forge.

## Технологии

- **React**
- **Material-UI (MUI)**
- **Jira V3 API**
- **Redux**
- **TypeScript**
- **Docker**
- **Atlassian Forge**

## Установка

Для того чтобы запустить проект:

1. Клонируйте репозиторий:

   ```
   git clone https://github.com/ArtemRazmeritsa/Jira-Project-Assistant.git
   ```

2. Перейдите в директорию проекта:

   ```
   cd Jira-Project-Assistant
   ```

3. Установите зависимости:

   ```
   npm install
   ```

4. Запустите проект:
   ```
   npm run dev
   ```

После этого проект будет доступен на `http://localhost:5173`.


## Архитектура

Проект построен на архитектуре Feature-Sliced Design. Структура включает три слоя:

- app — основной функционал и инициализация;

- features — бизнес-логика и реализация отдельных фич;

- shared — переиспользуемые компоненты, api, типы;
