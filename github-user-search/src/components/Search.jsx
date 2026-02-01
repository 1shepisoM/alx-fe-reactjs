import { useState } from "react";
import { fetchUserData, advancedSearch } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);

    let query = "";
    if (username) query += username;
    if (location) query += `+location:${location}`;
    if (repos) query += `+repos:>=${repos}`;

    try {
      const data = await advancedSearch(query);
      setUsers(data.items);
      setPage(2);
    } catch {
      setError("No users found");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    let query = "";
    if (username) query += username;
    if (location) query += `+location:${location}`;
    if (repos) query += `+repos:>=${repos}`;

    const data = await advancedSearch(query, page);
    setUsers([...users, ...data.items]);
    setPage(page + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleAdvancedSearch} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Minimum repositories"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {user && (
        <div className="mt-6 border p-4 rounded">
          <img src={user.avatar_url} className="w-20 rounded-full" />
          <h2>{user.name}</h2>
          <a href={user.html_url} target="_blank">View Profile</a>
        </div>
      )}

      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((u) => (
            <div key={u.id} className="border p-3 rounded flex items-center gap-4">
              <img src={u.avatar_url} className="w-12 rounded-full" />
              <a href={u.html_url} target="_blank" className="font-bold">
                {u.login}
              </a>
            </div>
          ))}

          <button
            onClick={loadMore}
            className="w-full bg-gray-200 p-2 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
