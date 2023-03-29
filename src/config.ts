export enum Colors {
  BACKGROUND = "#0D1117",
  BACKGROUND_LIGHT = "#171b22",
  PRIMARY = "#66ced6",
  SECONDARY = "#C2E2EB",
};

export enum Services {
  MEDIUM = "Medium",
  SUBSTACK = "Substack",
  RSS = "RSS"
};

export enum ServicesIcons {
  MEDIUM = "https://cdn-icons-png.flaticon.com/512/2111/2111502.png",
  SUBSTACK = "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fba81cfff-7bc5-4aef-866e-864d0942c42d_1000x1000.png",
  RSS = "https://cdn-icons-png.flaticon.com/512/124/124033.png"
};

export const SIGNED_IN_USER_KEY = "morningbrew_user";
export const SIGNED_IN_TOKEN = "morningbrew_token";

export const times: { [key: string]: string } = {
  '12:00 am': '00:00',
  '1:00 am': '01:00',
  '2:00 am': '02:00',
  '3:00 am': '03:00',
  '4:00 am': '04:00',
  '5:00 am': '05:00',
  '6:00 am': '06:00',
  '7:00 am': '07:00',
  '8:00 am': '08:00',
  '9:00 am': '09:00',
  '10:00 am': '10:00',
  '11:00 am': '11:00',
  '12:00 pm': '12:00',
  '1:00 pm': '13:00',
  '2:00 pm': '14:00',
  '3:00 pm': '15:00',
  '4:00 pm': '16:00',
  '5:00 pm': '17:00',
  '6:00 pm': '18:00',
  '7:00 pm': '19:00',
  '8:00 pm': '20:00',
  '9:00 pm': '21:00',
  '10:00 pm': '22:00',
  '11:00 pm': '23:00',
};

export const dayMap: { [key: string]: string } = {
  'Mo': 'mon',
  'Tu': 'tue',
  'We': 'wed',
  'Th': 'thu',
  'Fr': 'fri',
  'Sa': 'sat',
  'Su': 'sun'
};