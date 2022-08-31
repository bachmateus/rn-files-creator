export const componentFilesToCopy = {
  JavaScript: {
    StyleSheet: [
      { templateFileName: 'index.js', fileName: 'index.js' },
      { templateFileName: 'styles.StyleSheet.js', fileName: 'styles.js' },
    ],
    'styled-component': [
      { templateFileName: 'index.js', fileName: 'index.js' },
      { templateFileName: 'styles.StyledComponent.js', fileName: 'styles.js' },
    ]
  },
  TypeScript: {
    StyleSheet: [
      { templateFileName: 'index.ts', fileName: 'index.ts' },
      { templateFileName: 'styles.StyleSheet.js', fileName: 'styles.ts' },
    ],
    'styled-component': [
      { templateFileName: 'index.ts', fileName: 'index.ts' },
      { templateFileName: 'styles.StyledComponent.js', fileName: 'styles.ts' },
    ]
  },
}