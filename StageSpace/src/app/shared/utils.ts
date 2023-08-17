export function convertDate(defaultDate: string): string {
    const newDate = new Date(defaultDate);

    const yyyy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1;
    let dd = newDate.getDate();
    let hh = newDate.getHours();
    let min = newDate.getMinutes();
    let ddString, mmString;

    if (dd < 10) {
    ddString = '0' + dd;
    } else {
    ddString = dd;
    }
    if (mm < 10) {
    mmString = '0' + mm;
    } else {
    mmString = mm;
    }

    const formatted = hh + ':' + min + ' ' + ddString + '.' + mmString + '.' + yyyy;

    return formatted;
}