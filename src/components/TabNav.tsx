import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { RootStore } from "../store";
import GlobalFeed from "./GlobalFeed";
import PersonalFeed from "./PersonalFeed";

const TabNav: React.FC = () => {
  const currentUser = useSelector((state: RootStore) => state.auth.user);
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
        {currentUser && (
          <Nav.Item>
            <Nav.Link eventKey="your-feed" onClick={() => setSelectedTab(1)}>
              Your Feed
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
      {selectedTab === 0 && <GlobalFeed />}
      {selectedTab === 1 && <PersonalFeed />}
    </div>
  );
};

export default TabNav;
