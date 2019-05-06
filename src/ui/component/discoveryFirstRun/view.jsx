import React, { useEffect, useState } from 'react';
import vis from 'vis';

const edges = new vis.DataSet();

const nodes = new vis.DataSet([
  { label: 'Pop' },
  { label: 'Alternative' },
  { label: 'Rock' },
  { label: 'Jazz' },
  { label: 'Hits' },
  { label: 'Dance' },
  { label: 'Metal' },
  { label: 'Experimental' },
  { label: 'Rap' },
  { label: 'Electronic' },
]);

const data = {
  edges,
  nodes,
};

const options = {
  nodes: {
    borderWidth: 0,
    shape: 'circle',
    color: {
      background: '#F92C55',
      highlight: {
        background: '#F92C55',
        border: '#F92C55',
      },
    },
    font: {
      color: '#fff',
    },
  },
  physics: {
    stabilization: false,
    minVelocity: 0.01,
    solver: 'repulsion',
    repulsion: {
      nodeDistance: 40,
    },
  },
};

// const container = document.getElementById('bubbles');
// const network = new vis.Network(container, data, options);

const wrapperRef = React.createRef();

export default function DiscoveryFirstRun() {
  useEffect(function() {
    let network = new vis.Network(wrapperRef, data, options);
    // Cleanup on unmount
    // network = ...
  }, []);

  return <div ref={wrapperRef} />;
}
