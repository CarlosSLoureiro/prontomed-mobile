import { Notifier } from "react-native-notifier";
import { NotifierComponents } from 'react-native-notifier';
import { NotifierInterface, ShowNotificationParams } from "react-native-notifier/lib/typescript/types";
import { NotificationContrato } from "./types";

class Notification implements NotificationContrato {
    current: ShowNotificationParams = {};

    add(params: ShowNotificationParams): void {
        if (this.current?.title !== params?.title) {
            this.current = params;
            Notifier.showNotification(this.current);
            setTimeout(
                () => this.current = {},
                this.current?.duration ?? 3000
            );
        }
    }

    error(params: Partial<ShowNotificationParams>): void {
        const defaultParams = {
            title: 'Error!',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'error',
            },
            duration: 3000,
        };

        this.add({...defaultParams, ...params});
    }

    get(): NotifierInterface {
        return Notifier;
    }
}

export default new Notification();