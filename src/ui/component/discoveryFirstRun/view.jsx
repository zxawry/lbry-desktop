import React, { useEffect, useState } from 'react';
import vis from 'vis';
import { Form, FormField } from 'component/common/form';

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

type Props = {
  onSelect: string => void,
  selected: Array<string>,
  selectableTags: Array<string>,
};

// const nodeList = props.selectableTags.map(tag => {
//   return { label: tag };
// });
// const nodes = new vis.DataSet(nodeList);
// const edges = new vis.DataSet();

// const data = {
//   edges,
//   nodes,
// };

// const wrapperRef = React.createRef();
// useEffect(function() {
//   let network = new vis.Network(wrapperRef.current, data, options);
//   // Cleanup on unmount
//   // network = ...
// }, []);
export default function DiscoveryFirstRun(props: Props) {
  console.log('props', props);
  const { tags, doToggleTag, doDeleteTag } = props;

  const [newTag, setNewTag] = useState('');

  function onChange(e) {
    setNewTag(e.target.value);
  }

  function handleSubmit() {
    doToggleTag(newTag);
    setNewTag('');
  }

  return (
    <section className="discover-section">
      <Form onSubmit={handleSubmit}>
        <FormField type="text" value={newTag} onChange={onChange} />
      </Form>
      {tags.map(tag => {
        return (
          <div key={tag.label}>
            <div
              onClick={() => doToggleTag(tag.label)}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderStyle: 'dotted',
                backgroundColor: tag.isMyTag ? 'green' : '',
              }}
            >
              {tag.label}
            </div>
            <div onClick={() => doDeleteTag(tag)}>X</div>
          </div>
        );
      })}
    </section>
  );
  // return <section className="discover-section" ref={wrapperRef} />;
}
