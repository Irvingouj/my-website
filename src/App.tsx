import About from './components/about/about';
import './styles.css';
import './public.css';
import GameWrapper from './components/gameWrapper/gameWrapper';
import LinksWrapper from './components/LinksWrapper/LinksWrapper';
import Contacts from './components/contacts/contacts';
import Chatbox from './components/chatbox/chatbox';

function App() {
  return (
    <div className="App" style={{scrollBehavior:"smooth"}}>
      <About />
      <GameWrapper/>
      <Chatbox />
      <LinksWrapper />
      <Contacts />
      
    </div>
  );
}

export default App;
