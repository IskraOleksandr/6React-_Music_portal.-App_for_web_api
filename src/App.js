import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import './components/Style.css'
import Nav from './components/Nav';
import MusicsList from './components/music/MusicsList';
import Styles from './components/musicStyle/Styles';
import Users from './components/user/Users';
import Singers from './components/singer/Singers';
import CreateStyleForm from './components/musicStyle/CreateStyleForm';
import EditStyleForm from "./components/musicStyle/EditStyleForm";
// import StyleFormF from './components/StyleFormFuncComp';

import SingerForm from './components/singer/SingerForm';
import UserForm from './components/user/UserForm';

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

                   <Route path="/SingerForm" element={<SingerForm singer_id="0"/>} />
                   <Route path="/UserForm" element={<UserForm full_name="" Login="" age="" Password="" PasswordConfirm="" />} />
               </Routes>
           </div>
      </BrowserRouter>
  );
}

export default App;
