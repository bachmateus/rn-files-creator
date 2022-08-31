export interface RnFilesCreatorConfigFile {
  language: configFileLanguageType
  styleType: configFileStyleType
}

export type configFileLanguageType = "JavaScript" | "TypeScript"
export type configFileStyleType = "StyleSheet" | 'styled-component'