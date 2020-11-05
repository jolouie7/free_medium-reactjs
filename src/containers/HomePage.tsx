import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from "react-bootstrap/Nav";
// import { Route } from "react-router-dom";
// import GlobalFeed from '../components/GlobalFeed';

const HomePage: React.FC = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col sm={10}>
            <Nav variant="tabs" defaultActiveKey="/global-feed">
              <Nav.Item>
                <Nav.Link href="/global-feed">
                  Global Feed
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={2}>2 of 2</Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage
