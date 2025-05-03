import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'WelcomeWebPartStrings';
import Welcome from './components/Welcome';
import { IWelcomeProps } from './components/IWelcomeProps';

export interface IWelcomeWebPartProps {
  welcomeMessage: string;
  fallbackMessage: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  fontColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
}

export default class WelcomeWebPart extends BaseClientSideWebPart<IWelcomeWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IWelcomeProps> = React.createElement(
      Welcome,
      {
        welcomeMessage: this.properties.welcomeMessage,
        fallbackMessage: this.properties.fallbackMessage,
        fontSize: this.properties.fontSize,
        isBold: this.properties.isBold,
        isItalic: this.properties.isItalic,
        fontColor: this.properties.fontColor,
        backgroundColor: this.properties.backgroundColor,
        backgroundOpacity: this.properties.backgroundOpacity,
        isDarkTheme: this._isDarkTheme,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.MessageSettingsGroupName,
              groupFields: [
                PropertyPaneTextField('welcomeMessage', {
                  label: strings.WelcomeMessageLabel,
                  description: strings.WelcomeMessageDescription,
                  multiline: true
                }),
                PropertyPaneTextField('fallbackMessage', {
                  label: strings.FallbackMessageLabel,
                  description: strings.FallbackMessageDescription,
                  multiline: true
                })
              ]
            },
            {
              groupName: strings.FontSettingsGroupName,
              groupFields: [
                PropertyPaneSlider('fontSize', {
                  label: strings.FontSizeLabel,
                  min: 12,
                  max: 32,
                  value: 16
                }),
                PropertyPaneToggle('isBold', {
                  label: strings.BoldTextLabel
                }),
                PropertyPaneToggle('isItalic', {
                  label: strings.ItalicTextLabel
                }),
                PropertyPaneTextField('fontColor', {
                  label: strings.FontColorLabel,
                  description: 'Enter a hex color code (e.g., #000000)'
                })
              ]
            },
            {
              groupName: strings.BackgroundSettingsGroupName,
              groupFields: [
                PropertyPaneTextField('backgroundColor', {
                  label: strings.BackgroundColorLabel,
                  description: 'Enter a hex color code (e.g., #ffffff)'
                }),
                PropertyPaneSlider('backgroundOpacity', {
                  label: strings.BackgroundOpacityLabel,
                  min: 0,
                  max: 100,
                  value: 100
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
