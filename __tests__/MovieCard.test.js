import { render, screen } from "@testing-library/react";
import MovieCart from "../components/MovieCart";

const mockMovie = {
    title: "The Matrix",
    poster_path: "/poster.jpg",
    overview: "A hacker discovers reality is a simulation.",
    release_date: "1999-03-31",
    vote_average: 8.2,
    vote_count: 20000,
    aiInsights: {
        summary: "Audiences love its revolutionary visuals.",
        sentiment: "Positive",
    },
    cast: ["Keanu Reeves", "Laurence Fishburne"],
    genres: [{ id: 878, name: "Sci-Fi" }]
};

describe("MovieCart Component", () => {

    test("renders movie title", () => {
        render(<MovieCart movie={mockMovie} />);
        expect(screen.getByText("The Matrix")).toBeInTheDocument();
    });

    test("renders sentiment label", () => {
        render(<MovieCart movie={mockMovie} />);
        expect(screen.getByText(/Positive/i)).toBeInTheDocument();
    });

});