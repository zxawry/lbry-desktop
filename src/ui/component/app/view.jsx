// @flow
import React, { useEffect, useState, useRef } from 'react';
import Router from 'component/router/index';
import ModalRouter from 'modal/modalRouter';
import ReactModal from 'react-modal';
import SideBar from 'component/sideBar';
import Header from 'component/header';
import { openContextMenu } from 'util/context-menu';
import Yrbl from 'component/yrbl';
import useKonami from 'util/use-konami';
import PerfectScrollbar from 'react-perfect-scrollbar';

type Props = {
  theme: string,
};

function App(props: Props) {
  const { theme } = props;
  const enhancedLayout = useKonami();
  const appRef = useRef(null);

  useEffect(() => {
    ReactModal.setAppElement(appRef.current);
  }, [appRef]);

  useEffect(() => {
    // Hooks are always client side, so documentElement will always exist
    // $FlowFixMe
    document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);

  return (
    <PerfectScrollbar>
      <div ref={appRef} onContextMenu={e => openContextMenu(e)}>
        <Header />
        <SideBar />

        <div className="main-wrapper">
          <Router />
        </div>

        <ModalRouter />
        {enhancedLayout && <Yrbl className="yrbl--enhanced" />}
      </div>
    </PerfectScrollbar>
  );
}

export default App;
