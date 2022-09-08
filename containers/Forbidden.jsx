import React from 'react';
import Link from 'next/link';

const Forbidden = () => {
  return (
    <>
      <h1>403</h1>
      <p>Доступ запрещен </p>

      <Link href="/">
        <a>Вернуться на главную</a>
      </Link>
    </>
  );
};

export default Forbidden;
