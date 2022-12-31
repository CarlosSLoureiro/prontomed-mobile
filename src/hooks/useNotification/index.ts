import { Notifier, NotifierComponents } from 'react-native-notifier';

import ThemeScheme from '@hooks/useThemeScheme';

import NotificationInterface from './interface';

import { NotifierInterface, ShowNotificationParams } from 'react-native-notifier/lib/typescript/types';

class Notification implements NotificationInterface {
  private static _instancia: Notification;
  private current: ShowNotificationParams = {};
  private onHidden: Function | undefined;

  public static get Instancia (): Notification {
    return this._instancia || (this._instancia = new this());
  }

  private clear (): void {
    if (this.onHidden !== undefined) {
      this.onHidden();
    }
    this.current = {};
  }

  public add (params: ShowNotificationParams): void {
    if (this.current?.title !== params?.title || this.current?.description !== params?.description) {
      this.current = params;
      this.onHidden = params?.onHidden;
      this.current.onHidden = () => {
        this.clear();
      };
      Notifier.showNotification(this.current);
    }
  }

  public error (params: Partial<ShowNotificationParams>): void {
    const componentProps = global.isDarkMode
      ? {
          backgroundColor: '#630000'
        }
      : {
          alertType: 'error'
        };

    const defaultParams = {
      title: 'Error!',
      Component: NotifierComponents.Alert,
      componentProps,
      duration: 3000
    };

    this.add({ ...defaultParams, ...params });
  }

  public success (params: Partial<ShowNotificationParams>): void {
    const componentProps = global.isDarkMode
      ? {
          backgroundColor: '#005d00'
        }
      : {
          alertType: 'success'
        };
    const defaultParams = {
      title: 'Success!',
      Component: NotifierComponents.Alert,
      componentProps,
      duration: 3000
    };

    this.add({ ...defaultParams, ...params });
  }

  public warn (params: Partial<ShowNotificationParams>): void {
    const componentProps = global.isDarkMode
      ? {
          backgroundColor: '#9a6200'
        }
      : {
          alertType: 'warn'
        };

    const defaultParams = {
      title: 'Warn!',
      Component: NotifierComponents.Alert,
      componentProps,
      duration: 3000
    };

    this.add({ ...defaultParams, ...params });
  }

  public info (params: Partial<ShowNotificationParams>): void {
    const componentProps = global.isDarkMode
      ? {
          backgroundColor: '#000989'
        }
      : {
          alertType: 'info'
        };

    const defaultParams = {
      title: 'Info!',
      Component: NotifierComponents.Alert,
      componentProps,
      duration: 3000
    };

    this.add({ ...defaultParams, ...params });
  }

  public close (): void {
    this.clear();
  }

  public get (): NotifierInterface {
    return Notifier;
  }
}

export default Notification.Instancia;
