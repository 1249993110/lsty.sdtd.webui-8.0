/**
 * 信息输入提示框
 */
export default function myprompt(message, inputPattern = '', inputErrorMessage = '', title = '系统提示', type = '') {
    return new Promise((resolve, reject) => {
        ElMessageBox.prompt(message, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: inputPattern,
            inputErrorMessage: inputErrorMessage,
            type: type,
        })
            .then(({ value }) => {
                resolve(value);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
