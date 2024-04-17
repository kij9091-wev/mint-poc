import React, { useEffect, useState } from 'react';
import { LookerEmbedSDK } from '@looker/embed-sdk';
const EmbedSDK = ({ runtimeConfig }) => {
  const [look, setLook] = useState(false);
  const [lookState, setLookState] = useState('');
  const updateState = (elementId, newState) => {
    setLookState(newState);
  };

  useEffect(() => {
    const sdk = LookerEmbedSDK.init('hybe.cloud.looker.com', '/auth');
    console.log('sdk : ' + sdk)
    if(!look) {
       LookerEmbedSDK.createLookWithUrl('https://hybe.cloud.looker.com/embed/looks/5')
        // LookerEmbedSDK.createLookWithId(4)
        .appendTo('#dashboard-container')
        .withClassName('category-count')
        .build()
        .connect()
        .then((embedItem) => {
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      let a = LookerEmbedSDK.createLookWithUrl('https://hybe.cloud.looker.com/embed/looks/4')
        // LookerEmbedSDK.createLookWithId(4)
        .appendTo('#dashboard-container')
        .withClassName('timeline')
        .on('look:run:start',
          () => {updateState('#dashboard-container', 'Running')
            console.log('Running')
        })
        .on('look:run:complete',
          () => {updateState('#dashboard-container', 'Done')
            console.log('Done')
        })
        .build()
        .connect()
        .then((embedItem) => {
          setLook(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });


      console.log(a)
      console.log('lookstate : ' + lookState)
    }

    // LookerEmbedSDK.createLookWithId(4)
    //   .appendTo('#look')
    //   // .on('look:ready', () => updateStatus('#look-state', 'Loaded'))
    //   // .on('look:run:start', () => updateStatus('#look-state', 'Running'))
    //   // .on('look:run:complete', () => updateStatus('#look-state', 'Done'))
    //   // .on('look:save:complete', () => updateStatus('#look-state', 'Saved'))
    //   // .on('look:delete:complete', () => updateStatus('#look-state', 'Deleted'))
    //   // .on('session:status', (event) => {
    //   //   processSessionStatus(event, '#look-state')
    //   // })
    //   .withClassName('look')
    //   .withFilters({ 'State / Region': 'California' })
    //   .build()
    //   .connect()
    //   .then((embedItem) => {
    //     // 성공적으로 로드될 때 수행할 작업
    //     console.log('success')
    //   })
    //   .catch((error) => {
    //     console.log('fail')
    //     // 오류 처리
    //   });
  }, [runtimeConfig, look]);

  return <div id="dashboard-container"> {lookState}</div> ;
};

export default EmbedSDK;