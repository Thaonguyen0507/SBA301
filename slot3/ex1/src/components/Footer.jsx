import avatarImage from '../assets/meme.jpg'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="content">
          <div className="profile">
            <img
              src={avatarImage}
              alt="nguyentht"
              className="avatar"
            />
            <div>
              <p className="name">nguyentht</p>
              <p className="subtext">All rights reserved</p>
            </div>
          </div>
          <div className="contact">
            <p className="contactLabel">Information</p>
            <p className="email">nguyentht@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
