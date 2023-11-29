import { useState } from "react";
import Results from "./Results";
import starWarsImg from "../assets/images/starwars-logo.svg";

const Search = () => {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const MAX_QUERY_LENGTH = 30;

  const fetchCharacters = async (searchQuery) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchQuery}`,
      );
      if (!response.ok)
        throw new Error("Server error, please try again later.");

      const data = await response.json();
      setCharacters(data.results.length ? data.results : []);
      setError(data.results.length ? "" : "No characters found.");
    } catch (err) {
      setError("Server error, please try again later.");
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.trim().length > MAX_QUERY_LENGTH) {
      setError("Query too long (Max 30 characters).");
      setCharacters([]);
      return;
    }

    if (!newQuery.trim()) {
      setError("Please enter a valid search query.");
      setCharacters([]);
      return;
    }

    setError("");
    if (newQuery.trim()) {
      fetchCharacters(newQuery.trim());
    } else {
      setCharacters([]);
    }
  };

  return (
    <div
      id="search"
      className="mx-auto min-h-screen flex flex-col px-5 bg-black"
    >
      <div className="mb-16 pt-28 flex items-center justify-center">
        <a href="/">
          <img src={starWarsImg} alt="starwars-logo" className="h-28 w-50" />
        </a>
      </div>
      <div className="items-center justify-center flex">
        <form onSubmit={(e) => e.preventDefault()} className="text-black">
          <div className="border rounded overflow-hidden flex bg-white w-full">
            <input
              type="text"
              className="px-4 py-3 focus:outline-none"
              value={query}
              onChange={handleChange}
              placeholder="Search Star Wars characters"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center px-4 border-l rounded"
            >
              <svg
                className="h-4 w-4 text-grey-dark"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
            </button>
          </div>
          {isLoading && (
            <div className="pt-5 absolute flex ml-24">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-sky-500 fill-slate-500 animate-spin mr-3"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="text-white animate-pulse">Loading...</span>
            </div>
          )}
        </form>
      </div>
      {error && (
        <div className="pt-12 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      <div className="justify-center items-center flex">
        <Results characters={characters} />
      </div>
    </div>
  );
};

export default Search;
