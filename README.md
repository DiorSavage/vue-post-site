## Описание проекта

Добро пожаловать в README сайта с постами! Этот проект представляет собой веб-приложение, где пользователи могут создавать свои посты, оставлять комментарии, ставить лайки и следить за последними обновлениями. Проект разработан с использованием современных технологий, таких как Vue 3, TypeScript, Firebase, Tailwind CSS и других.

Приложение предоставляет удобный интерфейс для взаимодействия с постами и комментариями, а также поддерживает авторизацию через Firebase с сохранением сессии пользователя.

---

## Стек технологий

### Frontend:
- **Vue 3** — прогрессивный JavaScript-фреймворк для создания пользовательского интерфейса.
- **TypeScript** — язык программирования с статической типизацией для улучшения надежности кода.
- **Vuex** — библиотека для управления глобальным состоянием приложения.
- **Vue Router** — библиотека для маршрутизации в Vue-приложении.
- **Tailwind CSS** — утилитарный CSS-фреймворк для быстрой и гибкой стилизации.
- **SASS** — препроцессор CSS для написания сложных стилей.
- **Vite** — современный сборщик для быстрой разработки и сборки проекта.
- **Axios** — HTTP-клиент для выполнения запросов к API.

### Backend:
- **Firebase** — облачная платформа для хранения данных, аутентификации и управления сессиями пользователей.
---

## Возможности проекта

1. **Создание постов**:
   - Пользователи могут создавать новые посты с заголовком, текстом и изображениями.
   - Все посты сохраняются в базе данных Firebase.

2. **Комментарии**:
   - К каждому посту можно оставлять комментарии.
   - Комментарии отображаются в порядке их добавления.

3. **Лайки**:
   - Пользователи могут ставить лайки на понравившиеся посты.
   - Количество лайков обновляется в реальном времени.

4. **Авторизация**:
   - Реализована авторизация через Firebase.
   - После входа в систему пользователь остается авторизованным благодаря сохранению сессии в Firebase.

5. **Следить за последними постами**:
   - На главной странице отображаются последние посты всех пользователей.
   - Посты автоматически обновляются при добавлении новых.

6. **Адаптивный дизайн**
   - Приятный для глаз дизайн под разные устройства
---

## Установка и запуск проекта

### Требования:
- Node.js (версия 18 или выше)
- npm или yarn

### Шаги для установки:

1. **Клонирование репозитория**:
   ```bash
   git clone https://github.com/DiorSavage/vue-post-site.git
   cd vue-post-site
   ```
2. **Настройка firebase config**
    ```js
    import { firebaseConfigvar } from './variables';
    
    const firebaseConfig = {
      apiKey: firebaseConfigvar.apiKey,
      authDomain: firebaseConfigvar.authDomain,
      databaseURL: firebaseConfigvar.databaseURL,
      projectId: firebaseConfigvar.projectId,
      storageBucket: firebaseConfigvar.storageBucket,
      messagingSenderId: firebaseConfigvar.messagingSenderId,
      appId: firebaseConfigvar.appId,
      measurementId: firebaseConfigvar.measurementId
    };
    ```
 - Создайте файл с конфигурацией firebaseConfigvar, в котором определите все поля ( вставите свои данные, **учтите, что ваша бд будет пустой, а значит ни пользователей, ни постов у вас не будет** )

3. **Запуск**
    ```bash
    npm install
    npm run dev
    ```
