import StarRating from "react-star-ratings";
export const showAverageRating = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;

    let total = [];

    let length = ratingsArray.length;
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let highest = length * 5;
    let result = (totalReduced * 5) / highest;

    console.log("result", result)
    return (
      <div
        className="flex items-center justify-center my-1 sm:my-2"
        aria-label={`Average rating: ${result.toFixed(1)} out of 5, based on ${length} reviews`}
      >
       {result ?  <span className="flex items-center gap-1 text-xs sm:text-sm">
          <StarRating
            starSpacing="2px"
            starRatedColor="#d1411e"
            starDimension="16px"
            rating={result}
            editing={false}
          />
          <span className="ml-1">({length})</span>
        </span> : ""}
      </div>
    );
  }
};