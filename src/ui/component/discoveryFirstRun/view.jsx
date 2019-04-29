import React, { useState } from 'react';

const recommendedTags = ['crypto', 'science', 'idk', 'clicking me should do something'];

export default function DiscoveryFirstRun() {
  const [userTags, setUserTags] = useState({});
  const clickTag = tag => {
    const newUserTags = { ...userTags };
    if (userTags[tag]) {
      delete newUserTags[tag];
    } else {
      newUserTags[tag] = true;
    }

    setUserTags(newUserTags);
  };

  return (
    <div style={{ height: 400 }}>
      <h2>Discover sum stuff</h2>
      {recommendedTags.map(tag => (
        <div style={userTags[tag] && { color: 'red' }} onClick={() => clickTag(tag)}>
          {tag}
        </div>
      ))}
    </div>
  );
}
