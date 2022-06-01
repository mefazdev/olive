import "../style/css/about.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Featur from "../components/Featur";
function About() {
  return (
    <div className="about container">
      <div className="path ">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>About </p>
      </div>
      <div className="about__content">
        <h1>Olive Publications Pvt. Ltd</h1>
        <Container>
          <Row>
            <Col id="about__col" md="10">
              <p>
                Olive Publications was formed as a private limited company in
                1999, with its registered office at Koyappathodi Plaza, East
                Nadakkavu in Calicut. Dr. M.K. Muneer, a well-known politician,
                social and cultural activist is the founder of the company. The
                company has published more than 1500 books including the works
                of M. T. Vasudevan Nair, Madhavikutty, O.N.V., T. Padmanabhan,
                Mukundan, Paul Zacharia, etc. <br />
                Pappiyon, one of the leading publishers of Kerala, became part
                of Olive Publications in the year 2004. Olive has published the
                Malayalam translations of books by internationally well-known
                authors including ‘Rogue State’ by William Blum, ‘I Am Nujood
                Age 10 and Divorced’ by Nujood Ali and Delphine Minoui, ‘Islam:
                A Short History’ by Karen Armstrong, Essays of Ram Puniyani,
                etc.
                <br />
                Malayalam versions of popular works like ‘Listening to
                Grasshoppers’ by Arundhati Roy, a biography of Steve Jobs,
                autobiographies of Benito Mussolini and Helen Keller, Mein Kampf
                by Adolf Hitler has been published by Olive Publications
                including a book by Gabriel Garcia Marquez. <br />
                Olive conducts book fairs all over Kerala throughout the year.
                We also hold book fairs at schools under the banner “SCHOOL
                MUTTAM.”
                <br />
                Books published by Olive Publications are generally quite
                popular and there is an unmistakable enthusiasm for the books we
                produce. Olive publishes a wide variety of works by leading
                writers, screenwriters, critics, journalists, and historians.
                Works published to date include critical essays, interviews,
                poems, journals, biographies, autobiographies, philosophical
                essays, short fiction, speeches, and novels. Some titles are new
                works by contemporary Malayalam writers, others including
                significant but overlooked works of great writers both living
                and long past gone. Against all odds, we also published
                translations of classic and contemporary world literature that
                changes one’s perspective of the world. Some of our bestsellers
                are writings of national and international fame including that
                of Leo Tolstoy, Fyodor Dostoevsky, Anton Chekhov, Ernest
                Hemingway, Karen Armstrong, Adoor Gopalakrishnan, Victoria
                Caseres, and others. <br />
                Presently we have showrooms at Calicut (Noor Complex, Mavoor
                Road), Calicut, Kottayam(Makil Centre, Good Shepherd Road,
                Kottayam), and Trivandrum (Capitol Centre, Statue Junction, Near
                Secretariat, Trivandrum).
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Featur />
    </div>
  );
}

export default About;
