export const validate = ({ password, confirmPassword }) => {
  const error = {}

  if (password !== confirmPassword) {
    error.error = 'Password didn\'t match.'
  }

  return {
    message: error,
    errorLength: Object.keys(error).length,
  }
}
