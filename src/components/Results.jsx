import { useState } from "react";

function Results({ characters }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const toggleCharacterDetails = (character) => {
    setSelectedCharacter(character === selectedCharacter ? null : character);
  };

  const hasCharacters = characters && characters.length > 0;

  return (
    <div
      id="results"
      className={
        hasCharacters
          ? "border border-slate-500 rounded-xl h-auto mt-20 mb-10 md:w-3/5 w-full p-10"
          : "hidden"
      }
    >
      <div id="accordion-collapse" data-accordion="collapse">
        {characters.map((character, index) => (
          <div key={index}>
            <h2 id={`accordion-collapse-heading-${index}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 text-white border-b border-slate-500 gap-3 hover:bg-white hover:text-black px-3 transition duration-200"
                onClick={() => toggleCharacterDetails(character)}
                aria-expanded={selectedCharacter === character}
                aria-controls={`accordion-collapse-body-${index}`}
              >
                <span>{character.name}</span>
                <svg
                  className={`w-3 h-3 ${
                    selectedCharacter === character
                      ? "rotate-180 transition duration-300"
                      : "transition duration-300"
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            {selectedCharacter === character && (
              <div
                id={`accordion-collapse-body-${index}`}
                className="p-5 border border-slate-500 rounded-b-lg"
              >
                <p className="text-gray-500">
                  <span className="text-sky-400">Height:</span>{" "}
                  {character.height}
                </p>
                <p className="text-gray-500">
                  <span className="text-sky-400">Mass:</span> {character.mass}
                </p>
                <p className="text-gray-500">
                  <span className="text-sky-400">Birthday:</span>{" "}
                  {character.birth_year}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
