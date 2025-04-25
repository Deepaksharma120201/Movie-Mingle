import { useState, useEffect } from "react";
import { useFirestore } from "../../services/firestore";
import { useAuth } from "../../context/authProvider";
import WatchListCard from "../../components/WatchListCard/WatchListCard";
import "./Watchlist.css";

const Watchlist = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data);
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, getWatchlist]);

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h2>Your Watchlist</h2>
      </div>

      {isLoading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {!isLoading && watchlist.length === 0 && (
        <div className="watchlist-center">
          <h2>Watchlist is empty</h2>
        </div>
      )}

      {!isLoading && watchlist.length > 0 && (
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <WatchListCard
              key={item?.id}
              item={item}
              type={item?.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
