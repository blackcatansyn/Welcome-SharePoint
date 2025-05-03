declare interface IWelcomeWebPartStrings {
  PropertyPaneDescription: string;
  MessageSettingsGroupName: string;
  FontSettingsGroupName: string;
  BackgroundSettingsGroupName: string;
  WelcomeMessageLabel: string;
  WelcomeMessageDescription: string;
  FallbackMessageLabel: string;
  FallbackMessageDescription: string;
  FontSizeLabel: string;
  BoldTextLabel: string;
  ItalicTextLabel: string;
  FontColorLabel: string;
  BackgroundColorLabel: string;
  BackgroundOpacityLabel: string;
}

declare module 'WelcomeWebPartStrings' {
  const strings: IWelcomeWebPartStrings;
  export = strings;
}
