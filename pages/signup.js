import { useState } from "react";
import styles from "../styles/Home.module.css";
import Parse from "../services/parse";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [user, setUser] = useState([]);

  const createUser = () => {
    const user = new Parse.User();
    user
      .save({
        username: userName,
        email: userEmail,
        password: userPassword,
      })
      .then(function (response) {
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        alert(
          "New object create with success! ObjectId: " +
            response.id +
            ", " +
            user.get("username")
        );
      })
      .catch(function (error) {
        alert("Error: " + error.message);
      });
  };

  const getUser = async () => {
    const query = new Parse.Query("User");
    const res = await query.findAll();
    const user = res.map((user) => ({ name: user.get("username") }));

    setUser(user);
  };
  return (
    <div className={styles.container}>
      <section style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column'
          }}>
        <h1>Create a user </h1>
        <div>
          <input
            placeholder="name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            placeholder="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <input
            placeholder="password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            type="password"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <button onClick={createUser}>create user</button>
          <button onClick={getUser}> list created user</button>
        </div>
      </section>
      <section>
        <h2>user</h2>
        <ul>
          {user.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}