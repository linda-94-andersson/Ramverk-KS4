import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, ListGroup, Row, Card, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { getAllUsers } from "../redux/actions/authActions";

function Admin() {
  const products = useSelector((state) => state.allProducts.products);
  const allUsers = useSelector((state) => state.allUsers.users);
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const renderProducts = () => {
    if (!products) return <div>Loading products...</div>;
    return products.map((product) => {
      const { id, title, image, price, category } = product;
      return (
        <section key={id}>
          {Object.keys(product).length === 0 ? (
            <div>...Loading</div>
          ) : (
            <Container>
              <Card style={{ paddingTop: 5 }}>
                <Card.Img
                  style={{ height: 100, objectFit: "contain" }}
                  src={image}
                  alt={title}
                />
                <Card.Body style={{ display: "inline" }}>
                  <Card.Title>
                    <h2 style={{ fontSize: 15 }}>{title}</h2>
                  </Card.Title>
                  <Card.Subtitle>
                    <h3 style={{ fontSize: 15, display: "inline", padding: 5 }}>
                      ${price}
                    </h3>
                    <h4 style={{ fontSize: 15, display: "inline", padding: 5 }}>
                      {category}
                    </h4>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Container>
          )}
        </section>
      );
    });
  };

  const renderUsers = () => {
    if (!allUsers) return <div>Loading users...</div>;
    return allUsers.map((user) => {
      const { id, email, username, password } = user;
      return (
        <section key={id}>
          {Object.keys(user).length === 0 ? (
            <div>...Loading</div>
          ) : (
            <Container>
              <ListGroup>
                <ListGroup.Item>
                  <span style={{ marginLeft: 10 }}>{email}</span>,
                  <span style={{ marginLeft: 10 }}>{username}</span>,
                  <span style={{ marginLeft: 10 }}>{password}</span>
                </ListGroup.Item>
              </ListGroup>
            </Container>
          )}
        </section>
      );
    });
  };

  const setShowButton = useRef(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton.current = true;
      } else {
        setShowButton.current = false;
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return !auth.isAdmin() ? (
    <Navigate to="/login" />
  ) : (
    <>
      {allUsers === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <Container>
            <Row>
              <Col>All products</Col>
              <Col>All users</Col>
            </Row>
            <Row>
              <Col>
                <ListGroup style={{ display: "block" }}>
                  {renderProducts()}
                </ListGroup>
              </Col>
              <Col>
                <ListGroup style={{ display: "block" }}>
                  <ListGroup.Item>{renderUsers()}</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Button
              variant="dark"
              className="back-to-top"
              onClick={scrollToTop}
            >
              &#8679;
            </Button>
          </Container>
        </>
      )}
    </>
  );
}

export default Admin;
