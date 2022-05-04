import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/all')
      .then(response => response.json())
      .then(usersData => {
        setUsers(usersData);
      });
  }, []);

  return (
    <div className="App">
      <aside className="side-bar">
        <h1>Profile</h1>
        <button className="add-button">Add</button>
      </aside>
      <main>
        <h2>Hallo , das sind die User die du hinzugefügt hast:</h2>
        {users.map((user) => {
          return (
            <div className='card' key={user._id}>
              <img src={user.profilePicture} alt="-" />
              <p>{user.username}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
