
class LoaderHelper {
    static loader = null;
  
    static setLoader(loader) {
      this.loader = loader;
    }
  
    static loaderStatus(flag) {
      if (this.loader) {
        this.loader.updateStatus(flag);
      }
    }
  }
  
  export default LoaderHelper;
  