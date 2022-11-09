import React from 'react'
import "./footer.css"


export default function Footer() {
  return (
    <div style={{ padding: "100px 0" }}>
      <div className="container">
        <div className="row footer_movie">
          <div className="col-3">
            <h2>
              <span>Movie Category</span>
            </h2>
            <div className="ft_content">
              <ul>
                <li><a href="#">Hot movies</a> </li>
                <li><a href="#">Videos</a></li>
                <li><a href="#">Cinema</a></li>
                <li><a href="#">Show time</a></li>
                <li><a href="#">Upcoming Movies</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <h2>
              <span>Infomation</span>
            </h2>
            <div className="ft_content">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a> </li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Pages</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Event</a></li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className="ft_content ft_aboutus">
              <h2>
                <span>About us</span>
              </h2>
              <p>Mauris malesuada arcu eu posuere eleifen. Ut egestas tortor at leo egestas tincidunt.Mauris malesuada arcu eu posuere eleifen.</p>
              <div className="social_link">
                <ul className='d-flex social_icon'>
                  <li>
                  <i style={{color:"#3b5998"}} className="fa-brands fa-square-facebook"></i>
                  </li>
                  <li>
                    <i style={{color:"#02b0e8"}} className="fa-brands fa-square-twitter"></i>
                  </li>
                  <li>
                    <i style={{color:"#00a098"}} className="fa-brands fa-square-instagram"></i>
                  </li>
                  <li>
                    <i style={{color:"#c22e2a"}} className="fa-brands fa-youtube"></i>
                  </li>
                  <li>
                    <i style={{color:"#b00a1b"}} className="fa-brands fa-square-pinterest"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="newsletter">
              <h2>
                <span>Newsletter</span>
              </h2>
              <div className="newsletter_input">
                  <input type="text" className="form-control" placeholder="Email Address" />
                  <button className="newsletter_btn">
                    <span style={{color:"#000"}} className="fa fa-paper-plane" />
                  </button>
              </div>   
              <p className='pt-3'>Email:moviesupport@gmail.com</p>          
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
