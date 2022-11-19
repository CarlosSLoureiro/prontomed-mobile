import { Notifier } from "react-native-notifier";
import { NotifierComponents } from 'react-native-notifier';
import { NotifierInterface, ShowNotificationParams } from "react-native-notifier/lib/typescript/types";
import { NotificationContrato } from "./types";

class Notification implements NotificationContrato {
    private static _instancia: Notification;
    private current: ShowNotificationParams = {};
    private onHidden:Function|undefined;

    public static get Instancia() {
        return this._instancia || (this._instancia = new this());
    }

    private clear() {
        console.log('hiden from notif');
        if (this.onHidden !== undefined) {
            this.onHidden();
        }
        this.current = {}
    }

    public add(params: ShowNotificationParams): void {
        if (this.current?.title !== params?.title) {
            this.current = params;
            this.onHidden = params?.onHidden;
            this.current.onHidden = () => {
                this.clear();
            }
            Notifier.showNotification(this.current);
        }
    }

    public error(params: Partial<ShowNotificationParams>): void {
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

    public success(params: Partial<ShowNotificationParams>): void {
        const defaultParams = {
            title: 'Success!',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'success',
            },
            duration: 3000,
        };

        this.add({...defaultParams, ...params});
    }

    public info(params: Partial<ShowNotificationParams>): void {
        const defaultParams = {
            title: 'Info!',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'info',
            },
            duration: 3000,
        };

        this.add({...defaultParams, ...params});
    }

    public get(): NotifierInterface {
        return Notifier;
    }
}

export default Notification.Instancia;