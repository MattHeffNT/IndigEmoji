import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonModal,
  IonToolbar,
  IonButtons,
  IonContent,
  IonButton,
  IonImg,
} from '@ionic/react';
import { IonGrid, IonCol, IonRow } from '@ionic/react';
import IonIcon from '@reacticons/ionicons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper';

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';

import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import './styles/Slides.css';
import '../theme/variables.css';

// Optional parameters to pass to the swiper instance.
// See https://swiperjs.com/swiper-api for valid options.

interface SlidesProps {
  isOpen: boolean;
  onClose: () => void;
}

const Slides = React.memo(({ isOpen, onClose }: SlidesProps) => {
  const slidesRef = useRef<any>();
  const contentRef = useRef<HTMLIonContentElement>(null);
  const closeButton = useRef<any>();
  const history = useHistory();

  // this function controlls the scroll on some slides, the transition effects,
  // as well as making sure between each slide the scroll position is reset
  const resetSlideScroll = useCallback(async () => {
    // on smaller content pages disable scroll
    if (contentRef.current) {
      contentRef.current.scrollY = true;
      contentRef.current.scrollToTop();
    }
  }, []);

  // on about link click come back to about page
  const handleLink = useCallback(() => {
    const content = document.querySelector('.info-container');

    history.push('/page/Information');

    onClose();

    if (content) {
      content.scrollIntoView();
    }
  }, [history, onClose]);

  // enable the hardware back button to close the modal
  useEffect(() => {
    if (isOpen) {
      const backButtonHandler = (e: any) => {
        e.detail.register(100, () => {
          onClose();
        });
      };
      document.addEventListener('ionBackButton', backButtonHandler);
      return () => {
        document.removeEventListener('ionBackButton', backButtonHandler);
        onClose();
      };
    }
  }, [isOpen, onClose]);

  return (
    <IonModal isOpen={isOpen}>
      <IonContent ref={contentRef} id='slide-content'>
        <IonToolbar color='none'>
          <IonButtons slot='end'>
            <IonButton
              onClick={onClose}
              ref={closeButton}
              style={{ marginTop: '3rem' }}
            >
              <IonIcon name='close' className='modal-icon' size='large' />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <Swiper
          ref={slidesRef}
          modules={[Pagination, EffectFade]}
          pagination={true}
          onSlideChange={resetSlideScroll}
        >
          {/* @ts-ignore */}

          <SwiperSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg
                    src='/assets/welcome/start_header_no.png'
                    id='slide-img'
                  />
                </IonCol>
                <IonCol>
                  <div className='slide-container'>
                    <h1 style={{ color: 'white' }}>Indigemoji</h1>
                    <strong>
                      <p>
                        Emoji nhenhe-areye arrwekele anthurre Australia-kenhe.
                        Tyerretye Arrernte-areye itnenhe mpwareke,
                      </p>
                    </strong>

                    <p style={{ color: 'white' }}>
                      Australia’s first set of Indigenous emojis made on
                      Arrernte country in Mparntwe / Alice Springs.
                    </p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </SwiperSlide>
          <SwiperSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg
                    src='/assets/welcome/screen1_header.png'
                    id='slide-img'
                  />
                </IonCol>
                <IonCol>
                  <div className='slide-container'>
                    <h1 style={{ color: 'white' }}>Werte!</h1>
                    <strong>
                      <p>
                        Anwerne akangentye arrantherre apetyeke Indigemoji-kenhe
                        aretyeke. Arne-nhenhe-areye arrekantherre ileme
                        anwerne-akerte, altyerre, arne, awelhentye-areye,
                        angkentye anwernekenhe-uthene. Impene anthurre kwenhe
                        arrantherre angkentye akaltye-irretyeke, angkentye
                        anwernekenhe akwete-ante rlterrke antirrkwetyeke.
                      </p>
                    </strong>
                    <p style={{ color: 'white' }}>
                      Welcome to the IndigEmoji app! This sticker set represents
                      life, culture and language in our part of Central
                      Australia, the traditional land of the Arrernte people. It
                      is important you learn so that we hold our language
                      strong, forever.
                    </p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </SwiperSlide>
          <SwiperSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg
                    src='/assets/welcome/screen2_header.png'
                    id='slide-img'
                  />
                </IonCol>
                <IonCol>
                  <div className='slide-container'>
                    <strong>
                      <p>
                        Tyerretye anwerkenhe-arle itnhenhe-areye mpwareke.
                        Arrernte ilyernpenye-areye help-me-ileme angkentye
                        arratye arrerneke.
                      </p>
                    </strong>
                    <p style={{ color: 'white' }}>
                      These emoji stickers were made by hundreds of young people
                      with senior Arrernte cultural advisers, for you to use.
                    </p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </SwiperSlide>
          <SwiperSlide>
            {/* "slide 4" */}
            <IonRow>
              <IonCol>
                <IonImg
                  src='/assets/welcome/screen3_header.png'
                  id='slide-img'
                />
              </IonCol>
              <IonCol>
                <div className='slide-container'>
                  <h1 style={{ color: 'white' }}>Antherreme</h1>
                  <strong>
                    <p>
                      Unte apeke emoji renhe yernetyeke, app nhenhe
                      altywere-ilaye, kele emoji unte ahentye-aneme uthemele,
                      kele imernte antherreme-kenhe-button ulthemele.
                    </p>
                  </strong>
                  <p style={{ color: 'white' }}>
                    To share an emoji sticker, just open this app, select the
                    sticker you want to use and then tap the share button. You
                    can then choose which platform you want to share the sticker
                    on.
                  </p>
                </div>
              </IonCol>
            </IonRow>
          </SwiperSlide>
          <SwiperSlide>
            {/* "slide 5" */}
            <IonRow>
              <IonCol>
                <IonImg
                  src='/assets/welcome/screen5_header.png'
                  id='slide-img'
                />
              </IonCol>
              <IonCol>
                <div className='slide-container'>
                  <h1 style={{ color: 'white' }}>Awaye!</h1>
                  <p style={{ color: 'white' }}>
                    New audio! Press the play button to learn to pronouncethe
                    Arrernte emojis!
                  </p>
                </div>
              </IonCol>
            </IonRow>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonModal>
  );
});
export default Slides;
