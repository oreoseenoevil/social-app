export const checkImage = (file) => {
  let err = ''
  if (!file) {
    err = 'File doesn\'t exist.'
  }

  if (file.size > 1024 * 1024) {
    err = 'File size is too large, max 1mb.'
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    err = 'File format is incorrect.'
  }

  return err
}
