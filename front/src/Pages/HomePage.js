import React, { useState, useEffect } from "react";

import ListMovies from "../Components/ListMovies.js";
import PaginationComponent from "../Components/PaginationComponent.js";

function Count({ count }) {
  return <div>Count : {count}</div>;
}

export default function HomePage() {
  let [movies, setMovies] = useState([]);
  let [query, setQuery] = useState("");
  let [page, setPage] = useState(0);
  let [total, setTotal] = useState(0);
  let [reload, setReload] = useState(0);

  useEffect(
    () => {
      const fetchMovies = async () => {
        const resRaw = await fetch(`./movies?query=${query}&page=${page}`);
        const res = await resRaw.json();

        console.log("Got data", res);
        setMovies(res.movies);
        setTotal(res.total);
      };

      console.log("Fetching DATA", query);
      fetchMovies();

      return () => {
        console.log("Will unmount");
        //do any cleanup;
      };
    },
    [reload, page] // Only run the effect once
  );

  const onChangePage = (_page) => {
    setPage(_page);
  };

  console.log("render HomePage", movies, query);
  return (
    <div>
      <h1>Movies Explorer</h1>

      <label className="form-label">
        Search:{" "}
        <input
          className="form-control"
          type="text"
          onChange={(evt) => {
            setQuery(evt.target.value);
          }}
          onKeyPress={(evt) => {
            console.log("keypress", evt.keyCode, evt.code);
            if (evt.code === "Enter") {
              console.log("Reload Data");
              setReload(reload + 1);
            }
          }}
          value={query}
        />
        <button
          onClick={() => {
            const now = new Date();

            console.log("time is ", now);
            setReload(reload + 1);
          }}
        >
          Search
        </button>
      </label>
      <ListMovies movies={movies}></ListMovies>

      <PaginationComponent
        total={total}
        page={page}
        onChangePage={setPage}
      ></PaginationComponent>

      <Count count={reload} />
    </div>
  );
}
