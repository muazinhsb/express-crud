import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1 className="judul">CRUD APP</h1>

      <div className="forms">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />

        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button className="submitButton" onClick={submitReview}>
          Submit
        </button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h2>{val.movieName}</h2>
              <p>{val.movieReview}</p>

              <button
                onClick={() => {deleteReview(val.movieName);}}>
                Delete
              </button>

              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              }} />

              <button onClick={() => {updateReview(val.movieName)}}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
