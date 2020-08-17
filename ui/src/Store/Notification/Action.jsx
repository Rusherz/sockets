const defaultSetting = {
	message: "",
	open: true,
	anchor: {
		vertical: "top",
		horizontal: "right",
	},
	copyData: null,
	autoHide: 3000,
	severity: null,
}

export const createNotification = (
	notification,
	copyData = null
) => (dispatch) => {
	let notificationObject = {
		...defaultSetting,
		...notification,
	}

	if (!notificationObject.message) {
		return
	}

	if (copyData) {
		notificationObject.copyData = copyData
	}

	dispatch({
		type: "CREATE_NOTIFICATION",
		payload: notificationObject,
	})
}

export const deleteNotification = () => (dispatch) => {
	dispatch({
		type: "DELETE_NOTIFICATION",
	})
}
