interface IAlertMessageProps {
    message: string,
    type: 'success' | 'warning' | 'danger'
}

export const AlertMessage = (props: IAlertMessageProps) => {
    const {  message, type } = props;
    var div_alert = document.createElement("div");
    div_alert.setAttribute('role', 'alert');
    div_alert.className = 'alertMsg fade alert show alert-' + type;
    div_alert.innerText = message;
    document.body.appendChild(div_alert);
    setTimeout(() => document.body.removeChild(div_alert), 2000)

}
