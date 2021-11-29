class Library {

  /**
   * Method that check if the target directory is a React Native project. It is 
   *  done by checking if package.json file exists.
   * 
   * @param targetDirectory string - project path 
   * @return fileContent string
   */
  checkIfIsRNProject (targetDirectory) {}

  /**
   * Method that find for lib on package.json file
   * 
   * @param libName string
   * @return boolean 
   */
  findForLib(libName) {}

  /**
   * Method that install a lib in the project
   * 
   * @param libName string
   * @return boolean
   */
  installLib(libName) {}
}