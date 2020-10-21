import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Signup() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignupSubmit() {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);

    await api.post("/signup", formData);

    alert("Cadastrado com sucesso!");

    history.push("/");
  }

  return (
    <div id="page-signup">
      <Sidebar />
      <main>
        <form onSubmit={handleSignupSubmit} className="signup-form">
          <fieldset>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="name">Sobrenome</label>
              <input
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="name">Email</label>
              <input
                id="email"
                value={email}
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="name">Sobrenome</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <button type="submit">Cadastrar</button>
        </form>
      </main>
    </div>
  );
}
