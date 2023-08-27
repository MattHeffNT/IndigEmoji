import React from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import './styles/Team.css';

// Optional parameters to pass to the swiper instance.
// See https://swiperjs.com/swiper-api for valid options.

const Team: React.FC<any> = () => {
  return (
    <IonContent>
      <div className='teams-container'>
        <h1> Anwerne-akerte / Team </h1>
        <strong>
          <p>
            Arne-nhenhe-areye arrekantherre ileme anwerne-akerte, altyerre,
            arne, awelhentye-areye, angkentye anwernekenhe-uthene. Tyerretye
            anwerkenhe-arle itnhenhe-areye mpwareke. Arrernte ilyernpenye-areye
            help-me-ileme angkentye arratye arrerneke.
          </p>
        </strong>
        <p>
          This sticker set was designed by hundreds of young people and senior
          Arrernte cultural advisers during seven weeks of workshops as part of
          the Alice Springs Public Library’s Geek in Residence program. It is
          funded by the Northern Territory Government with support from the
          Alice Springs Town Council.
        </p>
        <p>
          inDigiMOB supported a team of senior artists and digital mentors to
          work with these young artists to realise their ideas. Leigh Harris and
          ingeous studios developed this app. We also thank the generous support
          of the Johnston Foundation.
        </p>
        <p>
          Additional developers:
          <a href='https://lav.io/'> Sam Lavigne</a>, Matthew Ngamurrari
          Heffernan{' '}
        </p>
        <p>
          Emoji advisers: Veronica Dobson Perrurle, Kathleen Wallace Kemarre,
          Joel Liddle Perrurle and Amelia Turner
        </p>
        <p>Producer: Caddie Brain</p>
        <p>
          Senior artists: Graham Wilfred, Dave Webb, Phillip McCormack, Emma
          Stubbs, Wyona Palmer, Colleen Powell, Lindsey Matthews, John Lewis,
          Benita Clements, Ricky Connick Jakamara, Dion Beasley and Elliat Rich
        </p>
        <p>
          Featured young emoji artists: Abraham Lennie, Aisha, Alba, Ashley
          Marshall, Astrid Keaney, Broadie, Cherina, Chris Jones, Denzel Steel,
          Dustin, Elizabeth Coulthard, Ellis, Ernestine Mulkatana, Felicity
          Malbunka, Ishmale, Jasmine Coulthard, Jessie, Joyanne Tilmouth,
          Kaylene Nelson, Kelvin Campbell, Lilah, Lily Blackman, Lucas Jones,
          Megan Noall, Mia Satour, Mikara Tilmouth, Mishka Kiessling, Mitchell,
          Natasha Angus, Onna, Reshanna, Sebastian, Shinarah, Tarynt Stubbs,
          Tjikiti Liddle, Vanessa and Vicprsha
        </p>
        <p>
          Youth team: Matt D’Penguin, Alice Goddard, Else Kennedy, Pathi Raj and
          Lindsey Matthews
        </p>
        <p>
          {' '}
          The use of Aboriginal Flag is courtesy of Harold Thomas and WAM
          Clothing.{' '}
        </p>
        <p>
          Audio: Joel Liddle Perrurle, Veronica Dobson Perrurle, Kathleen
          Wallace Kemarre and the Year 9 students at the Alice Springs Language
          Centre/Centralian Middle School: Ada Watson, Johnien Furber, Tyrell
          Martin, Shakira Richards, Lawrence Squires, Shalaylee Coombes,
          Shonneille Craig, Jenaya Newchurch, Wendelle Miller Kruger. With
          thanks to David Moore and Jannette McCormack.
        </p>
        <p>
          Full credits on the{' '}
          <a href='http://www.indigemoji.com.au/'>Indigemoji website</a>.
        </p>
        <IonGrid>
          <IonRow>
            <IonCol className='teamImages'>
              <a href='https://nt.gov.au'>
                <IonImg src='/assets/logos/ntglogo.png'> </IonImg>
              </a>
              <a href='https://www.indigimob.com.au/'>
                <IonImg src='/assets/logos/indigimoblogo.png'> </IonImg>
              </a>
              <a href='http://www.alicesprings.nt.gov.au/services/library'>
                <IonImg src='/assets/logos/library.jpg'> </IonImg>
              </a>
              <a href='http://www.desertpenguin.com.au/'>
                <IonImg src='/assets/logos/penguin.png'></IonImg>
              </a>
              <a href='https://www.ingeousstudios.com/'>
                <IonImg src='/assets/logos/ingeoussociallogo.png'></IonImg>
              </a>
              <IonImg src='/assets/logos/johnston_foundation.jpg'> </IonImg>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  );
};
export default Team;
