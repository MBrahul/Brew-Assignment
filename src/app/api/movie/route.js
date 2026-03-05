import { NextResponse } from "next/server";


const getAiInsightsFromGemini = async (movie, reviews) => {
  try {
    const context = `
        Movie Title: ${movie.title}

        Overview:
        ${movie.overview}

        Audience Reviews:
        ${reviews?.join("\n\n")}

        Rating: ${movie.vote_average}
        Total Votes: ${movie.vote_count}

        Task:
        1. Summarize audience sentiment in 2-3 sentences.
        2. Classify sentiment as Positive, Mixed, or Negative.

        Return JSON only:

        {
        "summary": "...",
        "sentiment": "Positive | Mixed | Negative"
        }
        `;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: context }],
            },
          ],
        }),
      }
    );

    const geminiRes = await geminiResponse.json();

    const text = geminiRes?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return parsed;


  } catch (error) {
    return {
      summary: "Ai Model Not Working",
      sentiment: "Ai Model Not Working"
    }
  }
}


export async function POST(req) {
  try {
    const { imdbId } = await req.json();

    if (!imdbId) {
      return NextResponse.json(
        { error: "IMDb ID is required" },
        { status: 400 }
      );
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_AUTHORIZATION}`
      }
    }
    const response = await fetch(`https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=en-US`, options);

    const data = await response.json();

    if (data.movie_results.length == 0) {
      return NextResponse.json(
        { error: "Movie not found" },
        { status: 404 }
      );
    }

    // console.log(data.movie_results);

    // attaching ai-insights with every movie object
    for (let movie of data.movie_results) {
      const res = (await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${process.env.TMDB_API_KEY}`));
      const rev = await res.json();
      const reviews = rev.results.slice(0, 10).map((review, key) => review.content);

      const aiInsights = await getAiInsightsFromGemini(movie, reviews);
      movie.aiInsights = aiInsights;
    }



    return NextResponse.json({
      movies: data.movie_results
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}