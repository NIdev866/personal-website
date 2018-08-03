function ContactViewHeight(distanceUp) {
  if(distanceUp) {
    if(distanceUp > 20) {
      return distanceUp - 20;
    }
  }
  return 0;
}

export default ContactViewHeight;