export const componentFilesToCopy = {
  JavaScript: {
    StyleSheet: [
      { templateFileName: 'index.js', fileName: 'index.js', shallRename: true },
      { templateFileName: 'styles.StyleSheet.js', fileName: 'styles.js', shallRename: false },
    ],
    'styled-component': [
      { templateFileName: 'index.js', fileName: 'index.js', shallRename: true },
      { templateFileName: 'styles.StyledComponent.js', fileName: 'styles.js', shallRename: false },
    ]
  },
  TypeScript: {
    StyleSheet: [
      { templateFileName: 'index.ts', fileName: 'index.ts', shallRename: true },
      { templateFileName: 'styles.StyleSheet.js', fileName: 'styles.ts', shallRename: false },
    ],
    'styled-component': [
      { templateFileName: 'index.ts', fileName: 'index.ts', shallRename: true },
      { templateFileName: 'styles.StyledComponent.js', fileName: 'styles.ts', shallRename: false },
    ]
  },
}