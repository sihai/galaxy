function login() {
	Dialog.show('登录Galaxy', '', 'login-div');
}

function showLoginErrorMsg(errorMsg) {
	Dialog.show('登录Galaxy', errorMsg, 'login-div');
}