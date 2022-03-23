# Команда "CJ" | Социальная сеть vk.com

## Общие сведения

### Авторы

- [**Даниил Бахланов**](https://github.com/Similization) - _Фронтенд_
- [**Ринат Хайруллин**](https://github.com/rinatkh) - _Бэкенд_
- [**Частиков Александр**](https://github.com/papazloynt) - _Бэкенд_
- [**Оганес Мирзоян**](https://github.com/senago) - _Фронтенд_

### Репозиторий backend: [ссылка](https://github.com/go-park-mail-ru/2022_1_CJ)

### Репозиторий frontend: [ссылка](https://github.com/frontend-park-mail-ru/2022_1_CJ)

### Ссылка на API документацию [swagger](https://github.com/go-park-mail-ru/2022_1_CJ/blob/main/api/swagger.yaml)

## Архитектура frontend

- `components` - компоненты приложения (e.g., header)
- `views` - страницы приложения
- `core/adapters` - функции, взаимодействующие с `View` (добавление компонентов, контекста); вызываются непосредственно перед отрисовкой `View`
- `core/constants` - различные константы, объекты со всеми шаблонами, `Component`, `View` и т.д.
- `core/models` - базовые модели
  - `Component` - базовая модель компонента, компоненты можно вкладывать друг в друга
  - `View` - расширение `Component`, позволяет добавить `adapters` и контроль исполнения
- `core/modules` - модули (синглтоны) для работы приложения
  - `EventBus` - сущность для подписывания на события и создания их
  - `Router` - SPA роутер
- `core/network`
  - `dto` - классы, хранящие данные для осуществленния запроса
  - `services` - функции для осуществления запросов и генерации событий в `EventBus`
