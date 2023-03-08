import React from "react";

function Paginate({ data, cardsPerPage, paginate }) {
  const arrNumber = [];
  const pageCount = Math.ceil(data.length / cardsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    arrNumber.push(i);
  }

  return (
    <div>
      <ul>
        {arrNumber.map((page, index) => (
          <li key={index} onClick={() => paginate(page)}>
            <a href="!#">{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Paginate;
