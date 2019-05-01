import React, { useState, useRef, useContext, useLayoutEffect, createContext } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import { useRect } from '@reach/rect';

const AnimatedContext = React.createContext();

export function AnimatedTabs(props) {
  // Store the position of the selected Tab so we can animate the bar to its position
  const [selectedRect, setSelectedRect] = useState(null);

  // Need to measure the parent element so we can measure the relative "left" for the bar
  const tabsRef = useRef();
  const tabsRect = useRect(tabsRef);

  // Put the function to change the positions in context so the Tabs down the tree can easily access it
  return (
    <AnimatedContext.Provider value={setSelectedRect}>
      <Tabs {...props} ref={tabsRef} style={{ ...props.style, position: 'relative' }}>
        {props.children[0]}

        {/* put a slider inbetween the TabList and TabPanels */}
        <div
          className="tab__divider"
          style={{
            left: selectedRect && selectedRect.left - tabsRect.left,
            width: selectedRect && selectedRect.width,
          }}
        />

        {props.children[1]}
      </Tabs>
    </AnimatedContext.Provider>
  );
}

export function AnimatedTab(props) {
  const { isSelected } = props;

  // Each tab measures itself
  const ref = useRef();
  const rect = useRect(ref, isSelected);

  // and calls up to the parent when it becomes selected
  // we useLayoutEffect to avoid flicker
  const setSelectedRect = useContext(AnimatedContext);
  useLayoutEffect(() => {
    if (isSelected) setSelectedRect(rect);
  }, [isSelected, rect, setSelectedRect]);

  return <Tab ref={ref} {...props} className="tab" style={{ ...props.style, border: 'none' }} />;
}
