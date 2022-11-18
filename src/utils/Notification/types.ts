import { NotifierInterface, ShowNotificationParams } from "react-native-notifier/lib/typescript/types";

export interface NotificationContrato {
    add: (params:ShowNotificationParams) => void;
    get: () => NotifierInterface;
}