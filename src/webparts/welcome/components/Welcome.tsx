import * as React from 'react';
import styles from './Welcome.module.scss';
import type { IWelcomeProps } from './IWelcomeProps';

export default class Welcome extends React.Component<IWelcomeProps> {
  private getWelcomeMessage(): string {
    const { welcomeMessage, fallbackMessage, userDisplayName } = this.props;
    
    if (!userDisplayName) {
      return fallbackMessage;
    }

    return welcomeMessage.replace('{currentUser}', userDisplayName);
  }

  private getBackgroundColor(): string {
    const { backgroundColor, backgroundOpacity } = this.props;
    
    if (!backgroundColor) {
      return 'transparent';
    }

    const opacity = Math.round(backgroundOpacity * 255 / 100);
    const hexOpacity = opacity.toString(16);
    return `${backgroundColor}${hexOpacity.length === 1 ? '0' + hexOpacity : hexOpacity}`;
  }

  public render(): React.ReactElement<IWelcomeProps> {
    const {
      fontSize,
      isBold,
      isItalic,
      fontColor
    } = this.props;

    const messageStyles: React.CSSProperties = {
      fontSize: `${fontSize}px`,
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      color: fontColor || '#000000',
      backgroundColor: this.getBackgroundColor(),
      padding: '8px 15px',
      borderRadius: '4px',
      maxWidth: '100%',
      wordWrap: 'break-word'
    };

    return (
      <div className={styles.welcomeContainer}>
        <div style={messageStyles}>
          {this.getWelcomeMessage()}
        </div>
      </div>
    );
  }
}
