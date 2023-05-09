import { atom } from 'recoil';

import { MessageType } from '../../types/notification';

export const atomNotification = atom({
	key: 'notification',
	default: {
		messageType: MessageType.Success,
		message: '',
	},
});
