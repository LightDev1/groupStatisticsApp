import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import LinkInput from './components/LinkInput';
import GroupInfo from './components/GroupInfo';
import Loader from './components/Loader';

function App() {
  const [likesCount, setLikesCount] = useState([]);
  const [sharesCount, setSharesCount] = useState([]);
  const [group, setGroup] = useState({});
  const [groupLink, setGroupLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const getInfo = useCallback((link, count) => {
    try {
      setReady(true);
      setLoading(true);
      axios.post('http://localhost:5000/api/posts', { link, count })
        .then(({ data }) => {
          const newLikesArray = [];
          const newSharesArray = [];

          data.map(post => {
            if (post.link) {
              newLikesArray.push(post.likesCount);
              newSharesArray.push(post.sharesCount);
            } else {
              setGroup({ ...post });
              setGroupLink(link);
              console.log(group);
            }
          });
          setLoading(false);
          setLikesCount(newLikesArray);
          setSharesCount(newSharesArray);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getCount = async (number) => {
    getInfo(groupLink, number);
  };

  if (!ready) {
    return (
      <div className="container" style={{ paddingTop: 4 + 'rem' }}>
        <div className="card grey lighten-4">
          <div className="card-content main-content">
            <div>
              <LinkInput getInfo={getInfo} />
              <h4 className="warning">Здесь будет ваша статистика</h4>
            </div>
          </div>
        </div>
      </div >
    );
  }

  return (
    <Router>
      <div className="container" style={{ paddingTop: 4 + 'rem' }}>
        <div className="card grey lighten-4">
          <div className="card-content main-content">
            <div>
              <LinkInput getInfo={getInfo} />
              {loading ? <Loader /> : (
                <GroupInfo
                  likesCount={likesCount}
                  sharesCount={sharesCount}
                  group={group}
                  groupLink={groupLink}
                  getCount={getCount}
                />
              )}
            </div>
          </div>
        </div>
      </div >
    </Router>
  );
}

export default App;
