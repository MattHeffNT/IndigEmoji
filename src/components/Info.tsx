import './styles/Info.css';
import { lazy, Suspense, useState } from 'react';
import { IonContent } from '@ionic/react';

const Info: React.FC<any> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Slides = lazy(() => import('./Slides'));

  return (
    <IonContent>
      <div className="info-container">
        <h1> Emoji-akerte / About</h1>
        <strong>
          <p>
            Emoji itne-areye Australia mpwepe-arenye. itne ayeye anwerne-akerte, altyerre-akerte,
            angkentye akerte uthene. Arrernte angkentye anwernekenhe impene anthurre, altyerrenge.
            Australian-mpwepe angkentye atningke akerte kenhe Arrernte Mparntwe-arenye kwenhe.
            Marle, urreye, arelhe, artwe-areye-uthene-arle emoji-kenhe arlkenye intelheleke
            uterne-ureke. Emoji arrpe-anenhe arritnye Arrernte-kenhe-akerte, anwerne ahentye
            arrantherre itnenhe akaltye-irretyeke. Anwerne internet-nge itnenhe arrerneke kele
            angkentye anwernekenhe rlterrke-aneme-akwete.
          </p>
        </strong>
        <p>
          This emoji sticker set represents life, culture and language on Arrernte Country in
          Central Australia. Each design was developed during seven weeks of workshops held at the
          Alice Springs Public Library over the summer school holidays of 2018 as part of the Geek
          in Residence program. These digital art workshops ran all day, seven days a week, with
          over 1000 participants from Mparntwe/Alice Springs as well as from many remote
          communities. The young designers were supported by a team of senior Indigenous artists,
          Digital Mentors and Arrernte linguists to help them realise their ideas.
        </p>
        <p>
          Each emoji has an Arrernte name, the ancient language of our place, that we hope you’ll
          learn. It’s just one way of sharing our culture online and contributing to the
          decolonisation of the internet for our young people. We hope we can use the internet to
          keep our language strong.
        </p>
        {/* onClick launch modal/slide component? */}
        <p
          onClick={() => {
            setIsOpen(true);
          }}
          id="slide-link"
        >
          View the welcome screens
        </p>
        <p> Read more about the emojis on the </p>
        <a href="https://www.indigemoji.com.au/">Indigemoji website.</a>
        <br />
        <p>
          <a href="https://www.indigemoji.com.au/terms-conditions">
            View terms and conditions of use.
          </a>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Slides
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </Suspense>
      </div>
    </IonContent>
  );
};
export default Info;
