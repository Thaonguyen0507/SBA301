import './Header.css'

export default function Header({ currentPage, onNavigate }) 
  return (
    <header>
      <nav>
        <h2>Hehe</h2>
        <ul>
          <li>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              style={{ opacity: currentPage === 'home' ? 1 : 0.7 }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              style={{ opacity: currentPage === 'about' ? 1 : 0.7 }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
              style={{ opacity: currentPage === 'contact' ? 1 : 0.7 }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
