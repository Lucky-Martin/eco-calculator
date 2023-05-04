import {TDeviceType} from "../models/device.model";

export const getDeviceTypeInLocalLanguage = (deviceType: TDeviceType) => {
  switch (deviceType) {
    case 'refrigerator':
      return 'хладилник';
    case 'stove':
      return 'печка';
    case "air conditioner":
      return 'климатик';
    case "boiler":
      return 'бойлер';
    case "computer":
      return 'компютър';
    case "dishwasher":
      return 'съдомиална';
    case "dryer":
      return 'сушилня';
    case "microwave":
      return 'микровълнова';
    case "printer":
      return 'принтер';
    case "washing machine":
      return 'пералня';
  }
}
