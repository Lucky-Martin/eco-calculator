import {TDeviceType, TDeviceTypeBG} from "../models/device.model";

export const getDeviceTypeInLocalLanguage = (deviceType: TDeviceType) => {
  switch (deviceType) {
    case "dishwashers2019":
      return 'Съдомиялна';
    case "washingmachines2019":
      return 'Пералня';
    case "washerdriers2019":
      return 'Пералня със сушилня';
    case "electronicdisplays":
      return 'Телевизор/Монитор';
    case "refrigeratingappliances2019":
      return 'Хладилник/Фризер/Хранилище за вино';
    case "lightsources":
      return 'Лампа/Крушка';
    case "airconditioners":
      return 'Климатик';
    case "ovens":
      return 'Фурна';
    case "rangehoods":
      return "Аспиратор";
    case "waterheaters":
      return 'Бойлер';
  }
}

export const getDeviceTypeFromLocalLanguage = (deviceTypeInBg: TDeviceTypeBG) => {
  switch (deviceTypeInBg) {
    case "Съдомиялна":
      return 'dishwashers2019';
    case "Пералня":
      return 'washingmachines2019';
    case "Пералня със сушилня":
      return 'washerdriers2019';
    case "Телевизор/Монитор":
      return 'electronicdisplays';
    case "Хладилник/Фризер/Хранилище за вино":
      return 'refrigeratingappliances2019';
    case "Лампа/Крушка":
      return 'lightsources';
    case "Климатик":
      return 'airconditioners';
    case "Фурна":
      return 'ovens';
    case "Аспиратор":
      return "rangehoods";
    case "Бойлер":
      return 'waterheaters';
  }
}
