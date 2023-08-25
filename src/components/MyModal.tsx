import { useEffect, useState, useRef, useCallback } from 'react';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonImg,
  IonGrid,
  IonCol,
  IonModal,
  IonChip,
  IonButtons,
  IonButton,
} from '@ionic/react';
import React from 'react';

import './styles/MyModal.css';
import IonIcon from '@reacticons/ionicons';

import ShareButton from './ShareButton';
import AudioRow from './AudioRow';

const MyModal: React.FC<any> = ({ isOpen, onClose, initialData, index }) => {
  const ArrernteChip = useRef<any>();
  const EnglishChip = useRef<any>();
  const emoji = initialData;
  const [name, setName]: any = useState(emoji.name_arrernte);
  const [phrase, setPhrase]: any = useState(emoji.phrases_arrernte);

  let lastCalled = 0;

  // Set the default title to arrerntewhen modal opened
  useEffect(() => {
    setName(emoji.name_arrernte);
    setPhrase(emoji.phrases_arrernte);
  }, [emoji.name_arrernte, emoji.phrases_arrernte]);

  // change active chip color and setName when arrernteor English is selected in the modal
  const modalName = (e: any) => {
    const languageChoice = e.nativeEvent.srcElement.innerText;

    // will need to change these names when populating with Katyetye
    if (languageChoice === 'Arrernte') {
      setName(emoji.name_arrernte);
      setPhrase(emoji.phrases_arrernte);
      // if Katyetye chosen, change to ochre yellow
      ArrernteChip.current.style = 'background:#fab923;';
      // grab the inactive chip and change its colour to default
      EnglishChip.current.style = 'background:#646466';
    } else if (languageChoice === 'English') {
      setName(emoji.name);
      setPhrase(emoji.phrases_english);
      //if english chosen, change english to ochre yellow
      EnglishChip.current.style = 'background:#fab923;';
      // grab the inactive chip and change its colour to default
      ArrernteChip.current.style = 'background:#646466';
    }
  };

  // modal close event handler
  const Close = useCallback(() => {
    setName(emoji.name_arrernte);
    if (phrase) {
      setPhrase(emoji.phrases_arrernte);
    }
    // close the modal
    onClose();
    // return () => {
    //   clearTimeout(timeoutId);
    // };
  }, [onClose, phrase, emoji.name_arrernte, emoji.phrases_arrernte]);

  // enable the hardware back button to close the modal
  useEffect(() => {
    const backButtonHandler = () => {
      // debounce function so that user can't spam back button
      const currentTime = Date.now();
      if (currentTime - lastCalled < 1000) {
        // delay of 1000 ms
        return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      lastCalled = currentTime;

      Close();
    };
    // if you press back, make sure you can click on modals again
    if (isOpen) {
      document.addEventListener('ionBackButton', backButtonHandler);
    } else {
      document.removeEventListener('ionBackButton', backButtonHandler);
    }
    return () => {
      document.removeEventListener('ionBackButton', backButtonHandler);
    };
  }, [isOpen, Close]);

  const i = index;
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar color="none">
          <IonButtons slot="start">
            {/* close button */}
            <IonButton onClick={Close} style={{ color: 'black' }}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="modal-container">
          <IonImg src={emoji.file} alt={emoji.name} id="modalImg" />

          <h1> {name}</h1>

          <IonChip ref={ArrernteChip} id="aChip" onClick={modalName}>
            Arrernte
          </IonChip>
          <IonChip ref={EnglishChip} onClick={modalName}>
            English
          </IonChip>

          <br />
          <br />

          <IonGrid>
            <IonCol>
              {/* share button and audio buttons */}
              <ShareButton emoji={emoji} icon={IonIcon} />
              <AudioRow emoji={emoji} icon={IonIcon} />
            </IonCol>
            {/* on english/arrernteclick change phrase language */}
            <p className="phraseText"> {phrase}</p>
          </IonGrid>
        </div>
      </IonContent>
    </IonModal>
  );
};
export default MyModal;
