import { NotifierInterface, ShowNotificationParams } from 'react-native-notifier/lib/typescript/types';

export default interface NotificationInterface {
  add: (params: ShowNotificationParams) => void;
  get: () => NotifierInterface;
  error: (params: Partial<ShowNotificationParams>) => void;
  success: (params: Partial<ShowNotificationParams>) => void;
  warn: (params: Partial<ShowNotificationParams>) => void;
  info: (params: Partial<ShowNotificationParams>) => void;
  close: () => void;
}
