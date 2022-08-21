export default function unixToDate(unix) {
    const date = new Date(unix * 1000).toLocaleDateString("fi")
    return  date
} 