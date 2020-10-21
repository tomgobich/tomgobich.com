class MessageService {
  constructor() { }

  static getDayMessage(day) {
    switch (day) {
      case 0:
        return 'Happy Sunday'
      case 1:
        return 'Happy Monday'
      case 2:
        return 'Happy Tuesday'
      case 3:
        return 'Happy Wednesday'
      case 4:
        return 'Happy Thursday'
      case 5:
        return 'Happy Friday'
      case 6:
        return 'Happy Saturday'
      default:
        return 'Good Day'
    }
  }

  static getHourMessage(hour) {
    let hourMessage

    if (hour < 3) {
      hourMessage = 'Happy late night to ya'
    } else if (hour < 12) {
      hourMessage = 'Good morning'
    } else if (hour < 16) {
      hourMessage = 'Good afternoon'
    } else if (hour < 20) {
      hourMessage = 'Good evening'
    } else {
      hourMessage = 'Good night'
    }

    return hourMessage
  }

  static getWelcome() {
    const date = new Date()
    const day = date.getDay()
    const hour = date.getHours()
    const randNumber = Math.floor(Math.random() * (1 - 0 + 1)) + 0

    return randNumber ? this.getDayMessage(day) : this.getHourMessage(hour)
  }
}

export default MessageService
