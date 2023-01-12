import logo from './logo.svg';
import './App.css';
import ReactModal from 'react-modal'
import Posts from './components/Posts'
import { useState, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


ReactModal.setAppElement('#root')


function App() {
  let subtitle
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const afterOpenModal = () => {
    subtitle.style.color = '#f00'
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>7 Hooks Practice</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <button onClick={openModal}>Open Modal</button>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
          </form>
      </ReactModal>

      <Posts />
    </div>
  );
}

export default App;
