// import IonIcon from '@reacticons/ionicons';
import { IonRow } from '@ionic/react';
import { useRef, useState } from 'react';

// social sharing library
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';

const ShareButton: React.FC<any> = ({ emoji, icon }) => {
  const Share = useRef<any>();
  const IonIcon = icon;
  const [lastCalled, setLastCalled] = useState(0);

  const shareButton = async () => {
    // debounce function so that user can't spam share button
    const currentTime = Date.now();
    if (currentTime - lastCalled < 1000) {
      // delay of 1000 ms
      return;
    }

    setLastCalled(currentTime);

    // button press animation for share button
    setTimeout(() => {
      Share.current.classList.remove('modal-icon-pressed');
    }, 260);
    Share.current.classList.add('modal-icon-pressed');

    // our json doesn't have this line in front of the base64 so just prepending to be
    // able to use this social share plugin. We will also style the button when it's pressed
    // const prependData = 'data:image/png;base64,' + emoji.data;

    // params @message, @subject, @file, @url
    // SocialSharing.share(`${emoji.name_arrernte} | ${emoji.name}`, '', prependData);

    const prependData = `data:image/png;base64,${emoji.data}`;
    SocialSharing.share(`${emoji.name_arrernte} | ${emoji.name}`, '', prependData);
  };

  return (
    <IonRow ref={Share} onClick={shareButton} className="iconRow">
      {/* social share  */}
      <IonIcon name="share-social-outline" className="modal-icon" size="large" />
      <h4> share </h4>
    </IonRow>
  );
};
export default ShareButton;
