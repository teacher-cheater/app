import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
//import Paginate from './Paginate';

function App() {
  const [data, setData] = useState([]);
  const [allEmoji, setAllEmoji] = useState([]);
  console.log(data);


  const [cardsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = data.slice(firstCardIndex, lastCardIndex);

  function paginate(arg) {
    setCurrentPage(arg)
  }

  console.log(currentCards);

  useEffect(() => {
    //fetch(url)
    //  .then((res) => res.json())
    //  .then((data) => {
    //    setData(data)
    //    setAllEmoji(data)
    //  });

    axios.get("https://63f4e22355677ef68bc5fb32.mockapi.io/emoji")
      .then((response) => {
        setData(response.data)
        setAllEmoji(response.data)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }, []);

  function searchEmoji(event) {
    let inputValue = event.target.value.trim();
    let searchValues = inputValue.split(" ");
    let newDataEmojies = allEmoji;

    searchValues.forEach((inputWord) => {
      newDataEmojies = newDataEmojies.filter((emoji) =>
        (emoji.title.toLowerCase().includes(inputWord.toLowerCase()))
      );
    });

    setData(newDataEmojies);
  }

  const arrNumber = [];
  const pageCount = Math.ceil(data.length / cardsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    arrNumber.push(i);
  }

  return (
    <div>
      <h1>Emoji</h1>
      <div className='content'>
        <input onChange={searchEmoji}
          className="inpt"
          type="text"
          placeholder="Search emoji..."
        />
      </div>

      {currentCards
        .map((elem, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              border: "1px solid #000",
              marginBottom: "10px",
            }}
          >
            <div style={{ textAlign: "center", fontSize: "45px" }}>
              {elem.symbol}
            </div>
            <h3 style={{ textAlign: "center" }}>{elem.title}</h3>
            <p style={{ textAlign: "center" }}>{elem.keywords}</p>
          </div>
        ))}
      {/*<Paginate data={data} cardsPerPage={cardsPerPage} paginate={paginate} />*/}

      <div>
        <ul>
          {arrNumber.map((page, index) => (
            <li key={index} onClick={() => paginate(page)}>
              <a href="#!">{page}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
