import React, { useState } from 'react';

const recommendedTags = [
  'crypto',
  'food',
  'music',
  'science',
  'vlog',
  'crypto',
  'food',
  'music',
  'science',
  'vlog',
  'crypto',
  'food',
  'music',
  'science',
  'vlog',
];

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
    <section class="discover-section">
      <header class="discover-section__header">
        <h2 class="discover-section__title">Discover</h2>
      </header>

      <ul class="discover-section__tags">
        {recommendedTags.map(tag => (
          <li
            class="discover-section__tag"
            style={userTags[tag] && { color: 'red' }}
            onClick={() => clickTag(tag)}
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}
