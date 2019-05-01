import React, { useState } from 'react';
import { TagCloud } from 'react-tagcloud';

const recommendedTags = [
  {
    count: 25,
    value: 'crypto',
  },
  {
    count: 10,
    value: 'food',
  },
  {
    count: 7,
    value: 'music',
  },
  {
    count: 20,
    value: 'science',
  },
  {
    count: 16,
    value: 'vlog',
  },
  {
    count: 18,
    value: 'bitcoin',
  },
  {
    count: 4,
    value: 'mazacoin',
  },
  {
    count: 15,
    value: 'namecoin',
  },
  {
    count: 30,
    value: 'neucoin',
  },
  {
    count: 9,
    value: 'nxt',
  },
  {
    count: 15,
    value: 'peercoin',
  },
  {
    count: 12,
    value: 'titcoin',
  },
  {
    count: 1,
    value: 'auroracoin',
  },
];

const customRenderer = (tag, size, color) => (
  <span
    className="discover-section__tag"
    key={tag.value}
    style={{
      borderColor: color,
      fontSize: `${size}rem`,
      height: `calc(${size}rem * 4)`,
      width: `calc(${size}rem * 4)`,
    }}
  >
    {tag.value}
  </span>
);

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

      <TagCloud
        className="discover-section__tags"
        maxSize={2}
        minSize={1}
        tags={recommendedTags}
        onClick={tag => alert(`'${tag.value}' was selected!`)}
        renderer={customRenderer}
      />

      <input class="discover-section__search" placeholder="Search for a specific tag" type="text" />
    </section>
  );
}
