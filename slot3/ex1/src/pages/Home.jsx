import '../pages/Page.css'

export default function Home() {
  return (
    <main>
      <div className="hero-section">
        <h1>Welcome to My Website</h1>
        <button className="cta-button" onClick={() => alert('Button clicked!')}>
          Click Here
        </button>
      </div>
    </main>
  )
}
