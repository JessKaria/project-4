export function getLoggedInUserId() {
  if (!localStorage) return false
  const token = localStorage.getItem('token')
  if (!token) return false
  const payloadAsString = atob(token.split('.')[1])
  const payloadAsObject = JSON.parse(payloadAsString)
  return payloadAsObject.sub
}

const logged = getLoggedInUserId()



export function isCreator(userIdToCompare) {
  if (!userIdToCompare) return false 
  return userIdToCompare === getLoggedInUserId()
}