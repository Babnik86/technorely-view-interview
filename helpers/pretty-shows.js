export default function prettyShows(shows) {
  return shows.map((s) => {
    s.show.prettyRating = s.show.rating.average ? s.show.rating.average/2 : 0;
    return s.show;
  });
};
