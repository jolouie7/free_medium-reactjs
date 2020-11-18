import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TabNav from '../components/TabNav';

const HomePage: React.FC = () => {
  return (
    <div className="mt-3">
      <Container>
        <Row>
          <Col sm={10}>
            <TabNav />
          </Col>
          <Col sm={2}>
            Popular Tags
            <div>Coming Soon</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage
