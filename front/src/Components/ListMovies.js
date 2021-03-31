import React from "react";
import PropTypes from "prop-types";

const ListMovies = ({ movies }) => {
  const renderMovies = () => {
    let res = [];
    let i = 0;
    for (let m of movies) {
      res.push(<div key={"Movie" + i}>{m.title}</div>);
      i += 1;
    }
    return res;

    // return movies.map((m, i) => <div key={"Movie" + i}>{m.title}</div>);
  };

  return <div className="ListMovies">{renderMovies()}</div>;
};

ListMovies.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default ListMovies;
