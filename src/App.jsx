import { useState } from "react";
import "./App.css";

import logoImage from "./assets/logo.png";


import surmaiImage from "./assets/surmai-thali.jpg";
import fishImage from "./assets/fish-thali.jpg";
import prawnsImage from "./assets/prawns.jpg";
import platterImage from "./assets/fish-platter.jpg";

const PHONE = "918767636610";

const dishes = [
  {
    id: 1,
    name: "Surmai Thali",
    price: 350,
    category: "Fish Thali",
    image: surmaiImage,
    description: "Our signature thali with authentic Malvani flavours.",
  },
  {
    id: 2,
    name: "Fish Thali",
    price: 250,
    category: "Fish Thali",
    image: fishImage,
    description: "Traditional fish curry with coastal spices.",
  },
  {
    id: 3,
    name: "Malvani Prawns",
    price: 300,
    category: "Seafood",
    image: prawnsImage,
    description: "Delicious prawns prepared in Malvani style.",
  },
  {
    id: 4,
    name: "Seafood Platter",
    price: 450,
    category: "Seafood",
    image: platterImage,
    description: "A selection of coastal seafood favourites.",
  },
];

function App() {
  const [category, setCategory] = useState("All");

  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    date: "",
    hour: "12",
    minute: "00",
    period: "PM",
    guests: "2",
  });

  const [review, setReview] = useState({
    name: "",
    rating: "5",
    comment: "",
  });

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("trupti-reviews") || "[]");
    } catch {
      return [];
    }
  });

  const now = new Date();
  const minDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  function handleBookingChange(event) {
    const { name, value } = event.target;

    if (name === "name" && !/^[a-zA-Z\s'-]*$/.test(value)) {
      return;
    }

    if (name === "phone" && !/^\d{0,10}$/.test(value)) {
      return;
    }

    if (name === "guests") {
      if (!/^\d{0,2}$/.test(value)) return;
      if (value !== "" && Number(value) > 20) return;
    }

    setBooking((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleBookingSubmit(event) {
    event.preventDefault();

    const name = booking.name.trim();
    const phone = booking.phone;
    const guests = Number(booking.guests);
    const hour = Number(booking.hour);
    const minute = Number(booking.minute);

    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      alert("Enter a valid name using letters only.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!booking.date || booking.date < minDate) {
      alert("Select today or a future date.");
      return;
    }

    if (!Number.isInteger(hour) || hour < 1 || hour > 12) {
      alert("Hour must be between 1 and 12.");
      return;
    }

    if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
      alert("Minute must be between 0 and 59.");
      return;
    }

    if (
      booking.guests === "" ||
      !Number.isInteger(guests) ||
      guests < 1 ||
      guests > 20
    ) {
      alert("Number of guests must be between 1 and 20.");
      return;
    }

    const time =
      `${String(hour).padStart(2, "0")}:` +
      `${String(minute).padStart(2, "0")} ${booking.period}`;

    const message = [
      "Hello Trupti Malvani Macchi Khanaval!",
      "",
      "I would like to request a table reservation.",
      `Name: ${name}`,
      `Mobile: ${phone}`,
      `Date: ${booking.date}`,
      `Time: ${time}`,
      `Guests: ${guests}`,
      "",
      "Please confirm my reservation.",
    ].join("\n");

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleReviewSubmit(event) {
    event.preventDefault();

    if (!review.name.trim() || !review.comment.trim()) {
      alert("Please enter your name and review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: review.name.trim(),
      rating: Number(review.rating),
      comment: review.comment.trim(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    try {
      localStorage.setItem("trupti-reviews", JSON.stringify(updated));
    } catch {
      // The review remains in the current page session.
    }

    setReview({ name: "", rating: "5", comment: "" });
    alert("Thank you for your review!");
  }

  return (
    <div
      className="website"
      
    >
      <header className="navbar" id="home">
        <a href="#home" className="brand" aria-label="Trupti home">
          <img
            src={logoImage}
            alt="Trupti Malvani Macchi Khanaval logo"
            className="brand-logo"
          />
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#story">Our Story</a>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#reservation" className="nav-button">
          Book a Table ↗
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              AUTHENTIC MALVANI CUISINE · CHIPLUN
            </span>

            <h1>
              A Taste of
              <br />
              <em>Konkan.</em>
            </h1>

            <p className="hero-description">
              Fresh seafood, traditional Malvani masala, and unforgettable
              flavours from the Konkan coast.
            </p>

            <div className="hero-buttons">
              <a href="#menu" className="button button-dark">
                Explore Our Menu ↗
              </a>

              <a href="#story" className="button button-outline">
                Discover Our Story
              </a>
            </div>

            <div className="hero-details">
              <span>✳ Authentic Malvani Taste</span>
              <span>✳ Fresh Seafood</span>
            </div>
          </div>

          <div className="hero-image">
            <img src={surmaiImage} alt="Signature Surmai Thali" />

            <div className="image-label">
              <span>OUR SIGNATURE DISH</span>
              <strong>Surmai Thali</strong>
              <span>Authentic coastal flavours</span>
            </div>

            <div className="round-stamp">
              <span>MADE WITH</span>
              <strong>Konkan</strong>
              <span>LOVE ♡</span>
            </div>
          </div>
        </section>

        <section className="highlights">
          <div>
            <span className="highlight-number">01</span>
            <div>
              <h3>Fresh Seafood</h3>
              <p>Delicious coastal favourites.</p>
            </div>
          </div>

          <div>
            <span className="highlight-number">02</span>
            <div>
              <h3>Malvani Masala</h3>
              <p>Traditional flavours in every bite.</p>
            </div>
          </div>

          <div>
            <span className="highlight-number">03</span>
            <div>
              <h3>Homely Hospitality</h3>
              <p>A welcoming place for everyone.</p>
            </div>
          </div>
        </section>

        <section className="story section" id="story">
          <div className="story-image">
            <img src={fishImage} alt="Traditional fish thali" />

            <div className="story-badge">
              <strong>2022</strong>
              <span>Serving Konkan Flavours</span>
            </div>
          </div>

          <div className="story-content">
            <span className="eyebrow">OUR STORY</span>

            <h2>
              Rooted in tradition,
              <br />
              <em>served with love.</em>
            </h2>

            <p>
              Welcome to Trupti Malvani Macchi Khanaval, where the flavours
              of the Konkan coast meet warm, homely hospitality.
            </p>

            <p>
              Since 2022, we have been serving seafood lovers with
              traditional Malvani-style preparations. Our Surmai Thali
              is a special favourite.
            </p>

            <a href="#menu" className="text-link">
              Discover our specialities 
            </a>
          </div>
        </section>

        <section className="menu-section section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A LITTLE TASTE OF KONKAN</span>
              <h2>
                Our <em>Specialities</em>
              </h2>
            </div>

            <p>
              Prepared with care, inspired by tradition, and full of
              coastal flavour.
            </p>
          </div>

          <div className="menu-filters">
            {["All", "Fish Thali", "Seafood"].map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredDishes.map((dish, index) => (
              <article className="menu-card" key={dish.id}>
                <div className="menu-card-image">
                  <img src={dish.image} alt={dish.name} />

                  <span className="menu-tag">
                    {dish.id === 1 ? "House Special" : dish.category}
                  </span>

                  <span className="menu-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="menu-card-content">
                  <div className="menu-title-row">
                    <h3>{dish.name}</h3>
                    <strong>₹{dish.price}</strong>
                  </div>

                  <p>{dish.description}</p>

                  <a href="#reservation" className="text-link">
                    Book a table →
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="menu-note">
            Menu prices are indicative. Please confirm current prices and
            availability with the restaurant.
          </p>
        </section>

        <section className="quote-banner">
          <span className="quote-mark"></span>

          <p>
            Good food brings people together.
            <br />
            <em>Konkan flavours make it unforgettable.</em>
          </p>

          <span className="quote-caption">
            A LITTLE TASTE OF MALVAN, RIGHT HERE IN CHIPLUN
          </span>
        </section>

        <section className="gallery-section section" id="gallery">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FROM OUR KITCHEN</span>
              <h2>
                A feast for <em>the senses.</em>
              </h2>
            </div>

            <p>
              Take a glimpse at the coastal flavours waiting for you.
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item gallery-large">
              <img src={surmaiImage} alt="Surmai thali" />
              <span>Our Signature Surmai</span>
            </div>

            <div className="gallery-item">
              <img src={fishImage} alt="Fish thali" />
              <span>Traditional Fish Thali</span>
            </div>

            <div className="gallery-item">
              <img src={prawnsImage} alt="Malvani prawns" />
              <span>Coastal Seafood</span>
            </div>

            <div className="gallery-item">
              <img src={platterImage} alt="Seafood platter" />
              <span>Fresh From Our Kitchen</span>
            </div>
          </div>
        </section>

        <section className="reservation-section section" id="reservation">
          <div className="reservation-info">
            <span className="eyebrow">YOUR TABLE AWAITS</span>

            <h2>
              Come hungry.
              <br />
              <em>Leave happy.</em>
            </h2>

            <p>
              Planning a family lunch or dinner with friends? Send us a
              reservation request on WhatsApp.
            </p>

            <div className="reservation-detail">
              <span>✳</span>
              <div>
                <strong>Lunch</strong>
                <p>11:30 AM – 3:30 PM</p>
              </div>
            </div>

            <div className="reservation-detail">
              <span>✳</span>
              <div>
                <strong>Dinner</strong>
                <p>7:00 PM – 11:00 PM</p>
              </div>
            </div>

            <p className="reservation-note">
              Your reservation is not confirmed until the restaurant replies.
            </p>
          </div>

          <form className="booking-form" onSubmit={handleBookingSubmit}>
            <h3>Reserve Your Table</h3>
            <p>Fill in your details below.</p>

            <label htmlFor="booking-name">Your Name</label>
            <input
              id="booking-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={booking.name}
              onChange={handleBookingChange}
              autoComplete="name"
              required
            />

            <label htmlFor="booking-phone">Mobile Number</label>
            <input
              id="booking-phone"
              type="tel"
              name="phone"
              placeholder="Enter 10-digit mobile number"
              value={booking.phone}
              onChange={handleBookingChange}
              inputMode="numeric"
              autoComplete="tel"
              maxLength={10}
              required
            />

            <div className="form-row">
              <div>
                <label htmlFor="booking-date">Date</label>
                <input
                  id="booking-date"
                  type="date"
                  name="date"
                  min={minDate}
                  value={booking.date}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="booking-guests">
                  Guests (1–20)
                </label>
                <input
                  id="booking-guests"
                  type="number"
                  name="guests"
                  min="1"
                  max="20"
                  step="1"
                  placeholder="Enter guests"
                  value={booking.guests}
                  onChange={handleBookingChange}
                  required
                />
              </div>
            </div>

            <label>Preferred Time</label>

            <div className="time-input-row">
              <div>
                <label htmlFor="booking-hour" className="time-label">
                  Hour
                </label>
                <input
                  id="booking-hour"
                  type="number"
                  min="1"
                  max="12"
                  step="1"
                  value={booking.hour}
                  onChange={(event) =>
                    setBooking((previous) => ({
                      ...previous,
                      hour: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <span className="time-colon">:</span>

              <div>
                <label htmlFor="booking-minute" className="time-label">
                  Minute
                </label>
                <input
                  id="booking-minute"
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  value={booking.minute}
                  onChange={(event) =>
                    setBooking((previous) => ({
                      ...previous,
                      minute: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label htmlFor="booking-period" className="time-label">
                  AM / PM
                </label>
                <select
                  id="booking-period"
                  value={booking.period}
                  onChange={(event) =>
                    setBooking((previous) => ({
                      ...previous,
                      period: event.target.value,
                    }))
                  }
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <button className="button button-dark submit-button" type="submit">
              Request Reservation on WhatsApp ↗
            </button>
          </form>
        </section>

        <section className="reviews-section section" id="reviews">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SHARE YOUR EXPERIENCE</span>
              <h2>
                Your words, <em>our inspiration.</em>
              </h2>
            </div>
          </div>

          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="review-fields">
              <input
                type="text"
                placeholder="Your name"
                value={review.name}
                onChange={(event) =>
                  setReview((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                required
              />

              <select
                aria-label="Rating"
                value={review.rating}
                onChange={(event) =>
                  setReview((previous) => ({
                    ...previous,
                    rating: event.target.value,
                  }))
                }
              >
                <option value="5">★★★★★ - Excellent</option>
                <option value="4">★★★★ - Very good</option>
                <option value="3">★★★ - Good</option>
                <option value="2">★★ - Fair</option>
                <option value="1">★ - Poor</option>
              </select>
            </div>

            <textarea
              placeholder="Tell us about your experience..."
              value={review.comment}
              onChange={(event) =>
                setReview((previous) => ({
                  ...previous,
                  comment: event.target.value,
                }))
              }
              rows="3"
              required
            />

            <button className="button button-dark" type="submit">
              Share Your Review ↗
            </button>
          </form>

          {reviews.length > 0 && (
            <div className="reviews-grid">
              {reviews.map((item) => (
                <article className="review-card" key={item.id}>
                  <div className="review-stars">
                    {"★".repeat(Number(item.rating))}
                  </div>
                  <p>“{item.comment}”</p>
                  <strong>{item.name}</strong>
                </article>
              ))}
            </div>
          )}

          <p className="review-note">
            Reviews are saved only in this browser. They are not published
            to Google.
          </p>
        </section>

        <section className="contact-section section" id="contact">
          <div>
            <span className="eyebrow">COME FIND US</span>
            <h2>
              Meet us in <em>Chiplun.</em>
            </h2>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <span className="contact-icon">⌖</span>
              <h3>Our Location</h3>
              <p>Pag Mala, Guhagar Bypass Road, Chiplun 415605</p>
              <a
                href="https://maps.app.goo.gl/jbfvFwbMFz9nYGi77"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Get Directions ↗
              </a>
            </div>

            <div className="contact-card">
              <span className="contact-icon">◷</span>
              <h3>Opening Hours</h3>
              <p>Lunch: 11:30 AM – 3:30 PM</p>
              <p>Dinner: 7:00 PM – 11:00 PM</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">✆</span>
              <h3>Call Us</h3>
              <p>Contact us for enquiries and reservations.</p>
              <a href="tel:+918767636610" className="text-link">
                +91 87676 36610 ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="footer-brand">
          <img
            src={logoImage}
            alt="Trupti Malvani Macchi Khanaval"
            className="footer-logo"
          />
        </a>

        <p>Authentic Malvani flavours, made with love in Chiplun.</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#reservation">Reservations</a>
          <a href="#contact">Contact</a>
        </div>

        <span className="copyright">
          © {new Date().getFullYear()} Trupti Malvani Macchi Khanaval.
          All rights reserved.
        </span>
      </footer>

      <a
        className="whatsapp-float"
        href={
          `https://wa.me/${PHONE}?text=` +
          encodeURIComponent(
            "Hello! I would like to know more about Trupti Malvani Macchi Khanaval."
          )
        }
        target="_blank"
        rel="noreferrer"
        aria-label="Contact the restaurant on WhatsApp"
      >
        WhatsApp 
      </a>
    </div>
  );
}

export default App;