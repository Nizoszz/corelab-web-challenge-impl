export const getColorClass = (color: string) =>{
    switch (color) {
      case '#BAE2FF':
        return 'color-1';
      case '#B9FFDD':
        return 'color-2';
      case '#FFE8AC':
        return 'color-3';
      case '#FFCAB9':
        return 'color-4';
      case '#F99494':
        return 'color-5';
      case '#9DD6FF':
        return 'color-6';
      case '#ECA1FF':
        return 'color-7';
      case '#DAFF8B':
        return 'color-8';
      case '#FFA285':
        return 'color-9';
      case '#CDCDCD':
        return 'color-10';
      case '#979797':
        return 'color-11';
      case '#A99A7C':
        return 'color-12';
      default:
        return 'default-color';
    }
  }