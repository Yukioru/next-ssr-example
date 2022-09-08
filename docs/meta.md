# Meta

[Исходный код **Meta.jsx**](https://github.com/yukioru/next-ssr-example/blob/main/containers/Meta.jsx)

### Для чего?

Позволяет вставлять базовую + SEO мета информацию на страницу

Можно использовать на страницах `pages/**`

### Как использовать?

Импортировать компонент в нужную страницу

```js
import Meta from '@/containers/Meta';
```

Использовать на странице

```js
<Meta
  url="/dashboard"
  title="Панель управления"
  description="Используйте панель управления для быстрого взаимодействия с сайтом"
/>
```

### Что доступно?

| **Ключ**      | **Описание**                                                                                                                                       | **По-умолчанию**         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| title         | Заголовок страницы не включая брендовое название сайта. Можно использовать ключи переводов i18n. Также используется в jd+json как `name`           | meta.title               |
| description   | Описание страницы. Можно использовать ключи переводов i18n. Также используется в jd+json как `about`                                               | meta.description         |
| image         | Изображение бренда или контента страницы                                                                                                           | /meta/icon-512x512.png   |
| indexing      | Указывает поисковым ботам, должна ли индексироваться эта страница.                                                                                 | true                     |
| schemaType    | @type для генерации ld+json разметки. [Подробнее о типах](https://developers.google.com/search/docs/advanced/structured-data/sitelinks-searchbox). | WebSite                  |
| url           | Относительный путь до страницы. Host подставляется автоматически. Также используется в jd+json                                                     | /                        |
| openGraphType | og:type для идентификации типа отображаемого материала. [Подробнее о типах](https://ogp.me/#types).                                                | website                  |
| createdAt     | Дата создания контента. В формате ISO string                                                                                                       | new Date().toISOString() |
| updatedAt     | Дата обновления контента. В формате ISO string                                                                                                     | new Date().toISOString() |
| jdJson        | Дополнительные параметры микроразметки. [Подробности](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data).   | {}                       |
