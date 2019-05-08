// @flow
import React, { useEffect, useState } from 'react';
import vis from 'vis';
import { Form, FormField } from 'component/common/form';

type Props = {
  onSelect: string => void,
  selected: Array<string>,
  selectableTags: Array<string>,
};

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
                backgroundColor: tag.isMyTag ? 'green' : '',
                borderColor: 'black',
                borderStyle: 'dotted',
                borderWidth: 1,
              }}
            >
              {tag.label}
            </div>
            <div onClick={() => doDeleteTag(tag)}>&times;</div>
          </div>
        );
      })}
    </section>
  );
}
