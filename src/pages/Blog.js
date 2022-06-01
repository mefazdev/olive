import React from "react";
import Featur from "../components/Featur";
import UsePagination from "../components/Pagination";
import "../style/css/blog.css";
import ReactStars from "react-rating-stars-component";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
function Blog() {
  return (
    <div className="container">
      <div className="body">
        <div className="blog-container">
          <div className="about">
            <img
              className="blog-img"
              src={process.env.PUBLIC_URL + "/images/book.jpg"}
              alt="book_image"
            />
          </div>
          <div className="top-layer">
            <div className="text-container">
              <h2>
                Why should you read <span>The Alchemist</span>
              </h2>

              <h6>1. Prevents Alzheimer’s and Dementia </h6>
              <p>
                Studies have shown that reading the book daily keeps the mind
                mentally stimulated, reducing the likelihood of Alzheimer’s and
                dementia.Because your brain remains active, it prevents your
                mental strength from being lost. Like the body, exercise is also
                needed to keep the brain strong, which comes from reading books
                or doing puzzles and playing games like chess.
              </p>

              <h6>2. Reduce Stress</h6>
              <p>
                We all have to face many problems in our lives. Due to which
                many times we suffer from stress. But there are many people who
                read any book of their choice to reduce their stress so that
                their stress can be reduced. You can also read the book of your
                choice to reduce your stress. So that your stress can be
                reduced.
              </p>

              <h6>3. Increase Knowledge</h6>
              <p>
                The best advantage of reading a book is that your knowledge
                increases. The more knowledge you have. You will be able to do
                the challenge of people.Because no one knows when and where you
                have to face someone’s challenge. Apart from this, a
                knowledgeable person with his knowledge has a very deep
                knowledge of right and wrong.
              </p>

              <h6>4. Memory Booster</h6>
              <p>
                We all see and read many things in daily life. But you cannot
                remember everyone.But people who read books more, memory is
                better and stronger. Which helps in remembering small things.
              </p>

              <h6> 5. Increase Concentration Power</h6>
              <p>
                In today’s Internet world, we are caught in different directions
                because we do many such tasks every day.While doing the work, we
                check Facebook and WhatsApp every 5 minutes, Skype to check
                email, chat with some people, monitor our smart-phones. Such
                things reduce our concentration and focus. But when you read a
                book, all your attention is focused on the story. That is why by
                reading the book our concentration and ability to focus
                gradually increases.
              </p>
              <h6>6. Build Self-confidence </h6>
              <p>
                When we read any book, we get to learn many such new things.
                This helps us to express our feelings in life and also with it
                our confidence.
              </p>
              <h6>7. Good Sleep </h6>
              <p>
                Do you know that reading a book can also help with your sleep?
                This does not mean that it helps you fall asleep, but when you
                read a book it exhausts your brain which helps you to get a deep
                and peaceful sleep. That is why if you want to sleep well then
                read the book before going to sleep.
              </p>
            </div>
            <Container>
              <div className="buynow ">
                <Row>
                  <Col md="4">
                    <div className="buy-book">
                      <img
                        className="book-front col-12"
                        src={process.env.PUBLIC_URL + "/images/pc_book.jpg"}
                        alt="edit-icon"
                      />
                      <button className="buy-btn">BUY NOW</button>
                    </div>
                  </Col>

                  <Col md="8">
                    <div className="description">
                      <h5 className="book-title">The Alchemist</h5>
                      <div className="rating">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ReactStars
                            id="review__stars"
                            count={5}
                            value={5}
                            size={24}
                            activeColor="#ffd700"
                          />

                          <h6> (274)</h6>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <h6>By </h6>

                          <p>Paulo Coelho</p>
                        </div>
                      </div>

                      <p className="book-price">₹249</p>
                      <div className="description-text">
                        <p>
                          In the concluding installment to the Wrath of Ambar
                          duology from masterful author Tanaz Bhathena, Gul and
                          Cavas must unite their magical forces―and hold onto
                          their growing romance―to save their kingdom from
                          tyranny.
                        </p>
                        <p>
                          With King Lohar dead and a usurper queen in power, Gul
                          and Cavas face a new tyrannical government that is
                          bent on killing them both. Their roles in King Lohar's
                          death have not gone unnoticed, and the new queen is
                          out for blood. What she doesn't know is that Gul......
                          <button className="read-more">Read More</button>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "90px" }}
      >
        <UsePagination />
      </div>
      <Featur />
    </div>
  );
}
export default Blog;
