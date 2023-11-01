import { useState, useEffect } from 'react';
import './App.css';
import MyForm from './components/Form';
import axios from 'axios';

function App() {

  const [member, setMember] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://reqres.in/api/users`
      )
      .then(function (response) {

        console.log(response);
        setMember(response.data);
      })
      .catch(function (error) {

        console.log(error);
      })
      .finally(function () {

      });
  }, []);



  return (
    <div className="App">
      <MyForm />
      <ul>

        <li>
          {member.name} - {member.email} - {member.password}
        </li>

      </ul>

    </div>
  );
}

export default App;
