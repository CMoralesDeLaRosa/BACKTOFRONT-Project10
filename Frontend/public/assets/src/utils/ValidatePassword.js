export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,8}$/
  return passwordRegex.test(password)
}
