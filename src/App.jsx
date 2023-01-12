import logo from './logo.svg';
import './App.css';
import ReactModal from 'react-modal'
import Posts from './components/Posts'
import { useState, useRef, useEffect } from 'react'
import { useIntersection, useScrollLock } from '@mantine/hooks'

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
  const containerRef = useRef()
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  })
  const [scrollLock, setScrollLock] = useScrollLock()
  let mounted = useRef(false)
  // console.log(ref, entry, containerRef, 'refs')

  const openModal = () => {
    setModalIsOpen(true)
    // scroll lock
    setScrollLock((c) => !c)
  }

  const afterOpenModal = () => {
    subtitle.style.color = '#f00'
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setScrollLock((c) => !c)
  }

  useEffect(() => {
    if(mounted.current === false) {
      console.log('in useEffect')
      openModal()
      mounted.current = true
    }
  },[null])
  return (
    <div className="App" ref={containerRef} >
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
      {/* <Posts /> */}
      <div ref={ref} style={{height: 100, backgroundColor: 'purple', width: "100%"}}>
        <span
          className='span-intersecting'
          style={{backgroundColor : entry?.isIntersecting ? "red" : "blue"}}
        >
          {entry?.isIntersecting ? "Fully visible" : "Obscured"}</span>
      </div>
      
      <Posts />
    </div>
  );
}

export default App;
