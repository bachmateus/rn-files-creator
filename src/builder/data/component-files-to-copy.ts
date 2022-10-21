export const componentFilesToCopy = {
  JavaScript: {
    StyleSheet: [
      { templateFileName: 'index.StyleSheet.js', fileName: 'index.js', shallRename: true },
      { templateFileName: 'styles.StyleSheet.js', fileName: 'styles.js', shallRename: false },
    ],
    'styled-component': [
      { templateFileName: 'index.StyledComponent.js', fileName: 'index.js', shallRename: true },
      { templateFileName: 'styles.StyledComponent.js', fileName: 'styles.js', shallRename: false },
    ]
  },
  TypeScript: {
    StyleSheet: [
      { templateFileName: 'index.StyleSheet.ts', fileName: 'index.tsx', shallRename: true },
      { templateFileName: 'styles.StyleSheet.js', fileName: 'styles.ts', shallRename: false },
    ],
    'styled-component': [
      { templateFileName: 'index.StyledComponent.ts', fileName: 'index.tsx', shallRename: true },
      { templateFileName: 'styles.StyledComponent.js', fileName: 'styles.ts', shallRename: false },
    ]
  },
}