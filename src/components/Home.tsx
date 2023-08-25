import './styles/ExploreContainer.css';
import emojis from '../assets/emojis.json';
import { useEffect, useState, useRef, useMemo, lazy, Suspense } from 'react';
import {
  useIonViewWillEnter,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import Search from './Search';
import shortid from 'shortid';
import { App } from '@capacitor/app';
import { useHistory, useLocation } from 'react-router';

const Home: React.FC = () => {
  const MyModal = lazy(() => import('./MyModal'));
  const [emojisData, setEmojisData] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setSearchText] = useState('');
  const [myModal, setMyModal] = useState({ isOpen: false });
  const [isOpen, setIsOpen] = useState(false);

  const Slides = lazy(() => import('./Slides'));

  const isModalOpen = myModal.isOpen;
  // variables to map in the component
  var obj: any = emojis;
  var arr: any = obj.emojis;
  const emojiColumn: any = useRef();
  const emojiArray: any | undefined = useRef();
  const location = useLocation();

  const history = useHistory();
  // show welcome slides if the user hasn't opened the app before
  useIonViewWillEnter(() => {
    const openedBefore = localStorage.getItem('openedBefore');
    if (!openedBefore || openedBefore == null) {
      setIsOpen(true);
      localStorage.setItem('openedBefore', 'true');
    }
  });

  // if user presses back on home screen exit app
  // double check that the modal isn't open before exiting app
  useEffect(() => {
    const handleBackButton = () => {
      App.minimizeApp();
      history.push('/page/Home');
    };
    if (!isModalOpen) {
      document.addEventListener('ionBackButton', handleBackButton);
    } else {
      document.removeEventListener('ionBackButton', handleBackButton);
    }
    return () => {
      document.removeEventListener('ionBackButton', handleBackButton);
    };
  }, [isModalOpen, location.pathname, history]);

  const handleModalClose = (e: Event) => {
    setMyModal({ isOpen: false });
    return e;
  };

  const emojiElements = useMemo(() => {
    const generateEmojiElements = () => {
      //map through the emojis json and return it as a html/tsx component,we also need the index to reference the image import
      return arr.map((emoji: any, i: number) => {
        const id = shortid.generate();
        return (
          <IonCol size='3' key={id} ref={emojiColumn}>
            <img
              key={id}
              alt={emoji.name}
              src={emoji.file}
              id={emoji.name_arrernte}
              className='emoji'
              onClick={() => {
                setMyModal({ isOpen: true });
                setEmojisData(emoji);
              }}
            />
          </IonCol>
        );
      });
    };

    return generateEmojiElements();
  }, [arr, setEmojisData, setMyModal]);

  return (
    <IonContent>
      {/* welcome slides */}
      <Suspense fallback={<div></div>}>
        <Slides
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </Suspense>

      <div className='container'>
        {/* search */}
        <Search setSearchText={setSearchText} emojiArray={emojiArray} />

        {/*  emojis  */}
        <IonGrid>
          <IonRow ref={emojiArray}>{emojiElements}</IonRow>
        </IonGrid>
      </div>
      <Suspense fallback={<div></div>}>
        <MyModal
          isOpen={myModal.isOpen}
          onClose={handleModalClose}
          initialData={emojisData}
        />
      </Suspense>
    </IonContent>
  );
};
export default Home;
