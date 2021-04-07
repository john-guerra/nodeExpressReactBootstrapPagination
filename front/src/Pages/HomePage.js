import React, { useState, useEffect, useRef } from "react";

import ListMovies from "../Components/ListMovies.js";
import PaginationComponent from "../Components/PaginationComponent.js";
import DummyComponent from "../Components/DummyComponent.js";

function Count({ count }) {
  return <div>Count : {count}</div>;
}

export default function HomePage() {
  let [movies, setMovies] = useState([]);
  let [query, setQuery] = useState("");
  let [page, setPage] = useState(0);
  let [total, setTotal] = useState(0);
  let [reload, setReload] = useState(0);

  const inSearchRef = useRef();

  useEffect(() => {
    //Send focus to the search input
    inSearchRef.current.focus();

    console.log("setting focus to input", inSearchRef.current.value);
  });

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
      <DummyComponent id="john"></DummyComponent>
      <h1>Movies Explorer</h1>

      <label className="form-label">
        Search:{" "}
        <input
          ref={inSearchRef}
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

      <hr />

      <DummyComponent id="john"></DummyComponent>

      <Count count={reload} />

      <DummyComponent id="alexis"></DummyComponent>
    </div>
  );
}
