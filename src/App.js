import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import './components/Style.css'
import Nav from './components/Nav';
import MusicsList from './components/music/MusicsList';

import Users from './components/user/Users';
import CreateUserForm from "./components/user/CreateUserForm";
import EditUserForm from "./components/user/EditUserForm";


import Styles from './components/musicStyle/Styles';
import CreateStyleForm from './components/musicStyle/CreateStyleForm';
import EditStyleForm from "./components/musicStyle/EditStyleForm";
import DeleteStyleForm from "./components/musicStyle/DeleteStyleForm";

import Singers from './components/singer/Singers';
import CreateSingerForm from './components/singer/CreateSingerForm';
import EditSingerForm from "./components/singer/EditSingerForm";
import DeleteSingerForm from "./components/singer/DeleteSingerForm";
import DeleteUserForm from "./components/user/DeleteUserForm";



function App() {
  return (
      <BrowserRouter>
           <div className="app">
             <Nav />
               <Routes>
                   <Route path="/musics" element={<MusicsList />} />

                   <Route path="/styles" element={<Styles />} />
                   <Route path="/users" element={<Users />} />
                   <Route path="/singers" element={<Singers />} />

                   <Route path="/CreateStyleForm" element={<CreateStyleForm/>} />
                   <Route path="/EditStyleForm/:id" element={<EditStyleForm/>} />
                   <Route path="/DeleteStyleForm/:id" element={<DeleteStyleForm/>} />

                   <Route path="/CreateSingerForm" element={<CreateSingerForm/>} />
                   <Route path="/EditSingerForm/:id" element={<EditSingerForm/>} />
                   <Route path="/DeleteSingerForm/:id" element={<DeleteSingerForm/>} />

                   <Route path="/CreateUserForm" element={<CreateUserForm />} />
                   <Route path="/EditUserForm/:id" element={<EditUserForm />} />
                   <Route path="/DeleteUserForm/:id" element={<DeleteUserForm />} />
               </Routes>
           </div>
      </BrowserRouter>
  );
}

export default App;
