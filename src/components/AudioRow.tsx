import { useEffect, useState, useRef } from 'react';
import { IonRow } from '@ionic/react';

const AudioRow: React.FC<any> = ({ emoji, icon, onClose, onAudioLoaded }) => {
  const IonIcon = icon;
  const audioRow = useRef<any>();
  const phraseRow = useRef<any>();

  let playEvent = useRef<HTMLAudioElement>(new Audio(emoji.audio));
  let playPhraseEvent = useRef<HTMLAudioElement>(new Audio(emoji.phrases));

  const phrase = emoji.phrases;

  let [isPlaying, setIsPlaying] = useState(false);
  let [phrasePlaying, setPhrasePlaying] = useState(false);

  const playAudio = (e: any) => {
    const audioPhrase = e.currentTarget.id;

    // toggle the current play state
    let prevValue: any;
    // toggle play/ pause
    // grab previous value when state updated, which we can use to keep track
    if (audioPhrase === 'audio') {
      prevValue = isPlaying;
      setIsPlaying(true);
      setIsPlaying(!prevValue);
    } else if (audioPhrase === 'phrase') {
      prevValue = phrasePlaying;
      setPhrasePlaying(true);
      setPhrasePlaying(!prevValue);
    }
    // check if not the previous value then play and on toggle, pause and reset audio
    // then remove css class from icon
    if (!prevValue) {
      if (audioPhrase === 'audio') {
        // play the Emoji audio
        playEvent.current.play();
        // change color of play icon to ochre yellow
        audioRow.current.classList.add('audio-active');
        // grey out the non-playing row
        if (phrase) {
          phraseRow.current.classList.add('ghost');
        }
      } else if (audioPhrase === 'phrase') {
        playPhraseEvent.current.play();
        // grey out the non-playing row
        phraseRow.current.classList.add('audio-active');
        audioRow.current.classList.add('ghost');
      }
    } else {
      if (audioPhrase === 'audio') {
        playEvent.current.pause();
        playEvent.current.currentTime = 0;
        audioRow.current.classList.remove('audio-active');
        if (phrase) {
          phraseRow.current.classList.remove('ghost');
        }
      } else {
        playPhraseEvent.current.pause();
        playPhraseEvent.current.currentTime = 0;
        audioRow.current.classList.remove('ghost');
        if (phrase) {
          phraseRow.current.classList.remove('audio-active');
        }
      }
    }

    playEvent.current.onended = () => {
      setIsPlaying(false);
      audioRow.current.classList.remove('audio-active');
      if (phrase) {
        phraseRow.current.classList.remove('ghost');
      }
    };

    playPhraseEvent.current.onended = () => {
      setPhrasePlaying(false);
      phraseRow.current.classList.remove('audio-active');
      audioRow.current.classList.remove('ghost');
    };
  };

  // cleanup
  useEffect(() => {
    // Ensure that the component is mounted
    let isMounted = true;

    const cleanup = () => {
      if (isMounted) {
        // reset to default values
        setIsPlaying(false);
        setPhrasePlaying(false);

        // audioRow
        // and PhraseRow onlcick Event Listener remove

        // Remove event listeners
        if (playEvent.current) {
          playEvent.current.pause();
          playEvent.current.currentTime = 0;
          playEvent.current.onended = null;
        }
        if (playPhraseEvent.current) {
          playPhraseEvent.current.pause();
          playPhraseEvent.current.currentTime = 0;
          playPhraseEvent.current.onended = null;
        }

        isMounted = false;
      }
    };

    return cleanup;
  }, []);

  return (
    <div>
      <audio src={emoji.audio} ref={playEvent}></audio>
      <IonRow ref={audioRow} onClick={playAudio} className='iconRow' id='audio'>
        {isPlaying ? (
          <IonIcon name='stop-circle' className='modal-icon' size='large' />
        ) : (
          <IonIcon
            name='play-circle-outline'
            className='modal-icon'
            size='large'
          />
        )}
        <h4> word </h4>
      </IonRow>
      <audio src={emoji.phrases} ref={playPhraseEvent}></audio>
      {/* // if phrase in the object then render it in the modal otherwise don't show anything */}
      {phrase ? (
        <IonRow
          ref={phraseRow}
          onClick={playAudio}
          className='iconRow'
          id='phrase'>
          {/* change icon depending on whether the button is playing or not */}
          {phrasePlaying ? (
            <IonIcon name='stop-circle' className='modal-icon' size='large' />
          ) : (
            <IonIcon
              name='play-circle-outline'
              className='modal-icon'
              size='large'
            />
          )}

          <h4> phrase </h4>
          <br />
        </IonRow>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AudioRow;
