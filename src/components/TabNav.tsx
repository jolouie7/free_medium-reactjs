import React, { useState } from 'react';
import Nav from "react-bootstrap/Nav";
import GlobalFeed from './GlobalFeed';
import PersonalFeed from './PersonalFeed';

const TabNav: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/global-feed">
        <Nav.Item>
          <Nav.Link
            eventKey="/global-feed"
            data-value={0}
            onClick={() => setSelectedTab(0)}
          >
            Global Feed
          </Nav.Link>
        </Nav.Item>
        {/* // TODO: This should be a private route comp */}
        <Nav.Item>
          <Nav.Link eventKey="your-feed" onClick={() => setSelectedTab(1)}>
            Your Feed
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedTab === 0 && <GlobalFeed />}
      {selectedTab === 1 && <PersonalFeed />}
    </div>
  );
}

export default TabNav
